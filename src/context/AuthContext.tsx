import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Usuario, TokenResponse } from "../types/usuario";
import { loginUser, registerUser, getMe } from "../services/authService";

type AuthContextType = {
  usuario: Usuario | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nombre: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    getMe(token)
      .then((u) => setUsuario(u))
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUsuario(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (email: string, password: string) => {
    const data: TokenResponse = await loginUser(email, password);
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
    setUsuario(data.usuario);
  };

  const register = async (email: string, password: string, nombre: string) => {
    const data: TokenResponse = await registerUser(email, password, nombre);
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
    setUsuario(data.usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!usuario,
        isAdmin: usuario?.rol === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
