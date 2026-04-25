import { useEffect, useState } from "react";
import { useIngrediente } from "../../hooks/useIngrediente";
import type { Ingrediente } from "../../types/ingrediente";

type Props = {
  onClose: () => void;
  ingrediente?: Ingrediente | null;
};

export default function IngredienteForm({ onClose, ingrediente }: Props) {
  const { handleCreate, handleUpdate } = useIngrediente();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [esAlergeno, setEsAlergeno] = useState(false);

  useEffect(() => {
    if (ingrediente) {
      setNombre(ingrediente.nombre);
      setDescripcion(ingrediente.descripcion || "");
      setEsAlergeno(ingrediente.es_alergeno || false);
    } else {
      setNombre("");
      setDescripcion("");
      setEsAlergeno(false);
    }
  }, [ingrediente]);

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      alert("El nombre es requerido");
      return;
    }

    const data = {
      nombre,
      descripcion,
      es_alergeno: esAlergeno,
    };

    if (ingrediente) {
      handleUpdate(ingrediente.id, data);
    } else {
      handleCreate(data);
    }

    onClose();
  };

  return (
    <div>
      <input
        placeholder="Nombre"
        className="border p-2 w-full mb-2 bg-gray-800 text-white"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        className="border p-2 w-full mb-2 bg-gray-800 text-white"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={3}
      />

      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          id="esAlergeno"
          checked={esAlergeno}
          onChange={(e) => setEsAlergeno(e.target.checked)}
          className="cursor-pointer"
        />
        <label htmlFor="esAlergeno" className="cursor-pointer text-white">
          Es alergéno
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 px-3 py-1 mt-3 rounded text-white"
      >
        Guardar
      </button>
    </div>
  );
}
