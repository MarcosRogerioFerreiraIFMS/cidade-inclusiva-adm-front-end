'use client'

import { createMotorista } from '@/app/_actions/motoristaActions'
import { ProfileImagePreview } from '@/app/_components/profile-image-preview'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import { useAutoFormat } from '@/app/_hooks/useAutoFormat'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  createMotoristaSchema,
  type MotoristaCreateDTO
} from '@/app/_schemas/motoristaSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCwIcon, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function MotoristaAdicionarForm() {
  const router = useRouter()

  const { notifySuccess, notifyError } = useNotification()
  const {
    formatTrim,
    formatUrl,
    formatTelefone,
    createAutoFormatHandler,
    createOnChangeFormatHandler
  } = useAutoFormat()

  const [isPending, startTransition] = useTransition()
  const [isFotoValid, setIsFotoValid] = useState(false)

  const form = useForm<MotoristaCreateDTO>({
    resolver: zodResolver(createMotoristaSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      foto: ''
    },
    mode: 'onChange'
  })

  const fotoUrl = form.watch('foto') as string | undefined

  async function onSubmit(data: MotoristaCreateDTO): Promise<void> {
    const dataToSubmit = {
      ...data,
      foto: data.foto || ''
    }

    if (dataToSubmit.foto && !isFotoValid && dataToSubmit.foto !== '') {
      form.setError('foto', {
        type: 'manual',
        message: 'A imagem fornecida não é válida ou não pode ser carregada'
      })
      notifyError({
        message: 'Por favor, verifique a URL da foto antes de continuar'
      })
      return
    }

    startTransition(async () => {
      try {
        const result = await createMotorista(dataToSubmit)

        if (result.success) {
          notifySuccess({
            message: 'Motorista criado com sucesso!'
          })
          router.push(APP_ROUTES.MOTORISTA_LISTAR())
        } else {
          const errorMessage =
            result.error ?? 'Ocorreu um erro ao criar o motorista.'

          const lowerErrorMessage = errorMessage.toLowerCase()
          if (lowerErrorMessage.includes('email')) {
            form.setError('email', {
              type: 'manual',
              message: errorMessage
            })
          } else if (lowerErrorMessage.includes('telefone')) {
            form.setError('telefone', {
              type: 'manual',
              message: errorMessage
            })
          }

          notifyError({
            message: errorMessage
          })
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Erro ao criar motorista. Tente novamente.'
        notifyError({ message: errorMessage })
      }
    })
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Informações do Motorista</h2>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Motorista</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder="Digite o nome do motorista"
                      {...createAutoFormatHandler(field, formatTrim)}
                      value={field.value}
                      maxLength={120}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="motorista@email.com"
                        {...createAutoFormatHandler(field, formatTrim)}
                        value={field.value}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        autoComplete="tel"
                        placeholder="(00) 90000-0000"
                        {...createOnChangeFormatHandler(field, formatTelefone)}
                        value={field.value}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>Formato: (00) 90000-0000</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="foto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Foto (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      autoComplete="url"
                      placeholder="https://exemplo.com/foto.jpg"
                      {...createAutoFormatHandler(field, formatUrl)}
                      value={field.value ?? ''}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    URL da imagem do perfil do motorista
                  </FormDescription>
                  <FormMessage />

                  <ProfileImagePreview
                    fotoUrl={fotoUrl}
                    onValidationChange={setIsFotoValid}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 border-t pt-6">
            <Button
              type="submit"
              disabled={isPending}
              aria-label="Criar novo motorista"
            >
              <SaveIcon aria-hidden="true" />
              {isPending ? 'Criando...' : 'Criar Motorista'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isPending}
              aria-label="Resetar formulário ao estado inicial"
            >
              <RotateCwIcon aria-hidden="true" />
              Resetar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
              aria-label="Cancelar e voltar"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
