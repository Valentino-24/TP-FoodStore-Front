import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import ProductsPage from "../pages/ProductsPage";
import CategoriasPage from "../pages/CategoriasPage";
import IngredientesPage from "../pages/IngredientesPage";
import ProductoDetallePage from "../pages/ProductoDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import Navbar from "../components/layout/Navbar";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const Layout = () => (
  <>
    <Navbar />
    <div className="p-4">
      <Outlet />
    </div>
  </>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: (
      <ProtectedRoute />
    ),
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <Navigate to="/productos" /> },
          { path: "/productos", element: <ProductsPage /> },
          { path: "/categorias", element: <CategoriasPage /> },
          { path: "/ingredientes", element: <IngredientesPage /> },
          { path: "/productos/:id", element: <ProductoDetallePage /> },
          { path: "*", element: <p>Página no encontrada</p> },
        ],
      },
    ],
  },
]);

export default router;
