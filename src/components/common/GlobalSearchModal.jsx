import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ClipboardList, CheckSquare, Bug, CheckCircle, Users, ArrowRight, History, Trash2 } from 'lucide-react'
import { useRequests } from '../../context/RequestsContext'
import { useTasks } from '../../context/TasksContext'
import { useBugs } from '../../context/BugsContext'
import { useTeam } from '../../context/TeamContext'
import Badge from '../ui/Badge'

const CATEGORIES = ['All', 'Requests', 'Tasks', 'Bugs', 'Team']

export default function GlobalSearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('ac_recent_searches')
      return saved ? JSON.parse(saved) : ['Hardware', 'REQ-1002', 'Production Outage']
    } catch {
      return ['Hardware', 'REQ-1002', 'Production Outage']
    }
  })

  const navigate = useNavigate()
  const { requests = [] } = useRequests() || {}
  const { tasks = [] } = useTasks() || {}
  const { bugs = [] } = useBugs() || {}
  const { members = [] } = useTeam() || {}

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveCategory('All')
      setSelectedIndex(0)
    }
  }, [open])

  const q = query.toLowerCase().trim()

  const matchRequests = useMemo(() => {
    if (!q || (activeCategory !== 'All' && activeCategory !== 'Requests')) return []
    return requests.filter(r => r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)).slice(0, 4)
  }, [requests, q, activeCategory])

  const matchTasks = useMemo(() => {
    if (!q || (activeCategory !== 'All' && activeCategory !== 'Tasks')) return []
    return tasks.filter(t => t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.priority.toLowerCase().includes(q)).slice(0, 4)
  }, [tasks, q, activeCategory])

  const matchBugs = useMemo(() => {
    if (!q || (activeCategory !== 'All' && activeCategory !== 'Bugs')) return []
    return bugs.filter(b => b.id.toLowerCase().includes(q) || b.title.toLowerCase().includes(q) || b.severity.toLowerCase().includes(q)).slice(0, 4)
  }, [bugs, q, activeCategory])

  const matchTeam = useMemo(() => {
    if (!q || (activeCategory !== 'All' && activeCategory !== 'Team')) return []
    return members.filter(m => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.department.toLowerCase().includes(q)).slice(0, 4)
  }, [members, q, activeCategory])

  const allMatches = useMemo(() => {
    const list = []
    matchRequests.forEach(r => list.push({ type: 'request', path: '/requests', id: r.id, title: r.title, meta: `${r.category} • ${r.department}`, badge: r.status, badgeColor: r.status === 'Resolved' ? 'green' : 'purple' }))
    matchTasks.forEach(t => list.push({ type: 'task', path: '/tasks', id: t.id, title: t.title, meta: `Assigned: ${t.assignee}`, badge: t.status, badgeColor: 'purple' }))
    matchBugs.forEach(b => list.push({ type: 'bug', path: '/bugs', id: b.id, title: b.title, meta: `${b.environment} • ${b.status}`, badge: b.severity, badgeColor: b.severity === 'Critical' ? 'red' : 'amber' }))
    matchTeam.forEach(m => list.push({ type: 'team', path: '/team', id: m.id, title: m.name, meta: `${m.role} • ${m.department}`, badge: m.status, badgeColor: 'purple' }))
    return list
  }, [matchRequests, matchTasks, matchBugs, matchTeam])

  const totalMatches = allMatches.length

  const handleSelect = useCallback((path, term = null) => {
    if (term && term.trim()) {
      const cleanTerm = term.trim()
      setRecentSearches(prev => {
        const next = [cleanTerm, ...prev.filter(s => s.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, 6)
        try { localStorage.setItem('ac_recent_searches', JSON.stringify(next)) } catch {}
        return next
      })
    }
    navigate(path)
    onClose()
  }, [navigate, onClose])

  const clearRecent = () => {
    setRecentSearches([])
    try { localStorage.removeItem('ac_recent_searches') } catch {}
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % (totalMatches || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + (totalMatches || 1)) % (totalMatches || 1))
      } else if (e.key === 'Enter' && totalMatches > 0) {
        e.preventDefault()
        const selected = allMatches[selectedIndex]
        if (selected) handleSelect(selected.path, query)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, totalMatches, selectedIndex, allMatches, handleSelect, query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.16 }}
        className="relative w-full max-w-xl bg-white border border-[#EDE8FA] rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#EDE8FA]">
          <Search size={18} className="text-[#6D4AFF] shrink-0" />
          <input
            type="text"
            placeholder="Search across requests, tasks, defects and team members..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
            autoFocus
            className="flex-1 bg-transparent text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
          <kbd className="text-[10px] font-mono text-[#6D4AFF] bg-[#F4F2FF] px-1.5 py-0.5 rounded border border-[#DDD6FE]">
            ESC
          </kbd>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#EDE8FA] bg-[#FAF8FF] overflow-x-auto text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">Filter:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSelectedIndex(0) }}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#6D4AFF] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-[#EDE8FF] hover:text-[#6D4AFF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
          {!q && (
            <div>
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-2 mb-2 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5"><History size={13} className="text-[#6D4AFF]" /> Recent Searches</span>
                    <button onClick={clearRecent} className="text-[11px] text-slate-400 hover:text-red-500 flex items-center gap-1 cursor-pointer">
                      <Trash2 size={11} /> Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2 mb-4">
                    {recentSearches.map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-2.5 py-1 rounded-lg text-xs bg-[#F4F2FF] text-[#6D4AFF] hover:bg-[#EDE8FF] border border-[#DDD6FE] transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="py-6 text-center text-slate-400">
                <p className="text-xs">Type a keyword, request ID (e.g. REQ-1001), or employee name</p>
                <p className="text-[11px] text-slate-400 mt-1">Use Up/Down arrows to navigate results and Enter to open</p>
              </div>
            </div>
          )}

          {q && totalMatches === 0 && (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try switching categories or searching for a different ID or keyword</p>
            </div>
          )}

          {/* Render Combined Results with Active Selection Highlight */}
          {q && totalMatches > 0 && (
            <div className="space-y-1">
              {allMatches.map((item, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={`${item.type}-${item.id}-${idx}`}
                    onClick={() => handleSelect(item.path, query)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#F4F2FF] border border-[#DDD6FE]'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#6D4AFF]">{item.id}</span>
                        <span className="text-xs font-semibold text-[#1E293B] truncate">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.meta}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge color={item.badgeColor}>{item.badge}</Badge>
                      {isSelected && <ArrowRight size={13} className="text-[#6D4AFF]" />}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#EDE8FA] flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">Enter</kbd> Select</span>
          </div>
          <span className="flex items-center gap-1 text-[#6D4AFF] font-medium">
            Jump to module <ArrowRight size={11} />
          </span>
        </div>
      </motion.div>
    </div>
  )
}
