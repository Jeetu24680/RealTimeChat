import { useStore } from "../store/useStore";
import { motion } from "framer-motion";

export default function AnalyticsCards() {

  const tasks = useStore(
    (state) => state.tasks
  );

  const totalTasks = tasks.length;

  const todo = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inprogress = tasks.filter(
    (task) => task.status === "inprogress"
  ).length;

  const done = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const darkMode = useStore(
  (state) => state.darkMode
);

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
    },
    {
      title: "Todo",
      value: todo,
    },
    {
      title: "In Progress",
      value: inprogress,
    },
    {
      title: "Done",
      value: done,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">

      {cards.map((card) => (
        <motion.div
        key={card.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl p-5 shadow transition-colors duration-300 ${
            darkMode
                ? "bg-slate-800 text-white"
                : "bg-white text-black"
            }`}
        >
          <h3
            className={
                darkMode
                ? "text-slate-300"
                : "text-gray-500"
            }
            >
            {card.title}
          </h3>

          <p className="text-3xl font-bold">
            {card.value}
          </p>
        </motion.div>
      ))}

    </div>
  );
}