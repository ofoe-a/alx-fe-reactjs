import useRecipeStore from './recipeStore';

export default function SearchBar() {
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

  function onChange(e) {
    setSearchTerm(e.target.value); // store recomputes filteredRecipes
  }

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      value={searchTerm}
      onChange={onChange}
      style={{ padding: 8, width: '100%', maxWidth: 420, marginBottom: 12 }}
    />
  );
}