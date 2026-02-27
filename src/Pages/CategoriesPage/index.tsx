import { useEffect, useMemo, useState } from "react";
import type { Category } from "../../types/category";
import { categoryService } from "../../services/category-services";
import { formatApiError } from "../../types/api";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import Modal from "../../components/Modal/Modal";
import { minLen } from "../../utils/validators";

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [active, setActive] = useState<Category | null>(null);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  async function load() {
    setErr(null);
    setLoading(true);
    try {
      const data = await categoryService.list();
      setItems(data);
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {
    setErr(null);
    if (!minLen(name, 2)) {
      setErr("Name must be longer than 1 character");
      return;
    }
    setSubmitting(true);
    try {
      const created = await categoryService.create({ name: name.trim() });
      setItems((prev) => [...prev, created]);
      setName("");
      setCreateOpen(false);
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(c: Category) {
    setActive(c);
    setEditName(c.name);
    setEditOpen(true);
  }

  async function save() {
    if (!active) return;
    setErr(null);
    if (!minLen(editName, 2)) {
      setErr("Name must be longer than 1 character");
      return;
    }
    setSubmitting(true);
    try {
      const updated = await categoryService.update(active.id, {
        name: editName.trim(),
      });
      setItems((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
      setEditOpen(false);
      setActive(null);
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(c: Category) {
    setErr(null);
    setSubmitting(true);
    try {
      await categoryService.remove(c.id);
      setItems((prev) => prev.filter((x) => x.id !== c.id));
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-text">Categories</h1>
          <p className="mt-1 text-sm text-gray-text/70">
            Unique name validation is enforced by the backend.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={load} disabled={loading}>
            Refresh
          </Button>
          <Button onClick={() => setCreateOpen(true)}>New Category</Button>
        </div>
      </div>

      {err ? (
        <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200 whitespace-pre-line">
          {err}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl bg-gray-input/35 p-6 text-sm text-gray-text/70 ring-1 ring-brown/10">
          Loading…
        </div>
      ) : (
        <div className="grid gap-3">
          {sorted.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brown/10"
            >
              <div>
                <div className="text-sm font-semibold text-gray-text">
                  {c.name}
                </div>
                <div className="text-xs text-gray-text/60">ID: {c.id}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => openEdit(c)}
                  disabled={submitting}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => remove(c)}
                  disabled={submitting}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {!sorted.length ? (
            <div className="rounded-2xl bg-gray-input/35 p-6 text-sm text-gray-text/70 ring-1 ring-brown/10">
              No categories yet.
            </div>
          ) : null}
        </div>
      )}

      <Modal
        open={createOpen}
        title="Create category"
        onClose={() => (submitting ? null : setCreateOpen(false))}
      >
        <div className="grid gap-3">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Work"
          />
          <div className="flex justify-end">
            <Button onClick={create} disabled={submitting}>
              Create
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={editOpen}
        title="Edit category"
        onClose={() => {
          if (submitting) return;
          setEditOpen(false);
          setActive(null);
        }}
      >
        <div className="grid gap-3">
          <Input
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setEditOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button onClick={save} disabled={submitting}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
