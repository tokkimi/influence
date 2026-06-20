import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = { title: 'CGV – Conditions Générales de Vente | Dot The Talents' }

export default function CGV() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Conditions Générales de Vente</h1>
          <p className="text-gray-500 mb-10">Dernière mise à jour : 1er novembre 2024</p>

          <div className="prose prose-gray max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 1 – Présentation de la société</h2>
              <p className="text-gray-600 leading-relaxed">
                Dot The Talents SAS (ci-après « la Plateforme » ou « DTT ») est une société par actions simplifiée au capital de 10 000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789, dont le siège social est situé au 42 Rue de Rivoli, 75001 Paris, France.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Numéro de TVA intracommunautaire : FR12 123456789<br />
                Contact : contact@dotthetalents.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 2 – Objet et champ d'application</h2>
              <p className="text-gray-600 leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent l'utilisation de la plateforme Dot The Talents, accessible à l'adresse www.dotthetalents.com. Elles s'appliquent à l'ensemble des services proposés par DTT, notamment :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
                <li>La mise en relation entre marques et influenceurs</li>
                <li>La gestion des campagnes de marketing d'influence</li>
                <li>Le traitement des paiements et virements</li>
                <li>L'accès aux outils de pilotage et statistiques</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                Toute utilisation de la Plateforme implique l'acceptation pleine et entière des présentes CGV. DTT se réserve le droit de modifier les présentes CGV à tout moment, avec notification préalable de 30 jours aux utilisateurs actifs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 3 – Inscription et compte utilisateur</h2>
              <p className="text-gray-600 leading-relaxed">
                L'accès aux services de DTT nécessite la création d'un compte. L'utilisateur s'engage à fournir des informations exactes, complètes et à jour. Chaque utilisateur est responsable de la confidentialité de ses identifiants de connexion.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                DTT se réserve le droit de suspendre ou résilier tout compte en cas de violation des présentes CGV, de comportement frauduleux, ou de fourniture d'informations inexactes.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Les mineurs de moins de 18 ans ne peuvent pas s'inscrire sur la Plateforme. En s'inscrivant, l'utilisateur certifie être majeur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 4 – Services proposés aux Marques</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Création de campagnes</h3>
              <p className="text-gray-600 leading-relaxed">
                Les marques peuvent créer des campagnes d'influence en définissant leurs critères de ciblage (catégorie d'influenceur, pays, langue, centres d'intérêt, genre, etc.), leur budget, leur calendrier et leurs livrables attendus.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.2 Sélection des influenceurs</h3>
              <p className="text-gray-600 leading-relaxed">
                DTT propose aux marques des profils d'influenceurs correspondant à leurs critères. La marque peut opter pour une validation manuelle (elle approuve chaque profil) ou automatique (DTT assigne les profils selon les critères définis).
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.3 Portefeuille virtuel</h3>
              <p className="text-gray-600 leading-relaxed">
                Les marques rechargent un portefeuille virtuel via carte bancaire ou virement. Le budget est débité au fur et à mesure des publications validées. Le solde non utilisé peut être récupéré après demande de remboursement (délai : 5 jours ouvrés).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 5 – Services proposés aux Influenceurs</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Offre gratuite</h3>
              <p className="text-gray-600 leading-relaxed">
                L'inscription est gratuite. DTT prélève une commission de 30% sur chaque mission réalisée via la Plateforme.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">5.2 Offre Pro</h3>
              <p className="text-gray-600 leading-relaxed">
                L'abonnement Pro est proposé au tarif de 29,00 € TTC par mois, prélevé le 1er de chaque mois. Il réduit la commission à 5% par mission. L'abonnement est sans engagement et peut être résilié à tout moment avec effet à la fin de la période en cours.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">5.3 Paiement des influenceurs</h3>
              <p className="text-gray-600 leading-relaxed">
                Après publication du contenu et soumission du lien de publication, le paiement est débloqué sur le portefeuille virtuel de l'influenceur. L'influenceur peut demander un virement sur son compte bancaire (délai : 3 jours ouvrés pour l'offre gratuite, 24h pour l'offre Pro).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 6 – Prix et commissions</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-xl text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-700">Service</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Commission DTT</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Conditions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="p-3 text-gray-600">Mission (offre gratuite)</td><td className="p-3 font-medium">30% du montant</td><td className="p-3 text-gray-500">Prélevé automatiquement</td></tr>
                    <tr><td className="p-3 text-gray-600">Mission (offre Pro)</td><td className="p-3 font-medium">5% du montant</td><td className="p-3 text-gray-500">+ 29€/mois d'abonnement</td></tr>
                    <tr><td className="p-3 text-gray-600">Virement bancaire</td><td className="p-3 font-medium">Gratuit</td><td className="p-3 text-gray-500">3 jours ouvrés (24h Pro)</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 leading-relaxed mt-3">
                Tous les prix sont indiqués en euros TTC. DTT est assujettie à la TVA au taux de 20% pour ses services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 7 – Obligations des parties</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">7.1 Obligations des Marques</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Fournir un brief clair et complet</li>
                <li>Respecter les délais convenus avec les influenceurs</li>
                <li>S'assurer de la légalité de leurs produits et services</li>
                <li>Ne pas proposer de contenus illicites ou contraires à l'éthique</li>
                <li>Maintenir un portefeuille suffisamment approvisionné</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">7.2 Obligations des Influenceurs</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Respecter le brief et les délais de publication</li>
                <li>Mentionner le partenariat commercial conformément aux règles ARPP</li>
                <li>Fournir des statistiques réelles et non falsifiées</li>
                <li>Soumettre le lien de publication dans les 48h suivant la publication</li>
                <li>Ne pas acheter de faux abonnés ou d'engagement artificiel</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 8 – Droit de rétractation</h2>
              <p className="text-gray-600 leading-relaxed">
                Conformément aux articles L221-18 et suivants du Code de la consommation, les consommateurs disposent d'un délai de 14 jours à compter de la souscription pour exercer leur droit de rétractation, sans avoir à justifier de motif.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Ce droit ne s'applique pas aux services pleinement exécutés avant la fin du délai de rétractation, avec l'accord préalable du consommateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 9 – Responsabilité</h2>
              <p className="text-gray-600 leading-relaxed">
                DTT est une plateforme de mise en relation. Elle ne peut être tenue responsable du contenu publié par les influenceurs, ni de la qualité des produits ou services des marques. La responsabilité de DTT est limitée au montant des sommes versées pour le service en cause au cours des 12 derniers mois.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 10 – Propriété intellectuelle</h2>
              <p className="text-gray-600 leading-relaxed">
                Les contenus créés par les influenceurs dans le cadre des campagnes restent leur propriété, sauf accord contraire expressément stipulé dans le brief. La marque bénéficie d'une licence d'utilisation pour la durée de la campagne sur les plateformes définies dans le brief.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 11 – Protection des données personnelles (RGPD)</h2>
              <p className="text-gray-600 leading-relaxed">
                DTT traite les données personnelles conformément au Règlement Général sur la Protection des Données (RGPD – UE 2016/679) et à la loi Informatique et Libertés. Les données collectées sont nécessaires au fonctionnement de la Plateforme et ne sont pas revendues à des tiers.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de portabilité et d'opposition sur vos données. Pour exercer ces droits, contactez : dpo@dotthetalents.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 12 – Résolution des litiges</h2>
              <p className="text-gray-600 leading-relaxed">
                En cas de litige entre une marque et un influenceur, DTT propose un service de médiation interne. Si la médiation échoue, les parties peuvent recourir au médiateur de la consommation : Médiation de la consommation numérique (MEDICYS) – www.medicys.fr.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Les présentes CGV sont régies par le droit français. En cas de litige, les tribunaux compétents sont ceux de Paris.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Article 13 – Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                Pour toute question concernant ces CGV :<br />
                Dot The Talents SAS<br />
                42 Rue de Rivoli, 75001 Paris<br />
                Email : legal@dotthetalents.com<br />
                Téléphone : +33 1 23 45 67 89
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
