import type { Category } from "../../types/category";
import type { SortOrder, TodoSortBy } from "../../types/todo";
import CategorySelect from "../CategorySelect/CategorySelect";

type Props = {
  categories: Category[];
  categoryId: number | "";
  sortBy: TodoSortBy;
  order: SortOrder;
  onChange: (next: {
    categoryId: number | "";
    sortBy: TodoSortBy;
    order: SortOrder;
  }) => void;
};

export default function TodoFilters({
  categories,
  categoryId,
  sortBy,
  order,
  onChange,
}: Props) {
  return (
    <div className="grid gap-3 rounded-2xl bg-gray-input/35 p-4 ring-1 ring-brown/10 md:grid-cols-3">
      <CategorySelect
        categories={categories}
        value={categoryId}
        onChange={(v) => onChange({ categoryId: v, sortBy, order })}
        allowAll
        label="Category"
      />

      <label className="block">
        <div className="mb-1 text-sm text-gray-text/80">Sort by</div>
        <select
          className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
          value={sortBy}
          onChange={(e) =>
            onChange({
              categoryId,
              sortBy: e.target.value as TodoSortBy,
              order,
            })
          }
        >
          <option value="createdAt">createdAt</option>
          <option value="title">title</option>
          <option value="completed">completed</option>
        </select>
      </label>

      <label className="block">
        <div className="mb-1 text-sm text-gray-text/80">Order</div>
        <select
          className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
          value={order}
          onChange={(e) =>
            onChange({ categoryId, sortBy, order: e.target.value as SortOrder })
          }
        >
          <option value="DESC">DESC</option>
          <option value="ASC">ASC</option>
        </select>
      </label>
    </div>
  );
}
