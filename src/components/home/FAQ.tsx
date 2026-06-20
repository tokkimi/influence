"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  { q: "Qu'est-ce que Dot The Talents ?", a: "Dot The Talents est une plateforme de marketing d'influence qui connecte les marques avec des influenceurs qualifiés. Notre technologie facilite la mise en relation, la gestion des campagnes et le paiement des collaborations." },
  { q: "Comment fonctionne le processus de paiement ?", a: "Les marques rechargent leur portefeuille virtuel sur la plateforme. Lors d'une collaboration, le montant est réservé et versé automatiquement à l'influenceur une fois le contenu validé. Les virements bancaires sont effectués sous 3-5 jours ouvrés." },
  { q: "Quels types d'influenceurs puis-je trouver sur la plateforme ?", a: "Notre plateforme accueille des micro-influenceurs (1K-50K abonnés) et des macro-influenceurs (50K+ abonnés) dans toutes les niches : mode, beauté, fitness, tech, gastronomie, voyage, gaming, lifestyle et bien d'autres." },
  { q: "Comment sont vérifiés les influenceurs ?", a: "Chaque profil passe par un processus de vérification : validation de l'identité, vérification des statistiques d'engagement, et contrôle de la qualité du contenu. Les profils vérifiés arborent un badge bleu." },
  { q: "Quelle est la commission de la plateforme ?", a: "Dot The Talents prélève une commission de 10% sur chaque transaction. Cette commission couvre l'accès à la plateforme, la sécurisation des paiements, le support client et les outils analytics." },
  { q: "Puis-je annuler une campagne en cours ?", a: "Oui, vous pouvez annuler une campagne en cours. Les fonds non dépensés sont recrédités sur votre portefeuille. Des frais d'annulation peuvent s'appliquer si des influenceurs ont déjà commencé à travailler sur votre campagne." },
  { q: "Comment fonctionne le système de messagerie ?", a: "Notre chat intégré permet une communication directe entre marques et influenceurs. Toutes les conversations sont archivées et accessibles depuis votre tableau de bord pour un suivi optimal." },
  { q: "Les données sont-elles conformes au RGPD ?", a: "Absolument. Nous sommes entièrement conformes au RGPD. Vos données personnelles sont stockées en France, chiffrées et ne sont jamais partagées avec des tiers sans votre consentement explicite." },
  { q: "Puis-je proposer des codes promos dans mes campagnes ?", a: "Oui ! Lors de la création d'une campagne, vous pouvez ajouter un code promo exclusif que les influenceurs partageront avec leur communauté. Cela facilite le suivi des conversions." },
  { q: "Que se passe-t-il si un influenceur ne livre pas le contenu ?", a: "En cas de non-livraison dans les délais, notre équipe support intervient. Si la livraison n'a pas lieu, les fonds réservés sont intégralement remboursés sur votre portefeuille." },
  { q: "Existe-t-il une version d'essai gratuite ?", a: "Les influenceurs peuvent s'inscrire gratuitement et accéder à l'essentiel des fonctionnalités. Les marques bénéficient d'une période d'essai de 14 jours pour tester la plateforme sans engagement." },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          <p className="text-xl text-gray-500">Tout ce que vous devez savoir sur Dot The Talents</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4", openIndex === i && "rotate-180")} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  <p className="pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
