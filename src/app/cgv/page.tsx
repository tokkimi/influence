import PageShell from '@/components/layout/PageShell'

export const metadata = { title: 'CGV – Conditions Générales de Vente | Dot The Talents' }

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 pb-8 border-b border-black/5 last:border-0">
      <div className="flex items-start gap-4 mb-3">
        <span className="text-[10px] font-mono text-[#c9993a] font-bold mt-0.5 flex-shrink-0">{n}</span>
        <h2 className="text-sm font-bold text-[#0f0f0f]">{title}</h2>
      </div>
      <div className="pl-8 text-xs text-[#6b6b6b] leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

export default function CGV() {
  return (
    <PageShell title="Conditions Générales de Vente" subtitle="Dernière mise à jour : 1er novembre 2025">
      <Section n="01" title="Présentation de la société">
        <p>Dot The Talents SAS — RCS Paris 123 456 789 — 42 Rue de Rivoli, 75001 Paris. TVA : FR12 123456789. Contact : contact@dotthetalents.com</p>
      </Section>
      <Section n="02" title="Objet et champ d'application">
        <p>Les présentes CGV régissent l'utilisation de la plateforme Dot The Talents et s'appliquent à la mise en relation marques/influenceurs, la gestion des campagnes, le traitement des paiements et l'accès aux statistiques.</p>
      </Section>
      <Section n="03" title="Inscription et compte utilisateur">
        <p>L'accès nécessite la création d'un compte avec des informations exactes. DTT peut suspendre tout compte en cas de violation des CGV ou de fraude. Inscription réservée aux majeurs.</p>
      </Section>
      <Section n="04" title="Services aux Marques">
        <p><strong className="text-[#0f0f0f]">Campagnes</strong> — Définissez vos critères (catégorie, pays, langue, budget, calendrier).</p>
        <p><strong className="text-[#0f0f0f]">Sélection</strong> — Validation manuelle ou automatique des profils proposés.</p>
        <p><strong className="text-[#0f0f0f]">Portefeuille</strong> — Rechargement par carte/virement. Solde remboursable sous 5 jours ouvrés.</p>
      </Section>
      <Section n="05" title="Services aux Influenceurs">
        <p><strong className="text-[#0f0f0f]">Offre gratuite</strong> — Commission DTT : 30% par mission réalisée.</p>
        <p><strong className="text-[#0f0f0f]">Offre Pro</strong> — 29 € TTC/mois, commission réduite à 5%. Sans engagement, résiliable à tout moment.</p>
        <p><strong className="text-[#0f0f0f]">Paiement</strong> — Débloqué après validation du contenu. Virement sous 3 jours (24h en Pro).</p>
      </Section>
      <Section n="06" title="Prix et commissions">
        <div className="border border-black/6 rounded-xl overflow-hidden mt-2">
          <table className="w-full text-[11px]">
            <thead className="bg-[#fafaf8]">
              <tr>
                <th className="text-left p-3 font-semibold text-[#0f0f0f]">Service</th>
                <th className="text-left p-3 font-semibold text-[#0f0f0f]">Commission</th>
                <th className="text-left p-3 font-semibold text-[#0f0f0f]">Conditions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <tr><td className="p-3">Mission (gratuit)</td><td className="p-3 font-medium text-[#0f0f0f]">30%</td><td className="p-3">Prélevé automatiquement</td></tr>
              <tr><td className="p-3">Mission (Pro)</td><td className="p-3 font-medium text-[#0f0f0f]">5%</td><td className="p-3">+ 29 €/mois</td></tr>
              <tr><td className="p-3">Virement bancaire</td><td className="p-3 font-medium text-[#0f0f0f]">Gratuit</td><td className="p-3">3j (24h Pro)</td></tr>
            </tbody>
          </table>
        </div>
      </Section>
      <Section n="07" title="Obligations des parties">
        <p><strong className="text-[#0f0f0f]">Marques</strong> — Brief clair, délais respectés, produits légaux, portefeuille approvisionné.</p>
        <p><strong className="text-[#0f0f0f]">Influenceurs</strong> — Respecter le brief, mentionner le partenariat (ARPP), statistiques réelles, lien soumis sous 48h.</p>
      </Section>
      <Section n="08" title="Droit de rétractation">
        <p>14 jours à compter de la souscription (Art. L221-18 Code de la consommation). Non applicable aux services entièrement exécutés avec accord préalable.</p>
      </Section>
      <Section n="09" title="Responsabilité et propriété intellectuelle">
        <p>DTT est une plateforme de mise en relation — responsabilité limitée aux sommes versées sur les 12 derniers mois. Les contenus créés restent la propriété des influenceurs, sauf accord contraire dans le brief.</p>
      </Section>
      <Section n="10" title="RGPD et données personnelles">
        <p>Traitement conforme au RGPD (UE 2016/679). Droits d'accès, rectification, effacement, portabilité et opposition : dpo@dotthetalents.com</p>
      </Section>
      <Section n="11" title="Résolution des litiges et droit applicable">
        <p>Médiation interne, puis MEDICYS (www.medicys.fr). Droit français applicable. Tribunaux compétents : Paris.</p>
        <p className="mt-2">Contact légal : Dot The Talents SAS — 42 Rue de Rivoli, 75001 Paris — legal@dotthetalents.com</p>
      </Section>
    </PageShell>
  )
}
