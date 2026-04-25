import { useEffect, useState } from "react";
import { useProductos } from "../../hooks/useProductos";
import { useCategorias } from "../../hooks/useCategorias";


export default function ProductForm({ onClose, producto }: any) {
    const { handleCreate, handleUpdate } = useProductos();
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const { categorias } = useCategorias();
    const [selectedCategorias, setSelectedCategorias] = useState<any[]>([]);
    const [imagen, setImagen] = useState("");


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

useEffect(() => {
  if (producto) {
    setNombre(producto.nombre);
    setPrecio(producto.precio_base);
    setImagen(producto.imagenes || "");

    setSelectedCategorias(
      producto.categorias.map((c: any) => ({
        id: c.id,
        nombre: c.nombre,
        es_principal: c.es_principal,
      }))
    );
  } else {
    setNombre("");
    setPrecio(0);
    setImagen("");
    setSelectedCategorias([]);
  }

}, [producto]);
  const handlePrincipalChange = (id: number) => {
    setSelectedCategorias(
      selectedCategorias.map((c) => ({
        ...c,
        es_principal: c.id === id,
      }))
    );
  };

  const handleSubmit = async () => {
    if (selectedCategorias.length === 0) {
      alert("Debes seleccionar al menos una categoría");
      return;
    }

    const principal = selectedCategorias.filter(c => c.es_principal);
    if (principal.length !== 1) {
      alert("Debe haber una sola categoría principal");
      return;
    }

    const data = {
      nombre,
      precio_base: precio,
      descripcion: "",
      imagenes: imagen,
      stock_cantidad: 1,
      disponible: true,
      categorias: selectedCategorias.map((c) => ({
        id: c.id,
        es_principal: c.es_principal,
      })),
      ingredientes_ids: [],
    };

    if (producto) {
      await handleUpdate(producto.id, data);
    } else {
      await handleCreate(data);
    }

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
            checked={selectedCategorias.some(c => c.id === cat.id)}
            onChange={() => handleCategoriaChange(cat)}
          />
          <span>{cat.nombre}</span>

          <input
            type="radio"
            name="principal"
            checked={selectedCategorias.find(c => c.id === cat.id)?.es_principal || false}
            disabled={!selectedCategorias.some(c => c.id === cat.id)}
            onChange={() => handlePrincipalChange(cat.id)}
          />
          <span>Principal</span>
        </div>
      ))}

      <input
        placeholder="URL de la imagen"
        className="border p-2 w-full mb-2"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 px-3 py-1 mt-3 rounded"
      >
        Guardar
      </button>
    </div>
  );
}