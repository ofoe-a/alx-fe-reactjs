import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";
import Login from "./pages/Login";
import BlogPost from "./pages/BlogPost"; //

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/blog/1">Dynamic Blog</Link> 
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

       
        <Route path="/blog/:id" element={<BlogPost />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileDetails />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
      </Routes>
    </BrowserRouter>
  );
}