'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Building2, Star, ArrowRight } from 'lucide-react'

export default function InscriptionContent() {
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') === 'brand' ? 'brand' : 'influencer'
  const [role, setRole] = useState(defaultRole)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '', company: '', website: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Compte créé !</h2>
          <p className="text-gray-500 mb-6">
            Votre demande a été soumise. Pour l&apos;instant, utilisez les comptes de démonstration.
          </p>
          <Link href="/auth/connexion" className="bg-purple-700 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-800 transition inline-block">
            Se connecter (compte démo)
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900 to-purple-700 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative text-white px-12 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">Rejoignez-nous</h2>
          <div className="space-y-4 text-sm">
            {['5 420 influenceurs certifiés', '847 marques partenaires', '52 pays représentés', '94% de taux de satisfaction'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-900 text-xs font-bold">✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-800 to-purple-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <span className="font-bold text-xl text-purple-900">Dot The Talents</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Créer mon compte</h1>
          <p className="text-gray-500 mb-6">Rejoignez la communauté Dot The Talents</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => setRole('brand')} className={`p-4 rounded-xl border-2 text-left transition ${role === 'brand' ? 'border-purple-700 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
              <Building2 className={`w-6 h-6 mb-2 ${role === 'brand' ? 'text-purple-700' : 'text-gray-400'}`} />
              <p className={`font-semibold text-sm ${role === 'brand' ? 'text-purple-700' : 'text-gray-700'}`}>Je suis une Marque</p>
              <p className="text-xs text-gray-400 mt-0.5">Lancer des campagnes</p>
            </button>
            <button onClick={() => setRole('influencer')} className={`p-4 rounded-xl border-2 text-left transition ${role === 'influencer' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}>
              <Star className={`w-6 h-6 mb-2 ${role === 'influencer' ? 'text-amber-600' : 'text-gray-400'}`} />
              <p className={`font-semibold text-sm ${role === 'influencer' ? 'text-amber-700' : 'text-gray-700'}`}>Je suis Influenceur(se)</p>
              <p className="text-xs text-gray-400 mt-0.5">Monétiser mon audience</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {role === 'brand' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l&apos;entreprise</label>
                <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="Ma Marque SAS" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom & Nom / Pseudo</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="Sofia Martini" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="vous@exemple.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required minLength={8} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="8 caractères minimum" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <input type="password" value={formData.confirm} onChange={e => setFormData({...formData, confirm: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="••••••••" />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="cgv" required className="mt-1" />
              <label htmlFor="cgv" className="text-xs text-gray-500">
                J&apos;accepte les <Link href="/cgv" className="text-purple-700 underline">CGV</Link> et la <Link href="/cookies" className="text-purple-700 underline">Politique de confidentialité</Link>
              </label>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition">
              Créer mon compte <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ? <Link href="/auth/connexion" className="text-purple-700 font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
