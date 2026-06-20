import PageShell from '@/components/layout/PageShell'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export const metadata = { title: 'Tarifs | Dot The Talents' }

export default function TarifsPage() {
  return (
    <PageShell title="Tarifs" subtitle="Transparent, sans engagement, rentable dès le premier mois">
      <div className="max-w-2xl space-y-10">

        {/* Influenceurs */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9993a] mb-4">Influenceurs</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { plan:'Gratuit', price:'0 €', period:'à vie', commission:'30%', features:['Accès à toutes les campagnes','Chat intégré','Paiement sous 3 jours ouvrés','Profil vérifié'], highlight: false },
              { plan:'Pro', price:'29 €', period:'/mois', commission:'5%', features:['Tout le gratuit inclus','Commission réduite à 5%','Paiement sous 24h','Badge Pro sur votre profil'], highlight: true },
            ].map((p) => (
              <div key={p.plan} className={`rounded-2xl p-6 border ${p.highlight ? 'bg-[#0f0f0f] border-[#0f0f0f]' : 'bg-[#fafaf8] border-black/8'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${p.highlight ? 'text-[#c9993a]' : 'text-[#aaaaaa]'}`}>{p.plan}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-2xl font-black tracking-tight ${p.highlight ? 'text-white' : 'text-[#0f0f0f]'}`}>{p.price}</span>
                  <span className={`text-xs ${p.highlight ? 'text-white/40' : 'text-[#aaaaaa]'}`}>{p.period}</span>
                </div>
                <p className={`text-xs mb-5 ${p.highlight ? 'text-white/40' : 'text-[#6b6b6b]'}`}>Commission : <strong className={p.highlight ? 'text-[#c9993a]' : 'text-[#0f0f0f]'}>{p.commission}</strong> par mission</p>
                <ul className="space-y-2 mb-5">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${p.highlight ? 'text-[#c9993a]' : 'text-[#30d158]'}`} />
                      <span className={p.highlight ? 'text-white/70' : 'text-[#6b6b6b]'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/inscription?role=influencer" className={`block text-center text-xs font-semibold py-2.5 rounded-full transition ${p.highlight ? 'bg-[#c9993a] text-white' : 'bg-[#0f0f0f] text-white'}`}>
                  Commencer
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Marques */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9993a] mb-4">Marques</p>
          <div className="border border-black/8 rounded-2xl p-6 bg-[#fafaf8]">
            <p className="text-sm font-bold text-[#0f0f0f] mb-1">Accès plateforme gratuit</p>
            <p className="text-xs text-[#6b6b6b] mb-4">Payez uniquement ce que vous utilisez. Budget de campagne minimum : <strong className="text-[#0f0f0f]">500 €</strong>.</p>
            <ul className="grid sm:grid-cols-2 gap-2 mb-5">
              {['Dashboard analytics temps réel','Matching algorithmique','Chat intégré','Contrats automatisés','Support dédié','Facturation automatique'].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#30d158] flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white text-xs font-semibold px-5 py-2.5 rounded-full">
              Créer mon compte Marque <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
