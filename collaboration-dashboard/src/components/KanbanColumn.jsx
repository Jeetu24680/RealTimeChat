import { motion } from "framer-motion";
import { useStore } from "../store/useStore";

import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function KanbanColumn({
  title,
  tasks,
  droppableId,
}) {

    const darkMode = useStore(
    (state) => state.darkMode
    );

  return (
    <div
        className={`rounded-xl p-4 shadow transition-colors duration-300 ${
            darkMode
            ? "bg-slate-800"
            : "bg-white"
        }`}
        >

      <h2 className="font-bold text-xl mb-4">
        {title}
      </h2>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <motion.div
            ref={provided.innerRef}
            {...provided.droppableProps}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
            scale: 1.03,
            }}
            className="min-h-[300px]"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 rounded-lg mb-3 shadow ${
                        darkMode
                            ? "bg-slate-700 text-white"
                            : "bg-slate-100 text-black"
                        }`}
                  >
                    {task.title}
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </div>
  );
}