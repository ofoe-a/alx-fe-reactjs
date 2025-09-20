import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton';

export default function RecipeDetails({ recipeId }) {
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === String(recipeId)));
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <h1>{recipe.title} <FavoriteButton id={recipe.id} /></h1>
      {recipe.description ? <p>{recipe.description}</p> : null}
    </div>
  );
}