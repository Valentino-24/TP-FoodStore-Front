import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold">Food Store</h1>

      <div className="flex gap-4">
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
    </nav>
  );
}