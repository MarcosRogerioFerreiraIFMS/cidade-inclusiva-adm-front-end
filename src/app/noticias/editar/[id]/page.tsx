'use client'

import { atualizarNoticia, buscarNoticiaPorId } from '@/app/_actions/Noticia'
import { Container } from '@/app/_components/Container'
import { notify } from '@/app/_components/ToastNotifier'
import { Button } from '@/app/_components/ui/button'
import {
  Form,
  FormControl,
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
import { NoticiaCategories } from '@/app/_constants/NoticiaCategories'
import {
  atualizarNoticiaMapper,
  prepararDadosParaEdicao
} from '@/app/_mappers/NoticiaMapper'
import { NoticiaData, NoticiaSchema } from '@/app/_schema/NoticiaSchema'
import { useNoticiasStore } from '@/app/_store/useNoticiasStore'
import { validateImageUrl } from '@/app/_utils/imageUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ImageIcon,
  Loader2Icon,
  SaveIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { use, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const defaultValues = {
  titulo: '',
  conteudo: '',
  url: '',
  dataPublicacao: undefined,
  foto: '',
  categoria: '',
  categoriaCustomizada: ''
}

interface EditarNoticiaPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditarNoticiaPage({ params }: EditarNoticiaPageProps) {
  const { id } = use(params)

  const router = useRouter()

  const { fetchNoticias } = useNoticiasStore()

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  const [isValidatingImage, setIsValidatingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [isFormDirty, setIsFormDirty] = useState(false)

  const form = useForm<NoticiaData>({
    resolver: zodResolver(NoticiaSchema),
    defaultValues
  })

  const carregarNoticia = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setImagePreview(null)
      setIsFormDirty(false)
      setIsValidatingImage(false)

      const { data, error } = await buscarNoticiaPorId(id)

      if (error || !data) {
        setError('Falha ao carregar notícia. Tente novamente.')
        return
      }

      const dadosPreparados = prepararDadosParaEdicao(data)
      form.reset(dadosPreparados)

      if (dadosPreparados.foto) {
        setImagePreview(dadosPreparados.foto)
      }
    } catch (err) {
      setError('Ocorreu um erro ao carregar a notícia')
      console.error('Erro ao carregar notícia:', err)
    } finally {
      setLoading(false)
    }
  }, [id, form])

  useEffect(() => {
    carregarNoticia()
  }, [carregarNoticia])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormDirty) return event.preventDefault()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isFormDirty])

  useEffect(() => {
    const subscription = form.watch((data, { type }) => {
      if ((type as string) !== 'submit') {
        setIsFormDirty(true)
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const handleImageUrlChange = async (url: string) => {
    form.setValue('foto', url)

    if (!url) {
      setImagePreview(null)
      return
    }

    setIsValidatingImage(true)
    try {
      const isValid = await validateImageUrl(url)
      if (isValid) {
        setImagePreview(url)
        form.clearErrors('foto')
      } else {
        setImagePreview(null)
        form.setError('foto', {
          message: 'A imagem não pode ser carregada. Verifique a URL.'
        })
      }
    } catch (error) {
      console.error('Erro ao validar imagem:', error)
      setImagePreview(null)
    } finally {
      setIsValidatingImage(false)
    }
  }

  async function onSubmit(values: z.infer<typeof NoticiaSchema>) {
    if (values.foto) {
      setIsValidatingImage(true)
      try {
        const isValid = await validateImageUrl(values.foto)
        if (!isValid) {
          notify({
            message:
              'A URL da imagem não é válida ou a imagem não pode ser carregada.',
            type: 'error'
          })
          form.setError('foto', {
            message: 'A imagem não pode ser carregada. Verifique a URL.'
          })
          setIsValidatingImage(false)
          return
        }
      } catch (error) {
        console.error('Erro ao validar imagem:', error)
        form.setError('foto', {
          message: 'Erro ao validar a imagem.'
        })
        setIsValidatingImage(false)
        return
      }
      setIsValidatingImage(false)
    }

    try {
      const response = await atualizarNoticia(
        id,
        atualizarNoticiaMapper(values)
      )

      if (!response.success) {
        notify({
          message: 'Erro ao atualizar notícia.',
          type: 'error'
        })
        carregarNoticia()
        fetchNoticias()
        return
      }

      notify({
        message: 'Notícia atualizada com sucesso!',
        type: 'success'
      })

      fetchNoticias()
      router.push('/noticias/listar')
      setIsFormDirty(false)
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error)
      notify({
        message: 'Erro ao atualizar notícia.',
        type: 'error'
      })
      carregarNoticia()
      fetchNoticias()
    }
  }

  const watchCategory = form.watch('categoria')

  if (loading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2Icon className="text-primary h-12 w-12 animate-spin" />
          <p className="mt-4 text-lg">Carregando notícia...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircleIcon size={50} className="text-destructive" />
          <p className="text-destructive mt-4 text-lg">{error}</p>

          <div className="mt-4 space-x-4">
            <Button onClick={() => carregarNoticia()}>Tentar novamente</Button>
            <Button
              variant="outline"
              onClick={() => router.push('/noticias/listar')}
            >
              Voltar para listagem
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="animate-fade-in">
      <h2 className="text-2xl">Editar Notícia</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da Notícia</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o título da notícia"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="conteudo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo da Notícia</FormLabel>
                <FormControl>
                  <Textarea
                    height={120}
                    resize="none"
                    placeholder="Digite o conteúdo detalhado da notícia"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataPublicacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Publicação</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={
                      field.value ? field.value.toISOString().split('T')[0] : ''
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://exemplo.com"
                    disabled={form.formState.isSubmitting}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        type="url"
                        placeholder="https://exemplo.com/imagem.jpg"
                        disabled={
                          form.formState.isSubmitting || isValidatingImage
                        }
                        {...field}
                        onBlur={(e) => {
                          field.onBlur()
                          handleImageUrlChange(e.target.value)
                        }}
                        className="flex-1"
                        value={field.value || ''}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleImageUrlChange(field.value || '')}
                        disabled={
                          form.formState.isSubmitting ||
                          isValidatingImage ||
                          !field.value
                        }
                      >
                        {isValidatingImage ? (
                          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ImageIcon className="mr-2 h-4 w-4" />
                        )}
                        Verificar
                      </Button>
                    </div>
                  </FormControl>

                  {imagePreview && (
                    <div className="mt-2 max-w-sm rounded-md border p-2">
                      <p className="text-muted-foreground mb-1 text-xs">
                        Pré-visualização:
                      </p>

                      <Image
                        src={imagePreview}
                        alt="Pré-visualização"
                        width={500}
                        height={281}
                        className="mx-auto max-h-60 w-80 rounded-lg object-cover"
                      />
                    </div>
                  )}

                  <FormMessage />
                </div>
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
                  value={field.value}
                  defaultValue={field.value}
                  disabled={form.formState.isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {NoticiaCategories.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchCategory === 'Outro' && (
            <FormField
              control={form.control}
              name="categoriaCustomizada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Digite a Categoria</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a categoria personalizada"
                      disabled={form.formState.isSubmitting}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex items-center justify-end space-x-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push('/noticias/listar')}
              disabled={form.formState.isSubmitting || isValidatingImage}
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting || isValidatingImage}
            >
              {form.formState.isSubmitting || isValidatingImage ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SaveIcon className="mr-2 h-4 w-4" />
              )}
              {form.formState.isSubmitting
                ? 'Salvando...'
                : isValidatingImage
                  ? 'Validando imagem...'
                  : 'Salvar alterações'}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}
