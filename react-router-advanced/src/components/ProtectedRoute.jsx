import { Navigate } from "react-router-dom";

function useAuth() {
  const user = { loggedIn: true };
  return user && user.loggedIn;
}

export default function ProtectedRoute({ isAuthenticated, children }) {
  const auth = useAuth();
  if (!auth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}