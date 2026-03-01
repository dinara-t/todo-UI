import type {
  CreateTodoDto,
  Todo,
  TodoQuery,
  UpdateTodoDto,
} from "../types/todo";
import { http } from "./http-client";
import { toQueryString } from "../utils/query";

export const todoService = {
  list: (query: TodoQuery) =>
    http<Todo[]>(
      `/todos${toQueryString({
        category: query.category ?? undefined,
        sortBy: query.sortBy ?? undefined,
        order: query.order ?? undefined,
        overdue: query.overdue ?? undefined,
        dueBefore: query.dueBefore ?? undefined,
        dueAfter: query.dueAfter ?? undefined,
        urgency: query.urgency ?? undefined,
        completed: query.completed ?? undefined,
      })}`,
    ),
  create: (dto: CreateTodoDto) =>
    http<Todo>("/todos", { method: "POST", body: dto }),
  update: (id: number, dto: UpdateTodoDto) =>
    http<Todo>(`/todos/${id}`, { method: "PUT", body: dto }),
  archive: (id: number) => http<void>(`/todos/${id}`, { method: "DELETE" }),
  duplicate: (id: number, shiftDays?: number | null) =>
    http<Todo>(
      `/todos/${id}/duplicate${toQueryString({
        shiftDays:
          typeof shiftDays === "number" &&
          Number.isFinite(shiftDays) &&
          shiftDays !== 0
            ? shiftDays
            : undefined,
      })}`,
      { method: "POST" },
    ),
};
