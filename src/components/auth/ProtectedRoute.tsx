import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p className="p-4">Cargando...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
