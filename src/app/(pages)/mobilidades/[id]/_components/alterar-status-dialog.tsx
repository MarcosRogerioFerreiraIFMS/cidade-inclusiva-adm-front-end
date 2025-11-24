'use client'

import { updateMobilidadeStatusAction } from '@/app/_actions/mobilidadeActions'
import { FormAlert } from '@/app/_components/form-alert'
import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/_components/ui/dialog'
import { Label } from '@/app/_components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/_components/ui/select'
import {
  getMobilidadeStatusLabel,
  MOBILIDADE_STATUS,
  type MobilidadeStatus
} from '@/app/_enums/mobilidadeEnums'
import { useNotification } from '@/app/_hooks/useNotification'
import { RefreshCwIcon } from 'lucide-react'
import { useState } from 'react'

interface AlterarStatusDialogProps {
  mobilidadeId: string
  currentStatus: MobilidadeStatus
}

export function AlterarStatusDialog({
  mobilidadeId,
  currentStatus
}: AlterarStatusDialogProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<MobilidadeStatus>(currentStatus)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { notifySuccess, notifyError } = useNotification()

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      setOpen(newOpen)
      if (!newOpen) {
        setStatus(currentStatus)
        setError(null)
      }
    }
  }

  const handleConfirm = async () => {
    if (status === currentStatus) {
      setError('Selecione um status diferente do atual.')
      return
    }

    setIsLoading(true)
    setError(null)

    const result = await updateMobilidadeStatusAction(mobilidadeId, { status })

    setIsLoading(false)

    if (result.success) {
      notifySuccess({
        message: 'Status atualizado com sucesso!'
      })
      setOpen(false)
    } else {
      const errorMessage = result.error || 'Erro ao atualizar status.'
      setError(errorMessage)
      notifyError({ message: errorMessage })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <RefreshCwIcon aria-hidden="true" />
          <span>Alterar Status</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar Status da Ocorrência</DialogTitle>
          <DialogDescription>
            Selecione o novo status para esta ocorrência de mobilidade.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value: MobilidadeStatus) => setStatus(value)}
              disabled={isLoading}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                {MOBILIDADE_STATUS.map((statusOption) => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {getMobilidadeStatusLabel(statusOption)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <FormAlert variant="error" title="Erro" description={error} />
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? 'Atualizando...' : 'Atualizar Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
