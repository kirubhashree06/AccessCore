import { createContext, useContext, useState, useCallback } from 'react'
import { DEMO_REQUESTS, STATUS_TRANSITIONS } from '../data/requestsData'

const RequestsContext = createContext(null)

let nextIdNum = DEMO_REQUESTS.length + 1
const genId = () => {
  const id = `REQ-${String(nextIdNum).padStart(4, '0')}`
  nextIdNum++
  return id
}

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('ac-requests')
      return saved ? JSON.parse(saved) : DEMO_REQUESTS
    } catch {
      return DEMO_REQUESTS
    }
  })

  // Create
  const createRequest = useCallback((formData) => {
    const now = new Date().toISOString()
    const newReq = {
      id: genId(),
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      status: 'New',
      department: formData.department,
      description: formData.description,
      assignedTo: null,
      createdBy: 'Tara Anand',
      createdAt: now,
      updatedAt: now,
      attachments: formData.attachments || [],
      timeline: [
        {
          id: 1,
          type: 'created',
          actor: 'Tara Anand',
          note: 'Request submitted.',
          date: now,
        },
      ],
    }
    setRequests(prev => {
      const updated = [newReq, ...prev]
      try { localStorage.setItem('ac-requests', JSON.stringify(updated)) } catch {}
      return updated
    })
    return newReq
  }, [])

  // Update (edit)
  const updateRequest = useCallback((id, patch) => {
    setRequests(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, ...patch, updatedAt: new Date().toISOString() } : r)
      try { localStorage.setItem('ac-requests', JSON.stringify(updated)) } catch {}
      return updated
    })
  }, [])

  // Change status
  const changeStatus = useCallback((id, newStatus, actor = 'Tara Anand') => {
    let success = false
    setRequests(prev => {
      const updated = prev.map(r => {
        if (r.id !== id) return r
        const allowed = STATUS_TRANSITIONS[r.status] || []
        if (!allowed.includes(newStatus)) return r
        success = true
        const now = new Date().toISOString()
        const timelineEntry = {
          id: Date.now(),
          type: 'status',
          actor,
          note: `Status changed to ${newStatus}.`,
          date: now,
        }
        return {
          ...r,
          status: newStatus,
          updatedAt: now,
          timeline: [...r.timeline, timelineEntry],
        }
      })
      if (success) {
        try { localStorage.setItem('ac-requests', JSON.stringify(updated)) } catch {}
      }
      return updated
    })
    return success
  }, [])

  // Cancel (marks as Cancelled by employee)
  const cancelRequest = useCallback((id, reason = '') => {
    setRequests(prev => {
      const updated = prev.map(r => {
        if (r.id !== id) return r
        const now = new Date().toISOString()
        const timelineEntry = {
          id: Date.now(),
          type: 'status',
          actor: 'Tara Anand',
          note: reason ? `Request cancelled by employee: ${reason}` : 'Request cancelled by employee.',
          date: now,
        }
        return {
          ...r,
          status: 'Cancelled',
          updatedAt: now,
          timeline: [...r.timeline, timelineEntry],
        }
      })
      try { localStorage.setItem('ac-requests', JSON.stringify(updated)) } catch {}
      return updated
    })
  }, [])

  // Add comment
  const addComment = useCallback((id, comment, actor = 'Tara Anand') => {
    setRequests(prev => {
      const updated = prev.map(r => {
        if (r.id !== id) return r
        const now = new Date().toISOString()
        const timelineEntry = {
          id: Date.now(),
          type: 'comment',
          actor,
          note: comment,
          date: now,
        }
        return {
          ...r,
          updatedAt: now,
          timeline: [...r.timeline, timelineEntry],
        }
      })
      try { localStorage.setItem('ac-requests', JSON.stringify(updated)) } catch {}
      return updated
    })
  }, [])

  return (
    <RequestsContext.Provider value={{ requests, createRequest, updateRequest, changeStatus, cancelRequest, addComment }}>
      {children}
    </RequestsContext.Provider>
  )
}

export function useRequests() {
  const ctx = useContext(RequestsContext)
  if (!ctx) throw new Error('useRequests must be used within RequestsProvider')
  return ctx
}
