import React from "react";
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
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            id="password"
                        />
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button className="rounded-[2rem] px-[1.5rem]">
                            Signup
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Signup;
