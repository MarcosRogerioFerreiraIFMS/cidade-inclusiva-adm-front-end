'use client'

import { criarNoticia } from '@/app/_actions/Noticia'
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
import { criarNoticiaMapper } from '@/app/_mappers/NoticiaMapper'
import { NoticiaSchema } from '@/app/_schema/NoticiaSchema'
import { formatDate } from '@/app/_utils/formatDate'
import { validateImageUrl } from '@/app/_utils/imageUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeftIcon,
  ImageIcon,
  Loader2Icon,
  Trash2Icon,
  UploadIcon
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const defaultValues = {
  titulo: '',
  conteudo: '',
  url: '',
  dataPublicacao: new Date(),
  foto: '',
  categoria: '',
  categoriaCustomizada: ''
}

export default function FullForm() {
  const form = useForm({
    resolver: zodResolver(NoticiaSchema),
    defaultValues
  })

  const router = useRouter()

  const [isValidatingImage, setIsValidatingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isFormDirty, setIsFormDirty] = useState(false)

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
    }
    setIsValidatingImage(false)

    try {
      const response = await criarNoticia(criarNoticiaMapper(values))

      if (!response || response.error) {
        notify({
          message: 'Erro ao criar notícia.',
          type: 'error'
        })
        return
      }

      notify({
        message: 'Notícia criada com sucesso!',
        type: 'success'
      })

      setImagePreview(null)
      form.reset(defaultValues)
      setIsFormDirty(false)
      router.push('/noticias/listar')
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
      notify({
        message: 'Erro ao criar notícia.',
        type: 'error'
      })
    }
  }

  const handleImageUrlChange = async (url: string) => {
    form.setValue('foto', url)

    if (!url) {
      setImagePreview(null)
      return
    }

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
    }
  }

  const watchCategory = form.watch('categoria')

  return (
    <Container className="animate-fade-in">
      <h2 className="text-2xl">Adicione uma nova Notícia</h2>
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
                    onBlur={(e) => {
                      field.onChange(e.target.value.trim().replace(/\s+/g, ' '))
                    }}
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
                    onBlur={(e) => {
                      const value = e.target.value
                      const newValue = value
                        .split('\n')
                        .map((line) => line.trim().replace(/\s+/g, ' '))
                        .join('\n')

                      field.onChange(newValue)
                    }}
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
                    type="datetime-local"
                    value={formatDate(field.value)}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value)
                      if (isNaN(selectedDate.getTime())) {
                        form.setError('dataPublicacao', {
                          message:
                            'Data inválida. Por favor, insira uma data válida.'
                        })
                      } else {
                        form.clearErrors('dataPublicacao')
                        field.onChange(selectedDate)
                      }
                    }}
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
                    onChange={(e) => {
                      field.onChange(e.target.value.trim())
                    }}
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
                        onChange={(e) => {
                          field.onChange(e.target.value.trim())
                        }}
                        onBlur={(e) => {
                          field.onBlur()
                          handleImageUrlChange(e.target.value)
                        }}
                        className="flex-1"
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
                          <ImageIcon />
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
              onClick={() => {
                form.reset(defaultValues)
                setImagePreview(null)
                setIsFormDirty(false)
                router.push('/noticias/listar')
              }}
              disabled={form.formState.isSubmitting || isValidatingImage}
            >
              <ArrowLeftIcon />
              Cancelar
            </Button>

            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                form.reset(defaultValues)
                setImagePreview(null)
                setIsFormDirty(false)
              }}
              disabled={form.formState.isSubmitting || isValidatingImage}
            >
              <Trash2Icon />
              Limpar
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || isValidatingImage}
            >
              {form.formState.isSubmitting || isValidatingImage ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UploadIcon />
              )}
              {form.formState.isSubmitting
                ? 'Publicando...'
                : isValidatingImage
                  ? 'Validando imagem...'
                  : 'Publicar'}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}
