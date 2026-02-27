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
      })}`,
    ),
  create: (dto: CreateTodoDto) =>
    http<Todo>("/todos", { method: "POST", body: JSON.stringify(dto) }),
  update: (id: number, dto: UpdateTodoDto) =>
    http<Todo>(`/todos/${id}`, { method: "PUT", body: JSON.stringify(dto) }),
  archive: (id: number) => http<void>(`/todos/${id}`, { method: "DELETE" }),
};
