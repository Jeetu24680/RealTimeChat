import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
  tasks: [
    {
      id: "1",
      title: "Design Landing Page",
      status: "todo",
    },
    {
      id: "2",
      title: "Build Dashboard",
      status: "inprogress",
    },
    {
      id: "3",
      title: "Deploy Website",
      status: "done",
    },
  ],

    notifications: [],

  activities: [],

  users: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ],

  darkMode: false,

  history: [],
  future: [],

  toggleTheme: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),

  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now().toString(),
          title,
          status: "todo",
        },
      ],
    })),

  addActivity: (activity) =>
    set((state) => ({
      activities: [
    activity,
    ...state.activities,
        ].slice(0, 50),
    })),

  moveTask: (taskId, newStatus) =>
    set((state) => {
      const previousTasks = [
        ...state.tasks,
      ];

      return {
        history: [
          ...state.history,
          previousTasks,
        ],

        future: [],

        tasks: state.tasks.map(
          (task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: newStatus,
                }
              : task
        ),
      };
    }),

    addNotification: (message) =>
  set((state) => ({
    notifications: [
      ...state.notifications,
      {
        id: Date.now(),
        message,
      },
    ],
  })),

  removeNotification: (id) =>
  set((state) => ({
    notifications:
      state.notifications.filter(
        (n) => n.id !== id
      ),
  })),

  undo: () =>
    set((state) => {
      if (
        state.history.length === 0
      ) {
        return {};
      }

      const previous =
        state.history[
          state.history.length - 1
        ];

      return {
        tasks: previous,

        history:
          state.history.slice(
            0,
            -1
          ),

        future: [
          state.tasks,
          ...state.future,
        ],
      };
    }),

  redo: () =>
    set((state) => {
      if (
        state.future.length === 0
      ) {
        return {};
      }

      const next =
        state.future[0];

      return {
        tasks: next,

        future:
          state.future.slice(1),

        history: [
          ...state.history,
          state.tasks,
        ],
      };
    }),
    }),
    {
      name: "collab-board-storage",
    }
  )
);