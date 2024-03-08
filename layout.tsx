import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ModalProvider } from '@/components/modal-provider'
import { ClerkProvider } from '@clerk/nextjs'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gen X',
  description: 'AI platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en">
      <body className={inter.className}>
       <ModalProvider/>
        {children}
        
        </body>
    </html>

   
    </ClerkProvider>
    
  )
}
