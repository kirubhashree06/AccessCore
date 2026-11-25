import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '../../utils/helpers'

const icons = {
  success: <CheckCircle size={16} className="text-emerald-500" />,
  error: <XCircle size={16} className="text-red-500" />,
  warning: <AlertTriangle size={16} className="text-amber-500" />,
  info: <Info size={16} className="text-[#6D4AFF]" />,
}

const borders = {
  success: 'border-l-emerald-500',
  error: 'border-l-red-500',
  warning: 'border-l-amber-500',
  info: 'border-l-[#6D4AFF]',
}

function Toast({ id, message, type, onDismiss }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn( 'flex items-start gap-3 px-4 py-3 rounded-xl', 'bg-white ', 'border border-[#EDE8FA] ', 'border-l-4', 'shadow-xl min-w-[280px] max-w-sm', borders[type] )}
    >
      <span className="mt-0.5 shrink-0">{icons[type]}</span>
      <p className="text-sm font-medium text-[#1E293B] flex-1">{message}</p>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 p-0.5 text-slate-400 hover:text-slate-600 rounded transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}

export default function ToastContainer({ toasts, dismiss }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <Toast key={t.id} {...t} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  )
}
