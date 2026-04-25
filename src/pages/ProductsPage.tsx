import { useState } from "react";
import { useProductos } from "../hooks/useProductos";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import type { Producto } from "../types/producto";
import ProductForm from "../components/products/ProductForm";

export default function ProductsPage() {
  const {
    productos,
    loading,
    error,
    handleDelete,
  } = useProductos();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Producto | null>(null);

  const handleEdit = (producto: Producto) => {
    setSelected(producto);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    const confirmDelete = confirm("¿Seguro que querés eliminar este producto?");
    if (!confirmDelete) return;

    handleDelete(id);
  };

  if (loading) return <p className="p-4">Cargando productos...</p>;
  if (error) return <p className="p-4 text-red-500">Error al cargar productos</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Productos</h1>

      <button
        onClick={() => {
          setSelected(null);
          setModalOpen(true);
        }}
        className="bg-green-500 px-3 py-1 mb-3 rounded text-white"
      >
        Crear Producto
      </button>

      <ProductTable
        productos={productos}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
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

        <ProductForm
          onClose={() => {
            setModalOpen(false);
            setSelected(null);
          }}
          producto={selected}
        />
      </ProductModal>
    </div>
  );
}