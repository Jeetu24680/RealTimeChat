import { useEffect, useState } from "react";

export default function NetworkStatus() {
  const [online, setOnline] = useState(
    navigator.onLine
  );

  useEffect(() => {
    const handleOnline = () =>
      setOnline(true);

    const handleOffline = () =>
      setOnline(false);

    window.addEventListener(
      "online",
      handleOnline
    );

    window.addEventListener(
      "offline",
      handleOffline
    );

    return () => {
      window.removeEventListener(
        "online",
        handleOnline
      );

      window.removeEventListener(
        "offline",
        handleOffline
      );
    };
  }, []);

  return (
    <div
      className={`px-4 py-2 rounded-lg text-white font-semibold ${
        online
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      {online
        ? "🟢 Online"
        : "🔴 Offline"}
    </div>
  );
}