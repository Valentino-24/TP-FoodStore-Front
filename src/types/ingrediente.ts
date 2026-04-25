export type Ingrediente = {
  id: number;
  nombre: string;
  descripcion?: string;
  es_alergeno: boolean;
};
export type IngredienteCreate = {
  nombre: string;
  descripcion?: string;
  es_alergeno: boolean;
};
