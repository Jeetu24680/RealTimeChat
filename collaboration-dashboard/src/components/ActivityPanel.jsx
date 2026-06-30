import { useStore } from "../store/useStore";

export default function ActivityPanel() {
  const activities = useStore(
    (state) => state.activities
  );

  const darkMode = useStore(
    (state) => state.darkMode
  );

  return (
    <div
        className={`w-72 border-l p-4 flex flex-col h-full overflow-hidden transition-colors duration-300 ${
            darkMode
            ? "bg-slate-800"
            : "bg-white"
        }`}
        >
      <h2 className="font-bold text-xl mb-4">
        Activity Feed
      </h2>

      <div
        className="flex-1 overflow-y-auto pr-1"
        style={{
            maxHeight: "calc(100vh - 120px)",
        }}
        >
        {activities.length === 0 && (
          <p>No activity yet.</p>
        )}

        {activities.map((activity, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              darkMode
                ? "bg-slate-700 text-white"
                : "bg-slate-100 text-black"
            }`}
          >
            {activity.text}
          </div>
        ))}
      </div>
    </div>
  );
}