import type { Producto } from "../../types/producto";

type Props = {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
};

export default function ProductTable({ productos, onEdit, onDelete }: Props) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-800">
          <th className="p-2">Nombre</th>
          <th className="p-2">Precio</th>
          <th className="p-2">Principal</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {productos.map((p) => {
          const principal = p.categorias.find((c) => c.es_principal);

          return (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">${p.precio_base}</td>
              <td className="p-2">
                {principal ? "⭐ " + principal.nombre : "-"}
              </td>
              <td className="p-2">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-blue-500 px-2 py-1 mr-2 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDelete(p.id)}
                  className="bg-red-500 px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}