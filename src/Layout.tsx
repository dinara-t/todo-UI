import { Outlet } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-light">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-sm py-lg">
        <div className="rounded-2xl bg-white shadow-soft ring-1 ring-brown/10">
          <div className="p-md sm:p-lg">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
