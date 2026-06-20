"use client"
import { Shield, Zap, BarChart3, MessageSquare, CreditCard, Search } from "lucide-react"
import { useLang } from "@/lib/lang"

const featuresFr = [
  { icon: Search, title: "Matching intelligent", description: "Notre algorithme identifie les influenceurs les plus pertinents pour votre marque en quelques secondes.", span: 'col-span-1 row-span-1' },
  { icon: BarChart3, title: "Analytics temps réel", description: "Impressions, ROI, taux d'engagement — tout en direct dans votre tableau de bord.", span: 'col-span-1 row-span-2' },
  { icon: Shield, title: "100% sécurisé", description: "Paiements sécurisés et conformes RGPD.", span: 'col-span-1 row-span-1' },
  { icon: MessageSquare, title: "Chat intégré", description: "Communiquez directement avec vos partenaires sans quitter la plateforme.", span: 'col-span-2 row-span-1' },
  { icon: CreditCard, title: "Paiements automatiques", description: "Versements déclenchés automatiquement à la validation du contenu.", span: 'col-span-1 row-span-1' },
  { icon: Zap, title: "24h pour démarrer", description: "Première campagne live en moins d'une journée.", span: 'col-span-1 row-span-1' },
]

const featuresEn = [
  { icon: Search, title: "Smart Matching", description: "Our algorithm finds the most relevant influencers for your brand in seconds.", span: 'col-span-1 row-span-1' },
  { icon: BarChart3, title: "Real-time Analytics", description: "Impressions, ROI, engagement rate — all live in your dashboard.", span: 'col-span-1 row-span-2' },
  { icon: Shield, title: "100% Secure", description: "Secure payments, GDPR compliant.", span: 'col-span-1 row-span-1' },
  { icon: MessageSquare, title: "Integrated Chat", description: "Talk to your partners directly without leaving the platform.", span: 'col-span-2 row-span-1' },
  { icon: CreditCard, title: "Auto Payments", description: "Payouts triggered automatically upon content validation.", span: 'col-span-1 row-span-1' },
  { icon: Zap, title: "Live in 24h", description: "First campaign live in less than a day.", span: 'col-span-1 row-span-1' },
]

const colors = ['#f0c040', '#0a84ff', '#30d158', '#ff9500', '#ff2d55', '#64d2ff']

export default function Features() {
  const { lang, t } = useLang()
  const features = lang === 'fr' ? featuresFr : featuresEn

  return (
    <section className="py-28 bg-[#080c1a] relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{background:'radial-gradient(circle, rgba(20,60,120,0.3) 0%, transparent 70%)'}} />
      </div>
      <div className="relative max-w-5xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">{t('features.title')}</h2>
          <p className="text-muted max-w-md mx-auto text-sm leading-relaxed">{t('features.sub')}</p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={f.title} className={`liquid-glass-card rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 ${i === 3 ? 'lg:col-span-2' : ''}`}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5" style={{background:`${colors[i]}18`, border:`1px solid ${colors[i]}30`}}>
                <f.icon className="w-4.5 h-4.5" style={{color: colors[i], width:18, height:18}} />
              </div>
              <h3 className="text-white font-semibold text-[15px] mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
