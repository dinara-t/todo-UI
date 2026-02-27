import type { Category } from "../../types/category";

type Props = {
  categories: Category[];
  value: number | "";
  onChange: (value: number | "") => void;
  label?: string;
  allowAll?: boolean;
  allLabel?: string;
};

export default function CategorySelect({
  categories,
  value,
  onChange,
  label,
  allowAll = false,
  allLabel = "All categories",
}: Props) {
  return (
    <label className="block">
      {label ? (
        <div className="mb-1 text-sm text-gray-text/80">{label}</div>
      ) : null}
      <select
        className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
        value={value === "" ? "" : String(value)}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? "" : Number(v));
        }}
      >
        {allowAll ? <option value="">{allLabel}</option> : null}
        {categories.map((c) => (
          <option key={c.id} value={String(c.id)}>
            {c.name}
          </option>
        ))}
      </select>
    </label>
  );
}
