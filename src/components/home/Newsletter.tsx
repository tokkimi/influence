"use client"
import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Newsletter() {
  const { lang } = useLang()
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setDone(true)
  }

  return (
    <section className="bg-[#0f0f0f] py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-[#c9993a]/40 to-transparent" />
        <div className="absolute -top-20 right-0 w-[300px] h-[300px] rounded-full opacity-10" style={{background:'radial-gradient(circle, #c9993a 0%, transparent 70%)'}} />
      </div>
      <div className="relative max-w-2xl mx-auto px-5 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9993a] mb-3">Newsletter</p>
        <h2 className="text-xl font-bold text-white tracking-tight mb-2">
          {lang === 'fr' ? 'Restez dans la boucle' : 'Stay in the loop'}
        </h2>
        <p className="text-sm text-white/40 mb-8 max-w-xs mx-auto">
          {lang === 'fr' ? 'Tendances, études de cas et offres exclusives — directement dans votre boîte mail.' : 'Trends, case studies and exclusive offers — directly in your inbox.'}
        </p>
        {done ? (
          <div className="inline-flex items-center gap-2 text-[#30d158] text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            {lang === 'fr' ? 'Merci ! Vous êtes inscrit(e).' : "Thank you! You're subscribed."}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={lang === 'fr' ? 'votre@email.com' : 'your@email.com'} required className="flex-1 px-4 py-3 rounded-full text-sm text-white placeholder:text-white/25 focus:outline-none" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)'}} />
            <button type="submit" className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white flex-shrink-0" style={{background:'#c9993a'}}>
              {lang === 'fr' ? "S'abonner" : 'Subscribe'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
        <p className="text-[10px] text-white/20 mt-4">{lang === 'fr' ? 'Aucun spam. Désabonnement en un clic.' : 'No spam. Unsubscribe in one click.'}</p>
      </div>
    </section>
  )
}
