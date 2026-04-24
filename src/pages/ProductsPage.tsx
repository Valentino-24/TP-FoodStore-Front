import { useEffect, useState } from "react";
import { getProductos } from "../services/productoService";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import type { Producto } from "../types/producto";
import ProductForm from "../components/products/ProductForm";
import { useCategorias } from "../hooks/useCategorias";

export default function ProductsPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Producto | null>(null);
  const { categorias } = useCategorias();

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

console.log("Categorias en ProductsPage:", categorias);

  const handleEdit = (producto: Producto) => {
    setSelected(producto);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log("Eliminar", id);
  };

  return (
    
    <div className="p-4">
      <h1 className="text-3xl mb-4">Productos</h1>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-500 px-3 py-1 mb-3 rounded"
      >
        Crear Producto
      </button>

      <ProductTable
        productos={productos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
      >
        <h2 className="text-xl mb-2">
          {selected ? "Editar Producto" : "Crear Producto"}
        </h2>

        <ProductForm onClose={() => setModalOpen(false)} />
      </ProductModal>
    </div>
  );
}