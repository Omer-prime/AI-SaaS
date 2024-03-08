import Image from 'next/image';
import React from 'react'
import { LandingNavbar } from '@/components/landing-navbar';
import { ClerkProvider } from '@clerk/nextjs';

const Landingpage = ({children}:{
  children: React.ReactNode
}) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
    <div className="mx-auto max-w-screen-xl h-full"    
    >
         <Image
                src="/logo.png"
                alt=""
                width={30}
                height={0}
                />
 {children}
    </div>

</main>
  )
}

export default Landingpage;