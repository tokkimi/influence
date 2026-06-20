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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Un processus simple et transparent pour créer des collaborations authentiques.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-purple-200"></div>
              <span className="bg-purple-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold">Pour les Marques</span>
              <div className="h-px flex-1 bg-purple-200"></div>
            </div>
            <div className="space-y-6">
              {brandSteps.map((step) => (
                <div key={step.step} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-800 rounded-xl flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-amber-500 font-bold text-sm">{step.step}</span>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-amber-200"></div>
              <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">Pour les Influenceurs</span>
              <div className="h-px flex-1 bg-amber-200"></div>
            </div>
            <div className="space-y-6">
              {influencerSteps.map((step) => (
                <div key={step.step} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-purple-800 font-bold text-sm">{step.step}</span>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
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
