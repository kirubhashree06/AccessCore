import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ChevronUp, ChevronDown, Eye, Pencil, Ban,
  ChevronLeft, ChevronRight, Filter, ArrowUpDown, Inbox,
  CheckSquare, Square, Download, SlidersHorizontal, Check, X
} from 'lucide-react'
import { cn, formatDate } from '../../utils/helpers'
import { CATEGORIES, PRIORITIES, STATUSES } from '../../data/requestsData'
import { PriorityBadge, StatusBadge } from './RequestShared'
import Button from '../ui/Button'

const PAGE_SIZE = 7

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ArrowUpDown size={13} className="text-slate-400 ml-1" />
  return sortDir === 'asc'
    ? <ChevronUp size={13} className="text-[#6D4AFF] ml-1" />
    : <ChevronDown size={13} className="text-[#6D4AFF] ml-1" />
}

function FilterBar({ search, setSearch, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, categoryFilter, setCategoryFilter, density, setDensity }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D4AFF] pointer-events-none" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search requests…"
          className={cn( 'w-full h-9 pl-9 pr-3 rounded-lg border text-sm', 'bg-white border-[#EDE8FA] ', 'text-[#1E293B] placeholder:text-slate-400', 'focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] focus:border-transparent', 'transition-colors duration-150' )}
        />
      </div>

      {/* Status */}
      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        className={cn( 'h-9 rounded-lg border text-sm px-2.5', 'bg-white border-[#EDE8FA] ', 'text-[#1E293B] ', 'focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]' )}
      >
        <option value="">All Statuses</option>
        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Priority */}
      <select
        value={priorityFilter}
        onChange={e => setPriorityFilter(e.target.value)}
        className={cn( 'h-9 rounded-lg border text-sm px-2.5', 'bg-white border-[#EDE8FA] ', 'text-[#1E293B] ', 'focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]' )}
      >
        <option value="">All Priorities</option>
        {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      {/* Category */}
      <select
        value={categoryFilter}
        onChange={e => setCategoryFilter(e.target.value)}
        className={cn( 'h-9 rounded-lg border text-sm px-2.5', 'bg-white border-[#EDE8FA] ', 'text-[#1E293B] ', 'focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]' )}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* Row Density Mode Toggle */}
      <button
        type="button"
        onClick={() => setDensity(d => d === 'comfortable' ? 'compact' : 'comfortable')}
        className="h-9 px-2.5 rounded-lg border border-[#EDE8FA] bg-white text-xs text-[#1E293B] hover:text-[#6D4AFF] flex items-center gap-1.5 transition-colors cursor-pointer"
        title="Toggle table row density"
      >
        <SlidersHorizontal size={13} className="text-[#6D4AFF]" />
        <span className="hidden sm:inline capitalize font-medium">{density}</span>
      </button>

      {/* Clear filters button */}
      {(search || statusFilter || priorityFilter || categoryFilter) && (
        <button
          onClick={() => { setSearch(''); setStatusFilter(''); setPriorityFilter(''); setCategoryFilter('') }}
          className="h-9 px-2.5 text-xs text-slate-500 hover:text-[#6D4AFF] transition-colors cursor-pointer"
        >
          Reset filters
        </button>
      )}
    </div>
  )
}

export default function RequestTable({ requests, onView, onEdit, onCancel }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortField, setSortField] = useState('createdAt')
  const [sortDir, setSortDir] = useState('desc')
  const [page, setPage] = useState(1)
  const [density, setDensity] = useState('comfortable')
  const [selectedIds, setSelectedIds] = useState([])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
    setPage(1)
  }

  const filtered = useMemo(() => {
    return requests.filter(r => {
      const q = search.toLowerCase()
      const matchSearch = !search
        || r.id.toLowerCase().includes(q)
        || r.title.toLowerCase().includes(q)
        || (r.description && r.description.toLowerCase().includes(q))
        || (r.assignedTo && r.assignedTo.toLowerCase().includes(q))
      const matchStatus = !statusFilter || r.status === statusFilter
      const matchPriority = !priorityFilter || r.priority === priorityFilter
      const matchCategory = !categoryFilter || r.category === categoryFilter
      return matchSearch && matchStatus && matchPriority && matchCategory
    })
  }, [requests, search, statusFilter, priorityFilter, categoryFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av = a[sortField] || ''
      let bv = b[sortField] || ''
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [filtered, sortField, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const isAllPageSelected = paginated.length > 0 && paginated.every(r => selectedIds.includes(r.id))

  const handleToggleSelectAll = () => {
    if (isAllPageSelected) {
      const pageIds = paginated.map(r => r.id)
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)))
    } else {
      const pageIds = paginated.map(r => r.id)
      setSelectedIds(prev => [...new Set([...prev, ...pageIds])])
    }
  }

  const handleToggleSelectRow = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleExportSelected = () => {
    const selectedRequests = requests.filter(r => selectedIds.includes(r.id))
    if (!selectedRequests.length) return
    const headers = ['ID', 'Title', 'Category', 'Priority', 'Status', 'Department', 'CreatedBy', 'AssignedTo', 'CreatedAt']
    const rows = selectedRequests.map(r => [
      r.id,
      `"${(r.title || '').replace(/"/g, '""')}"`,
      r.category,
      r.priority,
      r.status,
      r.department,
      `"${(r.createdBy || '').replace(/"/g, '""')}"`,
      `"${(r.assignedTo || '').replace(/"/g, '""')}"`,
      r.createdAt,
    ])
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `accesscore-selected-requests-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const cellPadding = density === 'compact' ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'

  const th = (label, field) => (
    <th
      onClick={() => handleSort(field)}
      className={cn(
        'text-left text-[11px] font-bold uppercase tracking-wider text-[#1E293B] cursor-pointer select-none hover:text-[#6D4AFF] transition-colors whitespace-nowrap',
        density === 'compact' ? 'px-3 py-2' : 'px-4 py-3'
      )}
    >
      <div className="flex items-center">
        {label}
        <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
      </div>
    </th>
  )

  return (
    <div className="space-y-3">
      {/* Controls */}
      <FilterBar
        search={search} setSearch={(v) => { setSearch(v); setPage(1) }}
        statusFilter={statusFilter} setStatusFilter={(v) => { setStatusFilter(v); setPage(1) }}
        priorityFilter={priorityFilter} setPriorityFilter={(v) => { setPriorityFilter(v); setPage(1) }}
        categoryFilter={categoryFilter} setCategoryFilter={(v) => { setCategoryFilter(v); setPage(1) }}
        density={density} setDensity={setDensity}
      />

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="flex items-center justify-between p-2.5 rounded-xl bg-[#F4F2FF] border border-[#DDD6FE] text-xs shadow-xs"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#6D4AFF] bg-white px-2 py-0.5 rounded-md border border-[#DDD6FE]">
              {selectedIds.length} Selected
            </span>
            <span className="text-slate-600 hidden sm:inline">Bulk actions available for selected records</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportSelected}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6D4AFF] text-white font-semibold hover:bg-[#5B3CE6] transition-colors shadow-2xs cursor-pointer"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#DDD6FE] text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X size={13} />
              <span>Deselect All</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-[#EDE8FA] overflow-hidden bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#EDE8FA]">
              <tr className="bg-[#F8FAFC]">
                <th className={cn('w-10 text-center', density === 'compact' ? 'px-2 py-2' : 'px-3 py-3')}>
                  <button
                    type="button"
                    onClick={handleToggleSelectAll}
                    className="text-slate-400 hover:text-[#6D4AFF] transition-colors cursor-pointer"
                    title={isAllPageSelected ? 'Deselect all on page' : 'Select all on page'}
                  >
                    {isAllPageSelected ? <CheckSquare size={16} className="text-[#6D4AFF]" /> : <Square size={16} />}
                  </button>
                </th>
                {th('ID', 'id')}
                {th('Title', 'title')}
                {th('Category', 'category')}
                {th('Priority', 'priority')}
                {th('Status', 'status')}
                {th('Assigned To', 'assignedTo')}
                {th('Created', 'createdAt')}
                <th className={cn('text-left text-[11px] font-bold uppercase tracking-wider text-[#1E293B] whitespace-nowrap', density === 'compact' ? 'px-3 py-2' : 'px-4 py-3')}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8FA]/60">
              <AnimatePresence mode="popLayout">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center">
                      <Inbox size={32} className="mx-auto mb-3 text-purple-300" />
                      <p className="text-sm font-semibold text-[#1E293B]">No requests found</p>
                      <p className="text-xs text-slate-500 mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((req, i) => {
                    const isSelected = selectedIds.includes(req.id)
                    return (
                      <motion.tr
                        key={req.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, delay: i * 0.03 }}
                        className={cn(
                          'transition-colors',
                          isSelected ? 'bg-[#F4F2FF]' : 'hover:bg-[#F4F2FF]/50'
                        )}
                      >
                        <td className={cn('text-center', density === 'compact' ? 'px-2 py-2' : 'px-3 py-3')}>
                          <button
                            type="button"
                            onClick={() => handleToggleSelectRow(req.id)}
                            className="text-slate-400 hover:text-[#6D4AFF] transition-colors cursor-pointer"
                          >
                            {isSelected ? <CheckSquare size={16} className="text-[#6D4AFF]" /> : <Square size={16} />}
                          </button>
                        </td>
                        <td className={cn('font-mono font-bold text-[#6D4AFF] whitespace-nowrap', cellPadding)}>
                          {req.id}
                        </td>
                        <td className={cn('max-w-[220px]', cellPadding)}>
                          <p className="font-semibold text-[#1E293B] truncate" title={req.title}>
                            {req.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{req.department}</p>
                        </td>
                        <td className={cn('text-slate-600 whitespace-nowrap', cellPadding)}>{req.category}</td>
                        <td className={cn('whitespace-nowrap', cellPadding)}><PriorityBadge priority={req.priority} /></td>
                        <td className={cn('whitespace-nowrap', cellPadding)}><StatusBadge status={req.status} /></td>
                        <td className={cn('text-slate-600 whitespace-nowrap', cellPadding)}>
                          {req.assignedTo || <span className="text-slate-400 italic">Unassigned</span>}
                        </td>
                        <td className={cn('text-slate-500 whitespace-nowrap', cellPadding)}>
                          {formatDate(req.createdAt)}
                        </td>
                        <td className={cellPadding}>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onView(req)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#6D4AFF] hover:bg-[#F4F2FF] transition-colors cursor-pointer"
                              title="View details"
                            >
                              <Eye size={15} />
                            </button>
                            {!['Closed', 'Rejected', 'Cancelled', 'Resolved'].includes(req.status) && (
                              <button
                                onClick={() => onEdit(req)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                                title="Edit request"
                              >
                                <Pencil size={15} />
                              </button>
                            )}
                            {!['Closed', 'Rejected', 'Cancelled', 'Resolved'].includes(req.status) && (
                              <button
                                onClick={() => onCancel(req)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Cancel request"
                              >
                                <Ban size={15} />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#EDE8FA]">
            <p className="text-xs text-slate-500">
              Showing <span className="font-semibold text-[#1E293B]">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span className="font-semibold text-[#1E293B]">{filtered.length}</span> results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#6D4AFF] hover:bg-[#F4F2FF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                .reduce((acc, n, i, arr) => {
                  if (i > 0 && n - arr[i - 1] > 1) acc.push('…')
                  acc.push(n)
                  return acc
                }, [])
                .map((item, i) =>
                  item === '…' ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-slate-400 text-xs">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={cn( 'h-7 w-7 rounded-lg text-xs font-semibold transition-colors', item === page ? 'bg-[#6D4AFF] text-white shadow-xs' : 'text-[#1E293B] hover:bg-[#F4F2FF] ' )}
                    >
                      {item}
                    </button>
                  )
                )
              }
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#6D4AFF] hover:bg-[#F4F2FF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 text-right">
        {filtered.length} result{filtered.length !== 1 ? 's' : ''} &bull; Page {page} of {totalPages}
      </p>
    </div>
  )
}
