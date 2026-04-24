import { useEffect, useState } from "react";
import type { Producto, ProductoCreate } from "../types/producto";

const API_URL = "http://127.0.0.1:8000/productos/";

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);

  // ========================
  // GET
  // ========================
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error al traer productos:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // CREATE
  // ========================
  const handleCreate = async (data: ProductoCreate) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await fetchProductos();
    } catch (err) {
      console.error("Error al crear producto:", err);
    }
  };

  // ========================
  // UPDATE
  // ========================
  const handleUpdate = async (id: number, data: ProductoCreate) => {
    try {
      await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await fetchProductos();
    } catch (err) {
      console.error("Error al actualizar producto:", err);
    }
  };

  // ========================
  // DELETE
  // ========================
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}${id}`, {
        method: "DELETE",
      });

      await fetchProductos();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  // ========================
  // INIT
  // ========================
  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};