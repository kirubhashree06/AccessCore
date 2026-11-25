import { createContext, useContext, useState, useCallback } from 'react'
import { DEMO_BUGS, BUG_TRANSITIONS } from '../data/bugsData'

const BugsContext = createContext(null)

let nextBugId = DEMO_BUGS.length + 2001

export function BugsProvider({ children }) {
  const [bugs, setBugs] = useState(() => {
    const saved = localStorage.getItem('ac-bugs')
    return saved ? JSON.parse(saved) : DEMO_BUGS
  })

  const reportBug = useCallback((formData) => {
    const now = new Date().toISOString()
    const newBug = {
      id: `BUG-${nextBugId++}`,
      title: formData.title,
      severity: formData.severity || 'Medium',
      status: 'OPEN',
      environment: formData.environment || 'Production',
      assignedTo: formData.assignedTo || null,
      reportedBy: formData.reportedBy || 'Tara Anand',
      reproductionSteps: formData.reproductionSteps || '',
      expectedResult: formData.expectedResult || '',
      actualResult: formData.actualResult || '',
      createdAt: now,
      updatedAt: now,
      attachments: formData.attachments || [],
      comments: [],
    }
    setBugs(prev => {
      const updated = [newBug, ...prev]
      localStorage.setItem('ac-bugs', JSON.stringify(updated))
      return updated
    })
    return newBug
  }, [])

  const updateBug = useCallback((id, patch) => {
    setBugs(prev => {
      const updated = prev.map(b => (b.id === id ? { ...b, ...patch, updatedAt: new Date().toISOString() } : b))
      localStorage.setItem('ac-bugs', JSON.stringify(updated))
      return updated
    })
  }, [])

  const changeBugStatus = useCallback((id, newStatus) => {
    let success = false
    setBugs(prev => {
      const updated = prev.map(b => {
        if (b.id !== id) return b
        const allowed = BUG_TRANSITIONS[b.status] || []
        if (!allowed.includes(newStatus)) return b
        success = true
        return {
          ...b,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        }
      })
      localStorage.setItem('ac-bugs', JSON.stringify(updated))
      return updated
    })
    return success
  }, [])

  const assignDeveloper = useCallback((id, developerName) => {
    setBugs(prev => {
      const updated = prev.map(b => {
        if (b.id !== id) return b
        return {
          ...b,
          assignedTo: developerName,
          status: b.status === 'OPEN' ? 'ASSIGNED' : b.status,
          updatedAt: new Date().toISOString(),
        }
      })
      localStorage.setItem('ac-bugs', JSON.stringify(updated))
      return updated
    })
  }, [])

  const addComment = useCallback((id, text, author = 'Tara Anand') => {
    setBugs(prev => {
      const updated = prev.map(b => {
        if (b.id !== id) return b
        const comment = { id: Date.now(), author, text, date: new Date().toISOString() }
        return {
          ...b,
          updatedAt: new Date().toISOString(),
          comments: [...b.comments, comment],
        }
      })
      localStorage.setItem('ac-bugs', JSON.stringify(updated))
      return updated
    })
  }, [])

  const deleteBug = useCallback((id) => {
    setBugs(prev => {
      const updated = prev.filter(b => b.id !== id)
      localStorage.setItem('ac-bugs', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <BugsContext.Provider
      value={{
        bugs,
        reportBug,
        updateBug,
        changeBugStatus,
        assignDeveloper,
        addComment,
        deleteBug,
      }}
    >
      {children}
    </BugsContext.Provider>
  )
}

export function useBugs() {
  const ctx = useContext(BugsContext)
  if (!ctx) throw new Error('useBugs must be used within BugsProvider')
  return ctx
}
