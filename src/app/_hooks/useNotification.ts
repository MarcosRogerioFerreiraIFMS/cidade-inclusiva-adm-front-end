import { toast } from 'sonner'

interface NotifyOptions {
  message: string
}

export function useNotification() {
  const notifySuccess = ({ message }: NotifyOptions) => {
    toast.success(message)
  }

  const notifyWarning = ({ message }: NotifyOptions) => {
    toast.warning(message)
  }

  const notifyError = ({ message }: NotifyOptions) => {
    toast.error(message)
  }

  const notifyInfo = ({ message }: NotifyOptions) => {
    toast(message)
  }

  return { notifySuccess, notifyWarning, notifyError, notifyInfo }
}
