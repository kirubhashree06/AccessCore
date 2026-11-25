import { createContext, useContext, useState, useCallback } from 'react'
import { DEMO_APPROVALS } from '../data/approvalsData'

const ApprovalsContext = createContext(null)

let nextAprId = DEMO_APPROVALS.length + 3001

export function ApprovalsProvider({ children }) {
  const [approvals, setApprovals] = useState(() => {
    const saved = localStorage.getItem('ac-approvals')
    return saved ? JSON.parse(saved) : DEMO_APPROVALS
  })

  const approveRequest = useCallback((id, note = '', approver = 'Tara Anand') => {
    setApprovals(prev => {
      const now = new Date().toISOString()
      const updated = prev.map(a => {
        if (a.id !== id) return a
        const historyItem = {
          id: Date.now(),
          action: 'Approved',
          actor: approver,
          note: note || 'Request approved by authorized manager.',
          date: now,
        }
        return {
          ...a,
          status: 'APPROVED',
          decisionDate: now,
          approver,
          rejectionReason: null,
          history: [...a.history, historyItem],
        }
      })
      localStorage.setItem('ac-approvals', JSON.stringify(updated))
      return updated
    })
  }, [])

  const rejectRequest = useCallback((id, reason, approver = 'Tara Anand') => {
    setApprovals(prev => {
      const now = new Date().toISOString()
      const updated = prev.map(a => {
        if (a.id !== id) return a
        const historyItem = {
          id: Date.now(),
          action: 'Rejected',
          actor: approver,
          note: `Rejected: ${reason}`,
          date: now,
        }
        return {
          ...a,
          status: 'REJECTED',
          decisionDate: now,
          approver,
          rejectionReason: reason,
          history: [...a.history, historyItem],
        }
      })
      localStorage.setItem('ac-approvals', JSON.stringify(updated))
      return updated
    })
  }, [])

  const createApproval = useCallback((formData) => {
    const now = new Date().toISOString()
    const newApr = {
      id: `APR-${nextAprId++}`,
      title: formData.title,
      type: formData.type || 'Equipment & Hardware',
      requestor: formData.requestor || 'Tara Anand',
      department: formData.department || 'Engineering',
      amountOrDetails: formData.amountOrDetails || 'Standard Request',
      priority: formData.priority || 'Medium',
      status: 'PENDING',
      justification: formData.justification || '',
      submittedDate: now,
      decisionDate: null,
      approver: null,
      rejectionReason: null,
      history: [
        { id: Date.now(), action: 'Submitted', actor: formData.requestor || 'Tara Anand', note: 'Approval workflow initiated.', date: now },
      ],
    }
    setApprovals(prev => {
      const updated = [newApr, ...prev]
      localStorage.setItem('ac-approvals', JSON.stringify(updated))
      return updated
    })
    return newApr
  }, [])

  return (
    <ApprovalsContext.Provider
      value={{
        approvals,
        approveRequest,
        rejectRequest,
        createApproval,
      }}
    >
      {children}
    </ApprovalsContext.Provider>
  )
}

export function useApprovals() {
  const ctx = useContext(ApprovalsContext)
  if (!ctx) throw new Error('useApprovals must be used within ApprovalsProvider')
  return ctx
}
