import { Shield, Zap, BarChart3, MessageSquare, CreditCard, Search } from "lucide-react"

const features = [
  { icon: Search, title: "Matching intelligent", description: "Notre algorithme analyse vos critères et identifie les influenceurs les plus pertinents pour votre marque." },
  { icon: Shield, title: "Sécurité garantie", description: "Paiements sécurisés, contrats automatisés et protection des données conformes au RGPD." },
  { icon: MessageSquare, title: "Communication intégrée", description: "Chat en temps réel entre marques et influenceurs, tout est centralisé sur la plateforme." },
  { icon: BarChart3, title: "Analytics en temps réel", description: "Tableau de bord avec toutes vos métriques : impressions, engagement, ROI, conversions." },
  { icon: CreditCard, title: "Paiements automatisés", description: "Versements automatiques à la validation du contenu. Zéro paperasse, zéro retard." },
  { icon: Zap, title: "Résultats rapides", description: "Lancez votre première campagne en moins de 24h et obtenez vos premiers résultats rapidement." },
]

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tout ce dont vous avez besoin</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Une plateforme complète pour gérer vos campagnes d&apos;influence de A à Z.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-800 transition-colors">
                <feature.icon className="w-6 h-6 text-purple-800 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
