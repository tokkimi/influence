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
    <section className="py-28 bg-[#07071a] relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">{t('features.title')}</h2>
          <p className="text-white/45 max-w-xl mx-auto leading-relaxed">{t('features.sub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center mb-5 group-hover:bg-violet-500/20 transition-colors">
                <f.icon className="w-4 h-4 text-violet-400" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
