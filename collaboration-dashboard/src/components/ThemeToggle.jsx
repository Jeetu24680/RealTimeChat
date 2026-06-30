import { useStore } from "../store/useStore";

export default function ThemeToggle() {
  const darkMode = useStore(
    (state) => state.darkMode
  );

  const toggleTheme = useStore(
    (state) => state.toggleTheme
  );

  return (
    <button
      onClick={toggleTheme}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}