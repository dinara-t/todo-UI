import { useState } from "react";
import type { Category } from "../../types/category";
import type { CreateTodoDto, Todo, UpdateTodoDto } from "../../types/todo";
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

export default function TodoForm(props: Props) {
  const categories = props.categories;

  const initialTitle = props.mode === "edit" ? (props.todo.title ?? "") : "";

  const initialCompleted =
    props.mode === "edit" ? Boolean(props.todo.completed) : false;

  const initialCategoryId: number | "" =
    props.mode === "edit" ? (props.todo.category?.id ?? "") : "";

  const [title, setTitle] = useState<string>(initialTitle);
  const [completed, setCompleted] = useState<boolean>(initialCompleted);
  const [categoryId, setCategoryId] = useState<number | "">(initialCategoryId);
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

    const dto = {
      title: title.trim(),
      completed: Boolean(completed),
      categoryId: Number(effectiveCategoryId),
    };

    if (props.mode === "create") {
      props.onSubmit(dto satisfies CreateTodoDto);
      return;
    }

    props.onSubmit(dto satisfies UpdateTodoDto);
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
