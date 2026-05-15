import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import ProductsPage from "../pages/ProductsPage";
import CategoriasPage from "../pages/CategoriasPage";
import IngredientesPage from "../pages/IngredientesPage";
import ProductoDetallePage from "../pages/ProductoDetailPage";

import Navbar from "../components/layout/Navbar";

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
]);

export default router;
