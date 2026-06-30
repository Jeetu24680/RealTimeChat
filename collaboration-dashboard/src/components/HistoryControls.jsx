import { useStore } from "../store/useStore";
import { useEffect } from "react";

export default function HistoryControls() {

  const undo = useStore(
    (state) => state.undo
  );

  const redo = useStore(
    (state) => state.redo
  );

  useEffect(() => {

  const handleKeys = (e) => {

    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      undo();
    }

    if (e.ctrlKey && e.key === "y") {
      e.preventDefault();
      redo();
    }

  };

  window.addEventListener(
    "keydown",
    handleKeys
  );

  return () =>
    window.removeEventListener(
      "keydown",
      handleKeys
    );

}, [undo, redo]);

  return (
    <div className="flex gap-3 mb-4">

      <button
        onClick={undo}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Undo
      </button>

      <button
        onClick={redo}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Redo
      </button>

    </div>
  );
}