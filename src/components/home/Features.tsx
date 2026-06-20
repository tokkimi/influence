"use client"
import { Shield, Zap, BarChart3, MessageSquare, CreditCard, Search } from "lucide-react"
import { useLang } from "@/lib/lang"

const featuresFr = [
  { icon: Search, title: "Matching intelligent", description: "Notre algorithme identifie les influenceurs les plus pertinents pour votre marque en quelques secondes.", color: '#c9993a', n: '01' },
  { icon: BarChart3, title: "Analytics temps réel", description: "Impressions, ROI, engagement — tout en direct dans votre dashboard.", color: '#0a84ff', n: '02' },
  { icon: Shield, title: "100% sécurisé RGPD", description: "Paiements sécurisés, contrats automatisés, données stockées en France.", color: '#30d158', n: '03' },
  { icon: MessageSquare, title: "Chat intégré", description: "Communiquez directement avec vos partenaires sans quitter la plateforme.", color: '#ff9500', n: '04' },
  { icon: CreditCard, title: "Paiements automatiques", description: "Versements à la validation du contenu. Zéro paperasse, zéro retard.", color: '#c9993a', n: '05' },
  { icon: Zap, title: "Lancez en 24h", description: "Créez et publiez votre première campagne en moins d'une journée.", color: '#0a84ff', n: '06' },
]
const featuresEn = [
  { icon: Search, title: "Smart Matching", description: "Our algorithm finds the most relevant influencers for your brand in seconds.", color: '#c9993a', n: '01' },
  { icon: BarChart3, title: "Real-time Analytics", description: "Impressions, ROI, engagement — all live in your dashboard.", color: '#0a84ff', n: '02' },
  { icon: Shield, title: "100% GDPR Secure", description: "Secure payments, automated contracts, data stored in France.", color: '#30d158', n: '03' },
  { icon: MessageSquare, title: "Integrated Chat", description: "Talk directly to your partners without leaving the platform.", color: '#ff9500', n: '04' },
  { icon: CreditCard, title: "Auto Payments", description: "Payouts on content validation. Zero paperwork, zero delays.", color: '#c9993a', n: '05' },
  { icon: Zap, title: "Live in 24h", description: "Create and launch your first campaign in less than a day.", color: '#0a84ff', n: '06' },
]

export default function Features() {
  const { lang, t } = useLang()
  const features = lang === 'fr' ? featuresFr : featuresEn

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] text-secondary uppercase tracking-widest mb-2 font-medium">Plateforme</p>
            <h2 className="text-xl font-bold text-[#0f0f0f] tracking-tight">{t('features.title')}</h2>
          </div>
        </div>

        {/* Grid compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/6 rounded-2xl overflow-hidden border border-black/6">
          {features.map((f) => (
            <div key={f.title} className="group bg-white p-6 hover:bg-[#fafaf8] transition-colors relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:`${f.color}10`, border:`1px solid ${f.color}20`}}>
                  <f.icon className="w-4 h-4" style={{color: f.color}} />
                </div>
                <span className="text-[10px] font-mono text-black/15 font-bold">{f.n}</span>
              </div>
              <h3 className="text-[#0f0f0f] font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-secondary text-xs leading-relaxed">{f.description}</p>
              <div className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500" style={{background:`linear-gradient(90deg, ${f.color}, transparent)`}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
