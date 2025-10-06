import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams(); // get recipe id from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedRecipe = data.find((item) => item.id === Number(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error loading recipe:", error));
  }, [id]);

  if (!recipe) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Loading recipe details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back link */}
      <Link
        to="/"
        className="inline-block mb-6 text-blue-600 hover:underline font-medium"
      >
        ← Back to Recipes
      </Link>

      {/* Recipe details card */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {recipe.title}
          </h1>
          <p className="text-gray-700 leading-relaxed">{recipe.summary}</p>

          {/* Mock ingredients & instructions */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Cooking Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-1">
              <li>Step 1: Prepare ingredients.</li>
              <li>Step 2: Cook according to instructions.</li>
              <li>Step 3: Serve and enjoy!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}