'use client'

import { createManutencao } from '@/app/_actions/manutencaoActions'
import { EspecialidadesSelector } from '@/app/_components/especialidades-selector'
import { LogoImagePreview } from '@/app/_components/logo-image-preview'
import { MultipleImagesPreview } from '@/app/_components/multiple-images-preview'
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
import { ManutencaoEspecialidadesOptions } from '@/app/_enums/manutencaoEnums'
import { useAutoFormat } from '@/app/_hooks/useAutoFormat'
import { useCep } from '@/app/_hooks/useCep'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  createManutencaoSchema,
  type ManutencaoCreateDTO
} from '@/app/_schemas/manutencaoSchema'
import { removeNonDigits } from '@/app/_utils/formatUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCwIcon, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function ManutencaoAdicionarForm() {
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
  const [isLogoValid, setIsLogoValid] = useState(false)
  const [areFotosValid, setAreFotosValid] = useState(true)

  const form = useForm<ManutencaoCreateDTO>({
    resolver: zodResolver(createManutencaoSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      logo: '',
      especialidades: [],
      endereco: {
        logradouro: '',
        numero: '',
        cidade: '',
        bairro: '',
        cep: '',
        estado: '',
        pais: 'Brasil',
        complemento: ''
      },
      fotos: []
    },
    mode: 'onChange'
  })

  const logoUrl = form.watch('logo') as string | undefined

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

        await form.trigger([
          'endereco.logradouro',
          'endereco.bairro',
          'endereco.cidade',
          'endereco.estado'
        ])

        notifySuccess({
          message:
            'Endereço preenchido! Você pode editar os campos se necessário.'
        })
      }
    }
  }

  async function onSubmit(data: ManutencaoCreateDTO): Promise<void> {
    const dataToSubmit = {
      ...data,
      logo: data.logo || '',
      fotos: data.fotos || [],
      endereco: {
        ...data.endereco,
        complemento: data.endereco.complemento || ''
      }
    }

    if (dataToSubmit.logo && !isLogoValid && dataToSubmit.logo !== '') {
      form.setError('logo', {
        type: 'manual',
        message: 'A imagem fornecida não é válida ou não pode ser carregada'
      })
      notifyError({
        message: 'Por favor, verifique a URL da logo antes de continuar'
      })
      return
    }

    if (dataToSubmit.fotos && dataToSubmit.fotos.length > 0 && !areFotosValid) {
      notifyError({
        message:
          'Por favor, verifique se todas as fotos são válidas antes de continuar'
      })
      return
    }

    startTransition(async () => {
      try {
        const result = await createManutencao(dataToSubmit)

        if (result.success) {
          notifySuccess({
            message: 'Oficina de manutenção criada com sucesso!'
          })
          router.push(APP_ROUTES.MANUTENCAO_LISTAR())
        } else {
          const errorMessage =
            result.error ?? 'Ocorreu um erro ao criar a oficina de manutenção.'

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
            : 'Erro ao criar oficina de manutenção. Tente novamente.'
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
              Informações da Oficina de Manutenção
            </h2>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Oficina</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="organization"
                      placeholder="Digite o nome da oficina"
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
                        placeholder="oficina@email.com"
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
              name="especialidades"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidades</FormLabel>
                  <FormDescription>
                    Selecione as especialidades da oficina de manutenção
                  </FormDescription>
                  <FormControl>
                    <EspecialidadesSelector
                      options={ManutencaoEspecialidadesOptions}
                      selectedValues={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Logo (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      autoComplete="url"
                      placeholder="https://exemplo.com/logo.jpg"
                      {...createAutoFormatHandler(field, formatUrl)}
                      value={field.value ?? ''}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    URL da imagem da logo da oficina
                  </FormDescription>
                  <FormMessage />

                  <LogoImagePreview
                    logoUrl={logoUrl}
                    onValidationChange={setIsLogoValid}
                    entityName="Logo da Oficina"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fotos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fotos da Oficina (Opcional)</FormLabel>
                  <FormControl>
                    <MultipleImagesPreview
                      fotosUrls={field.value || []}
                      onFotosChange={(urls) => field.onChange(urls)}
                      onValidationChange={setAreFotosValid}
                      maxImages={20}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione URLs de fotos da oficina (máximo 20)
                  </FormDescription>
                  <FormMessage />
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
                      placeholder="Sala 101"
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

          <div className="flex gap-4 border-t pt-6">
            <Button
              type="submit"
              disabled={isPending}
              aria-label="Criar nova oficina de manutenção"
            >
              <SaveIcon aria-hidden="true" />
              {isPending ? 'Criando...' : 'Criar Oficina'}
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
