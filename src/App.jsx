import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { RequestsProvider } from './context/RequestsContext'
import { TasksProvider } from './context/TasksContext'
import { BugsProvider } from './context/BugsContext'
import { ApprovalsProvider } from './context/ApprovalsContext'
import { TeamProvider } from './context/TeamContext'
import { NotificationsProvider } from './context/NotificationsContext'
import AppLayout from './components/layout/AppLayout'
import { PageSkeleton } from './components/ui/Skeleton'

// Lazy loaded page modules for optimal code-splitting
const LoginPage = lazy(() => import('./pages/LoginPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const RequestsPage = lazy(() => import('./pages/RequestsPage'))
const TasksPage = lazy(() => import('./pages/TasksPage'))
const BugsPage = lazy(() => import('./pages/BugsPage'))
const ApprovalsPage = lazy(() => import('./pages/ApprovalsPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const ReportsPage = lazy(() => import('./pages/ReportsPage'))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

function RequireGuest({ children }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <RequireGuest>
              <LoginPage />
            </RequireGuest>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RequireGuest>
              <ForgotPasswordPage />
            </RequireGuest>
          }
        />
        <Route
          path="/reset-password"
          element={
            <RequireGuest>
              <ResetPasswordPage />
            </RequireGuest>
          }
        />

        {/* Protected Enterprise SaaS Modules */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="bugs" element={<BugsPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <RequestsProvider>
            <TasksProvider>
              <BugsProvider>
                <ApprovalsProvider>
                  <TeamProvider>
                    <NotificationsProvider>
                      <AppRoutes />
                    </NotificationsProvider>
                  </TeamProvider>
                </ApprovalsProvider>
              </BugsProvider>
            </TasksProvider>
          </RequestsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
