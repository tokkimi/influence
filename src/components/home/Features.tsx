"use client"
import { Shield, Zap, BarChart3, MessageSquare, CreditCard, Search } from "lucide-react"
import { useLang } from "@/lib/lang"

const featuresFr = [
  { icon: Search, title: "Matching intelligent", description: "Algorithme de recommandation basé sur vos objectifs, audience cible et secteur.", color: '#f97316', n: '01' },
  { icon: BarChart3, title: "Analytics temps réel", description: "Impressions, ROI, taux d'engagement — tableau de bord en direct.", color: '#0a84ff', n: '02' },
  { icon: Shield, title: "100% sécurisé RGPD", description: "Contrats automatisés, paiements escrow, données hébergées en France.", color: '#30d158', n: '03' },
  { icon: MessageSquare, title: "Chat intégré", description: "Messagerie directe avec vos partenaires sans quitter la plateforme.", color: '#ff9500', n: '04' },
  { icon: CreditCard, title: "Paiements auto", description: "Versements déclenchés à la validation du contenu livré.", color: '#f97316', n: '05' },
  { icon: Zap, title: "Live en 24h", description: "Publiez votre première campagne en moins d'une journée.", color: '#0a84ff', n: '06' },
]
const featuresEn = [
  { icon: Search, title: "Smart Matching", description: "Recommendation engine based on your goals, target audience and sector.", color: '#f97316', n: '01' },
  { icon: BarChart3, title: "Real-time Analytics", description: "Impressions, ROI, engagement rate — live dashboard.", color: '#0a84ff', n: '02' },
  { icon: Shield, title: "100% GDPR Secure", description: "Automated contracts, escrow payments, data hosted in France.", color: '#30d158', n: '03' },
  { icon: MessageSquare, title: "Integrated Chat", description: "Direct messaging with your partners without leaving the platform.", color: '#ff9500', n: '04' },
  { icon: CreditCard, title: "Auto Payments", description: "Payouts triggered on content validation.", color: '#f97316', n: '05' },
  { icon: Zap, title: "Live in 24h", description: "Publish your first campaign in less than a day.", color: '#0a84ff', n: '06' },
]

export default function Features() {
  const { lang, t } = useLang()
  const features = lang === 'fr' ? featuresFr : featuresEn

  return (
    <section className="py-16 bg-white border-t border-black/6">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="mb-8">
          <h2 className="text-base font-bold text-[#0f0f0f]">{t('features.title')}</h2>
          <div className="w-8 h-0.5 bg-[#f97316] mt-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/6 border border-black/6 rounded-2xl overflow-hidden">
          {features.map((f) => (
            <div key={f.title} className="group bg-white hover:bg-[#fafaf8] transition-colors p-5 relative">
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:`${f.color}12`, border:`1px solid ${f.color}22`}}>
                  <f.icon className="w-3.5 h-3.5" style={{color: f.color}} />
                </div>
                <span className="text-[9px] font-mono text-black/12 font-bold">{f.n}</span>
              </div>
              <h3 className="text-[#0f0f0f] font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-[#6b6b6b] text-xs leading-relaxed">{f.description}</p>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500" style={{background:f.color}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
