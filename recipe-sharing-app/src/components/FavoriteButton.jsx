import useRecipeStore from './recipeStore';

export default function FavoriteButton({ id }) {
  const favorites = useRecipeStore((s) => s.favorites);
  const addFavorite = useRecipeStore((s) => s.addFavorite);
  const removeFavorite = useRecipeStore((s) => s.removeFavorite);

  const isFav = favorites.includes(id);
  const onClick = () => (isFav ? removeFavorite(id) : addFavorite(id));

  return (
    <button onClick={onClick} style={{ marginLeft: 8 }}>
      {isFav ? '★ Unfavorite' : '☆ Favorite'}
    </button>
  );
}