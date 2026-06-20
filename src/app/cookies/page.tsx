import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = { title: 'Politique de Cookies | Dot The Talents' }

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Politique de cookies</h1>
          <p className="text-gray-500 mb-10">Dernière mise à jour : 1er novembre 2024</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Qu'est-ce qu'un cookie ?</h2>
              <p className="text-gray-600 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lors de votre navigation sur un site web. Les cookies permettent au site de mémoriser vos préférences, d'analyser votre comportement de navigation et d'améliorer votre expérience utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Les cookies que nous utilisons</h2>
              <div className="space-y-4">
                {[
                  { name: 'Cookies strictement nécessaires', desc: 'Ces cookies sont indispensables au fonctionnement du site. Ils vous permettent de naviguer et d\'utiliser les fonctionnalités de base (connexion, panier, etc.). Ils ne peuvent pas être désactivés.', examples: 'Session, authentification, sécurité CSRF', retention: 'Session / 30 jours', obligatoire: true },
                  { name: 'Cookies analytiques', desc: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des informations de manière anonyme. Ils nous permettent d\'améliorer notre plateforme.', examples: 'Google Analytics, Hotjar', retention: '13 mois', obligatoire: false },
                  { name: 'Cookies fonctionnels', desc: 'Ces cookies permettent au site de se souvenir de vos choix (langue préférée, région, etc.) pour vous offrir une expérience personnalisée.', examples: 'Préférences de langue, thème', retention: '1 an', obligatoire: false },
                  { name: 'Cookies publicitaires', desc: 'Ces cookies sont utilisés pour vous proposer des publicités pertinentes et mesurer l\'efficacité des campagnes. Ils peuvent être partagés avec nos partenaires publicitaires.', examples: 'Meta Pixel, Google Ads', retention: '3 mois', obligatoire: false },
                ].map((c, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{c.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${c.obligatoire ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {c.obligatoire ? 'Obligatoire' : 'Optionnel'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{c.desc}</p>
                    <div className="flex gap-6 text-xs text-gray-400">
                      <span>📋 Exemples : {c.examples}</span>
                      <span>⏱ Durée : {c.retention}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Comment gérer vos préférences ?</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Lors de votre première visite, un bandeau vous propose d'accepter ou de refuser les cookies optionnels. Vous pouvez modifier vos préférences à tout moment :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Via notre plateforme</strong> : Cliquez sur "Gérer les cookies" en bas de page</li>
                <li><strong>Via votre navigateur</strong> : La plupart des navigateurs permettent de bloquer ou supprimer les cookies dans leurs paramètres</li>
                <li><strong>Via des outils tiers</strong> : Des extensions comme uBlock Origin ou Privacy Badger permettent de contrôler les traceurs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Durée de conservation</h2>
              <p className="text-gray-600 leading-relaxed">
                La durée de conservation des cookies varie selon leur type. Conformément à la recommandation de la CNIL, aucun cookie ne dépasse une durée de conservation de 13 mois sans renouvellement de votre consentement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Base légale</h2>
              <p className="text-gray-600 leading-relaxed">
                Le dépôt des cookies nécessaires est fondé sur notre intérêt légitime (article 6.1.f du RGPD). Pour les cookies optionnels, la base légale est votre consentement (article 6.1.a du RGPD), librement donné, spécifique, éclairé et univoque.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question sur notre politique de cookies ou pour exercer vos droits RGPD :<br />
                Email : dpo@dotthetalents.com<br />
                Adresse : Dot The Talents SAS, 42 Rue de Rivoli, 75001 Paris
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Vous pouvez également adresser une réclamation à la CNIL (www.cnil.fr) si vous estimez que vos droits ne sont pas respectés.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
