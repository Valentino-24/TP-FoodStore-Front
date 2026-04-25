import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Ingrediente } from "../types/ingrediente";

const API_URL = "http://127.0.0.1:8000/ingredientes/";
const QUERY_KEY = ["ingredientes"];

const fetchIngredientes = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener ingredientes");
  return res.json();
};

const createIngrediente = async (data: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear ingrediente");
};

const updateIngrediente = async ({
  id,
  data,
}: {
  id: number;
  data: any;
}) => {
  const res = await fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar ingrediente");
};

const deleteIngrediente = async (id: number) => {
  const res = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar ingrediente");
};

export const useIngrediente = () => {
  const queryClient = useQueryClient();

  const {
    data: ingredientes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchIngredientes,
  });

  const createMutation = useMutation({
    mutationFn: createIngrediente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateIngrediente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIngrediente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    ingredientes: ingredientes ?? [],
    loading: isLoading,
    error: isError,

    handleCreate: createMutation.mutate,
    handleUpdate: (id: number, data: any) =>
      updateMutation.mutate({ id, data }),
    handleDelete: deleteMutation.mutate,
  };
};

export type { Ingrediente };