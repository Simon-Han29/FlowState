"use client";
import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

const Signup = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value.trim());
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value.trim());
    }
    async function handleSignup() {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, {
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
                    console.log("Successfully created account");
                } else if (res.status === 409) {
                    console.log("Account with username already exists");
                } else {
                    console.log("Something went wrong with the server");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex justify-center items-center flex-1">
                <Card className="w-[20rem]">
                    <CardHeader>
                        <CardTitle>Create an Account</CardTitle>
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
                        <Button
                            className="rounded-[2rem] px-[1.5rem]"
                            onClick={handleSignup}
                        >
                            Signup
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Signup;
