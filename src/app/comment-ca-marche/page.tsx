import PageShell from '@/components/layout/PageShell'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'Comment ça marche | Dot The Talents' }

const stepsBrand = [
  { n:'01', t:'Créez votre compte Marque', d:'Inscription gratuite en 2 minutes. Renseignez votre secteur, vos objectifs et votre audience cible.' },
  { n:'02', t:'Lancez votre campagne', d:'Définissez votre brief, votre budget, vos critères d\'influenceurs (catégorie, audience, pays, langue) et vos livrables.' },
  { n:'03', t:'Recevez des profils matchés', d:'Notre algorithme sélectionne les influenceurs les plus pertinents. Vous validez ou ajustez les suggestions.' },
  { n:'04', t:'Suivez en temps réel', d:'Dashboard analytics : impressions, clics, engagement, ROI. Validez les publications et débloquez les paiements.' },
]
const stepsInfluencer = [
  { n:'01', t:'Créez votre profil', d:'Connectez vos réseaux sociaux, renseignez vos statistiques et vos centres d\'intérêt. Notre équipe vérifie votre profil sous 48h.' },
  { n:'02', t:'Recevez des propositions', d:'Les marques compatibles avec votre profil vous contactent directement via la plateforme.' },
  { n:'03', t:'Réalisez la mission', d:'Créez votre contenu selon le brief, publiez et soumettez le lien via la plateforme.' },
  { n:'04', t:'Soyez payé(e)', d:'Dès validation par la marque, le paiement est crédité sur votre portefeuille. Virement bancaire sous 3 jours.' },
]

function Steps({ steps }: { steps: typeof stepsBrand }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {steps.map((s) => (
        <div key={s.n} className="border border-black/6 rounded-2xl p-5 bg-[#fafaf8]">
          <span className="text-[10px] font-mono text-[#c9993a] font-bold">{s.n}</span>
          <h3 className="text-sm font-bold text-[#0f0f0f] mt-1 mb-1.5">{s.t}</h3>
          <p className="text-xs text-[#6b6b6b] leading-relaxed">{s.d}</p>
        </div>
      ))}
    </div>
  )
}

export default function CommentCaMarche() {
  return (
    <PageShell title="Comment ça marche ?" subtitle="Une plateforme simple pour créer des collaborations authentiques">
      <div className="max-w-2xl space-y-12">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9993a] mb-4">Pour les Marques</p>
          <Steps steps={stepsBrand} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9993a] mb-4">Pour les Influenceurs</p>
          <Steps steps={stepsInfluencer} />
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/auth/inscription?role=brand" className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white px-5 py-2.5 rounded-full text-sm font-semibold">
            Je suis une Marque <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/auth/inscription?role=influencer" className="inline-flex items-center gap-2 border border-black/12 text-[#0f0f0f] px-5 py-2.5 rounded-full text-sm font-medium">
            Je suis Influenceur(se) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
