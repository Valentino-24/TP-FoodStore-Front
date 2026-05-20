import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { usuario, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Food Store</h1>

      <div className="flex gap-4 items-center">
        <Link to="/productos" className="hover:underline">
          Productos
        </Link>

        <Link to="/categorias" className="hover:underline">
          Categorías
        </Link>

        <Link to="/ingredientes" className="hover:underline">
          Ingredientes
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-sm text-gray-300">
          {usuario?.nombre}
          {isAdmin && " (Admin)"}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded text-white text-sm hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}