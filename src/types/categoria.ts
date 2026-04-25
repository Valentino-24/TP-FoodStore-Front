export type Categoria = {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen_url?: string;
  parent_id?: number | null;
};
export type CategoriaCreate = {
  nombre: string;
  descripcion?: string;
  imagen_url?: string;
  parent_id?: number | null;
};
