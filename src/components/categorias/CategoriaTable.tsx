import type { Categoria } from "../../types/categoria";

type Props = {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
};

export default function CategoriaTable({ categorias, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Imagen</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Categoría Padre</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((categoria) => {
            const categoriaPadre = categorias.find(
              (c) => c.id === categoria.parent_id
            );

            return (
              <tr key={categoria.id} className="border-t text-center hover:bg-gray-50">
                <td className="p-2">
                  <img
                    src={
                      categoria.imagen_url || "https://via.placeholder.com/100"
                    }
                    alt={categoria.nombre}
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>

                <td className="p-2 font-semibold text-left">
                  {categoria.nombre}
                </td>

                <td className="p-2 text-left text-sm">
                  {categoria.descripcion ? (
                    <span className="truncate block max-w-xs">
                      {categoria.descripcion}
                    </span>
                  ) : (
                    <span className="text-gray-500">Sin descripción</span>
                  )}
                </td>

                <td className="p-2 text-sm">
                  {categoriaPadre ? (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {categoriaPadre.nombre} (ID: {categoriaPadre.id})
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>

                <td className="p-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(categoria)}
                      className="bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onDelete(categoria.id)}
                      className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
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

      {categorias.length === 0 && (
        <p className="p-4 text-center text-gray-500">
          No hay categorías disponibles
        </p>
      )}
    </div>
  );
}