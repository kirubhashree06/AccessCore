import { createContext, useContext, useState, useCallback } from 'react'
import { DEMO_TEAM_MEMBERS } from '../data/teamData'

const TeamContext = createContext(null)

let nextEmpId = DEMO_TEAM_MEMBERS.length + 10

export function TeamProvider({ children }) {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('ac-team')
    return saved ? JSON.parse(saved) : DEMO_TEAM_MEMBERS
  })

  const addMember = useCallback((formData) => {
    const now = new Date().toISOString()
    const newMember = {
      id: `USR-${String(nextEmpId++).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      role: formData.role || 'Employee',
      department: formData.department || 'Engineering',
      status: formData.status || 'Active',
      phone: formData.phone || '+1 (555) 000-0000',
      location: formData.location || 'Remote',
      joinDate: now,
      title: formData.title || 'Specialist',
      bio: formData.bio || 'Enterprise team member.',
      assignedRequests: 0,
      assignedTasks: 0,
      skills: formData.skills || ['AccessCore', 'IT Systems'],
    }
    setMembers(prev => {
      const updated = [newMember, ...prev]
      localStorage.setItem('ac-team', JSON.stringify(updated))
      return updated
    })
    return newMember
  }, [])

  const updateMember = useCallback((id, patch) => {
    setMembers(prev => {
      const updated = prev.map(m => (m.id === id ? { ...m, ...patch } : m))
      localStorage.setItem('ac-team', JSON.stringify(updated))
      return updated
    })
  }, [])

  const toggleMemberStatus = useCallback((id) => {
    setMembers(prev => {
      const updated = prev.map(m =>
        m.id === id ? { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' } : m
      )
      localStorage.setItem('ac-team', JSON.stringify(updated))
      return updated
    })
  }, [])

  const deleteMember = useCallback((id) => {
    setMembers(prev => {
      const updated = prev.filter(m => m.id !== id)
      localStorage.setItem('ac-team', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <TeamContext.Provider
      value={{
        members,
        addMember,
        updateMember,
        toggleMemberStatus,
        deleteMember,
      }}
    >
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const ctx = useContext(TeamContext)
  if (!ctx) throw new Error('useTeam must be used within TeamProvider')
  return ctx
}
