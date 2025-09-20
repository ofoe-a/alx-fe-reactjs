import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();    
  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => String(r.id) === String(id))
  );

  if (!recipe) {
    return (
      <div style={{ padding: 20 }}>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <Link to=" / ">&larr; Back</Link>
      <h1 style={{ marginTop: 8 }}>{recipe.title}</h1>
      <p style={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</p>

      <h2 style={{ marginTop: 24 }}>Edit</h2>
      <EditRecipeForm recipe={recipe} />

      <div style={{ marginTop: 16 }}>
        <DeleteRecipeButton id={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;