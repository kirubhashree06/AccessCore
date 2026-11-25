import { cn } from '../../utils/helpers'

const colorMap = {
  purple: 'bg-[#F4F2FF] text-[#6D4AFF] border border-[#DDD6FE]',
  violet: 'bg-[#F4F2FF] text-[#6D4AFF] border border-[#DDD6FE]',
  blue: 'bg-[#F4F2FF] text-[#6D4AFF] border border-[#DDD6FE]',
  navy: 'bg-[#181824] text-[#A78BFA] border border-[#2D2A3E]',
  indigo: 'bg-[#F4F2FF] text-[#6D4AFF] border border-[#DDD6FE]',
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border border-amber-200',
  red: 'bg-red-50 text-red-700 border border-red-200',
  slate: 'bg-slate-100 text-slate-700 border border-slate-200',
}

export default function Badge({ children, color = 'purple', className = '', dot = false }) {
  return (
    <span
      className={cn( 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold select-none', colorMap[color] || colorMap.purple, className )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      )}
      {children}
    </span>
  )
}
