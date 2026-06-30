export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <input
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search tasks..."
      className="border p-3 rounded w-full mb-4 bg-white text-black"
    />
  );
}