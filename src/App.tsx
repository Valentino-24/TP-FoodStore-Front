import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import CategoriasPage from "./pages/CategoriasPage";
import IngredientesPage from "./pages/IngredientesPage";
import ProductoDetallePage from "./pages/ProductoDetailPage";

import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/productos" />} />

          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/ingredientes" element={<IngredientesPage />} />

          <Route path="/productos/:id" element={<ProductoDetallePage />} />

          <Route path="*" element={<p>Página no encontrada</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;