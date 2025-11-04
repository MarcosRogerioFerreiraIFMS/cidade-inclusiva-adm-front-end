import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { LayoutProvider } from './_components/layout/layout-provider'
import { ThemeProvider } from './_components/ui/theme-provider'
import './globals.css'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${roboto.className} overflow-hidden antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>{children}</LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
