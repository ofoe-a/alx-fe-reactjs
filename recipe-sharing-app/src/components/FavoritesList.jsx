import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

export default function FavoritesList() {
  const recipes = useRecipeStore((s) => s.recipes);
  const favorites = useRecipeStore((s) => s.favorites);
  const favRecipes = favorites
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  if (!favRecipes.length) return <p>No favorites yet.</p>;

  return (
    <div>
      <h2>My Favorites</h2>
      <ul>
        {favRecipes.map((r) => (
          <li key={r.id}>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}