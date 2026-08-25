import { useContext } from 'react'
import { ToastContext, type ToastContextValue } from '../context/toastContextValue'

const noop = () => {}
const fallbackValue: ToastContextValue = {
  showToast: noop,
  showSuccess: noop,
  showError: noop,
  showInfo: noop,
}

export function useAdminToast(): ToastContextValue {
  const context = useContext(ToastContext)
  return context ?? fallbackValue
}
