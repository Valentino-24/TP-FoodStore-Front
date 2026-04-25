import { useState } from "react";
import { useCategorias } from "../hooks/useCategorias";
import CategoriaTable from "../components/categorias/CategoriaTable";
import CategoriaModal from "../components/categorias/CategoriaModal";
import CategoriaForm from "../components/categorias/CategoriaForm";
import type { Categoria } from "../types/categoria";

export default function CategoriasPage() {
  const {
    categorias,
    loading,
    error,
    handleDelete,
  } = useCategorias();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Categoria | null>(null);

  const handleEdit = (categoria: Categoria) => {
    setSelected(categoria);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    const confirmDelete = confirm("¿Seguro que querés eliminar esta categoría?");
    if (!confirmDelete) return;

    handleDelete(id);
  };

  if (loading) return <p className="p-4">Cargando categorías...</p>;
  if (error) return <p className="p-4 text-red-500">Error al cargar categorías</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Categorías</h1>

      <button
        onClick={() => {
          setSelected(null);
          setModalOpen(true);
        }}
        className="bg-green-500 px-3 py-1 mb-3 rounded text-white hover:bg-green-600"
      >
        Crear Categoría
      </button>

      <CategoriaTable
        categorias={categorias}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <CategoriaModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
      >
        <h2 className="text-xl mb-2 text-white">
          {selected ? "Editar Categoría" : "Crear Categoría"}
        </h2>

        <CategoriaForm
          onClose={() => {
            setModalOpen(false);
            setSelected(null);
          }}
          categoria={selected}
        />
      </CategoriaModal>
    </div>
  );
}