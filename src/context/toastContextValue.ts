import { createContext } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
}

export interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
