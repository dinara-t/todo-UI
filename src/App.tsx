import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import TodosPage from "./pages/TodosPage";
import CategoriesPage from "./pages/CategoriesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/todos" replace />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
