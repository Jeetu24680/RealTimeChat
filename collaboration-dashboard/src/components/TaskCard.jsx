import { motion } from "framer-motion";

export default function TaskCard({ task }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="bg-white p-5 rounded-xl shadow-md"
    >
      <h3 className="font-bold">
        {task.title}
      </h3>

      <p className="text-gray-500">
        {task.status}
      </p>
    </motion.div>
  );
}