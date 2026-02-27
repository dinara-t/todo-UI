import { NavLink } from "react-router-dom";

function linkClass({ isActive }: { isActive: boolean }) {
  const base = "rounded-xl px-3 py-2 text-sm font-medium transition focus-ring";
  if (isActive) {
    return `${base} bg-gray-input text-brown`;
  }
  return `${base} text-gray-text/80 hover:text-gray-text hover:bg-gray-input/70`;
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-brown/15 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-sm py-sm">
        <div className="flex items-center gap-sm">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange text-white text-sm font-bold shadow-soft">
            T
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold text-gray-text">
              Todos UI
            </div>
            <div className="text-xs text-gray-text/70">Spring Boot + MySQL</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink to="/todos" className={linkClass}>
            Todos
          </NavLink>
          <NavLink to="/categories" className={linkClass}>
            Categories
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
