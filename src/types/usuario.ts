export type Usuario = {
  id: number;
  email: string;
  nombre: string;
  rol: "admin" | "user";
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  nombre: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
  usuario: Usuario;
};
