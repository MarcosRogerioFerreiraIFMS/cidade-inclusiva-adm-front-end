'use client'

import { createVeiculo } from '@/app/_actions/veiculoActions'
import { MultipleImagesPreview } from '@/app/_components/multiple-images-preview'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
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
import { useAutoFormat } from '@/app/_hooks/useAutoFormat'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  createVeiculoSchema,
  type VeiculoCreateDTO
} from '@/app/_schemas/veiculoSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCwIcon, SaveIcon, XIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

interface VeiculoAdicionarFormProps {
  motoristaId: string
  onClose: () => void
  onSuccess: () => void
}

export function VeiculoAdicionarForm({
  motoristaId,
  onClose,
  onSuccess
}: VeiculoAdicionarFormProps) {
  const { notifySuccess, notifyError } = useNotification()
  const { formatTrim, createAutoFormatHandler } = useAutoFormat()

  const [isPending, startTransition] = useTransition()
  const [areFotosValid, setAreFotosValid] = useState(true)

  const form = useForm<VeiculoCreateDTO>({
    resolver: zodResolver(createVeiculoSchema),
    defaultValues: {
      motoristaId,
      placa: '',
      marca: '',
      modelo: '',
      cor: '',
      fotos: []
    },
    mode: 'onChange'
  })

  async function onSubmit(data: VeiculoCreateDTO): Promise<void> {
    if (!areFotosValid) {
      notifyError({ message: 'Aguarde o carregamento das fotos.' })
      return
    }

    startTransition(async () => {
      const result = await createVeiculo(data)

      if (result.success) {
        notifySuccess({ message: 'Veículo cadastrado com sucesso!' })
        form.reset()
        onSuccess()
        onClose()
      } else {
        notifyError({ message: result.error || 'Erro ao cadastrar veículo.' })
      }
    })
  }

  const handleClose = () => {
    if (!isPending) {
      form.reset()
      onClose()
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Adicionar Veículo</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={isPending}
          >
            <XIcon className="size-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="placa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ABC1234 ou ABC-1234"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value.toUpperCase().trim())
                        }}
                        disabled={isPending}
                        maxLength={8}
                        className="uppercase"
                      />
                    </FormControl>
                    <FormDescription>
                      Formato: ABC1234 ou ABC1D23 (com ou sem hífen)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Branco"
                        {...createAutoFormatHandler(field, formatTrim)}
                        value={field.value}
                        disabled={isPending}
                        maxLength={30}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Toyota"
                        {...createAutoFormatHandler(field, formatTrim)}
                        value={field.value}
                        disabled={isPending}
                        maxLength={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modelo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Corolla"
                        {...createAutoFormatHandler(field, formatTrim)}
                        value={field.value}
                        disabled={isPending}
                        maxLength={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fotos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fotos do Veículo</FormLabel>
                  <FormControl>
                    <MultipleImagesPreview
                      fotosUrls={field.value || []}
                      onFotosChange={(urls: string[]) => {
                        field.onChange(urls)
                      }}
                      onValidationChange={setAreFotosValid}
                      maxImages={20}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione fotos do veículo (opcional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending || !areFotosValid}>
                {isPending ? (
                  <>
                    <RotateCwIcon className="animate-spin" aria-hidden="true" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <SaveIcon aria-hidden="true" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
