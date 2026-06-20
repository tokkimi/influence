import Link from 'next/link'
import { Check } from 'lucide-react'

export default function Pricing() {
  return (
    <section className="py-24 bg-[#080c1a]">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-2 gap-5">

          {/* Free */}
          <div className="liquid-glass-card rounded-3xl p-8">
            <p className="text-muted text-xs font-medium uppercase tracking-widest mb-4">Gratuit</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-white">0€</span>
              <span className="text-muted text-sm pb-1">/mois</span>
            </div>
            <p className="text-muted text-xs mb-8">30% de commission par mission</p>
            <ul className="space-y-3 mb-8">
              {['Profil public complet', 'Accès aux missions', 'Portefeuille virtuel', 'Chat avec les marques', 'Statistiques de base'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <Check className="w-4 h-4 text-[#30d158] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/auth/inscription?role=influencer&plan=free" className="block text-center liquid-glass hover:bg-white/10 text-white font-medium px-6 py-3 rounded-2xl text-sm transition-all border border-white/15">
              Commencer gratuitement
            </Link>
          </div>

          {/* Pro */}
          <div className="liquid-glass-card rounded-3xl p-8 border border-[#f0c040]/20 relative overflow-hidden">
            <div className="absolute top-5 right-5">
              <span className="bg-[#f0c040] text-[#080c1a] text-[10px] font-bold px-2.5 py-1 rounded-full">RECOMMANDÉ</span>
            </div>
            <p className="text-[#f0c040] text-xs font-medium uppercase tracking-widest mb-4">Pro</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-white">29€</span>
              <span className="text-muted text-sm pb-1">/mois</span>
            </div>
            <p className="text-muted text-xs mb-8">Seulement 5% de commission</p>
            <ul className="space-y-3 mb-8">
              {['Tout du plan gratuit', 'Commission réduite à 5%', 'Badge Pro & mise en avant', 'Campagnes premium en priorité', 'Stats avancées', 'Support prioritaire', 'Virement 24h'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <Check className="w-4 h-4 text-[#f0c040] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/auth/inscription?role=influencer&plan=pro" className="block text-center bg-[#f0c040] hover:bg-[#f4d060] text-[#080c1a] font-bold px-6 py-3 rounded-2xl text-sm transition-all">
              Démarrer avec Pro
            </Link>
            <p className="text-faint text-xs text-center mt-3">Sans engagement · Résiliation à tout moment</p>
          </div>
        </div>

        <p className="text-center text-faint text-xs mt-8">
          💡 L&apos;offre Pro est rentable à partir de 43€ de missions/mois.
        </p>
      </div>
    </section>
  )
}
