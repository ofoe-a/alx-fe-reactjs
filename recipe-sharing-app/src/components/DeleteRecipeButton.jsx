import useRecipeStore from '../recipeStore';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);

  return (
    <button onClick={() => deleteRecipe(id)} style={{ color: 'red' }}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;