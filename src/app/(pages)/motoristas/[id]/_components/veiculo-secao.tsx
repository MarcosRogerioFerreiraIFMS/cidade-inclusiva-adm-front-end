'use client'

import { deleteVeiculo } from '@/app/_actions/veiculoActions'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import type { MotoristaResponseDTO } from '@/app/_dtos/response'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import { CarIcon, EditIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { VeiculoAdicionarForm } from './veiculo-adicionar-form'
import { VeiculoDeletarModal } from './veiculo-deletar-modal'
import { VeiculoEditarForm } from './veiculo-editar-form'

interface VeiculoSecaoProps {
  motorista: MotoristaResponseDTO
}

export function VeiculoSecao({ motorista }: VeiculoSecaoProps) {
  const router = useRouter()
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const veiculo = motorista.veiculo

  const handleDelete = () => {
    if (!veiculo) return

    openModal(
      veiculo.id,
      async () => {
        const result = await deleteVeiculo(veiculo.id, motorista.id)
        if (result.success) {
          router.refresh()
        }
        return result
      },
      'Veículo deletado com sucesso!'
    )
  }

  const handleSuccess = () => {
    router.refresh()
  }

  // Caso não tenha veículo e não esteja mostrando o formulário
  if (!veiculo && !showAddForm) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CarIcon className="size-5" aria-hidden="true" />
              Veículo
            </CardTitle>
            <Button onClick={() => setShowAddForm(true)}>
              <PlusIcon aria-hidden="true" />
              Adicionar Veículo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground py-8 text-center">
            Nenhum veículo cadastrado
          </p>
        </CardContent>
      </Card>
    )
  }

  // Formulário de adicionar
  if (!veiculo && showAddForm) {
    return (
      <VeiculoAdicionarForm
        motoristaId={motorista.id}
        onClose={() => setShowAddForm(false)}
        onSuccess={handleSuccess}
      />
    )
  }

  // Formulário de editar
  if (veiculo && showEditForm) {
    return (
      <VeiculoEditarForm
        veiculoId={veiculo.id}
        motoristaId={motorista.id}
        veiculo={veiculo}
        onClose={() => setShowEditForm(false)}
        onSuccess={handleSuccess}
      />
    )
  }

  // Exibição do veículo
  if (!veiculo) {
    return null
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CarIcon className="size-5" aria-hidden="true" />
              Veículo
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowEditForm(true)}>
                <EditIcon aria-hidden="true" />
                Editar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2Icon aria-hidden="true" />
                Deletar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Placa</p>
              <p className="text-lg font-medium">{veiculo.placa}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Cor</p>
              <p className="font-medium">{veiculo.cor}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Marca</p>
              <p className="font-medium">{veiculo.marca}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Modelo
              </p>
              <p className="font-medium">{veiculo.modelo}</p>
            </div>
          </div>

          {veiculo.fotos && veiculo.fotos.length > 0 && (
            <div className="pt-4">
              <h4 className="mb-3 text-sm font-medium">Fotos do Veículo</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {veiculo.fotos.map((foto) => (
                  <div
                    key={foto.id}
                    className="relative aspect-square overflow-hidden rounded-md"
                  >
                    <Image
                      src={foto.url}
                      alt={`Foto do veículo ${veiculo.marca} ${veiculo.modelo}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <VeiculoDeletarModal
        veiculo={veiculo}
        isOpen={isOpen}
        onCancel={closeModal}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </>
  )
}
