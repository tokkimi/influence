"use client"
import { Shield, Zap, BarChart3, MessageSquare, CreditCard, Search } from "lucide-react"
import { useLang } from "@/lib/lang"

const featuresFr = [
  { icon: Search, title: "Matching intelligent", description: "Notre algorithme identifie les influenceurs les plus pertinents pour votre marque.", color: '#c9993a' },
  { icon: BarChart3, title: "Analytics temps réel", description: "Impressions, ROI, engagement — tout en direct dans votre dashboard.", color: '#0a84ff' },
  { icon: Shield, title: "100% sécurisé RGPD", description: "Paiements sécurisés, contrats automatisés, données stockées en France.", color: '#30d158' },
  { icon: MessageSquare, title: "Chat intégré", description: "Communiquez directement avec vos partenaires sans quitter la plateforme.", color: '#ff9500' },
  { icon: CreditCard, title: "Paiements automatiques", description: "Versements à la validation du contenu. Zéro paperasse, zéro retard.", color: '#c9993a' },
  { icon: Zap, title: "Lancez en 24h", description: "Créez et publiez votre première campagne en moins d'une journée.", color: '#0a84ff' },
]

const featuresEn = [
  { icon: Search, title: "Smart Matching", description: "Our algorithm finds the most relevant influencers for your brand instantly.", color: '#c9993a' },
  { icon: BarChart3, title: "Real-time Analytics", description: "Impressions, ROI, engagement — all live in your dashboard.", color: '#0a84ff' },
  { icon: Shield, title: "100% GDPR Secure", description: "Secure payments, automated contracts, data stored in France.", color: '#30d158' },
  { icon: MessageSquare, title: "Integrated Chat", description: "Talk directly to your partners without leaving the platform.", color: '#ff9500' },
  { icon: CreditCard, title: "Auto Payments", description: "Payouts on content validation. Zero paperwork, zero delays.", color: '#c9993a' },
  { icon: Zap, title: "Live in 24h", description: "Create and launch your first campaign in less than a day.", color: '#0a84ff' },
]

export default function Features() {
  const { lang, t } = useLang()
  const features = lang === 'fr' ? featuresFr : featuresEn

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs text-secondary uppercase tracking-widest mb-3">Plateforme</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f] tracking-tight">{t('features.title')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={f.title} className={`group glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 ${i === 1 ? 'sm:row-span-1' : ''}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{background:`${f.color}12`, border:`1px solid ${f.color}20`}}>
                <f.icon className="w-4 h-4" style={{color: f.color}} />
              </div>
              <h3 className="text-[#0f0f0f] font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
