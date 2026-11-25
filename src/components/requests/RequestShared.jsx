// Shared sub-components for the Requests module
import { cn } from '../../utils/helpers'
import Badge from '../ui/Badge'
import { PRIORITY_COLOR, STATUS_COLOR } from '../../data/requestsData'

export function PriorityBadge({ priority }) {
  return <Badge color={PRIORITY_COLOR[priority] || 'slate'} dot>{priority}</Badge>
}

export function StatusBadge({ status }) {
  return <Badge color={STATUS_COLOR[status] || 'slate'} dot>{status}</Badge>
}

// ─── Select wrapper (consistent styling) ─────────────────────────────────────
export function SelectField({ label, id, value, onChange, options, placeholder, error, required }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cn( 'h-9 w-full rounded-lg border bg-white px-3 text-sm', 'text-[#1E293B] ', 'transition-colors duration-150', 'focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] focus:border-transparent', error ? 'border-red-400 focus:ring-red-400' : 'border-[#EDE8FA] ' )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ─── Textarea wrapper ─────────────────────────────────────────────────────────
export function TextareaField({ label, id, value, onChange, placeholder, error, required, rows = 4 }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn( 'w-full rounded-lg border bg-white px-3 py-2 text-sm', 'text-[#1E293B] resize-none', 'placeholder:text-slate-400 ', 'transition-colors duration-150', 'focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] focus:border-transparent', error ? 'border-red-400 focus:ring-red-400' : 'border-[#EDE8FA] ' )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ─── Info row (label + value) ─────────────────────────────────────────────────
export function InfoRow({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</span>
      <span className="text-sm text-slate-800">{children}</span>
    </div>
  )
}
