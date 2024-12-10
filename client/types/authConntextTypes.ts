import { ReactNode } from "react";
export interface AuthContextType {
    isAuthenticated: boolean;
    id: string;
    username: string;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    addJob: (newJob: JobType) => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface JWTType {
    username: string;
    id: string;
    iat: string;
}

export interface JobType {
    job_title: string;
    company: string;
    date_applied: Date;
    status: string;
}
