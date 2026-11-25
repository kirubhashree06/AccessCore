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

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.email) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 4) errs.password = 'Password too short'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
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

          {/* Demo Mode Notice */}
          <div className="mb-4 p-2.5 rounded-xl bg-[#F4F2FF] border border-[#DDD6FE] text-[11px] text-[#1E1B2E] flex items-start gap-2">
            <Info size={14} className="shrink-0 mt-0.5 text-[#6D4AFF]" />
            <div>
              <span className="font-semibold block text-[#6D4AFF]">Demo Environment (Frontend Simulation)</span>
              <span>Authentication is simulated locally in browser memory. Enter any corporate email (e.g. <span className="font-mono text-[#6D4AFF]">tara.anand@accesscore.io</span>) and password &ge; 4 chars.</span>
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
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              error={errors.email}
              iconLeft={<Mail size={15} />}
            />

            <Input
              label="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              fullWidth
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
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
