import { useEffect } from "react";
import ToastContainer from "./components/ToastContainer";
import { Routes, Route } from "react-router-dom";
import CommandPalette from "./components/CommandPalette";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ActivityPanel from "./components/ActivityPanel";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";

import { useStore } from "./store/useStore";

export default function App() {
  const darkMode = useStore(
    (state) => state.darkMode
  );

  const addActivity = useStore(
    (state) => state.addActivity
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
  "Alice updated a task",
  "Bob joined workspace",
  "Charlie completed a task",
  "David commented on a task",
  "Emma moved a task",
];

const randomMessage =
  messages[
    Math.floor(
      Math.random() * messages.length
    )
  ];

addActivity({
  text: randomMessage,
});
    }, 10000);

    return () => clearInterval(interval);
  }, [addActivity]);

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <Sidebar />
      <ToastContainer />
      <CommandPalette />

      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/projects"
                element={<Projects />}
              />

              <Route
                path="/team"
                element={<Team />}
              />
            </Routes>
          </div>

          <ActivityPanel />
        </div>
      </div>
    </div>
  );
}