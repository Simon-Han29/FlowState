"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import {
    AuthContextType,
    AuthProviderProps,
    JWTType,
    JobType,
} from "@/types/authConntextTypes";

const cookies = new Cookies();
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const token = cookies.get("token");
        if (token) {
            const parts = token.split(".");
            if (parts.length === 3) {
                try {
                    const decoded: JWTType = jwtDecode(token);
                    setUsername(decoded.username);
                    setId(decoded.id);
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
        setLoading(false);
    }, []);

    function resetSessionData() {
        cookies.remove("token", { path: "/" });
        setUsername("");
        setId("");
        setIsAuthenticated(false);
        setLoading(false);
    }

    function login(token: string) {
        try {
            const parts = token.split(".");
            console.log("Login token parts:", parts.length);
            if (parts.length === 3) {
                cookies.set("token", token, { path: "/" });
                const decoded: JWTType = jwtDecode(token);
                setUsername(decoded.username);
                setId(decoded.id);
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

    async function addJob(newJob: JobType) {
        try {
            fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${id}/job_applications`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newJob),
                }
            ).then((res) => {
                if (res.status === 201) {
                    console.log("Job Added Successfully");
                } else {
                    console.log("Something went wrong when adding the job");
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                username,
                id,
                loading,
                login,
                logout,
                addJob,
            }}
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
