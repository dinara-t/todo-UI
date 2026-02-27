import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../types/category";
import { http } from "./http-client";

export const categoryService = {
  list: () => http<Category[]>("/categories"),
  create: (dto: CreateCategoryDto) =>
    http<Category>("/categories", {
      method: "POST",
      body: dto,
    }),
  update: (id: number, dto: UpdateCategoryDto) =>
    http<Category>(`/categories/${id}`, {
      method: "PUT",
      body: dto,
    }),
  remove: (id: number) => http<void>(`/categories/${id}`, { method: "DELETE" }),
};
