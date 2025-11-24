'use client'

import { createAcessibilidadeUrbana } from '@/app/_actions/acessibilidadeUrbanaActions'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/_components/ui/select'
import { Textarea } from '@/app/_components/ui/textarea'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import {
  AcessibilidadeUrbanaCategoriasOptions,
  AcessibilidadeUrbanaSimbolosOptions
} from '@/app/_enums/acessibilidadeUrbanaEnums'
import { useAutoFormat } from '@/app/_hooks/useAutoFormat'
import { useCep } from '@/app/_hooks/useCep'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  createAcessibilidadeUrbanaSchema,
  type AcessibilidadeUrbanaCreateDTO
} from '@/app/_schemas/acessibilidadeUrbanaSchema'
import { removeNonDigits } from '@/app/_utils/formatUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircleIcon,
  PlusIcon,
  RotateCwIcon,
  SaveIcon,
  TrashIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function AcessibilidadeUrbanaAdicionarForm() {
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

  const form = useForm<AcessibilidadeUrbanaCreateDTO>({
    resolver: zodResolver(createAcessibilidadeUrbanaSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      categoria: 'OUTROS',
      logo: '',
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
      fotos: [],
      recursos: []
    },
    mode: 'onChange'
  })

  const logoUrl = form.watch('logo') as string | undefined
  const recursosWatch = form.watch('recursos')
  const recursos = useMemo(() => recursosWatch || [], [recursosWatch])

  // Detectar símbolos duplicados
  const simbolosUsados = useMemo(() => {
    return recursos.map((r) => r.simbolo)
  }, [recursos])

  const temDuplicados = useMemo(() => {
    return new Set(simbolosUsados).size !== simbolosUsados.length
  }, [simbolosUsados])

  const getRecursoDuplicado = (index: number): boolean => {
    const simbolo = recursos[index]?.simbolo
    return (
      simbolosUsados.filter((s) => s === simbolo).length > 1 &&
      simbolo !== undefined
    )
  }

  // Símbolos disponíveis para adicionar
  const simbolosDisponiveis = useMemo(() => {
    return AcessibilidadeUrbanaSimbolosOptions.filter(
      (option) => !simbolosUsados.includes(option.value)
    )
  }, [simbolosUsados])

  const temSimbolosDisponiveis = simbolosDisponiveis.length > 0

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

  function handleAddRecurso() {
    if (!temSimbolosDisponiveis) return

    const currentRecursos = form.getValues('recursos') || []
    const primeiroSimboloDisponivel = simbolosDisponiveis[0].value

    form.setValue('recursos', [
      ...currentRecursos,
      { simbolo: primeiroSimboloDisponivel, descricao: '' }
    ])
  }

  function handleRemoveRecurso(index: number) {
    const currentRecursos = form.getValues('recursos') || []
    form.setValue(
      'recursos',
      currentRecursos.filter((_, i) => i !== index)
    )
  }

  async function onSubmit(data: AcessibilidadeUrbanaCreateDTO): Promise<void> {
    const dataToSubmit = {
      ...data,
      logo: data.logo || '',
      fotos: data.fotos || [],
      recursos: data.recursos || [],
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
        const result = await createAcessibilidadeUrbana(dataToSubmit)

        if (result.success) {
          notifySuccess({
            message: 'Acessibilidade urbana criada com sucesso!'
          })
          router.push(APP_ROUTES.ACESSIBILIDADE_URBANA_LISTAR())
        } else {
          const errorMessage =
            result.error ?? 'Ocorreu um erro ao criar a acessibilidade urbana.'

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
            : 'Erro ao criar acessibilidade urbana. Tente novamente.'
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
              Informações da Acessibilidade Urbana
            </h2>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Estabelecimento</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="organization"
                      placeholder="Digite o nome do estabelecimento"
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

            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AcessibilidadeUrbanaCategoriasOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione a categoria do estabelecimento
                  </FormDescription>
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
                        placeholder="estabelecimento@email.com"
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
                    URL da imagem da logo do estabelecimento
                  </FormDescription>
                  <FormMessage />

                  <LogoImagePreview
                    logoUrl={logoUrl}
                    onValidationChange={setIsLogoValid}
                    entityName="Logo do Estabelecimento"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fotos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fotos do Estabelecimento (Opcional)</FormLabel>
                  <FormControl>
                    <MultipleImagesPreview
                      fotosUrls={field.value || []}
                      onFotosChange={(urls) => field.onChange(urls)}
                      onValidationChange={setAreFotosValid}
                      maxImages={20}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione URLs de fotos do estabelecimento (máximo 20)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Recursos de Acessibilidade */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Recursos de Acessibilidade
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddRecurso}
                disabled={isPending || !temSimbolosDisponiveis}
                title={
                  !temSimbolosDisponiveis
                    ? 'Todos os símbolos já foram adicionados'
                    : 'Adicionar novo recurso de acessibilidade'
                }
              >
                <PlusIcon />
                Adicionar Recurso
                {!temSimbolosDisponiveis &&
                  ` (${recursos.length}/${AcessibilidadeUrbanaSimbolosOptions.length})`}
              </Button>
            </div>

            {recursos.length === 0 && (
              <p className="text-muted-foreground text-sm">
                Nenhum recurso de acessibilidade adicionado ainda. Clique em
                &quot;Adicionar Recurso&quot; para começar.
              </p>
            )}

            {temDuplicados && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950">
                <AlertCircleIcon className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Símbolos duplicados detectados
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Você não pode adicionar o mesmo símbolo de acessibilidade
                    mais de uma vez. Por favor, remova ou altere os recursos
                    duplicados.
                  </p>
                </div>
              </div>
            )}

            {recursos.map((_, index) => {
              const isDuplicado = getRecursoDuplicado(index)
              return (
                <Card
                  key={index}
                  className={`p-4 ${
                    isDuplicado
                      ? 'border-red-500 bg-red-50 dark:border-red-800 dark:bg-red-950/30'
                      : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">
                          Recurso {index + 1}
                        </h3>
                        {isDuplicado && (
                          <span className="flex items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900 dark:text-red-200">
                            <AlertCircleIcon className="size-3" />
                            Duplicado
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRecurso(index)}
                        disabled={isPending}
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                    </div>

                    <FormField
                      control={form.control}
                      name={`recursos.${index}.simbolo`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Símbolo de Acessibilidade</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isPending}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={isDuplicado ? 'border-red-500' : ''}
                              >
                                <SelectValue placeholder="Selecione um símbolo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {AcessibilidadeUrbanaSimbolosOptions.filter(
                                (option) =>
                                  option.value === field.value ||
                                  !simbolosUsados.includes(option.value)
                              ).map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {isDuplicado && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                              Este símbolo já foi adicionado em outro recurso
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`recursos.${index}.descricao`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição (Opcional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva detalhes sobre este recurso de acessibilidade..."
                              {...field}
                              value={field.value ?? ''}
                              disabled={isPending}
                              maxLength={500}
                              className="max-h-28 resize-none"
                            />
                          </FormControl>
                          <FormDescription>
                            Máximo de 500 caracteres
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Endereço */}
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
              aria-label="Criar nova acessibilidade urbana"
            >
              <SaveIcon aria-hidden="true" />
              {isPending ? 'Criando...' : 'Criar Acessibilidade Urbana'}
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
