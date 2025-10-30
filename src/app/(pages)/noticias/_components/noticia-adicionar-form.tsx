'use client'

import { createNoticia } from '@/app/_actions/noticiaActions'
import { FormImagePreview } from '@/app/_components/form-image-preview'
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
import {
  NOTICIA_CATEGORIES,
  NoticiaCategoriasDisplay
} from '@/app/_enums/noticiaEnums'
import { useAutoFormat } from '@/app/_hooks/useAutoFormat'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  createNoticiaSchema,
  type NoticiaCreateDTO
} from '@/app/_schemas/noticiaSchema'
import { formatDateToLocalDatetime } from '@/app/_utils/dateUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCwIcon, SaveIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function NoticiaAdicionarForm() {
  const router = useRouter()

  const { notifySuccess, notifyError } = useNotification()
  const { formatTrim, formatUrl, formatContent, createAutoFormatHandler } =
    useAutoFormat()

  const [isPending, startTransition] = useTransition()
  const [isImageValid, setIsImageValid] = useState(false)

  const form = useForm<NoticiaCreateDTO>({
    resolver: zodResolver(createNoticiaSchema),
    defaultValues: {
      titulo: '',
      conteudo: '',
      categoria: '',
      dataPublicacao: new Date(),
      url: '',
      foto: ''
    },
    mode: 'onChange'
  })

  const fotoUrl = form.watch('foto') as string | undefined

  async function onSubmit(data: NoticiaCreateDTO) {
    if (data.foto && !isImageValid) {
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
        const result = await createNoticia(data)

        if (result.success) {
          notifySuccess({ message: 'Notícia criada com sucesso!' })
          router.push('/noticias/listar')
        } else {
          notifyError({
            message: result.error ?? 'Ocorreu um erro desconhecido.'
          })
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Erro ao criar notícia. Tente novamente.'
        notifyError({ message: errorMessage })
      }
    })
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o título da notícia"
                    {...createAutoFormatHandler(field, formatTrim)}
                    value={field.value ?? ''}
                    maxLength={100}
                    disabled={isPending}
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
                <FormLabel>Conteúdo</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite o conteúdo da notícia"
                    className="max-h-[400px] min-h-[200px] resize-y"
                    {...createAutoFormatHandler(field, formatContent)}
                    value={field.value ?? ''}
                    disabled={isPending}
                    maxLength={5000}
                    minLength={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ''}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {NOTICIA_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {NoticiaCategoriasDisplay[category]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      disabled={isPending}
                      max={formatDateToLocalDatetime(new Date())}
                      value={
                        field.value
                          ? formatDateToLocalDatetime(field.value)
                          : ''
                      }
                      onChange={(e) => {
                        if (!e.target.value) {
                          field.onChange(new Date())
                          return
                        }

                        const selectedDate = new Date(e.target.value)
                        const now = new Date()

                        if (selectedDate > now) {
                          field.onChange(now)
                          e.target.value = formatDateToLocalDatetime(now)
                        } else {
                          field.onChange(selectedDate)
                        }
                      }}
                    />
                  </FormControl>
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
                    placeholder="https://exemplo.com/foto.jpg"
                    {...createAutoFormatHandler(field, formatUrl)}
                    value={field.value ?? ''}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  URL da imagem que será exibida na notícia. Deve terminar com
                  uma extensão válida (.jpg, .png, .webp, etc.)
                </FormDescription>
                <FormMessage />

                <FormImagePreview
                  fotoUrl={fotoUrl}
                  onValidationChange={setIsImageValid}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Externo (Opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://exemplo.com/noticia"
                    {...createAutoFormatHandler(field, formatUrl)}
                    value={field.value ?? ''}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Link para fonte externa ou mais informações
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isPending}>
              <SaveIcon />
              {isPending ? 'Criando...' : 'Criar Notícia'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isPending}
            >
              <RotateCwIcon />
              Resetar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
