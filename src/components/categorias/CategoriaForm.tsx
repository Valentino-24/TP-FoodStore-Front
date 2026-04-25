import { useEffect, useState } from "react";
import { useCategorias } from "../../hooks/useCategorias";
import type { Categoria } from "../../types/categoria";

type Props = {
  onClose: () => void;
  categoria?: Categoria | null;
};

export default function CategoriaForm({ onClose, categoria }: Props) {
  const { handleCreate, handleUpdate, categorias } = useCategorias();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
      setDescripcion(categoria.descripcion || "");
      setImagenUrl(categoria.imagen_url || "");
      setParentId(categoria.parent_id || null);
    } else {
      setNombre("");
      setDescripcion("");
      setImagenUrl("");
      setParentId(null);
    }
  }, [categoria]);

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      alert("El nombre es requerido");
      return;
    }

    const data = {
      nombre,
      descripcion,
      imagen_url: imagenUrl,
      parent_id: parentId,
    };

    if (categoria) {
      await handleUpdate(categoria.id, data);
    } else {
      await handleCreate(data);
    }

    onClose();
  };

  const categoriasDisponibles = categoria
    ? categorias.filter((c) => c.id !== categoria.id)
    : categorias;

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

      <input
        placeholder="URL de la imagen"
        className="border p-2 w-full mb-2 bg-gray-800 text-white"
        value={imagenUrl}
        onChange={(e) => setImagenUrl(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2 bg-gray-800 text-white"
        value={parentId || ""}
        onChange={(e) =>
          setParentId(e.target.value ? Number(e.target.value) : null)
        }
      >
        <option value="">Sin categoría padre</option>
        {categoriasDisponibles.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-500 px-3 py-1 mt-3 rounded text-white"
      >
        Guardar
      </button>
    </div>
  );
}
