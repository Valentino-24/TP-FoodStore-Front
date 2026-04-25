import type { Ingrediente } from "../../types/ingrediente";

type Props = {
  ingredientes: Ingrediente[];
  onEdit: (ingrediente: Ingrediente) => void;
  onDelete: (id: number) => void;
};

export default function IngredienteTable({
  ingredientes,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">¿Es Alergéno?</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {ingredientes.map((ingrediente) => (
            <tr key={ingrediente.id} className="border-t text-center hover:bg-gray-50">
              <td className="p-2 font-semibold text-left">{ingrediente.nombre}</td>

              <td className="p-2 text-left text-sm">
                {ingrediente.descripcion ? (
                  <span className="truncate block max-w-xs">
                    {ingrediente.descripcion}
                  </span>
                ) : (
                  <span className="text-gray-500">Sin descripción</span>
                )}
              </td>

              <td className="p-2">
                {ingrediente.es_alergeno ? (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                     Sí
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    No
                  </span>
                )}
              </td>

              <td className="p-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(ingrediente)}
                    className="bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(ingrediente.id)}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ingredientes.length === 0 && (
        <p className="p-4 text-center text-gray-500">
          No hay ingredientes disponibles
        </p>
      )}
    </div>
  );
}
