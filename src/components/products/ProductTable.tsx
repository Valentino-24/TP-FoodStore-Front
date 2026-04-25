import { useNavigate } from "react-router-dom";
import type { Producto } from "../../types/producto";

type Props = {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
};

export default function ProductTable({ productos, onEdit, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="p-2">Imagen</th>
          <th className="p-2">Nombre</th>
          <th className="p-2">Precio</th>
          <th className="p-2">Categoría Principal</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {productos.map((producto) => {
          const principal = producto.categorias?.find(
            (c) => c.es_principal
          );

          return (
            <tr key={producto.id} className="border-t text-center">
              <td className="p-2">
                <img
                  src={producto.imagenes || "https://via.placeholder.com/100"}
                  alt={producto.nombre}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              </td>

              <td
                className="p-2 cursor-pointer text-blue-600 hover:underline"
                onClick={() => navigate(`/productos/${producto.id}`)}
              >
                {producto.nombre}
              </td>

              <td className="p-2">${producto.precio_base}</td>

              <td className="p-2">
                {principal ? principal.nombre : "Sin categoría"}
              </td>

              <td className="p-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(producto)}
                    className="bg-blue-500 px-2 py-1 rounded text-white"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(producto.id)}
                    className="bg-red-500 px-2 py-1 rounded text-white"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}