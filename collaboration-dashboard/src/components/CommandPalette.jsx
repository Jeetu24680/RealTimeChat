import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener(
      "keydown",
      down
    );

    return () =>
      document.removeEventListener(
        "keydown",
        down
      );
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-32 z-50">
      <div className="bg-white w-[600px] rounded-xl shadow-xl p-4">
        <input
          autoFocus
          placeholder="Search commands..."
          className="w-full border p-3 rounded"
        />

        <div className="mt-4 space-y-2">

          <div
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="hover:bg-slate-100 p-2 rounded cursor-pointer"
          >
            Go To Dashboard
          </div>

          <div
            onClick={() => {
              navigate("/projects");
              setOpen(false);
            }}
            className="hover:bg-slate-100 p-2 rounded cursor-pointer"
          >
            Go To Projects
          </div>

          <div
            onClick={() => {
              navigate("/team");
              setOpen(false);
            }}
            className="hover:bg-slate-100 p-2 rounded cursor-pointer"
          >
            Go To Team
          </div>

        </div>
      </div>
    </div>
  );
}