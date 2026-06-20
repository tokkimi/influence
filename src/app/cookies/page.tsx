import PageShell from '@/components/layout/PageShell'

export const metadata = { title: 'Cookies | Dot The Talents' }

export default function CookiesPage() {
  return (
    <PageShell title="Politique de Cookies" subtitle="Dernière mise à jour : 1er novembre 2025">
      <div className="max-w-2xl space-y-8 text-xs text-[#6b6b6b] leading-relaxed">
        {[
          { n:'01', t:'Qu\'est-ce qu\'un cookie ?', c:'Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d\'un site. Il permet de mémoriser des informations de navigation et d\'améliorer votre expérience.' },
          { n:'02', t:'Cookies que nous utilisons', c:'Cookies techniques (nécessaires au fonctionnement), cookies analytiques (mesure d\'audience anonyme via un outil RGPD-compatible), cookies de préférences (mémorisation de votre langue). Nous n\'utilisons aucun cookie publicitaire tiers.' },
          { n:'03', t:'Durée de conservation', c:'Les cookies techniques sont supprimés à la fermeture de session. Les cookies analytiques et de préférences sont conservés maximum 13 mois.' },
          { n:'04', t:'Gestion de vos préférences', c:'Vous pouvez accepter ou refuser les cookies non essentiels via la bannière affichée lors de votre première visite, ou depuis les paramètres de votre navigateur à tout moment.' },
          { n:'05', t:'Contact', c:'Pour toute question : dpo@dotthetalents.com' },
        ].map(({ n, t, c }) => (
          <div key={n} className="pb-8 border-b border-black/5 last:border-0">
            <div className="flex items-start gap-4 mb-2">
              <span className="text-[10px] font-mono text-[#c9993a] font-bold flex-shrink-0">{n}</span>
              <h2 className="text-sm font-bold text-[#0f0f0f]">{t}</h2>
            </div>
            <p className="pl-8">{c}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
