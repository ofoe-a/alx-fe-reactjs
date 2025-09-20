import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',

  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: applyFilter(updatedRecipes, state.searchTerm),
      };
    }),

  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: applyFilter(recipes, state.searchTerm),
    })),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((r) => r.id !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: applyFilter(updatedRecipes, state.searchTerm),
      };
    }),

  updateRecipe: (id, updatedData) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((r) =>
        r.id === id ? { ...r, ...updatedData } : r
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: applyFilter(updatedRecipes, state.searchTerm),
      };
    }),

  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: applyFilter(state.recipes, term),
    })),
}));

function applyFilter(recipes, term) {
  if (!term) return recipes;
  const lower = term.toLowerCase();
  return recipes.filter(
    (r) =>
      (r.title && r.title.toLowerCase().includes(lower)) ||
      (r.description && r.description.toLowerCase().includes(lower))
  );
}

export default useRecipeStore;