"use client";
import React, { useState } from "react";
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
const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value.trim());
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value.trim());
    }
    async function handleLogin() {}

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
