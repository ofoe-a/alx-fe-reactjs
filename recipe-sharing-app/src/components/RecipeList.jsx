import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

export default function RecipeList() {
  const recipes = useRecipeStore((s) => s.filteredRecipes);

  if (!recipes.length) return <p>No recipes found.</p>;

  return (
    <ul>
      {recipes.map((r) => (
        <li key={r.id} style={{ marginBottom: 8 }}>
          <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          {r.description ? (
            <div style={{ opacity: 0.7 }}>{r.description}</div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}