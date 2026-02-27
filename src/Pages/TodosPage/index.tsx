import { useCallback, useEffect, useMemo, useState } from "react";
import type { Category } from "../../types/category";
import type {
  CreateTodoDto,
  Todo,
  TodoQuery,
  TodoSortBy,
  SortOrder,
  UpdateTodoDto,
} from "../../types/todo";
import { categoryService } from "../../services/category-services";
import { todoService } from "../../services/todo-services";
import { formatApiError } from "../../types/api";
import TodoFilters from "../../components/TodoFilters/TodoFilters";
import TodoList from "../../components/TodoList/TodoList";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import TodoForm from "../../components/TodoForm/TodoForm";

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-input/35 px-3 py-2 text-xs text-gray-text/70 ring-1 ring-brown/10">
      <span className="font-semibold text-gray-text">{value}</span> {label}
    </div>
  );
}

export default function TodosPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [categoryId, setCategoryId] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<TodoSortBy>("createdAt");
  const [order, setOrder] = useState<SortOrder>("DESC");

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const query: TodoQuery = useMemo(
    () => ({
      category: categoryId === "" ? null : categoryId,
      sortBy,
      order,
    }),
    [categoryId, sortBy, order],
  );

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    const open = total - done;
    return { total, done, open };
  }, [todos]);

  const loadAll = useCallback(async () => {
    setErr(null);
    setLoading(true);
    try {
      const [cats, items] = await Promise.all([
        categoryService.list(),
        todoService.list(query),
      ]);
      setCategories(cats);
      setTodos(items);
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  async function toggle(todo: Todo) {
    setErr(null);
    try {
      const updated = await todoService.update(todo.id, {
        completed: !todo.completed,
      } satisfies UpdateTodoDto);
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (e) {
      setErr(formatApiError(e));
    }
  }

  async function archive(todo: Todo) {
    setErr(null);
    try {
      await todoService.archive(todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (e) {
      setErr(formatApiError(e));
    }
  }

  function openEdit(todo: Todo) {
    setActiveTodo(todo);
    setEditOpen(true);
  }

  async function create(dto: CreateTodoDto) {
    setErr(null);
    setSubmitting(true);
    try {
      const created = await todoService.create(dto);
      setCreateOpen(false);
      setTodos((prev) => [created, ...prev]);
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setSubmitting(false);
    }
  }

  async function save(dto: UpdateTodoDto) {
    if (!activeTodo) return;
    setErr(null);
    setSubmitting(true);
    try {
      const updated = await todoService.update(activeTodo.id, dto);
      setEditOpen(false);
      setActiveTodo(null);
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-text">Todos</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <StatPill label="total" value={String(stats.total)} />
            <StatPill label="open" value={String(stats.open)} />
            <StatPill label="done" value={String(stats.done)} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={loadAll} disabled={loading}>
            Refresh
          </Button>
          <Button onClick={() => setCreateOpen(true)}>New Todo</Button>
        </div>
      </div>

      <TodoFilters
        categories={categories}
        categoryId={categoryId}
        sortBy={sortBy}
        order={order}
        onChange={(next) => {
          setCategoryId(next.categoryId);
          setSortBy(next.sortBy);
          setOrder(next.order);
        }}
      />

      {err ? (
        <div className="whitespace-pre-line rounded-xl bg-rose-500/10 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
          {err}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-xl bg-white p-6 text-sm text-gray-text/70 ring-1 ring-brown/10">
          Loading…
        </div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggle}
          onEdit={openEdit}
          onArchive={archive}
        />
      )}

      <Modal
        open={createOpen}
        title="Create todo"
        onClose={() => (submitting ? null : setCreateOpen(false))}
      >
        <TodoForm
          mode="create"
          categories={categories}
          onSubmit={create}
          submitting={submitting}
        />
      </Modal>

      <Modal
        open={editOpen}
        title="Edit todo"
        onClose={() => {
          if (submitting) return;
          setEditOpen(false);
          setActiveTodo(null);
        }}
      >
        {activeTodo ? (
          <TodoForm
            mode="edit"
            todo={activeTodo}
            categories={categories}
            onSubmit={save}
            submitting={submitting}
          />
        ) : null}
      </Modal>
    </div>
  );
}
