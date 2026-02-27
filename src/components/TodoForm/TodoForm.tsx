import { useEffect, useMemo, useState } from "react";
import type { Category } from "../../types/category";
import type { CreateTodoDto, Todo, UpdateTodoDto } from "../../types/todo";
import { isPositiveInt, minLen } from "../../utils/validators";
import Button from "../Button/Button";
import Input from "../Form/Input";
import CategorySelect from "../CategorySelect/CategorySelect";

type Props =
  | {
      mode: "create";
      categories: Category[];
      onSubmit: (dto: CreateTodoDto) => void;
      submitting?: boolean;
    }
  | {
      mode: "edit";
      categories: Category[];
      todo: Todo;
      onSubmit: (dto: UpdateTodoDto) => void;
      submitting?: boolean;
    };

export default function TodoForm(props: Props) {
  const categories = props.categories;

  const initial = useMemo(() => {
    if (props.mode === "edit") {
      return {
        title: props.todo.title,
        completed: props.todo.completed,
        categoryId: props.todo.category?.id ?? "",
      };
    }

    return {
      title: "",
      completed: false,
      categoryId: categories[0]?.id ?? ("" as number | ""),
    };
  }, [props, categories]);

  const [title, setTitle] = useState(initial.title);
  const [completed, setCompleted] = useState(initial.completed);
  const [categoryId, setCategoryId] = useState<number | "">(initial.categoryId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (props.mode !== "create") return;
    if (categoryId !== "") return;
    if (!categories.length) return;
    setCategoryId(categories[0].id);
  }, [props.mode, categoryId, categories]);

  function submit() {
    setError(null);

    if (!minLen(title, 2)) {
      setError("Title must be longer than 1 character");
      return;
    }

    if (!isPositiveInt(categoryId)) {
      setError("Category is required");
      return;
    }

    const dto = {
      title: title.trim(),
      completed: Boolean(completed),
      categoryId: Number(categoryId),
    };

    props.onSubmit(dto as any);
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
        value={categoryId}
        onChange={setCategoryId}
        label="Category"
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
