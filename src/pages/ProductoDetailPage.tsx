import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://127.0.0.1:8000/productos/";

export default function ProductoDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: producto,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["producto", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}${id}`);
      if (!res.ok) throw new Error("Error al obtener producto");
      return res.json();
    },
  });

  if (isLoading) return <p className="p-4">Cargando producto...</p>;
  if (isError) return <p className="p-4 text-red-500">Error al cargar producto</p>;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/productos")}
        className="mb-4 bg-gray-500 text-white px-3 py-1 rounded"
      >
        Volver
      </button>

      <h1 className="text-3xl mb-4">Detalle del Producto</h1>

      <div className="border p-4 rounded shadow-md max-w-md">
        <img
          src={producto.imagenes || "https://via.placeholder.com/300"}
          alt={producto.nombre}
          className="w-full h-48 object-cover mb-3 rounded"
        />

        <h2 className="text-xl font-bold">{producto.nombre}</h2>
        <p className="text-gray-600 mb-2">{producto.descripcion}</p>

        <p className="mb-1">
          <strong>Precio:</strong> ${producto.precio_base}
        </p>

        <p className="mb-2">
          <strong>Stock:</strong> {producto.stock_cantidad}
        </p>

        <div className="mb-2">
          <strong>Categorías:</strong>
          <ul className="list-disc ml-5">
            {producto.categorias.map((c: any) => (
              <li key={c.id}>
                {c.nombre} {c.es_principal && "(Principal)"}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Ingredientes:</strong>
          <ul className="list-disc ml-5">
            {producto.ingredientes.map((i: any) => (
              <li key={i.id}>{i.nombre}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}