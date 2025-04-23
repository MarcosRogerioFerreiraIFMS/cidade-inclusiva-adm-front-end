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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ConfirmDeleteModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  noticiaIdToDelete: string
  carregarNoticia: () => Promise<void>
}
export function ConfirmDeleteModal({
  open,
  setOpen,
  noticiaIdToDelete,
  carregarNoticia
}: ConfirmDeleteModalProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string | undefined) => {
    if (!id) return

    setIsDeleting(true)

    try {
      const result = await deletarNoticia(id)

      if (result.success) {
        notify({
          message: 'Notícia excluída com sucesso',
          type: 'success'
        })

        router.push('/noticias/listar')
      } else {
        notify({
          message: 'Erro ao excluir notícia',
          type: 'error'
        })

        carregarNoticia()
      }
    } catch (error) {
      notify({
        message: 'Erro ao excluir notícia.',
        type: 'error'
      })

      console.error(error)
      carregarNoticia()
    } finally {
      setIsDeleting(false)
      setOpen(false)
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
          <AlertDialogCancel
            disabled={isDeleting}
            onClick={() => setOpen(false)}
          >
            <ArrowLeftIcon />
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={() => {
              handleDelete(noticiaIdToDelete)
            }}
          >
            <Trash2Icon />
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
