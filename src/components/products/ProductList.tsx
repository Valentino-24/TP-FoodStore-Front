import ProductCard from "./ProductCard";
import type { Producto } from "../../types/producto";

export default function ProductList({ productos }: { productos: Producto[] }) {
  if (productos.length === 0) {
    return <p>No hay productos</p>;
  }

  return (
    <div>
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  );
}