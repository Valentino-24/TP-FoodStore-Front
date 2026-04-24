import { useState } from "react";
import { useProductos } from "../../hooks/useProductos";
import { useCategorias } from "../../hooks/useCategorias";

export default function ProductForm({ onClose }: any) {
    const { handleCreate } = useProductos();
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const { categorias } = useCategorias();
    const [selectedCategorias, setSelectedCategorias] = useState<any[]>([]);


  const handleCategoriaChange = (cat: any) => {
    const exists = selectedCategorias.find((c) => c.id === cat.id);

    if (exists) {
      setSelectedCategorias(selectedCategorias.filter((c) => c.id !== cat.id));
    } else {
      setSelectedCategorias([
        ...selectedCategorias,
        { ...cat, es_principal: false },
      ]);
    }
  };

  const handlePrincipalChange = (id: number) => {
    setSelectedCategorias(
      selectedCategorias.map((c) => ({
        ...c,
        es_principal: c.id === id,
      }))
    );
  };

  const handleSubmit = async () => {
    const data = {
      nombre,
      precio_base: precio,
      descripcion: "",
      stock_cantidad: 1,
      disponible: true,
      categorias: selectedCategorias.map((c) => ({
        id: c.id,
        es_principal: c.es_principal,
      })),
      ingredientes_ids: [],
    };

    await handleCreate(data);
    onClose();
  };

  return (
    <div>
      <input
        placeholder="Nombre"
        className="border p-2 w-full mb-2"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio"
        className="border p-2 w-full mb-2"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
      />

      <h3 className="mt-2">Categorías</h3>

      {categorias.map((cat) => (
        <div key={cat.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleCategoriaChange(cat)}
          />
          <span>{cat.nombre}</span>

          <input
            type="radio"
            name="principal"
            onChange={() => handlePrincipalChange(cat.id)}
          />
          <span>Principal</span>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-500 px-3 py-1 mt-3 rounded"
      >
        Guardar
      </button>
    </div>
  );
}