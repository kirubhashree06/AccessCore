import { useState } from 'react'
import { X, Upload, Paperclip, AlertCircle } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { SelectField, TextareaField } from './RequestShared'
import { CATEGORIES, PRIORITIES, DEPARTMENTS } from '../../data/requestsData'
import { cn } from '../../utils/helpers'

const EMPTY_FORM = {
  title: '',
  category: '',
  description: '',
  priority: 'Medium',
  department: '',
  attachments: [],
}

const MAX_TITLE_LENGTH = 100
const MAX_DESC_LENGTH = 1000
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB
const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpg', 'jpeg', 'docx', 'xlsx', 'zip']

function validate(form) {
  const errs = {}
  const trimmedTitle = form.title.trim()
  if (!trimmedTitle) {
    errs.title = 'Title is required'
  } else if (trimmedTitle.length < 5) {
    errs.title = 'Title must be at least 5 characters (currently ' + trimmedTitle.length + ')'
  } else if (trimmedTitle.length > MAX_TITLE_LENGTH) {
    errs.title = `Title cannot exceed ${MAX_TITLE_LENGTH} characters`
  }

  if (!form.category) {
    errs.category = 'Please select a service category'
  }

  const trimmedDesc = form.description.trim()
  if (!trimmedDesc) {
    errs.description = 'Description is required'
  } else if (trimmedDesc.length < 10) {
    errs.description = 'Description must be at least 10 characters (currently ' + trimmedDesc.length + ')'
  } else if (trimmedDesc.length > MAX_DESC_LENGTH) {
    errs.description = `Description cannot exceed ${MAX_DESC_LENGTH} characters`
  }

  if (!form.department) {
    errs.department = 'Please assign an adjudicating department'
  }

  return errs
}

export default function RequestForm({ onSubmit, onCancel, initialData = null }) {
  const isEdit = !!initialData
  const [form, setForm] = useState(initialData ? {
    title: initialData.title,
    category: initialData.category,
    description: initialData.description,
    priority: initialData.priority,
    department: initialData.department,
    attachments: initialData.attachments || [],
  } : EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [fileError, setFileError] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  // Real-time field updater with live validation
  const set = (key) => (e) => {
    const val = e.target.value
    const nextForm = { ...form, [key]: val }
    setForm(nextForm)

    if (touched[key]) {
      const fieldErrors = validate(nextForm)
      setErrors(prev => ({ ...prev, [key]: fieldErrors[key] || '' }))
    }
  }

  const handleBlur = (key) => () => {
    setTouched(t => ({ ...t, [key]: true }))
    const fieldErrors = validate(form)
    setErrors(prev => ({ ...prev, [key]: fieldErrors[key] || '' }))
  }

  const handleAttachment = (files) => {
    setFileError('')
    if (!files || files.length === 0) return

    const validNames = []
    const rejectedErrors = []

    Array.from(files).forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase()
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        rejectedErrors.push(`${file.name}: invalid format (allowed: ${ALLOWED_EXTENSIONS.join(', ')})`)
        return
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        rejectedErrors.push(`${file.name}: exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB)`)
        return
      }
      validNames.push(file.name)
    })

    if (rejectedErrors.length > 0) {
      setFileError(rejectedErrors.join(' • '))
    }

    if (validNames.length > 0) {
      setForm(f => ({ ...f, attachments: [...new Set([...f.attachments, ...validNames])] }))
    }
  }

  const removeAttachment = (name) => {
    setForm(f => ({ ...f, attachments: f.attachments.filter(a => a !== name) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ title: true, category: true, description: true, department: true })
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    onSubmit(form)
    setLoading(false)
    if (!isEdit) {
      setForm(EMPTY_FORM)
      setTouched({})
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title — full width with live character meter */}
        <div className="md:col-span-2">
          <Input
            id="req-title"
            label="Request Title"
            placeholder="Briefly describe what you need (e.g. Dual 4K Monitors for Engineering)"
            fullWidth
            value={form.title}
            onChange={set('title')}
            onBlur={handleBlur('title')}
            error={errors.title}
            maxLength={MAX_TITLE_LENGTH}
          />
          <div className="flex items-center justify-between text-xs mt-1">
            {!errors.title ? (
              <p className="text-slate-400">
                <span className="text-red-500">*</span> minimum 5 characters
              </p>
            ) : <span />}
            <span className={cn('text-[11px] font-mono', form.title.length > MAX_TITLE_LENGTH - 10 ? 'text-amber-500 font-bold' : 'text-slate-400')}>
              {form.title.length}/{MAX_TITLE_LENGTH}
            </span>
          </div>
        </div>

        {/* Category */}
        <SelectField
          id="req-category"
          label="Category"
          required
          value={form.category}
          onChange={set('category')}
          onBlur={handleBlur('category')}
          options={CATEGORIES}
          placeholder="Select a category…"
          error={errors.category}
        />

        {/* Priority */}
        <SelectField
          id="req-priority"
          label="Priority"
          value={form.priority}
          onChange={set('priority')}
          options={PRIORITIES}
        />

        {/* Department */}
        <SelectField
          id="req-dept"
          label="Department"
          required
          value={form.department}
          onChange={set('department')}
          onBlur={handleBlur('department')}
          options={DEPARTMENTS}
          placeholder="Select department…"
          error={errors.department}
        />

        {/* Description — full width with live counter */}
        <div className="md:col-span-2">
          <TextareaField
            id="req-desc"
            label="Description"
            required
            value={form.description}
            onChange={set('description')}
            onBlur={handleBlur('description')}
            placeholder="Provide full details about your request, including any relevant context, business justification, or cost center…"
            rows={5}
            error={errors.description}
          />
          <div className="flex items-center justify-between text-xs mt-1">
            {!errors.description ? (
              <p className="text-slate-400">
                <span className="text-red-500">*</span> minimum 10 characters
              </p>
            ) : <span />}
            <span className={cn('text-[11px] font-mono', form.description.length > MAX_DESC_LENGTH - 50 ? 'text-amber-500 font-bold' : 'text-slate-400')}>
              {form.description.length}/{MAX_DESC_LENGTH}
            </span>
          </div>
        </div>

        {/* Attachment upload — full width */}
        <div className="md:col-span-2">
          <p className="text-xs font-medium text-slate-600 mb-1">
            Attachments <span className="text-slate-400 font-normal">(optional)</span>
          </p>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleAttachment(e.dataTransfer.files) }}
            className={cn( 'relative border-2 border-dashed rounded-xl p-5 text-center transition-colors duration-150', dragOver ? 'border-purple-400 bg-[#F4F2FF] ' : 'border-[#EDE8FA] hover:border-[#A78BFA] ' )}
          >
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => handleAttachment(e.target.files)}
            />
            <Upload size={20} className="mx-auto mb-2 text-[#6D4AFF]" />
            <p className="text-xs text-slate-500">
              Drag & drop files here, or <span className="text-[#6D4AFF] font-semibold">browse</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">PDF, PNG, JPG, DOCX, XLSX, ZIP — max 10MB each</p>
          </div>

          {/* Rejection / Validation Warning */}
          {fileError && (
            <div className="mt-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-500" />
              <span>{fileError}</span>
            </div>
          )}

          {/* File list */}
          {form.attachments.length > 0 && (
            <ul className="mt-2 space-y-1">
              {form.attachments.map(name => (
                <li key={name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Paperclip size={13} className="text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-700 flex-1 truncate">{name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(name)}
                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    aria-label="Remove"
                  >
                    <X size={13} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
        <Button type="button" variant="ghost" size="md" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="md" loading={loading}>
          {isEdit ? 'Save Changes' : 'Submit Request'}
        </Button>
      </div>
    </form>
  )
}
