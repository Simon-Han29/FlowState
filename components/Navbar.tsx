import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
const Navbar = () => {
    return (
        <div className="flex justify-between px-[4rem] py-[1rem] font-bold text-[1.1rem]">
            <div>
                <Link href="/">
                    <p>FlowState</p>
                </Link>
            </div>
            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/my_applications">
                                My Applications
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div>
                <Button className="mx-4">
                    <Link href="/login">Login</Link>
                </Button>
                <Button className="mx-4">
                    <Link href="/signup">Signup</Link>
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
