import { useState, type ReactNode } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContext, type ToastMessage, type ToastType } from '../../context/toastContextValue'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      removeToast(id)
    }, 4000)
  }

  const showSuccess = (msg: string) => showToast(msg, 'success')
  const showError = (msg: string) => showToast(msg, 'error')
  const showInfo = (msg: string) => showToast(msg, 'info')

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showInfo }}>
      {children}
      <div className="az-toast-container" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={`az-toast az-toast--${toast.type}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              role="alert"
            >
              {toast.type === 'success' && <CheckCircle2 size={18} className="az-toast__icon" />}
              {toast.type === 'error' && <AlertCircle size={18} className="az-toast__icon" />}
              {toast.type === 'info' && <Info size={18} className="az-toast__icon" />}
              <span className="az-toast__message">{toast.message}</span>
              <button
                type="button"
                className="az-toast__close"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
              >
                <X size={15} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
