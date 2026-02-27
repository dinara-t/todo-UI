import type { Todo } from "../../types/todo";
import TodoItem from "../TodoItem/TodoItem";

type Props = {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onArchive: (todo: Todo) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onArchive,
}: Props) {
  if (!todos.length) {
    return (
      <div className="rounded-2xl bg-gray-input/35 p-8 text-sm text-gray-text/70 ring-1 ring-brown/10">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange text-white font-bold shadow-soft">
            ✓
          </div>
          <div>
            <div className="text-base font-semibold text-gray-text">
              No todos found
            </div>
            <div className="mt-1">
              Try changing filters, or create a new todo.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}
