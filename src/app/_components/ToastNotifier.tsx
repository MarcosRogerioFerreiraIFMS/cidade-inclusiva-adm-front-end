'use client'

import { toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ToastType = 'success' | 'error' | 'info' | 'warning'

type ToastProps = {
  message: string
  type?: ToastType
  options?: ToastOptions
}

export function ToastNotifier() {
  return (
    <ToastContainer
      containerId="main-toast"
      position="top-right"
      draggable
      closeButton={false}
      autoClose={6000}
      style={{ zIndex: 9999 }}
      toastStyle={{
        position: 'fixed',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Roboto, sans-serif'
      }}
    />
  )
}

export function notify({ message, type = 'info', options }: ToastProps) {
  toast[type](message, {
    containerId: 'main-toast',
    ...options
  })
}
