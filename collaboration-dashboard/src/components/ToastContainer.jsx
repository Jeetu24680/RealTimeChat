import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { motion } from "framer-motion";

export default function ToastContainer() {
  const notifications = useStore(
    (state) => state.notifications
  );

  const removeNotification =
    useStore(
      (state) =>
        state.removeNotification
    );

  useEffect(() => {
    notifications.forEach((n) => {
      setTimeout(() => {
        removeNotification(n.id);
      }, 3000);
    });
  }, [notifications]);

  return (
    <div className="fixed top-5 right-5 z-50 space-y-2">
      {notifications.map((n) => (
        <motion.div
        key={n.id}
        initial={{
            opacity: 0,
            x: 100,
        }}
        animate={{
            opacity: 1,
            x: 0,
        }}
        exit={{
            opacity: 0,
            x: 100,
        }}
          className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg"
        >
          {n.message}
        </motion.div>
      ))}
    </div>
  );
}