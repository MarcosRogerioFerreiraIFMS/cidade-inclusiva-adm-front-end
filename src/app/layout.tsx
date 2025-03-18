import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Header } from './_components/Header'
import './globals.css'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Cidade Inclusiva - Painel Administrativo',
  description: 'Painel administrativo do projeto Cidade Inclusiva'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
