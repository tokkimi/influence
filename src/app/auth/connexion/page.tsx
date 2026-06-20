'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

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
      // Fetch session to get role and redirect accordingly
      const sessionRes = await fetch('/api/auth/session')
      const session = await sessionRes.json()
      const role = session?.user?.role
      if (role === 'ADMIN') router.push('/admin/tableau-de-bord')
      else if (role === 'BRAND') router.push('/marque/tableau-de-bord')
      else if (role === 'INFLUENCER') router.push('/influenceur/tableau-de-bord')
      else router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf8] px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-40" style={{background:'radial-gradient(circle, #fde8d0 0%, transparent 65%)'}} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-30" style={{background:'radial-gradient(circle, #dbeafe 0%, transparent 65%)'}} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-10">
          <div className="flex items-center gap-0.5">
            <div className="w-2 h-2 rounded-full bg-[#0f0f0f]" />
            <div className="w-2 h-2 rounded-full bg-[#c9993a]" />
            <div className="w-2 h-2 rounded-full bg-[#0f0f0f] opacity-40" />
          </div>
          <span className="font-display font-bold text-base text-[#0f0f0f] tracking-wide">Dot The Talents</span>
        </Link>

        <div className="glass-card rounded-3xl p-8">
          <h1 className="text-xl font-bold text-[#0f0f0f] mb-1">Connexion</h1>
          <p className="text-secondary text-sm mb-7">Bon retour ! Connectez-vous à votre espace.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#0f0f0f] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/8 bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#c9993a]/30 text-sm text-[#0f0f0f] placeholder:text-[#aaaaaa]"
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0f0f0f] mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black/8 bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#c9993a]/30 text-sm text-[#0f0f0f] placeholder:text-[#aaaaaa] pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3.5 text-[#aaaaaa] hover:text-[#6b6b6b]">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f0f0f] hover:bg-[#1a1a1a] text-white font-semibold py-3 rounded-xl text-sm transition disabled:opacity-50 mt-2"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-xs text-secondary mt-6">
            Pas encore de compte ?{' '}
            <Link href="/auth/inscription" className="text-[#c9993a] font-medium hover:underline">
              Créer mon compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
