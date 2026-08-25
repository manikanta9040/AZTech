import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { Button } from '../common/Button'

export type ModalVariant = 'danger' | 'warning' | 'success' | 'info' | 'default'

interface AdminModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  variant?: ModalVariant
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void | Promise<void>
  confirmLoading?: boolean
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function AdminModal({
  open,
  onClose,
  title,
  description,
  variant = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  confirmLoading = false,
  children,
  size = 'md',
}: AdminModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const getVariantIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertCircle className="az-admin-modal__icon az-admin-modal__icon--danger" size={24} />
      case 'warning':
        return <AlertTriangle className="az-admin-modal__icon az-admin-modal__icon--warning" size={24} />
      case 'success':
        return <CheckCircle2 className="az-admin-modal__icon az-admin-modal__icon--success" size={24} />
      case 'info':
        return <Info className="az-admin-modal__icon az-admin-modal__icon--info" size={24} />
      default:
        return null
    }
  }

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case 'danger':
        return 'danger'
      case 'success':
        return 'success'
      default:
        return 'primary'
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="az-modal-overlay"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.section
            className={`az-modal az-admin-modal az-modal--${size}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="az-admin-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <header className="az-modal__header">
              <div className="az-admin-modal__title-group">
                {getVariantIcon()}
                <div>
                  <h2 className="az-modal__title" id="az-admin-modal-title">
                    {title}
                  </h2>
                  {description && <p className="az-modal__description">{description}</p>}
                </div>
              </div>
              <button
                type="button"
                className="az-modal__close"
                onClick={onClose}
                aria-label="Close modal dialog"
              >
                <X size={20} />
              </button>
            </header>

            {children && <div className="az-modal__content">{children}</div>}

            <footer className="az-modal__footer">
              <Button variant="ghost" onClick={onClose} disabled={confirmLoading}>
                {cancelLabel}
              </Button>
              {onConfirm && (
                <Button
                  variant={getConfirmButtonVariant()}
                  onClick={onConfirm}
                  loading={confirmLoading}
                >
                  {confirmLabel}
                </Button>
              )}
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
