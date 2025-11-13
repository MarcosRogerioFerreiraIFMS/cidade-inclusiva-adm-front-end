'use client'

import { createProfissional } from '@/app/_actions/profissionalActions'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/_components/ui/select'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import {
  PROFISSIONAL_ESPECIALIDADES,
  getProfissionalEspecialidadeLabel
} from '@/app/_enums/profissionalEnums'
import { useAutoFormat } from '@/app/_hooks/useAutoFormat'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  createProfissionalSchema,
  type ProfissionalCreateDTO
} from '@/app/_schemas/profissionalSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCwIcon, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function ProfissionalAdicionarForm() {
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
  const [isImageValid, setIsImageValid] = useState(false)

  const form = useForm<ProfissionalCreateDTO>({
    resolver: zodResolver(createProfissionalSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      especialidade: undefined,
      foto: ''
    },
    mode: 'onChange'
  })

  const fotoUrl = form.watch('foto') as string | undefined

  async function onSubmit(data: ProfissionalCreateDTO): Promise<void> {
    const dataToSubmit = {
      ...data,
      foto: data.foto || ''
    }

    if (dataToSubmit.foto && !isImageValid && dataToSubmit.foto !== '') {
      form.setError('foto', {
        type: 'manual',
        message: 'A imagem fornecida não é válida ou não pode ser carregada'
      })
      notifyError({
        message: 'Por favor, verifique a URL da imagem antes de continuar'
      })
      return
    }

    startTransition(async () => {
      try {
        const result = await createProfissional(dataToSubmit)

        if (result.success) {
          notifySuccess({ message: 'Profissional criado com sucesso!' })
          router.push(APP_ROUTES.PROFISSIONAL_LISTAR())
        } else {
          const errorMessage =
            result.error ?? 'Ocorreu um erro ao criar o profissional.'

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
            : 'Erro ao criar profissional. Tente novamente.'
        notifyError({ message: errorMessage })
      }
    })
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Informações do Profissional
            </h2>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder="Digite o nome completo"
                      {...createAutoFormatHandler(field, formatTrim)}
                      value={field.value}
                      maxLength={100}
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
                        placeholder="profissional@email.com"
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
              name="especialidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a especialidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROFISSIONAL_ESPECIALIDADES.map((especialidade) => (
                        <SelectItem key={especialidade} value={especialidade}>
                          {getProfissionalEspecialidadeLabel(especialidade)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione a área de atuação do profissional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Foto de Perfil (Opcional)</FormLabel>
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
                    URL da imagem que será exibida no perfil
                  </FormDescription>
                  <FormMessage />

                  <ProfileImagePreview
                    fotoUrl={fotoUrl}
                    onValidationChange={setIsImageValid}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isPending}
              aria-label="Criar novo profissional"
            >
              <SaveIcon aria-hidden="true" />
              {isPending ? 'Criando...' : 'Criar Profissional'}
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
