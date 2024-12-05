"use client";

import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface AuthContextType {
    isAuthenticated: boolean;
    id: string;
    username: string;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface JWTType {
    username: string;
    uid: string;
    iat: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const token = cookies.get("token");
        if (token) {
            const parts = token.split(".");
            if (parts.length === 3) {
                try {
                    const decoded: JWTType = jwtDecode(token);
                    setUsername(decoded.username);
                    setId(decoded.uid);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Token decode error:", error);
                    resetSessionData();
                }
            } else {
                console.error("Invalid token format");
                resetSessionData();
            }
        } else {
            resetSessionData();
        }
    }, []);

    function resetSessionData() {
        cookies.remove("token", { path: "/" });
        setUsername("");
        setId("");
        setIsAuthenticated(false);
    }

    function login(token: string) {
        try {
            const parts = token.split(".");
            console.log("Login token parts:", parts.length);
            if (parts.length === 3) {
                cookies.set("token", token, { path: "/" });
                const decoded: JWTType = jwtDecode(token);
                setUsername(decoded.username);
                setId(decoded.uid);
                setIsAuthenticated(true);
            } else {
                throw new Error("Invalid token format");
            }
        } catch (error) {
            console.error("Token decode error during login:", error);
            resetSessionData();
        }
    }

    function logout() {
        resetSessionData();
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, username, id, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
