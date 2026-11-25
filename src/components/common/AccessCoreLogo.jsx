import { cn } from '../../utils/helpers'

export default function AccessCoreLogo({
  className = '',
  size = 'md',
  showText = false,
  theme = 'light',
  collapsed = false,
}) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const textSizeMap = {
    xs: 'text-xs font-bold tracking-tight',
    sm: 'text-sm font-extrabold tracking-tight',
    md: 'text-base font-extrabold tracking-tight',
    lg: 'text-xl font-black tracking-tight',
    xl: 'text-2xl font-black tracking-tight',
  }

  const sizeClass = sizeMap[size] || sizeMap.md
  const isDark = theme === 'dark'

  return (
    <div
      className={cn('inline-flex items-center gap-2.5 transition-all duration-150 shrink-0', className)}
    >
      <img
        src="/assets/images/accesscore-logo.svg"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = '/accesscore-logo.png'
        }}
        alt="ACCESSCORE Core Diamond Logo"
        className={cn('object-contain select-none shrink-0 drop-shadow-xs', sizeClass)}
      />
      {showText && !collapsed && (
        <span className={cn('whitespace-nowrap select-none', isDark ? 'text-white' : 'text-[#11111B]', textSizeMap[size] || 'text-base font-extrabold tracking-tight')}>
          ACCESS<span className={isDark ? 'text-[#A78BFA]' : 'text-[#6D4AFF]'}>CORE</span>
        </span>
      )}
    </div>
  )
}
