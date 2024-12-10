"use client";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginRes } from "@/types/types";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<boolean>(false);
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value.trim());
        setLoginError(false);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value.trim());
        setLoginError(false);
    }
    async function handleLogin() {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((res) => {
                if (res.status === 201) {
                    return res.json();
                } else if (res.status === 404) {
                    setLoginError(true);
                    throw new Error("Invalid username");
                } else if (res.status === 401) {
                    setLoginError(true);
                    throw new Error("Invalid password");
                } else {
                    console.log("Login unsuccessful");
                }
            })
            .then((data: LoginRes) => {
                const token = data.token;
                login(token);
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex justify-center items-center flex-1">
                <Card className="w-[20rem]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="Username"
                            className="mb-[1rem]"
                            id="username"
                            onChange={handleUsernameChange}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                        />
                        {loginError ? (
                            <p className="text-red-700">Invalid credentials</p>
                        ) : (
                            <></>
                        )}
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button onClick={handleLogin}>Login</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Login;
