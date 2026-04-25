import { useEffect, useState } from "react";
import type { Categoria, CategoriaCreate } from "../types/categoria";

const API_URL = "http://127.0.0.1:8000/categorias/";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

export type { Categoria, CategoriaCreate };