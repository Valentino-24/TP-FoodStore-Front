import type { Producto } from "../../types/producto";

export default function ProductCard({ producto }: { producto: Producto }) {
  const categoriaPrincipal = producto.categorias.find(
    (c) => c.es_principal
  );

  return (
    <div className="border p-4 mb-3 rounded">
      <h2 className="text-xl font-semibold">{producto.nombre}</h2>

      <p className="text-gray-400">
        Precio: ${producto.precio_base}
      </p>

      {categoriaPrincipal && (
        <p className="text-yellow-400 font-semibold">
          ⭐ {categoriaPrincipal.nombre}
        </p>
      )}

      <div className="mt-2">
        {producto.categorias.map((c) => (
          <span
            key={c.id}
            className="text-sm bg-gray-700 px-2 py-1 rounded mr-2"
          >
            {c.nombre}
          </span>
        ))}
      </div>
    </div>
  );
}