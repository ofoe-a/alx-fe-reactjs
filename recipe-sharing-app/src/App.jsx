import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import SearchBar from './components/SearchBar.jsx';

function RecipeDetailsWrapper() {
  const { id } = useParams();
  return <RecipeDetails recipeId={Number(id)} />;
}

export default function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>Recipe Sharing App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AddRecipeForm />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetailsWrapper />} />
          <Route path="*" element={<div>Not found. <Link to="/">Home</Link></div>} />
        </Routes>
      </div>
    </Router>
  );
}