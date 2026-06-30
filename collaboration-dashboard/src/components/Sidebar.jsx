import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white p-5">

      <h1 className="text-3xl font-bold mb-8">
        CollabBoard
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          className="hover:text-blue-400"
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className="hover:text-blue-400"
          to="/projects"
        >
          Projects
        </Link>

        <Link
          className="hover:text-blue-400"
          to="/team"
        >
          Team
        </Link>

      </div>
    </div>
  );
}