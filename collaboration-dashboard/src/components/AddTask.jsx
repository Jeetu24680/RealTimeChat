import { useState } from "react";
import { useStore } from "../store/useStore";

export default function AddTask() {
  const [title, setTitle] = useState("");

  const addTask = useStore(
    (state) => state.addTask
  );

  const darkMode = useStore(
  (state) => state.darkMode
);

  const addNotification = useStore(
  (state) => state.addNotification
);

  const addActivity = useStore(
    (state) => state.addActivity
  );

  const handleSubmit = () => {
    if (!title.trim()) return;

    addNotification(
  "Task created successfully"
);

    addTask(title);

    addActivity({
      text: `Created task "${title}"`,
    });

    setTitle("");
  };

  return (
    <div
        className={`p-4 rounded-xl shadow mb-6 transition-colors duration-300 ${
            darkMode
            ? "bg-slate-800"
            : "bg-white"
        }`}
        >

      <h2 className="font-bold text-xl mb-3">
        Add Task
      </h2>

      <div className="flex gap-2">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter task title"
          className={`border p-2 rounded flex-1 ${
            darkMode
                ? "bg-slate-700 text-white border-slate-600"
                : "bg-white text-black"
            }`}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Create
        </button>

      </div>

    </div>
  );
}