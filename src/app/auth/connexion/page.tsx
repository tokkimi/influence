'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function ConnexionPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Email ou mot de passe incorrect')
    } else {
      // Redirect based on role — simple redirect to home which will figure out role
      router.push('/')
      router.refresh()
    }
  }

  const demos = [
    { label: 'Compte Admin', email: 'admin@dotthetalents.com', password: 'admin123' },
    { label: 'Compte Marque', email: 'marque@demo.com', password: 'demo123' },
    { label: 'Compte Influenceur', email: 'influenceur@demo.com', password: 'demo123' },
  ]

  return (
    <div className="min-h-screen flex bg-[#080c1a]">
      {/* Left visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#080c1a] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/50/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative text-white text-center px-12">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold">DTT</span>
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">Dot The Talents</h2>
          <p className="text-white/80 leading-relaxed">
            La plateforme de marketing d&apos;influence internationale qui connecte les marques aux meilleurs talents digitaux.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-700 to-yellow-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">DTT</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Dot The Talents</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Connexion</h1>
            <p className="text-muted mt-1">Bon retour ! Connectez-vous à votre espace.</p>
          </div>

          {/* Demo accounts */}
          <div className="bg-white/5 border border-purple-100 rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold text-[#f0c040] mb-2">🎯 Comptes de démonstration :</p>
            <div className="space-y-1">
              {demos.map((d, i) => (
                <button
                  key={i}
                  onClick={() => { setEmail(d.email); setPassword(d.password) }}
                  className="w-full text-left text-xs text-purple-600 hover:text-purple-800 py-1 px-2 rounded hover:bg-purple-100 transition"
                >
                  <span className="font-medium">{d.label}</span> — {d.email}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-black text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Pas encore de compte ?{' '}
            <Link href="/auth/inscription" className="text-[#f0c040] font-medium hover:underline">
              Créer mon compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
