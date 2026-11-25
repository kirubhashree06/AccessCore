/**
 * Merge class names conditionally.
 * Minimal clsx-like utility (no extra package needed).
 */
export function cn(...args) {
  return args
    .flat()
    .filter(Boolean)
    .join(' ')
}

/**
 * Format a date string to a readable format.
 */
export function formatDate(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * Truncate text to a given length.
 */
export function truncate(str, n = 50) {
  if (!str) return ''
  return str.length > n ? str.slice(0, n) + '…' : str
}

/**
 * Generate initials from a name string.
 */
export function initials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Delay helper.
 */
export const sleep = (ms) => new Promise(r => setTimeout(r, ms))
