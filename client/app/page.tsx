"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-col justify-center items-center flex-1 text-[10rem]">
                <h1>FlowState</h1>
                <div className=" w-[30rem] h-[10rem] relative">
                    <Image src="/FlowStateLogo.png" alt="" fill />
                </div>
            </div>
        </div>
    );
}
