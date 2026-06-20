'use client'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Building2, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { LogoMark } from '@/components/layout/Navbar'

function InscriptionForm() {
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') === 'brand' ? 'brand' : 'influencer'
  const [role, setRole] = useState(defaultRole)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', company: '' })

  const inputClass = "w-full px-4 py-3 rounded-xl border border-black/8 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9993a]/25 text-sm text-[#0f0f0f] placeholder:text-[#aaaaaa]"

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf8] px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 bg-[#c9993a]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-7 h-7 text-[#c9993a]" />
          </div>
          <h2 className="text-lg font-bold text-[#0f0f0f] mb-2">Compte créé !</h2>
          <p className="text-sm text-[#6b6b6b] mb-6">Notre équipe va valider votre profil sous 24h.</p>
          <Link href="/auth/connexion" className="bg-[#0f0f0f] text-white px-6 py-3 rounded-full text-sm font-semibold inline-block">
            Se connecter
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex justify-center mb-10"><LogoMark /></Link>

        <div className="bg-white rounded-3xl border border-black/6 p-8" style={{boxShadow:'0 8px 40px rgba(0,0,0,0.06)'}}>
          <h1 className="text-lg font-bold text-[#0f0f0f] mb-1">Créer mon compte</h1>
          <p className="text-xs text-[#6b6b6b] mb-6">Rejoignez la communauté Dot The Talents</p>

          {/* Choix du rôle */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              { id:'brand', Icon: Building2, label:'Je suis une Marque', sub:'Lancer des campagnes' },
              { id:'influencer', Icon: Star, label:'Je suis Influenceur(se)', sub:'Monétiser mon audience' },
            ].map(({ id, Icon, label, sub }) => (
              <button key={id} onClick={() => setRole(id)} className={`p-3.5 rounded-2xl border text-left transition-all ${role === id ? 'border-[#c9993a] bg-[#c9993a]/5' : 'border-black/8 hover:border-black/15'}`}>
                <Icon className={`w-4 h-4 mb-2 ${role === id ? 'text-[#c9993a]' : 'text-[#aaaaaa]'}`} />
                <p className={`font-semibold text-[11px] leading-tight ${role === id ? 'text-[#0f0f0f]' : 'text-[#6b6b6b]'}`}>{label}</p>
                <p className="text-[10px] text-[#aaaaaa] mt-0.5">{sub}</p>
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-3.5">
            {role === 'brand' ? (
              <div>
                <label className="block text-[11px] font-medium text-[#0f0f0f] mb-1.5">Nom de l&apos;entreprise</label>
                <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required className={inputClass} placeholder="Ma Marque SAS" />
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-medium text-[#0f0f0f] mb-1.5">Prénom & Nom</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className={inputClass} placeholder="Sofia Martini" />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-medium text-[#0f0f0f] mb-1.5">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className={inputClass} placeholder="vous@exemple.com" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#0f0f0f] mb-1.5">Mot de passe</label>
              <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required minLength={8} className={inputClass} placeholder="8 caractères minimum" />
            </div>
            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" id="cgv" required className="mt-0.5 accent-[#c9993a]" />
              <label htmlFor="cgv" className="text-[11px] text-[#6b6b6b]">
                J&apos;accepte les <Link href="/cgv" className="text-[#c9993a] underline">CGV</Link> et la <Link href="/cookies" className="text-[#c9993a] underline">Politique de confidentialité</Link>
              </label>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#0f0f0f] hover:bg-[#222] text-white font-semibold py-3 rounded-full text-sm transition mt-1">
              Créer mon compte <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-[#6b6b6b] mt-5">
            Déjà un compte ? <Link href="/auth/connexion" className="text-[#c9993a] font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function InscriptionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafaf8]" />}>
      <InscriptionForm />
    </Suspense>
  )
}
