'use client'

// Path: app/login/page.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated, setAuthData } from '@/src/utils/auth'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  // Agar already logged in hai toh home page pe redirect karo
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/')
    }
  }, [router])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Something went wrong')
        return
      }

      // Token aur user localStorage mein save karo
      setAuthData(data.token, data.user)

      // Home page pe redirect
      setAuthData(data.token, data.user)
      router.replace('/')
      window.location.href = '/'

    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">
              Metro<span className="text-emerald-400">Home</span>
            </h1>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">Find your perfect home in the city</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Tab Switch */}
          <div className="flex bg-gray-900 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setIsLogin(true); setError('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${isLogin
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError('') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isLogin
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - only for register */}
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required={!isLogin}
                  className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'}
                required
                className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
            >
              {loading
                ? (isLogin ? 'Logging in...' : 'Creating account...')
                : (isLogin ? 'Login' : 'Create Account')
              }
            </button>
          </form>

          {/* Footer text */}
          <p className="text-center text-gray-500 text-sm mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError('') }}
              className="text-emerald-400 hover:underline font-medium"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}