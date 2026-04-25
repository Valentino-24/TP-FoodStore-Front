export type Categoria = {
  id: number;
  nombre: string;
  es_principal: boolean;
};

export type Producto = {
  id: number;
  nombre: string;
  descripcion?: string;
  precio_base: number;
  imagenes?: string;
  stock_cantidad: number;
  disponible: boolean;

  categorias: {
    id: number;
    nombre: string;
    es_principal: boolean;
  }[];

  ingredientes: {
    id: number;
    nombre: string;
  }[];
};