import { useCallback, useEffect, useMemo, useState } from "react";
import type { PageResponse } from "../../types/api";
import type { Category } from "../../types/category";
import type {
  CreateTodoDto,
  Todo,
  TodoPagedQuery,
  TodoSortBy,
  SortOrder,
  UpdateTodoDto,
  Urgency,
} from "../../types/todo";
import { categoryService } from "../../services/category-services";
import { todoService } from "../../services/todo-services";
import { formatApiError } from "../../types/api";
import TodoFilters from "../../components/TodoFilters/TodoFilters";
import TodoList from "../../components/TodoList/TodoList";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import TodoForm from "../../components/TodoForm/TodoForm";
import Pagination from "../../components/Pagination/Pagination";

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-input/35 px-3 py-2 text-xs text-gray-text/70 ring-1 ring-brown/10">
      <span className="font-semibold text-gray-text">{value}</span> {label}
    </div>
  );
}

type CompletedFilter = "all" | "true" | "false";

const EMPTY_PAGE: PageResponse<Todo> = {
  items: [],
  page: 0,
  size: 10,
  totalItems: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function TodosPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [todoPage, setTodoPage] = useState<PageResponse<Todo>>(EMPTY_PAGE);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [categoryId, setCategoryId] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<TodoSortBy>("createdAt");
  const [order, setOrder] = useState<SortOrder>("DESC");

  const [completed, setCompleted] = useState<CompletedFilter>("all");
  const [overdue, setOverdue] = useState(false);
  const [urgency, setUrgency] = useState<Urgency | "">("");
  const [dueAfter, setDueAfter] = useState<string>("");
  const [dueBefore, setDueBefore] = useState<string>("");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const query: TodoPagedQuery = useMemo(() => {
    const completedValue =
      completed === "all" ? null : completed === "true" ? true : false;

    return {
      category: categoryId === "" ? null : categoryId,
      sortBy,
      order,
      completed: completedValue,
      overdue: overdue ? true : null,
      urgency: urgency === "" ? null : urgency,
      dueAfter: dueAfter.trim() ? dueAfter.trim() : null,
      dueBefore: dueBefore.trim() ? dueBefore.trim() : null,
      page,
      size,
    };
  }, [
    categoryId,
    sortBy,
    order,
    completed,
    overdue,
    urgency,
    dueAfter,
    dueBefore,
    page,
    size,
  ]);

  const todos = todoPage.items;

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    const open = total - done;
    const overdueCount = todos.filter((t) => t.overdue && !t.completed).length;
    return { total, done, open, overdueCount };
  }, [todos]);

  const loadCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const data = await categoryService.list();
      setCategories(data);
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  const loadTodos = useCallback(async () => {
    setErr(null);
    setLoading(true);
    try {
      const data = await todoService.listPaged(query);
      setTodoPage(data);
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  async function refreshCurrentPage() {
    await loadTodos();
  }

  async function toggle(todo: Todo) {
    setErr(null);
    try {
      await todoService.update(todo.id, {
        completed: !todo.completed,
      } satisfies UpdateTodoDto);
      await refreshCurrentPage();
    } catch (e) {
      setErr(formatApiError(e));
    }
  }

  async function archive(todo: Todo) {
    setErr(null);
    try {
      await todoService.archive(todo.id);

      const isLastItemOnPage = todoPage.items.length === 1;
      if (isLastItemOnPage && page > 0) {
        setPage((prev) => prev - 1);
        return;
      }

      await refreshCurrentPage();
    } catch (e) {
      setErr(formatApiError(e));
    }
  }

  async function duplicate(todo: Todo) {
    setErr(null);
    try {
      const shiftDays =
        typeof todo.recurrenceDays === "number" &&
        Number.isFinite(todo.recurrenceDays)
          ? todo.recurrenceDays
          : null;

      await todoService.duplicate(todo.id, shiftDays);

      if (page !== 0) {
        setPage(0);
        return;
      }

      await refreshCurrentPage();
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
      await todoService.create(dto);
      setCreateOpen(false);

      if (page !== 0) {
        setPage(0);
        return;
      }

      await refreshCurrentPage();
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
      await todoService.update(activeTodo.id, dto);
      setEditOpen(false);
      setActiveTodo(null);
      await refreshCurrentPage();
    } catch (e) {
      setErr(formatApiError(e));
    } finally {
      setSubmitting(false);
    }
  }

  const pageTotalItems = String(todoPage.totalItems);
  const pageHasData = todoPage.totalItems > 0;

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-text">Todos</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <StatPill label="on this page" value={String(stats.total)} />
            <StatPill label="open" value={String(stats.open)} />
            <StatPill label="done" value={String(stats.done)} />
            <StatPill label="overdue" value={String(stats.overdueCount)} />
            <StatPill label="overall" value={pageTotalItems} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              loadCategories();
              loadTodos();
            }}
            disabled={loading || categoriesLoading}
          >
            Refresh
          </Button>
          <Button
            onClick={() => setCreateOpen(true)}
            disabled={categoriesLoading || categories.length === 0}
          >
            New Todo
          </Button>
        </div>
      </div>

      <TodoFilters
        categories={categories}
        categoryId={categoryId}
        sortBy={sortBy}
        order={order}
        completed={completed}
        overdue={overdue}
        urgency={urgency}
        dueAfter={dueAfter}
        dueBefore={dueBefore}
        onChange={(next) => {
          setCategoryId(next.categoryId);
          setSortBy(next.sortBy);
          setOrder(next.order);
          setCompleted(next.completed);
          setOverdue(next.overdue);
          setUrgency(next.urgency);
          setDueAfter(next.dueAfter);
          setDueBefore(next.dueBefore);
          setPage(0);
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
        <>
          <TodoList
            todos={todos}
            onToggle={toggle}
            onEdit={openEdit}
            onArchive={archive}
            onDuplicate={duplicate}
          />

          {pageHasData ? (
            <Pagination
              page={todoPage.page}
              totalPages={todoPage.totalPages}
              totalItems={todoPage.totalItems}
              size={todoPage.size}
              hasNext={todoPage.hasNext}
              hasPrevious={todoPage.hasPrevious}
              onPageChange={setPage}
              onSizeChange={(nextSize) => {
                setSize(nextSize);
                setPage(0);
              }}
              disabled={loading}
            />
          ) : null}
        </>
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
