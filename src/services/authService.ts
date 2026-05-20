const API_URL = "http://127.0.0.1:8000/auth";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Error al iniciar sesión");
  }

  return res.json();
};

export const registerUser = async (
  email: string,
  password: string,
  nombre: string
) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, nombre }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Error al registrarse");
  }

  return res.json();
};

export const getMe = async (token: string) => {
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Sesión expirada");
  return res.json();
};
