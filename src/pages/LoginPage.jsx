import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Eye, EyeOff, Info } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { motion } from 'framer-motion'
import AccessCoreLogo from '../components/common/AccessCoreLogo'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(() => {
    const remembered = localStorage.getItem('ac-remember-email')
    return { email: remembered || '', password: '' }
  })
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('ac-remember-email'))
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' }
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' }
    if (score <= 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' }
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' }
  }

  const strength = getPasswordStrength(form.password)

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid corporate email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 4) errs.password = 'Password must be at least 4 characters'
    return errs
  }

  const handleFieldChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) {
      setErrors(errs => {
        const next = { ...errs }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    if (rememberMe) {
      localStorage.setItem('ac-remember-email', form.email)
    } else {
      localStorage.removeItem('ac-remember-email')
    }

    await new Promise(r => setTimeout(r, 600))
    login(form)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F4F2FF] text-[#1E1B2E] flex items-center justify-center p-4 relative transition-colors duration-150">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-sm"
      >
        {/* Logo header */}
        <div className="flex flex-col items-center text-center mb-6">
          <AccessCoreLogo
            size="lg"
            showText={true}
            theme="light"
            className="mb-1"
          />
          <p className="text-xs text-[#64748B] mt-1">Enterprise Workflow & Service Management</p>
        </div>

        {/* Login card */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#EDE8FA] shadow-[0_8px_30px_rgba(109,74,255,0.06)] p-6">
          <div className="mb-4">
            <h2 className="text-base font-bold text-[#1E1B2E]">Sign in to your account</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Enter your credentials to continue
            </p>
          </div>

          {/* Demo Mode Notice with Quick-Fill Personas */}
          <div className="mb-4 p-3 rounded-xl bg-[#F4F2FF] border border-[#DDD6FE] text-[11px] text-[#1E1B2E]">
            <div className="flex items-start gap-2 mb-2">
              <Info size={14} className="shrink-0 mt-0.5 text-[#6D4AFF]" />
              <div>
                <span className="font-semibold block text-[#6D4AFF]">Demo Environment Persona Quick-Fill</span>
                <span className="text-slate-500">Click a test persona to populate verified credentials:</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  handleFieldChange('email', 'tara.anand@accesscore.io')
                  handleFieldChange('password', 'AdminPass#2026')
                }}
                className="px-2 py-1 rounded bg-white border border-[#DDD6FE] text-[#6D4AFF] hover:bg-[#EDE8FA] font-medium text-[10px] transition-colors"
              >
                Admin (Tara Anand)
              </button>
              <button
                type="button"
                onClick={() => {
                  handleFieldChange('email', 'sarah.chen@accesscore.io')
                  handleFieldChange('password', 'LeadPass#2026')
                }}
                className="px-2 py-1 rounded bg-white border border-[#DDD6FE] text-[#6D4AFF] hover:bg-[#EDE8FA] font-medium text-[10px] transition-colors"
              >
                Lead (Sarah Chen)
              </button>
              <button
                type="button"
                onClick={() => {
                  handleFieldChange('email', 'james.wilson@accesscore.io')
                  handleFieldChange('password', 'DevPass#2026')
                }}
                className="px-2 py-1 rounded bg-white border border-[#DDD6FE] text-[#6D4AFF] hover:bg-[#EDE8FA] font-medium text-[10px] transition-colors"
              >
                Staff (James Wilson)
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              label="Email address"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              fullWidth
              value={form.email}
              onChange={e => handleFieldChange('email', e.target.value)}
              error={errors.email}
              iconLeft={<Mail size={15} />}
            />

            <div className="space-y-1.5">
              <Input
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                fullWidth
                value={form.password}
                onChange={e => handleFieldChange('password', e.target.value)}
                error={errors.password}
                iconLeft={<Lock size={15} />}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="pointer-events-auto text-[#64748B] hover:text-[#1E1B2E] transition-colors cursor-pointer"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              {form.password && (
                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Password strength:</span>
                    <span className={`font-semibold ${
                      strength.label === 'Strong' ? 'text-emerald-600' : strength.label === 'Medium' ? 'text-amber-600' : 'text-red-500'
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-[#EDE8FA] text-[#6D4AFF] focus:ring-[#6D4AFF]"
                />
                <span className="text-xs text-[#64748B]">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#6D4AFF] hover:text-[#5B3CE6] font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              className="mt-1 shadow-md shadow-[#6D4AFF]/20"
            >
              Sign in
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-[#64748B] mt-5">
          &copy; {new Date().getFullYear()} ACCESSCORE. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}
