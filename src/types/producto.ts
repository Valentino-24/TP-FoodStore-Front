export type Categoria = {
  id: number;
  nombre: string;
  es_principal: boolean;
};

export type Producto = {
  id: number;
  nombre: string;
  precio_base: number;
  categorias: Categoria[];
};