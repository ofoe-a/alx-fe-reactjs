import { create } from 'zustand';


const useRecipeStore = create((set) => ({
 
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',

  
  favorites: [],           
  recommendations: [],     

  
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      return {
        recipes,
        filteredRecipes: applyFilter(recipes, state.searchTerm),
      };
    }),

  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: applyFilter(recipes, state.searchTerm),
    })),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      return {
        recipes,
        filteredRecipes: applyFilter(recipes, state.searchTerm),
        favorites: state.favorites.filter((fid) => fid !== id), 
      };
    }),

  updateRecipe: (id, data) =>
    set((state) => {
      const recipes = state.recipes.map((r) =>
        r.id === id ? { ...r, ...data } : r
      );
      return {
        recipes,
        filteredRecipes: applyFilter(recipes, state.searchTerm),
      };
    }),

 
  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: applyFilter(state.recipes, term),
    })),

  
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

 
  generateRecommendations: () =>
    set((state) => {
      
      const favoriteTitles = state.recipes
        .filter((r) => state.favorites.includes(r.id))
        .map((r) => r.title?.toLowerCase() || '');

      const notFavs = state.recipes.filter((r) => !state.favorites.includes(r.id));

      let recommended = notFavs.filter((r) => {
        const t = (r.title || '').toLowerCase();
        return favoriteTitles.some((ft) => ft && t.split(/\s+/).some((w) => ft.includes(w)));
      });

      if (recommended.length === 0) {
        
        recommended = shuffle(notFavs).slice(0, 3);
      }
      return { recommendations: recommended };
    }),
}));


function applyFilter(recipes, term) {
  if (!term) return recipes;
  const q = term.toLowerCase();
  return recipes.filter(
    (r) =>
      (r.title && r.title.toLowerCase().includes(q)) ||
      (r.description && r.description.toLowerCase().includes(q))
  );
}
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default useRecipeStore;