import { useState } from "react";
import { useIngrediente } from "../hooks/useIngrediente";
import IngredienteTable from "../components/ingredientes/IngredienteTable";
import IngredienteModal from "../components/ingredientes/IngredienteModal";
import IngredienteForm from "../components/ingredientes/IngredienteForm";
import type { Ingrediente } from "../types/ingrediente";

export default function IngredientesPage() {
  const {
    ingredientes,
    loading,
    error,
    handleDelete,
  } = useIngrediente();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Ingrediente | null>(null);

  const handleEdit = (ingrediente: Ingrediente) => {
    setSelected(ingrediente);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    const confirmDelete = confirm("¿Seguro que querés eliminar este ingrediente?");
    if (!confirmDelete) return;

    handleDelete(id);
  };

  if (loading) return <p className="p-4">Cargando ingredientes...</p>;
  if (error) return <p className="p-4 text-red-500">Error al cargar ingredientes</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Ingredientes</h1>

      <button
        onClick={() => {
          setSelected(null);
          setModalOpen(true);
        }}
        className="bg-green-500 px-3 py-1 mb-3 rounded text-white hover:bg-green-600"
      >
        Crear Ingrediente
      </button>

      <IngredienteTable
        ingredientes={ingredientes}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <IngredienteModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
      >
        <h2 className="text-xl mb-2 text-white">
          {selected ? "Editar Ingrediente" : "Crear Ingrediente"}
        </h2>

        <IngredienteForm
          onClose={() => {
            setModalOpen(false);
            setSelected(null);
          }}
          ingrediente={selected}
        />
      </IngredienteModal>
    </div>
  );
}