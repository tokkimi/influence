"use client"
import { Shield, Zap, BarChart3, MessageSquare, CreditCard, Search } from "lucide-react"
import { useLang } from "@/lib/lang"

const featuresFr = [
  { icon: Search, title: "Matching intelligent", description: "Notre algorithme identifie les influenceurs les plus pertinents pour votre marque.", color: '#ff2d55' },
  { icon: Shield, title: "Sécurité garantie", description: "Paiements sécurisés, contrats automatisés, conformes au RGPD.", color: '#30d158' },
  { icon: MessageSquare, title: "Chat intégré", description: "Communication en temps réel entre marques et influenceurs.", color: '#0a84ff' },
  { icon: BarChart3, title: "Analytics", description: "Toutes vos métriques en temps réel : impressions, ROI, conversions.", color: '#ff9500' },
  { icon: CreditCard, title: "Paiements auto", description: "Versements automatiques à la validation du contenu.", color: '#ff2d55' },
  { icon: Zap, title: "Résultats rapides", description: "Première campagne lancée en moins de 24h.", color: '#30d158' },
]

const featuresEn = [
  { icon: Search, title: "Smart Matching", description: "Our algorithm finds the most relevant influencers for your brand.", color: '#ff2d55' },
  { icon: Shield, title: "Guaranteed Security", description: "Secure payments, automated contracts, GDPR-compliant.", color: '#30d158' },
  { icon: MessageSquare, title: "Integrated Chat", description: "Real-time communication between brands and influencers.", color: '#0a84ff' },
  { icon: BarChart3, title: "Analytics", description: "All your metrics in real time: impressions, ROI, conversions.", color: '#ff9500' },
  { icon: CreditCard, title: "Auto Payments", description: "Automatic payouts upon content validation.", color: '#ff2d55' },
  { icon: Zap, title: "Fast Results", description: "First campaign launched in under 24h.", color: '#30d158' },
]

export default function Features() {
  const { lang, t } = useLang()
  const features = lang === 'fr' ? featuresFr : featuresEn

  return (
    <section className="py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1d1d1f] mb-4 tracking-tight">{t('features.title')}</h2>
          <p className="text-secondary max-w-md mx-auto">{t('features.sub')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="group glass-card rounded-3xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{background: `${f.color}15`}}>
                <f.icon className="w-5 h-5" style={{color: f.color}} />
              </div>
              <h3 className="text-[#1d1d1f] font-semibold text-[15px] mb-2">{f.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
