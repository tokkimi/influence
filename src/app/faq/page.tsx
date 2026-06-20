'use client'
import PageShell from '@/components/layout/PageShell'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  { q: "Comment fonctionne Dot The Talents ?", a: "DTT met en relation les marques et les influenceurs via une plateforme automatisée. Les marques créent une campagne, définissent leurs critères, et notre algorithme sélectionne les profils les plus adaptés." },
  { q: "Combien coûte l'inscription ?", a: "L'inscription est gratuite pour les marques et les influenceurs. DTT prélève une commission de 30% sur chaque mission (réduite à 5% avec l'abonnement Pro à 29 €/mois)." },
  { q: "Comment sont vérifiés les influenceurs ?", a: "Chaque profil est vérifié manuellement par notre équipe : identité, statistiques, qualité du contenu et authenticité de l'audience (taux d'engagement réel, absence de faux abonnés)." },
  { q: "Sous quel délai suis-je payé(e) ?", a: "Dès que la marque valide votre publication, le paiement est crédité sur votre portefeuille. Vous pouvez demander un virement sous 3 jours ouvrés (24h avec l'offre Pro)." },
  { q: "Puis-je lancer une campagne avec un petit budget ?", a: "Oui. Le budget minimum de campagne est de 500 € pour une campagne micro-influence. Aucun minimum pour les tests unitaires avec un influenceur sélectionné manuellement." },
  { q: "Les données sont-elles protégées ?", a: "Oui. DTT est conforme au RGPD. Vos données sont hébergées en France et ne sont jamais revendues à des tiers." },
  { q: "Comment contacter le support ?", a: "Via le chat intégré à la plateforme, ou par email à contact@dotthetalents.com. Réponse garantie sous 24h ouvrées." },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-black/5 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between py-5 text-left gap-4">
        <span className="text-sm font-semibold text-[#0f0f0f]">{q}</span>
        <span className="flex-shrink-0 mt-0.5 text-[#c9993a]">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      {open && <p className="text-xs text-[#6b6b6b] leading-relaxed pb-5">{a}</p>}
    </div>
  )
}

export default function FAQPage() {
  return (
    <PageShell title="Questions fréquentes" subtitle="Tout ce que vous devez savoir sur Dot The Talents">
      <div className="max-w-2xl">
        {faqs.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
      </div>
    </PageShell>
  )
}
