import { LoginForm } from '@/app/_components/auth/login-form'
import { AccessibilityIcon } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Cidade Inclusiva',
  description: 'Entre no sistema administrativo da Cidade Inclusiva'
}

export default async function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Elementos decorativos de fundo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/10 absolute -top-20 -left-20 h-96 w-96 animate-pulse rounded-full blur-3xl" />
        <div className="bg-secondary/10 absolute -right-20 -bottom-20 h-96 w-96 animate-pulse rounded-full blur-3xl delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-400/5 blur-3xl delay-500" />
      </div>

      {/* Grid Pattern de fundo */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />

      <div className="relative z-10 grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Seção de Branding */}
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="space-y-10 text-center">
            {/* Título e Descrição */}
            <div className="space-y-6">
              <h1 className="dark:from-primary dark:to-secondary bg-linear-to-r from-blue-600 via-blue-500 to-green-500 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent drop-shadow-sm dark:via-blue-600">
                Cidade Inclusiva
              </h1>
              <div className="space-y-3">
                <p className="text-3xl font-semibold text-slate-900 dark:text-slate-300">
                  Sistema Administrativo
                </p>
                <p className="mx-auto max-w-lg text-lg leading-relaxed text-slate-800 dark:text-slate-400">
                  Plataforma de gestão administrativa para promover
                  acessibilidade e inclusão urbana com excelência.
                </p>
              </div>
            </div>

            {/* Indicadores de Segurança */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="group flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800/80">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-300">
                  Sistema Seguro
                </span>
              </div>
              <div className="group flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800/80">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-300">
                  Acesso Administrativo
                </span>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="space-y-1 rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white dark:bg-slate-800/40 dark:hover:bg-slate-800/60">
                <p className="dark:text-primary text-3xl font-bold text-blue-600">
                  100%
                </p>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-400">
                  Seguro
                </p>
              </div>
              <div className="space-y-1 rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white dark:bg-slate-800/40 dark:hover:bg-slate-800/60">
                <p className="dark:text-secondary text-3xl font-bold text-green-400">
                  24/7
                </p>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-400">
                  Disponível
                </p>
              </div>
              <div className="space-y-1 rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white dark:bg-slate-800/40 dark:hover:bg-slate-800/60">
                <p className="flex items-center justify-center text-blue-600">
                  <AccessibilityIcon className="h-8 w-8" />
                </p>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-400">
                  Acessível
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção do Formulário */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
