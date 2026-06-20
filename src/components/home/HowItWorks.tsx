import { Search, Handshake, TrendingUp, UserPlus, Star, DollarSign } from "lucide-react"

const brandSteps = [
  { icon: UserPlus, step: "01", title: "Créez votre compte", description: "Inscrivez-vous en tant que marque et complétez votre profil. Définissez vos objectifs marketing." },
  { icon: Search, step: "02", title: "Lancez votre campagne", description: "Créez votre campagne avec vos critères : budget, audience cible, type d'influenceurs, dates." },
  { icon: TrendingUp, step: "03", title: "Mesurez vos résultats", description: "Suivez vos KPIs en temps réel et gérez vos influenceurs depuis votre tableau de bord." },
]
const influencerSteps = [
  { icon: Star, step: "01", title: "Créez votre profil", description: "Présentez votre univers, vos réseaux sociaux et vos statistiques d'engagement." },
  { icon: Handshake, step: "02", title: "Recevez des propositions", description: "Les marques vous contactent selon votre profil. Acceptez ou refusez les collaborations." },
  { icon: DollarSign, step: "03", title: "Soyez rémunéré(e)", description: "Publiez votre contenu et recevez votre paiement sécurisé directement sur votre compte." },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#080c1a]">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Marques */}
          <div className="liquid-glass-card rounded-3xl p-8">
            <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 bg-[#0a84ff] rounded-full" />
              <span className="text-white/60 text-xs font-medium">Pour les Marques</span>
            </div>
            <div className="space-y-7">
              {brandSteps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0a84ff]/10 border border-[#0a84ff]/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-4 h-4 text-[#0a84ff]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white/25 font-mono text-xs">{step.step}</span>
                      <h3 className="font-semibold text-white text-sm">{step.title}</h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Influenceurs */}
          <div className="liquid-glass-card rounded-3xl p-8">
            <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 bg-[#f0c040] rounded-full" />
              <span className="text-white/60 text-xs font-medium">Pour les Influenceurs</span>
            </div>
            <div className="space-y-7">
              {influencerSteps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#f0c040]/10 border border-[#f0c040]/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-4 h-4 text-[#f0c040]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white/25 font-mono text-xs">{step.step}</span>
                      <h3 className="font-semibold text-white text-sm">{step.title}</h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
