"use client"

import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Montserrat } from "next/font/google"
import LandingLayout from "@/app/(landingpage)/LandingLayout"

const font = Montserrat({
    weight:"600",
    subsets:["latin"],
});

export const LandingNavbar = ()=>{
    const {isSignedIn} = useAuth();

return(
    <>
    <LandingLayout children/>
            <nav  className="p-4 bg-transparent flex items-center 
            justify-between">
            <Link  href="/" className="flex items-center ">
            <div  className="relative h-8 w-8 mr-4">

                <Image
                src="/logo.png"
                alt=""
                fill
                />


            </div>
            
            
            
            </Link>




            </nav>


            </>

)}