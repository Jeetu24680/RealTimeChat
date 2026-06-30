import Presence from "./Presence";
import { useStore } from "../store/useStore";
import ThemeToggle from "./ThemeToggle";
import NetworkStatus from "./NetworkStatus";


export default function Header() {
    const darkMode = useStore(
      (state) => state.darkMode
    );
  return (
    <div
        className={`border-b p-4 flex justify-between items-center transition-colors duration-300 ${
            darkMode
            ? "bg-slate-800"
            : "bg-white"
        }`}
        >

      <Presence />

      <div className="flex gap-3 items-center">
        <NetworkStatus />
        <ThemeToggle />
        </div>

    </div>
  );
}