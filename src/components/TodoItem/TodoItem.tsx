import type { Todo } from "../../types/todo";
import Button from "../Button/Button";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onArchive: (todo: Todo) => void;
};

export default function TodoItem({ todo, onToggle, onEdit, onArchive }: Props) {
  const titleClass = todo.completed
    ? "line-through text-gray-text/55"
    : "text-gray-text";

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
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-text/65">
            <span>
              {todo.category
                ? `Category: ${todo.category.name}`
                : "No category"}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-text/25" />
            <span>ID: {todo.id}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
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
