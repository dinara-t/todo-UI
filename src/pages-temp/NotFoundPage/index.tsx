import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function NotFoundPage() {
  return (
    <div className="rounded-2xl bg-gray-input/35 p-8 ring-1 ring-brown/10">
      <h1 className="text-2xl font-semibold text-gray-text">Page not found</h1>
      <p className="mt-2 text-sm text-gray-text/70">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-5">
        <Link to="/todos">
          <Button>Go to Todos</Button>
        </Link>
      </div>
    </div>
  );
}
