import { useStore } from "../store/useStore";

export default function Presence() {
  const users = useStore((state) => state.users);

  return (
    <div className="flex gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-2"
        >
          <span className="w-3 h-3 rounded-full bg-green-500"></span>

          <span className="text-black">{user.name}</span>
        </div>
      ))}
    </div>
  );
}