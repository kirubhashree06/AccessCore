import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const DEMO_USERS = {
  admin: {
    id: 'USR-001',
    name: 'Tara Anand',
    email: 'tara.anand@accesscore.io',
    role: 'Admin',
    department: 'Engineering',
    title: 'Senior Systems Architect & Admin',
    avatar: null,
  },
  teamLead: {
    id: 'USR-002',
    name: 'Sarah Chen',
    email: 'sarah.chen@accesscore.io',
    role: 'Team Lead',
    department: 'Operations',
    title: 'Director of Service Operations',
    avatar: null,
  },
  employee: {
    id: 'USR-003',
    name: 'James Wilson',
    email: 'james.wilson@accesscore.io',
    role: 'Employee',
    department: 'Engineering',
    title: 'DevOps & Reliability Engineer',
    avatar: null,
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/login') {
      return null
    }
    const stored = localStorage.getItem('ac-user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // If stored user was Alex Morgan, migrate to Tara Anand
        if (parsed.name === 'Alex Morgan') {
          parsed.name = 'Tara Anand'
          parsed.email = 'tara.anand@accesscore.io'
          localStorage.setItem('ac-user', JSON.stringify(parsed))
        }
        return parsed
      } catch (e) {}
    }
    const defaultUser = { ...DEMO_USERS.admin }
    try {
      localStorage.setItem('ac-user', JSON.stringify(defaultUser))
    } catch (e) {}
    return defaultUser
  })

  const login = (credentials) => {
    // Determine user persona by email or credentials
    const email = credentials?.email?.toLowerCase() || ''
    let matchedUser = DEMO_USERS.admin

    if (email.includes('lead') || email.includes('sarah')) {
      matchedUser = DEMO_USERS.teamLead
    } else if (email.includes('emp') || email.includes('marcus')) {
      matchedUser = DEMO_USERS.employee
    } else {
      matchedUser = {
        ...DEMO_USERS.admin,
        email: credentials.email || DEMO_USERS.admin.email,
      }
    }

    setUser(matchedUser)
    localStorage.setItem('ac-user', JSON.stringify(matchedUser))
    return true
  }

  const switchRole = (roleKey) => {
    const targetUser = DEMO_USERS[roleKey] || DEMO_USERS.admin
    setUser(targetUser)
    localStorage.setItem('ac-user', JSON.stringify(targetUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ac-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
