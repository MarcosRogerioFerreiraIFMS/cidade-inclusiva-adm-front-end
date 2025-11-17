'use client'

import { updateUsuario } from '@/app/_actions/usuarioActions'
import { FormAlert } from '@/app/_components/form-alert'
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
import type { UsuarioResponseDTO } from '@/app/_dtos/response'
import { useAutoFormat } from '@/app/_hooks/useAutoFormat'
import { useCep } from '@/app/_hooks/useCep'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  updateUsuarioSchema,
  type UsuarioUpdateDTO
} from '@/app/_schemas/usuarioSchema'
import { removeNonDigits } from '@/app/_utils/formatUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, RotateCwIcon, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

interface UsuarioEditarFormProps {
  usuario: UsuarioResponseDTO
}

export function UsuarioEditarForm({ usuario }: UsuarioEditarFormProps) {
  const router = useRouter()

  const { notifySuccess, notifyError } = useNotification()
  const {
    formatTrim,
    formatUrl,
    formatTelefone,
    formatCEP,
    formatEstado,
    createAutoFormatHandler,
    createOnChangeFormatHandler
  } = useAutoFormat()
  const { loading: loadingCep, buscarCep } = useCep()

  const [isPending, startTransition] = useTransition()
  const [isImageValid, setIsImageValid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<UsuarioUpdateDTO>({
    resolver: zodResolver(updateUsuarioSchema),
    defaultValues: {
      nome: usuario.nome,
      email: usuario.email,
      telefone: formatTelefone(usuario.telefone),
      senha: '',
      foto: usuario.foto?.url || '',
      endereco: {
        logradouro: usuario.endereco?.logradouro || '',
        numero: usuario.endereco?.numero || '',
        cidade: usuario.endereco?.cidade || '',
        bairro: usuario.endereco?.bairro || '',
        cep: formatCEP(usuario.endereco?.cep || ''),
        estado: usuario.endereco?.estado || '',
        pais: usuario.endereco?.pais || 'Brasil',
        complemento: usuario.endereco?.complemento || ''
      }
    },
    mode: 'onChange'
  })

  const fotoUrl = form.watch('foto') as string | undefined

  async function handleCepChange(cep: string): Promise<void> {
    const cepLimpo = removeNonDigits(cep)

    if (cepLimpo.length === 8) {
      const cepData = await buscarCep(cepLimpo)

      if (cepData) {
        if (cepData.logradouro) {
          form.setValue('endereco.logradouro', cepData.logradouro)
        }
        if (cepData.bairro) {
          form.setValue('endereco.bairro', cepData.bairro)
        }
        if (cepData.cidade) {
          form.setValue('endereco.cidade', cepData.cidade)
        }
        if (cepData.estado) {
          form.setValue('endereco.estado', cepData.estado)
        }

        notifySuccess({
          message:
            'Endereço preenchido! Você pode editar os campos se necessário.'
        })
      }
    }
  }

  async function onSubmit(data: UsuarioUpdateDTO): Promise<void> {
    const dataToSubmit = {
      ...data,
      foto: data.foto || '',
      senha: data.senha || undefined,
      endereco: {
        ...data.endereco,
        complemento: data.endereco.complemento || ''
      }
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
        const result = await updateUsuario(usuario.id, dataToSubmit)

        if (result.success) {
          notifySuccess({ message: 'Usuário atualizado com sucesso!' })
          router.push(APP_ROUTES.USUARIO_LISTAR())
        } else {
          const errorMessage =
            result.error ?? 'Ocorreu um erro ao atualizar o usuário.'

          // Marcar campo específico com erro de duplicação
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
            : 'Erro ao atualizar usuário. Tente novamente.'
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
              <h2 className="text-lg font-semibold">Informações Pessoais</h2>

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
                          placeholder="usuario@email.com"
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
                          {...createOnChangeFormatHandler(
                            field,
                            formatTelefone
                          )}
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
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha (Opcional)</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="Deixe em branco para manter a atual"
                          {...field}
                          disabled={isPending}
                          className="pr-10"
                          maxLength={128}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                        tabIndex={-1}
                        aria-label={
                          showPassword ? 'Ocultar senha' : 'Mostrar senha'
                        }
                      >
                        {showPassword ? (
                          <EyeOffIcon
                            className="text-muted-foreground h-4 w-4"
                            aria-hidden="true"
                          />
                        ) : (
                          <EyeIcon
                            className="text-muted-foreground h-4 w-4"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    </div>
                    <FormDescription>
                      Preencha apenas se deseja alterar a senha
                    </FormDescription>
                    {field.value && field.value.length > 0 && (
                      <FormAlert
                        variant="warning"
                        title="Atenção: Nova senha será definida"
                        description="Após salvar, o usuário deverá usar esta nova senha para fazer login no sistema."
                      />
                    )}
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

            <div className="space-y-4 border-t pt-6">
              <h2 className="text-lg font-semibold">Endereço</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="endereco.cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="postal-code"
                          placeholder="00000-000"
                          {...createOnChangeFormatHandler(field, formatCEP)}
                          value={field.value}
                          disabled={isPending || loadingCep}
                          onBlur={(e) => {
                            field.onBlur()
                            handleCepChange(e.target.value)
                          }}
                        />
                      </FormControl>
                      {loadingCep && (
                        <FormDescription className="animate-pulse">
                          Buscando endereço...
                        </FormDescription>
                      )}
                      {!loadingCep && (
                        <FormDescription>
                          O endereço será preenchido automaticamente
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco.estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado (UF)</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="address-level1"
                          placeholder="SP"
                          maxLength={2}
                          {...createOnChangeFormatHandler(field, formatEstado)}
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
                  name="endereco.pais"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="country-name"
                          placeholder="Brasil"
                          {...createAutoFormatHandler(field, formatTrim)}
                          value={field.value}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="endereco.cidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="address-level2"
                          placeholder="São Paulo"
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
                  name="endereco.bairro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="address-level3"
                          placeholder="Centro"
                          {...createAutoFormatHandler(field, formatTrim)}
                          value={field.value}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="md:col-span-3">
                  <FormField
                    control={form.control}
                    name="endereco.logradouro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logradouro</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="street-address"
                            placeholder="Rua das Flores"
                            {...createAutoFormatHandler(field, formatTrim)}
                            value={field.value}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="endereco.numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="123"
                          {...createAutoFormatHandler(field, formatTrim)}
                          value={field.value}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="endereco.complemento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Apartamento 101"
                        {...createAutoFormatHandler(field, formatTrim)}
                        value={field.value ?? ''}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  aria-label="Salvar alterações do usuário"
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
