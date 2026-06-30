import { useState } from "react";

import AnalyticsCards from "../components/AnalyticsCards";

import HistoryControls from "../components/HistoryControls";

import AddTask from "../components/AddTask";
import SearchBar from "../components/SearchBar";

import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "../components/KanbanColumn";

import { useStore } from "../store/useStore";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const addNotification = useStore(
  (state) => state.addNotification
);

  const tasks = useStore(
    (state) => state.tasks
  );

  const moveTask = useStore(
    (state) => state.moveTask
  );

  const addActivity = useStore(
    (state) => state.addActivity
  );

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;

    const newStatus =
      result.destination.droppableId;

    moveTask(taskId, newStatus);

    addNotification(
  `Task moved to ${newStatus}`
);

    addActivity({
      text: `Task moved to ${newStatus}`,
    });
  };

  const todo = filteredTasks.filter(
    (task) => task.status === "todo"
  );

  const inprogress = filteredTasks.filter(
    (task) => task.status === "inprogress"
  );

  const done = filteredTasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">
        Kanban Dashboard
      </h1>
      <AnalyticsCards />
        <HistoryControls />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <AddTask />

      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <KanbanColumn
            title="Todo"
            tasks={todo}
            droppableId="todo"
          />

          <KanbanColumn
            title="In Progress"
            tasks={inprogress}
            droppableId="inprogress"
          />

          <KanbanColumn
            title="Done"
            tasks={done}
            droppableId="done"
          />
        </div>
      </DragDropContext>
    </div>
  );
}