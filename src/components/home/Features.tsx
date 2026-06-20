"use client"
import { Shield, Zap, BarChart3, MessageSquare, CreditCard, Search } from "lucide-react"
import { useLang } from "@/lib/lang"

const featuresFr = [
  { icon: Search, title: "Matching intelligent", description: "Notre algorithme analyse vos critères et identifie les influenceurs les plus pertinents pour votre marque." },
  { icon: Shield, title: "Sécurité garantie", description: "Paiements sécurisés, contrats automatisés et protection des données conformes au RGPD." },
  { icon: MessageSquare, title: "Communication intégrée", description: "Chat en temps réel entre marques et influenceurs, tout est centralisé sur la plateforme." },
  { icon: BarChart3, title: "Analytics en temps réel", description: "Tableau de bord avec toutes vos métriques : impressions, engagement, ROI, conversions." },
  { icon: CreditCard, title: "Paiements automatisés", description: "Versements automatiques à la validation du contenu. Zéro paperasse, zéro retard." },
  { icon: Zap, title: "Résultats rapides", description: "Lancez votre première campagne en moins de 24h et obtenez vos premiers résultats rapidement." },
]

const featuresEn = [
  { icon: Search, title: "Smart Matching", description: "Our algorithm analyzes your criteria and identifies the most relevant influencers for your brand." },
  { icon: Shield, title: "Guaranteed Security", description: "Secure payments, automated contracts, and GDPR-compliant data protection." },
  { icon: MessageSquare, title: "Integrated Chat", description: "Real-time chat between brands and influencers — everything centralized on one platform." },
  { icon: BarChart3, title: "Real-time Analytics", description: "Dashboard with all your metrics: impressions, engagement, ROI, conversions." },
  { icon: CreditCard, title: "Automated Payments", description: "Automatic payouts upon content validation. Zero paperwork, zero delays." },
  { icon: Zap, title: "Fast Results", description: "Launch your first campaign in under 24h and get your first results quickly." },
]

export default function Features() {
  const { lang, t } = useLang()
  const features = lang === 'fr' ? featuresFr : featuresEn

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-ink-900 mb-4">{t('features.title')}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('features.sub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="group p-7 rounded-2xl border border-gray-100 hover:border-ink-200 hover:shadow-ink transition-all duration-300 cursor-default">
              <div className="w-12 h-12 bg-ink-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-ink-700 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-ink-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
