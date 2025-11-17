'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { loginAction } from '@/app/_actions/authActions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { Input } from '@/app/_components/ui/input'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import { useNotification } from '@/app/_hooks/useNotification'
import { useRateLimit } from '@/app/_hooks/useRateLimit'
import {
  createLoginSchema,
  type LoginCreateDTO
} from '@/app/_schemas/loginSchema'
import {
  AlertTriangleIcon,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
  RotateCwIcon,
  ShieldAlertIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'

export function LoginForm() {
  const router = useRouter()
  const { notifyError } = useNotification()
  const rateLimit = useRateLimit({
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutos
    blockDurationMs: 5 * 60 * 1000 // 5 minutos de bloqueio
  })

  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginCreateDTO>({
    resolver: zodResolver(createLoginSchema),
    defaultValues: { email: '', senha: '' },
    mode: 'onChange'
  })

  const onSubmit = async (data: LoginCreateDTO) => {
    if (rateLimit.isBlocked) {
      notifyError({
        message: `Muitas tentativas de login. Aguarde ${rateLimit.blockedTimeLeft} segundos.`
      })
      return
    }

    startTransition(async () => {
      try {
        const result = await loginAction(data)

        if (result.success) {
          rateLimit.reset()
          router.push(APP_ROUTES.HOME)
        } else {
          rateLimit.recordAttempt()
          notifyError({
            message: result.error ?? 'Erro ao fazer login. Tente novamente.'
          })
        }
      } catch (error) {
        rateLimit.recordAttempt()

        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Erro ao fazer login. Tente novamente.'
        notifyError({ message: errorMessage })
      }
    })
  }

  return (
    <Card className="border-none bg-white/60 shadow-2xl backdrop-blur-xl dark:bg-slate-900/60">
      <CardHeader className="space-y-3 pb-6">
        <div className="flex items-center justify-center gap-2">
          <div className="dark:from-primary dark:to-secondary rounded-full bg-linear-to-br from-blue-600 to-green-500 p-2.5 shadow-lg">
            <LogInIcon className="size-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-center text-3xl font-bold tracking-tight">
          Login Administrativo
        </CardTitle>
        <CardDescription className="text-center text-base">
          Entre com suas credenciais de administrador
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Alerta de Rate Limiting */}
        {rateLimit.isBlocked && (
          <div className="mb-6 rounded-xl border border-red-200 bg-linear-to-br from-red-50 to-red-100/50 p-4 shadow-md dark:border-red-900/50 dark:from-red-950/50 dark:to-red-900/20">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/50">
                <ShieldAlertIcon className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 space-y-1.5">
                <p className="text-sm font-bold text-red-900 dark:text-red-200">
                  Conta temporariamente bloqueada
                </p>
                <p className="text-sm leading-relaxed text-red-800 dark:text-red-300">
                  Você excedeu o número máximo de tentativas de login. Por
                  segurança, aguarde{' '}
                  <span className="font-bold">
                    {rateLimit.blockedTimeLeft} segundos
                  </span>{' '}
                  antes de tentar novamente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Aviso de tentativas restantes */}
        {!rateLimit.isBlocked &&
          rateLimit.remainingAttempts <= 3 &&
          rateLimit.remainingAttempts > 0 && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-linear-to-br from-amber-50 to-yellow-100/50 p-3.5 shadow-sm dark:border-amber-900/50 dark:from-amber-950/50 dark:to-amber-900/20">
              <div className="flex items-center gap-2.5">
                <div className="rounded-full bg-amber-100 p-1.5 dark:bg-amber-900/50">
                  <AlertTriangleIcon className="size-4 text-amber-600 dark:text-amber-400" />
                </div>
                <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                  <span className="font-bold">
                    {rateLimit.remainingAttempts}{' '}
                    {rateLimit.remainingAttempts === 1
                      ? 'tentativa restante'
                      : 'tentativas restantes'}
                  </span>
                  {' antes do bloqueio temporário.'}
                </p>
              </div>
            </div>
          )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu email"
                      type="email"
                      {...field}
                      value={field.value ?? ''}
                      disabled={isPending}
                      autoComplete="email"
                      className="h-11 border-slate-200 bg-white/50 backdrop-blur-sm transition-all focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:focus:bg-slate-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Senha</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        value={field.value ?? ''}
                        disabled={isPending}
                        className="h-11 border-slate-200 bg-white/50 pr-11 backdrop-blur-sm transition-all focus:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:focus:bg-slate-800"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isPending}
                      aria-label={
                        showPassword ? 'Ocultar senha' : 'Mostrar senha'
                      }
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOffIcon
                          className="text-slate-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <EyeIcon
                          className="text-slate-500"
                          aria-hidden="true"
                        />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isPending || rateLimit.isBlocked}
                className="dark:from-primary dark:to-secondary flex-1 bg-linear-to-r from-blue-600 to-green-500 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:scale-100 disabled:opacity-50"
                size="lg"
                aria-label="Fazer login no sistema"
              >
                {isPending ? (
                  <>
                    <RotateCwIcon className="animate-spin" aria-hidden="true" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogInIcon aria-hidden="true" />
                    Entrar
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isPending || rateLimit.isBlocked}
                className="border-slate-200 bg-white/50 backdrop-blur-sm transition-all hover:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800"
                size="lg"
                aria-label="Limpar formulário de login"
              >
                <RotateCwIcon aria-hidden="true" />
                Limpar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
