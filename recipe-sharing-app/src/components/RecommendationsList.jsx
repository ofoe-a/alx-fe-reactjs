import useRecipeStore from './recipeStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RecommendationsList() {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generate = useRecipeStore((s) => s.generateRecommendations);

  // Generate on mount and whenever favorites change
  const favorites = useRecipeStore((s) => s.favorites);
  useEffect(() => { generate(); }, [generate, favorites]);

  if (!recommendations.length) return null;

  return (
    <div style={{ marginTop: 16 }}>
      <h2>Recommended for you</h2>
      <ul>
        {recommendations.map((r) => (
          <li key={r.id}>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}