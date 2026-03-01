import type { Todo } from "../../types/todo";
import Button from "../Button/Button";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onArchive: (todo: Todo) => void;
  onDuplicate: (todo: Todo) => void;
};

function pillClass(kind: "neutral" | "warn" | "danger") {
  if (kind === "danger") return "bg-rose-50 text-rose-700 ring-rose-200";
  if (kind === "warn") return "bg-amber-50 text-amber-800 ring-amber-200";
  return "bg-gray-input/35 text-gray-text/70 ring-brown/10";
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onArchive,
  onDuplicate,
}: Props) {
  const titleClass = todo.completed
    ? "line-through text-gray-text/55"
    : "text-gray-text";

  const showOverdue = Boolean(todo.overdue) && !todo.completed;

  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brown/10">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-orange"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          aria-label={`Toggle ${todo.title}`}
        />
        <div className="min-w-0">
          <div className={`truncate text-sm font-semibold ${titleClass}`}>
            {todo.title}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`rounded-full px-2 py-1 ring-1 ${pillClass("neutral")}`}
            >
              {todo.category ? todo.category.name : "No category"}
            </span>

            {todo.dueDate ? (
              <span
                className={`rounded-full px-2 py-1 ring-1 ${pillClass(
                  showOverdue ? "danger" : "neutral",
                )}`}
              >
                Due {todo.dueDate}
              </span>
            ) : null}

            {todo.urgency ? (
              <span
                className={`rounded-full px-2 py-1 ring-1 ${pillClass(
                  todo.urgency === "HIGH" ? "warn" : "neutral",
                )}`}
              >
                {todo.urgency}
              </span>
            ) : null}

            {typeof todo.recurrenceDays === "number" &&
            Number.isFinite(todo.recurrenceDays) &&
            todo.recurrenceDays > 0 ? (
              <span
                className={`rounded-full px-2 py-1 ring-1 ${pillClass(
                  "neutral",
                )}`}
              >
                Every {todo.recurrenceDays}d
              </span>
            ) : null}

            {showOverdue ? (
              <span
                className={`rounded-full px-2 py-1 ring-1 ${pillClass("danger")}`}
              >
                Overdue
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-text/55">
            <span>ID: {todo.id}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center">
        <Button variant="secondary" size="sm" onClick={() => onDuplicate(todo)}>
          Duplicate
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onEdit(todo)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onArchive(todo)}>
          Archive
        </Button>
      </div>
    </div>
  );
}
