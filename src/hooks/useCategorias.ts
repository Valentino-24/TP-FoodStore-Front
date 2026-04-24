import { useEffect, useState } from "react";

// después lo tipamos mejor, por ahora simple
type Categoria = {
  id: number;
  nombre: string;
};

type CategoriaCreate = {
  nombre: string;
};

const API_URL = "http://127.0.0.1:8000/categorias/";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========================
  // GET
  // ========================
  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error("Error al traer categorías");
      }

      const data = await res.json();
      setCategorias(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // CREATE
  // ========================
  const handleCreate = async (data: CategoriaCreate) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetchCategorias();
      }
    } catch (err) {
      console.error("Error al crear:", err);
    }
  };

  // ========================
  // UPDATE
  // ========================
  const handleUpdate = async (id: number, data: CategoriaCreate) => {
    try {
      const res = await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetchCategorias();
      }
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  // ========================
  // DELETE
  // ========================
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchCategorias();
      }
    } catch (err) {
      console.error("Error al borrar:", err);
    }
  };

  // ========================
  // INIT
  // ========================
  useEffect(() => {
    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};