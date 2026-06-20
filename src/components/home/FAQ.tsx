"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  { q: "Qu'est-ce que Dot The Talents ?", a: "Dot The Talents est une plateforme de marketing d'influence qui connecte les marques avec des influenceurs qualifiés. Notre technologie facilite la mise en relation, la gestion des campagnes et le paiement des collaborations." },
  { q: "Comment fonctionne le processus de paiement ?", a: "Les marques rechargent leur portefeuille virtuel. Le montant est réservé puis versé automatiquement à l'influenceur une fois le contenu validé. Virements bancaires sous 3-5 jours ouvrés." },
  { q: "Quels types d'influenceurs puis-je trouver ?", a: "Micro-influenceurs (1K-50K) et macro-influenceurs (50K+) dans toutes les niches : mode, beauté, fitness, tech, gastronomie, voyage, gaming, lifestyle..." },
  { q: "Comment sont vérifiés les influenceurs ?", a: "Validation de l'identité, vérification des statistiques d'engagement, contrôle qualité du contenu. Les profils vérifiés arborent un badge bleu." },
  { q: "Quelle est la commission de la plateforme ?", a: "10% sur chaque transaction. Cette commission couvre l'accès, la sécurisation des paiements, le support et les outils analytics." },
  { q: "Puis-je annuler une campagne ?", a: "Oui, les fonds non dépensés sont recrédités sur votre portefeuille. Des frais d'annulation peuvent s'appliquer si des influenceurs ont déjà commencé." },
  { q: "Les données sont-elles conformes au RGPD ?", a: "Absolument. Données stockées en France, chiffrées, jamais partagées sans consentement explicite." },
  { q: "Puis-je proposer des codes promos ?", a: "Oui, ajoutez un code promo lors de la création d'une campagne. Les influenceurs le partagent avec leur communauté pour faciliter le suivi des conversions." },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 bg-[#080c1a]">
      <div className="max-w-2xl mx-auto px-5 lg:px-8 space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="liquid-glass-card rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-medium text-white text-sm pr-4">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-white/30 transition-transform flex-shrink-0 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 border-t border-white/6">
                <p className="text-muted text-sm leading-relaxed pt-4">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
