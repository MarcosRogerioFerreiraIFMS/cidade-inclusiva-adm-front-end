import { deletarNoticia } from '@/app/_actions/Noticia'
import { notify } from '@/app/_components/ToastNotifier'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/app/_components/ui/alert-dialog'
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react'

interface ConfirmDeleteModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  noticiaIdToDelete: string | undefined
  setNoticiaIdToDelete: (id: string | undefined) => void
  deletingId: string | null
  setDeletingId: (id: string | null) => void
  refreshData: () => void
}
export function ConfirmDeleteModal({
  open,
  setOpen,
  noticiaIdToDelete,
  setNoticiaIdToDelete,
  deletingId,
  setDeletingId,
  refreshData
}: ConfirmDeleteModalProps) {
  const handleDelete = async (id: string | undefined) => {
    if (!id) return

    try {
      setDeletingId(id)
      const result = await deletarNoticia(id)

      if (result.success) {
        notify({
          message: 'Notícia excluída com sucesso',
          type: 'success'
        })
      } else {
        notify({
          message: 'Erro ao excluir notícia',
          type: 'error'
        })
      }
    } catch (error) {
      notify({
        message: 'Erro ao excluir notícia.',
        type: 'error'
      })
      console.error(error)
    } finally {
      refreshData()
      setDeletingId(null)
      setOpen(false)
      setNoticiaIdToDelete(undefined)
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Tem certeza de que deseja excluir
            esta notícia?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            <ArrowLeftIcon />
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deletingId === noticiaIdToDelete}
            onClick={() => {
              handleDelete(noticiaIdToDelete)
            }}
          >
            <Trash2Icon />
            {deletingId === noticiaIdToDelete ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
