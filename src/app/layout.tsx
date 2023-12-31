import SessionAuthProvider from '@/context/SessionAuthProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Home/Navbar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <SessionAuthProvider>
        <Navbar />
          {children}
          <Toaster position='top-center' />
          </SessionAuthProvider>
        </body>
    </html>
  )
}
