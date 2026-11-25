import { motion } from 'framer-motion'
import { cn } from '../../utils/helpers'

export default function Card({
  children,
  className = '',
  hover = false,
  padding = true,
  onClick,
  ...rest
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -1, boxShadow: '0 8px 24px rgba(109,74,255,0.08)' } : undefined}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={cn( 'rounded-2xl bg-[#FFFFFF] border border-[#EDE8FA]', 'shadow-[0_4px_20px_rgba(109,74,255,0.04)] text-[#1E1B2E]',
        padding && 'p-5',
        hover && 'cursor-pointer hover:border-[#A78BFA] transition-colors',
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)}>
      <div>
        {title && <h3 className="text-sm font-semibold text-[#1E1B2E]">{title}</h3>}
        {subtitle && <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0 ml-3">{action}</div>}
    </div>
  )
}
