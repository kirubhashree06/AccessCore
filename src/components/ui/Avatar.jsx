import { cn, initials } from '../../utils/helpers'

const sizeMap = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-9 w-9 text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-lg',
}

export default function Avatar({ name, src, size = 'md', className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover shrink-0', sizeMap[size], className)}
      />
    )
  }
  return (
    <div
      className={cn( 'rounded-full bg-gradient-to-br from-[#6D4AFF] to-[#5B21B6] text-white font-semibold', 'flex items-center justify-center shrink-0 shadow-xs select-none', sizeMap[size], className )}
      aria-label={name}
    >
      {initials(name)}
    </div>
  )
}
