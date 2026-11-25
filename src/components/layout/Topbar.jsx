import {
  Bell, Search, ChevronDown, Menu, LogOut,
  Plus, ClipboardList, CheckSquare, Bug
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationsContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useIsMobile } from '../../hooks/useIsMobile'
import Avatar from '../ui/Avatar'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../utils/helpers'
import { motion, AnimatePresence } from 'framer-motion'
import GlobalSearchModal from '../common/GlobalSearchModal'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import AccessCoreLogo from '../common/AccessCoreLogo'

export default function Topbar({ onToggleMobileSidebar }) {
  const isMobile = useIsMobile(768)
  const { user, logout, switchRole } = useAuth()
  const { unreadCount = 0 } = useNotifications() || {}
  const [sidebarCollapsed] = useLocalStorage('ac-sidebar-collapsed', false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [createMenuOpen, setCreateMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const userMenuRef = useRef(null)
  const createMenuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
      if (createMenuRef.current && !createMenuRef.current.contains(e.target)) {
        setCreateMenuOpen(false)
      }
    }
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const handleLogout = () => {
    setLogoutConfirmOpen(false)
    logout()
    navigate('/login')
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 z-20 flex items-center justify-between',
          'h-[60px] px-4 sm:px-6 bg-[#FFFFFF] border-b border-[#EDE8FA] text-[#1E1B2E]',
          'transition-all duration-200 shadow-[0_2px_10px_rgba(109,74,255,0.03)]'
        )}
        style={{ left: isMobile ? 0 : (sidebarCollapsed ? 68 : 240) }}
      >
        {/* Left: Mobile hamburger + Search button */}
        <div className="flex items-center gap-3 flex-1 max-w-sm">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-1.5 rounded-lg text-[#64748B] hover:bg-[#F4F2FF] hover:text-[#6D4AFF] transition-colors"
              aria-label="Toggle navigation"
            >
              <Menu size={18} />
            </button>
          )}

          {/* Header logo for mobile navigation bar */}
          <div className="flex md:hidden items-center shrink-0">
            <AccessCoreLogo size="xs" showText={false} />
          </div>

          <button
            onClick={() => setSearchOpen(true)}
            className={cn(
              'flex items-center justify-between w-full h-8 px-3 rounded-lg text-sm text-left',
              'bg-[#F4F2FF] border border-[#EDE8FA] text-[#64748B] hover:border-[#6D4AFF]',
              'transition-all duration-150 cursor-pointer shadow-2xs'
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <Search size={14} className="text-[#6D4AFF] shrink-0" />
              <span className="text-xs">Quick search records...</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-[#6D4AFF] bg-[#EDE8FF] border border-[#DDD6FE] rounded">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Operational System Health Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] text-emerald-700 font-medium select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Systems Operational</span>
          </div>

          {/* Quick Create Dropdown */}
          <div className="relative" ref={createMenuRef}>
            <button
              onClick={() => setCreateMenuOpen(o => !o)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#6D4AFF] text-white hover:bg-[#5B3CE6] text-xs font-semibold shadow-xs shadow-[#6D4AFF]/20 transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Create</span>
              <ChevronDown size={12} className="opacity-80" />
            </button>

            <AnimatePresence>
              {createMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 top-full mt-1.5 w-48 py-1 z-50 bg-white border border-[#EDE8FA] rounded-xl shadow-xl text-xs"
                >
                  <button
                    onClick={() => { setCreateMenuOpen(false); navigate('/requests') }}
                    className="w-full text-left px-3 py-2 text-[#1E1B2E] hover:bg-[#F4F2FF] hover:text-[#6D4AFF] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ClipboardList size={14} className="text-[#6D4AFF]" />
                    <span>New Service Request</span>
                  </button>
                  <button
                    onClick={() => { setCreateMenuOpen(false); navigate('/tasks') }}
                    className="w-full text-left px-3 py-2 text-[#1E1B2E] hover:bg-[#F4F2FF] hover:text-[#6D4AFF] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <CheckSquare size={14} className="text-[#6D4AFF]" />
                    <span>Create Team Task</span>
                  </button>
                  <button
                    onClick={() => { setCreateMenuOpen(false); navigate('/bugs') }}
                    className="w-full text-left px-3 py-2 text-[#1E1B2E] hover:bg-[#F4F2FF] hover:text-red-600 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Bug size={14} className="text-red-500" />
                    <span>Log System Defect</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <button
            onClick={() => navigate('/notifications')}
            className={cn(
              'relative p-2 rounded-lg text-[#64748B]',
              'hover:bg-[#F4F2FF] hover:text-[#6D4AFF]',
              'transition-colors duration-150 cursor-pointer'
            )}
            aria-label="Notifications"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#6D4AFF] text-white text-[10px] font-bold shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="h-5 w-px bg-[#EDE8FA] mx-1" />

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(o => !o)}
              className={cn(
                'flex items-center gap-2 px-2 py-1.5 rounded-lg',
                'hover:bg-[#F4F2FF] transition-colors duration-150 cursor-pointer'
              )}
            >
              <Avatar name={user?.name || 'Tara Anand'} size="sm" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#1E1B2E] leading-tight">
                  {user?.name || 'Tara Anand'}
                </p>
                <p className="text-[10px] text-[#A78BFA] font-medium leading-tight">
                  {user?.role || 'Admin'}
                </p>
              </div>
              <ChevronDown size={14} className="text-[#64748B] hidden sm:block" />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                  className={cn(
                    'absolute right-0 top-full mt-1.5 w-56 py-1 z-50',
                    'bg-[#FFFFFF] border border-[#EDE8FA]',
                    'rounded-xl shadow-xl'
                  )}
                >
                  <div className="px-3 py-2 border-b border-[#EDE8FA] mb-1">
                    <p className="text-xs font-semibold text-[#1E1B2E]">{user?.name || 'Tara Anand'}</p>
                    <p className="text-[10px] text-[#64748B] truncate">{user?.email || 'tara.anand@accesscore.io'}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4F2FF] text-[#6D4AFF] border border-[#DDD6FE]">
                      {user?.role || 'Admin'}
                    </span>
                  </div>

                  {/* Persona Switching for Dashboard Verification */}
                  <div className="px-3 py-1.5 border-b border-[#EDE8FA]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Switch Dashboard View</p>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => { switchRole('admin'); setUserMenuOpen(false) }}
                        className={cn(
                          'px-1.5 py-1 text-[10px] font-semibold rounded cursor-pointer transition-colors',
                          user?.role === 'Admin' ? 'bg-[#6D4AFF] text-white' : 'bg-[#F4F2FF] text-[#1E1B2E] hover:bg-[#EDE8FF]'
                        )}
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => { switchRole('teamLead'); setUserMenuOpen(false) }}
                        className={cn(
                          'px-1.5 py-1 text-[10px] font-semibold rounded cursor-pointer transition-colors',
                          user?.role === 'Team Lead' ? 'bg-[#6D4AFF] text-white' : 'bg-[#F4F2FF] text-[#1E1B2E] hover:bg-[#EDE8FF]'
                        )}
                      >
                        Lead
                      </button>
                      <button
                        onClick={() => { switchRole('employee'); setUserMenuOpen(false) }}
                        className={cn(
                          'px-1.5 py-1 text-[10px] font-semibold rounded cursor-pointer transition-colors',
                          user?.role === 'Employee' ? 'bg-[#6D4AFF] text-white' : 'bg-[#F4F2FF] text-[#1E1B2E] hover:bg-[#EDE8FF]'
                        )}
                      >
                        Employee
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => { setUserMenuOpen(false); navigate('/settings') }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#1E1B2E] hover:bg-[#F4F2FF] hover:text-[#6D4AFF] transition-colors cursor-pointer"
                  >
                    My Profile & Settings
                  </button>
                  <button
                    onClick={() => { setUserMenuOpen(false); navigate('/team') }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#1E1B2E] hover:bg-[#F4F2FF] hover:text-[#6D4AFF] transition-colors cursor-pointer"
                  >
                    Team Directory
                  </button>
                  <div className="my-1 border-t border-[#EDE8FA]" />
                  <button
                    onClick={() => { setUserMenuOpen(false); setLogoutConfirmOpen(true) }}
                    className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Logout Confirmation Dialog */}
      <Modal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        title="Sign Out of ACCESSCORE"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-[#64748B]">
            Are you sure you want to sign out? Your unsaved working drafts are saved to browser local storage.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLogoutConfirmOpen(false)}
            >
              Stay Logged In
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
              iconLeft={<LogOut size={14} />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
