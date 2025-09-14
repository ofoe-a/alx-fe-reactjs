import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import RecipeDetails from './components/RecipeDetails';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipes/:id" element={<RecipeDetailsWrapper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

import { useParams } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';

function RecipeDetailsWrapper() {
  const { id } = useParams();
  return <RecipeDetails recipeId={Number(id)} />;
}