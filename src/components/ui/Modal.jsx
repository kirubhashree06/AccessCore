import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../utils/helpers'

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
}) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={closeOnOverlay ? onClose : undefined}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={cn('relative w-full z-10 rounded-2xl bg-white ', 'border border-[#EDE8FA] ', 'shadow-2xl overflow-hidden', sizes[size])}
          >
            {/* Header */}
            {(title || description) && (
              <div className="flex items-start justify-between p-5 border-b border-[#EDE8FA]">
                <div>
                  {title && (
                    <h2 className="text-base font-bold text-[#1E293B]">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-xs text-slate-500 mt-1">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-[#F4F2FF] transition-colors ml-4 shrink-0"
                  aria-label="Close dialog"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-5 overflow-y-auto max-h-[calc(85vh-130px)] text-sm text-[#1E293B]">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-2 px-5 py-3.5 bg-[#F8FAFC] border-t border-[#EDE8FA]">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
