'use client'

import { criarNoticia } from '@/app/_actions/NoticiaActions'
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
import { criarNoticiaMapper } from '@/app/_mappers/NoticiaMapper'
import { NoticiaData, NoticiaSchema } from '@/app/_schema/NoticiaSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeftIcon, Trash2Icon, UploadIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const categorias = [
  { id: 'noticia', nome: 'Notícia' },
  { id: 'evento', nome: 'Evento' },
  { id: 'outro', nome: 'Outro' }
] as const

const defaultValues = {
  titulo: '',
  conteudo: '',
  url: '',
  dataPublicacao: undefined,
  foto: '',
  categoria: '',
  categoriaCustomizada: ''
}

export default function FullForm() {
  const form = useForm<NoticiaData>({
    resolver: zodResolver(NoticiaSchema),
    defaultValues
  })

  async function onSubmit(values: z.infer<typeof NoticiaSchema>) {
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

      form.reset(defaultValues)
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
      notify({
        message: 'Erro ao criar notícia.',
        type: 'error'
      })
    }
  }

  const watchCategory = form.watch('categoria')

  return (
    <Container>
      <h2 className="mb-5 text-2xl">Adicione uma nova Notícia</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-250 space-y-4"
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
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
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
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchCategory === 'outro' && (
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
              onClick={() => history.back()}
              disabled={form.formState.isSubmitting}
            >
              <ArrowLeftIcon />
              Cancelar
            </Button>

            <Button
              variant="destructive"
              type="button"
              onClick={() => form.reset(defaultValues)}
              disabled={form.formState.isSubmitting}
            >
              <Trash2Icon />
              Limpar
            </Button>
            <Button
              variant="secondary"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              <UploadIcon />
              Publicar
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}
