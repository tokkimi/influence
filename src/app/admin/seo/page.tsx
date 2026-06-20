'use client'

import { useState } from 'react'
import { Save, Globe } from 'lucide-react'

const pages = [
  { id: 'home', label: 'Page d\'accueil', path: '/' },
  { id: 'how-it-works', label: 'Comment ça marche', path: '/comment-ca-marche' },
  { id: 'pricing', label: 'Tarifs', path: '/tarifs' },
  { id: 'faq', label: 'FAQ', path: '/faq' },
]

export default function AdminSeo() {
  const [selectedPage, setSelectedPage] = useState('home')
  const [settings, setSettings] = useState<Record<string, { title: string; description: string; keywords: string }>>({
    home: { title: 'Dot The Talents – Plateforme Marketing d\'Influence Internationale', description: 'Connectez votre marque aux meilleurs influenceurs. Campagnes d\'influence ciblées, ROI mesurable.', keywords: 'marketing influence, influenceurs, campagne influence' },
    'how-it-works': { title: 'Comment ça marche – Dot The Talents', description: 'Découvrez comment fonctionne la plateforme pour marques et influenceurs.', keywords: '' },
    pricing: { title: 'Tarifs – Dot The Talents', description: 'Découvrez nos offres pour influenceurs : gratuit ou Pro à 29€/mois.', keywords: '' },
    faq: { title: 'FAQ – Dot The Talents', description: 'Toutes les réponses à vos questions sur la plateforme.', keywords: '' },
  })
  const [saved, setSaved] = useState(false)

  const page = settings[selectedPage]

  const update = (field: string, value: string) => {
    setSettings(s => ({...s, [selectedPage]: {...s[selectedPage], [field]: value}}))
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Globe className="w-6 h-6 text-purple-700" />
        <h1 className="text-2xl font-bold text-gray-900">SEO</h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Pages list */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 h-fit">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Pages</p>
          <ul className="space-y-1">
            {pages.map(p => (
              <li key={p.id}>
                <button
                  onClick={() => setSelectedPage(p.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition ${selectedPage === p.id ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {p.label}
                  <span className="text-xs text-gray-400 block">{p.path}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* SEO form */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">
            {pages.find(p => p.id === selectedPage)?.label}
          </h2>

          {saved && <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm">✅ Paramètres SEO sauvegardés</div>}

          <form onSubmit={save} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre SEO <span className="text-gray-400 font-normal">(max 60 car.)</span></label>
              <input
                value={page?.title || ''}
                onChange={e => update('title', e.target.value)}
                maxLength={60}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">{(page?.title || '').length}/60 caractères</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta description <span className="text-gray-400 font-normal">(max 160 car.)</span></label>
              <textarea
                value={page?.description || ''}
                onChange={e => update('description', e.target.value)}
                maxLength={160}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">{(page?.description || '').length}/160 caractères</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mots-clés <span className="text-gray-400 font-normal">(séparés par des virgules)</span></label>
              <input
                value={page?.keywords || ''}
                onChange={e => update('keywords', e.target.value)}
                placeholder="marketing influence, influenceurs, campagne..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Aperçu Google</p>
              <p className="text-sm text-blue-600 font-medium line-clamp-1">{page?.title}</p>
              <p className="text-xs text-green-700">dotthetalents.com{pages.find(p => p.id === selectedPage)?.path}</p>
              <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{page?.description}</p>
            </div>
            <button type="submit" className="flex items-center gap-2 bg-purple-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-800 transition text-sm">
              <Save className="w-4 h-4" />
              Sauvegarder
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
