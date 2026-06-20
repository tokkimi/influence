import Link from 'next/link'
import { Check } from 'lucide-react'

export default function Pricing() {
  return (
    <section id="tarifs" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-700 font-semibold text-sm uppercase tracking-wider">Offres influenceurs</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Choisissez votre formule
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Commencez gratuitement et évoluez vers notre offre Pro pour maximiser vos revenus
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <span className="text-gray-500 text-sm font-medium">Offre Gratuite</span>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-5xl font-bold text-gray-900">0€</span>
                <span className="text-gray-400 pb-2">/mois</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Commission de 30% par mission</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'Profil public complet',
                'Accès aux missions de la plateforme',
                'Portefeuille virtuel',
                'Chat avec les marques',
                'Statistiques de base',
                '30% de commission par mission',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/auth/inscription?role=influencer&plan=free"
              className="block text-center border-2 border-purple-700 text-purple-700 font-semibold px-6 py-3 rounded-full hover:bg-purple-50 transition"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">⭐ RECOMMANDÉ</span>
            </div>
            <div className="mb-6">
              <span className="text-purple-300 text-sm font-medium">Offre Pro</span>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-5xl font-bold">29€</span>
                <span className="text-purple-300 pb-2">/mois</span>
              </div>
              <p className="text-sm text-purple-300 mt-2">Seulement 5% de commission par mission</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'Tout du plan gratuit',
                'Commission réduite à 5%',
                'Profil mis en avant (badge Pro)',
                'Accès prioritaire aux campagnes premium',
                'Statistiques avancées',
                'Support prioritaire',
                'Virement bancaire accéléré (24h)',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/90">
                  <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/auth/inscription?role=influencer&plan=pro"
              className="block text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-full transition"
            >
              Démarrer avec Pro
            </Link>
            <p className="text-xs text-purple-300 text-center mt-3">Résiliation à tout moment · Sans engagement</p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          💡 L&apos;offre Pro est rentable à partir de 43€ de missions par mois. La plupart de nos influenceurs Pro gagnent entre 500€ et 5 000€/mois.
        </p>
      </div>
    </section>
  )
}
