import { useMemo, useState } from "react";
import type { Category } from "../../types/category";
import type {
  CreateTodoDto,
  Todo,
  UpdateTodoDto,
  Urgency,
} from "../../types/todo";
import { isPositiveInt, minLen } from "../../utils/validators";
import Button from "../Button/Button";
import Input from "../Form/Input";
import CategorySelect from "../CategorySelect/CategorySelect";

type CreateProps = {
  mode: "create";
  categories: Category[];
  onSubmit: (dto: CreateTodoDto) => void;
  submitting?: boolean;
};

type EditProps = {
  mode: "edit";
  categories: Category[];
  todo: Todo;
  onSubmit: (dto: UpdateTodoDto) => void;
  submitting?: boolean;
};

type Props = CreateProps | EditProps;

type FormState = {
  title: string;
  completed: boolean;
  categoryId: number | "";
  dueDate: string;
  urgency: Urgency | "";
  recurrenceDays: string;
};

function toIsoDate(v: unknown): string {
  if (typeof v !== "string") return "";
  const s = v.trim();
  if (!s) return "";
  return s.length >= 10 ? s.slice(0, 10) : s;
}

export default function TodoForm(props: Props) {
  const categories = props.categories;

  const initial: FormState = useMemo(() => {
    if (props.mode !== "edit") {
      return {
        title: "",
        completed: false,
        categoryId: "",
        dueDate: "",
        urgency: "",
        recurrenceDays: "",
      };
    }

    const cid: number | "" =
      typeof props.todo.category?.id === "number" ? props.todo.category.id : "";

    return {
      title: props.todo.title ?? "",
      completed: Boolean(props.todo.completed),
      categoryId: cid,
      dueDate: toIsoDate(props.todo.dueDate),
      urgency: (props.todo.urgency ?? "") as Urgency | "",
      recurrenceDays:
        typeof props.todo.recurrenceDays === "number" &&
        Number.isFinite(props.todo.recurrenceDays)
          ? String(props.todo.recurrenceDays)
          : "",
    };
  }, [props]);

  const [title, setTitle] = useState<string>(initial.title);
  const [completed, setCompleted] = useState<boolean>(initial.completed);
  const [categoryId, setCategoryId] = useState<number | "">(initial.categoryId);
  const [dueDate, setDueDate] = useState<string>(initial.dueDate);
  const [urgency, setUrgency] = useState<Urgency | "">(initial.urgency);
  const [recurrenceDays, setRecurrenceDays] = useState<string>(
    initial.recurrenceDays,
  );
  const [error, setError] = useState<string | null>(null);

  const defaultCategoryId: number | "" =
    categories.length > 0 ? categories[0].id : "";

  const effectiveCategoryId: number | "" =
    categoryId === "" ? defaultCategoryId : categoryId;

  function submit() {
    setError(null);

    if (!minLen(title, 2)) {
      setError("Title must be longer than 1 character");
      return;
    }

    if (!isPositiveInt(effectiveCategoryId)) {
      setError("Category is required");
      return;
    }

    const trimmedTitle = title.trim();
    const due = dueDate.trim() ? dueDate.trim() : null;
    const urg = urgency === "" ? null : urgency;

    const rec =
      recurrenceDays.trim() === ""
        ? null
        : Number.isFinite(Number(recurrenceDays))
          ? Number(recurrenceDays)
          : null;

    if (rec !== null && (!Number.isInteger(rec) || rec < 0)) {
      setError("Recurrence days must be 0 or a positive whole number");
      return;
    }

    const dtoBase = {
      title: trimmedTitle,
      completed: Boolean(completed),
      categoryId: Number(effectiveCategoryId),
      dueDate: due,
      urgency: urg,
      recurrenceDays: rec,
    };

    if (props.mode === "create") {
      props.onSubmit(dtoBase satisfies CreateTodoDto);
      return;
    }

    props.onSubmit(dtoBase satisfies UpdateTodoDto);
  }

  return (
    <div className="grid gap-3">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
      />

      <label className="inline-flex items-center gap-2 text-sm text-gray-text/80">
        <input
          type="checkbox"
          className="h-4 w-4 accent-orange"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>

      <CategorySelect
        categories={categories}
        value={effectiveCategoryId}
        onChange={setCategoryId}
        label="Category"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <div className="mb-1 text-sm text-gray-text/80">Due date</div>
          <input
            type="date"
            className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label className="block">
          <div className="mb-1 text-sm text-gray-text/80">Urgency</div>
          <select
            className="w-full rounded-xl bg-white px-3 py-2 text-gray-text ring-1 ring-brown/12 focus-ring"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as Urgency | "")}
          >
            <option value="">None</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </label>
      </div>

      <Input
        label="Recurrence (days)"
        type="number"
        min={0}
        step={1}
        value={recurrenceDays}
        onChange={(e) => setRecurrenceDays(e.target.value)}
        placeholder="e.g. 7"
      />

      {error ? (
        <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200">
          {error}
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button onClick={submit} disabled={Boolean(props.submitting)}>
          {props.mode === "create" ? "Create" : "Save"}
        </Button>
      </div>
    </div>
  );
}
