import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
    user: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    // Simulasi pemanggilan API Login
    const login = async (email: string, password: string) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                // Dummy validasi (bisa disesuaikan nanti jika ada API betulan)
                if (email === "test@yukkos.com" && password === "123456") {
                    setUser("User Yukkos");
                    resolve();
                } else {
                    reject(new Error("Email atau password salah!"));
                }
            }, 1000); // Simulasi loading 1 detik
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth harus digunakan di dalam AuthProvider");
    return context;
};