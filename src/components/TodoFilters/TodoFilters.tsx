import type { Category } from "../../types/category";
import type { SortOrder, TodoSortBy, Urgency } from "../../types/todo";
import CategorySelect from "../CategorySelect/CategorySelect";

type CompletedFilter = "all" | "true" | "false";

type Props = {
  categories: Category[];
  categoryId: number | "";
  sortBy: TodoSortBy;
  order: SortOrder;
  completed: CompletedFilter;
  overdue: boolean;
  urgency: Urgency | "";
  dueAfter: string;
  dueBefore: string;
  onChange: (next: {
    categoryId: number | "";
    sortBy: TodoSortBy;
    order: SortOrder;
    completed: CompletedFilter;
    overdue: boolean;
    urgency: Urgency | "";
    dueAfter: string;
    dueBefore: string;
  }) => void;
};

export default function TodoFilters({
  categories,
  categoryId,
  sortBy,
  order,
  completed,
  overdue,
  urgency,
  dueAfter,
  dueBefore,
  onChange,
}: Props) {
  const nextBase = {
    categoryId,
    sortBy,
    order,
    completed,
    overdue,
    urgency,
    dueAfter,
    dueBefore,
  };

  return (
    <div className="grid gap-3 rounded-2xl bg-gray-input/35 p-4 ring-1 ring-brown/10 md:grid-cols-6">
      <div className="md:col-span-2">
        <CategorySelect
          categories={categories}
          value={categoryId}
          onChange={(v) => onChange({ ...nextBase, categoryId: v })}
          allowAll
          label="Category"
        />
      </div>

      <label className="block md:col-span-2">
        <div className="mb-1 text-sm text-gray-text/80">Sort by</div>
        <select
          className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
          value={sortBy}
          onChange={(e) =>
            onChange({
              ...nextBase,
              sortBy: e.target.value as TodoSortBy,
            })
          }
        >
          <option value="createdAt">createdAt</option>
          <option value="dueDate">dueDate</option>
          <option value="urgency">urgency</option>
          <option value="title">title</option>
          <option value="completed">completed</option>
        </select>
      </label>

      <label className="block md:col-span-2">
        <div className="mb-1 text-sm text-gray-text/80">Order</div>
        <select
          className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
          value={order}
          onChange={(e) =>
            onChange({ ...nextBase, order: e.target.value as SortOrder })
          }
        >
          <option value="DESC">DESC</option>
          <option value="ASC">ASC</option>
        </select>
      </label>

      <label className="block md:col-span-2">
        <div className="mb-1 text-sm text-gray-text/80">Completed</div>
        <select
          className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
          value={completed}
          onChange={(e) =>
            onChange({
              ...nextBase,
              completed: e.target.value as CompletedFilter,
            })
          }
        >
          <option value="all">All</option>
          <option value="false">Open</option>
          <option value="true">Done</option>
        </select>
      </label>

      <label className="block md:col-span-2">
        <div className="mb-1 text-sm text-gray-text/80">Urgency</div>
        <select
          className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
          value={urgency}
          onChange={(e) =>
            onChange({
              ...nextBase,
              urgency: e.target.value as Urgency | "",
            })
          }
        >
          <option value="">All</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </label>

      <label className="block md:col-span-2">
        <div className="mb-1 text-sm text-gray-text/80">Due after</div>
        <input
          type="date"
          className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
          value={dueAfter}
          onChange={(e) => onChange({ ...nextBase, dueAfter: e.target.value })}
        />
      </label>

      <label className="block md:col-span-2">
        <div className="mb-1 text-sm text-gray-text/80">Due before</div>
        <input
          type="date"
          className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
          value={dueBefore}
          onChange={(e) => onChange({ ...nextBase, dueBefore: e.target.value })}
        />
      </label>

      <label className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-gray-text ring-1 ring-brown/12 focus-ring md:col-span-2">
        <input
          type="checkbox"
          className="h-4 w-4 accent-orange"
          checked={overdue}
          onChange={(e) => onChange({ ...nextBase, overdue: e.target.checked })}
        />
        Overdue only
      </label>
    </div>
  );
}
