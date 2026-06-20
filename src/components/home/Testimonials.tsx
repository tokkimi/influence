import { Star } from "lucide-react"

const testimonials = [
  { name: "Claire Mercier", role: "Directrice Marketing, Belle & Co", avatar: "CM", rating: 5, text: "Dot The Talents a révolutionné notre approche du marketing d'influence. En 3 mois, nous avons multiplié notre ROI par 4 grâce à des collaborations ultra-ciblées." },
  { name: "Antoine Rousseau", role: "Fondateur, StartupFrench", avatar: "AR", rating: 5, text: "La plateforme est intuitive et l'équipe très réactive. Nous avons trouvé les influenceurs parfaits pour notre lancement en quelques heures seulement." },
  { name: "Sofia Benali", role: "Influenceuse Lifestyle, 120K abonnés", avatar: "SB", rating: 5, text: "Enfin une plateforme qui respecte les influenceurs ! Les paiements sont ponctuels, les marques sérieuses et l'interface est un plaisir à utiliser." },
  { name: "Marc Dubois", role: "CMO, FashionHouse Paris", avatar: "MD", rating: 5, text: "Le tableau de bord analytics est exceptionnel. On peut suivre chaque campagne en temps réel et ajuster notre stratégie instantanément." },
  { name: "Léa Fontaine", role: "Influenceuse Beauté, 55K abonnés", avatar: "LF", rating: 5, text: "Les propositions reçues correspondent parfaitement à mon univers. Plus besoin de démarcher les marques, elles viennent à moi !" },
  { name: "Pierre Laurent", role: "Directeur Comm, TechCorp", avatar: "PL", rating: 5, text: "Excellent rapport qualité/prix. La commission est transparente et les résultats de nos campagnes dépassent nos attentes initiales." },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
          <p className="text-xl text-gray-500">Ce que disent nos utilisateurs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center text-white text-sm font-bold">{t.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
