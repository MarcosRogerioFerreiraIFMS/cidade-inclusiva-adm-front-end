'use client'

import { updateProfissional } from '@/app/_actions/profissionalActions'
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
import type { ProfissionalResponseDTO } from '@/app/_dtos/response'
import {
  PROFISSIONAL_ESPECIALIDADES,
  ProfissionalEspecialidadesDisplay
} from '@/app/_enums/profissionalEnums'
import { useAutoFormat } from '@/app/_hooks/useAutoFormat'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  updateProfissionalSchema,
  type ProfissionalUpdateDTO
} from '@/app/_schemas/profissionalSchema'
import { formatTelefone } from '@/app/_utils/formatUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCwIcon, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

interface ProfissionalEditarFormProps {
  profissional: ProfissionalResponseDTO
}

export function ProfissionalEditarForm({
  profissional
}: ProfissionalEditarFormProps) {
  const router = useRouter()

  const { notifySuccess, notifyError } = useNotification()
  const {
    formatTrim,
    formatUrl,
    formatTelefone: formatTel,
    createAutoFormatHandler,
    createOnChangeFormatHandler
  } = useAutoFormat()

  const [isPending, startTransition] = useTransition()
  const [isImageValid, setIsImageValid] = useState(false)

  const form = useForm<ProfissionalUpdateDTO>({
    resolver: zodResolver(updateProfissionalSchema),
    defaultValues: {
      nome: profissional.nome,
      email: profissional.email,
      telefone: formatTelefone(profissional.telefone),
      especialidade:
        profissional.especialidade as ProfissionalUpdateDTO['especialidade'],
      foto: profissional.foto?.url || ''
    },
    mode: 'onChange'
  })

  const fotoUrl = form.watch('foto') as string | undefined

  async function onSubmit(data: ProfissionalUpdateDTO): Promise<void> {
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
        const result = await updateProfissional(profissional.id, dataToSubmit)

        if (result.success) {
          notifySuccess({ message: 'Profissional atualizado com sucesso!' })
          router.push(APP_ROUTES.PROFISSIONAL_LISTAR())
        } else {
          const errorMessage =
            result.error ?? 'Ocorreu um erro ao atualizar o profissional.'

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
            : 'Erro ao atualizar profissional. Tente novamente.'
        notifyError({ message: errorMessage })
      }
    })
  }

  return (
    <>
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
                          {...createOnChangeFormatHandler(field, formatTel)}
                          value={field.value}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>
                        Formato: (00) 90000-0000
                      </FormDescription>
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
                            {ProfissionalEspecialidadesDisplay[especialidade]}
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

            <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  aria-label="Salvar alterações do profissional"
                >
                  <SaveIcon aria-hidden="true" />
                  {isPending ? 'Salvando...' : 'Salvar Alterações'}
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
            </div>
          </form>
        </Form>
      </Card>
    </>
  )
}
