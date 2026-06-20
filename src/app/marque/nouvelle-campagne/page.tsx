'use client'

import { useState } from 'react'
import { Upload, ArrowRight, ArrowLeft, Check } from 'lucide-react'

const interests = ['Mode', 'Beauté', 'Fitness', 'Tech', 'Gaming', 'Voyage', 'Gastronomie', 'Lifestyle', 'Sport', 'Musique', 'Cinéma', 'Business', 'Développement personnel', 'Bien-être', 'Décoration', 'Cuisine']
const countries = ['France', 'Belgique', 'Suisse', 'Canada', 'Maroc', 'Espagne', 'Italie', 'Allemagne', 'Royaume-Uni', 'États-Unis']
const languages = ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 'Portugais', 'Arabe']

export default function NouvelleCampagne() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: '',
    targetCategory: '',
    targetGender: '',
    targetInterests: [] as string[],
    targetCountries: [] as string[],
    targetLanguages: [] as string[],
    promoCode: '',
    websiteUrl: '',
    autoAssign: false,
    documentName: '',
  })

  const toggle = (key: 'targetInterests' | 'targetCountries' | 'targetLanguages', val: string) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
    }))
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Campagne soumise !</h2>
          <p className="text-gray-500 mb-6">Notre équipe va analyser votre demande et vous proposer des profils sous 24h.</p>
          <button onClick={() => { setSubmitted(false); setStep(1) }} className="bg-purple-700 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-800 transition">
            Créer une nouvelle campagne
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Nouvelle campagne</h1>
        <p className="text-gray-500">Étape {step} sur 3</p>
        <div className="flex gap-1 mt-3">
          {[1,2,3].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-purple-600' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-5 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900">Informations générales</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la campagne *</label>
            <input
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Ex: Lancement collection printemps 2024"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description / Brief *</label>
            <textarea
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Décrivez votre campagne, vos attentes, le ton de communication..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget total (€) *</label>
              <input
                type="number"
                value={form.budget}
                onChange={e => setForm({...form, budget: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                placeholder="5000"
                min="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code promo</label>
              <input
                value={form.promoCode}
                onChange={e => setForm({...form, promoCode: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                placeholder="PROMO20"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
              <input type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
              <input type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de votre site</label>
            <input value={form.websiteUrl} onChange={e => setForm({...form, websiteUrl: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="https://votremarque.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document de présentation</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-300 transition cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Glissez votre PDF ou cliquez pour choisir</p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX, PPTX · Max 10 Mo</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-6 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900">Ciblage des influenceurs</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie d&apos;influenceur</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: 'MICRO', label: 'Micro', sub: '< 10K abonnés' },
                { val: 'MACRO', label: 'Macro', sub: '10K – 500K' },
                { val: 'INTERNATIONAL', label: 'International', sub: '500K+' },
              ].map(c => (
                <button key={c.val} onClick={() => setForm({...form, targetCategory: c.val})}
                  className={`p-3 rounded-xl border-2 text-left transition ${form.targetCategory === c.val ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                  <p className={`font-medium text-sm ${form.targetCategory === c.val ? 'text-purple-700' : 'text-gray-700'}`}>{c.label}</p>
                  <p className="text-xs text-gray-400">{c.sub}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre cible</label>
            <div className="flex gap-3">
              {['Tous', 'Femme', 'Homme'].map(g => (
                <button key={g} onClick={() => setForm({...form, targetGender: g === 'Tous' ? '' : g})}
                  className={`px-4 py-2 rounded-full text-sm border-2 transition ${(form.targetGender === g || (g === 'Tous' && !form.targetGender)) ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Centres d&apos;intérêt</label>
            <div className="flex flex-wrap gap-2">
              {interests.map(int => (
                <button key={int} onClick={() => toggle('targetInterests', int)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${form.targetInterests.includes(int) ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                  {int}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pays cibles</label>
            <div className="flex flex-wrap gap-2">
              {countries.map(c => (
                <button key={c} onClick={() => toggle('targetCountries', c)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${form.targetCountries.includes(c) ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Langues parlées</label>
            <div className="flex flex-wrap gap-2">
              {languages.map(l => (
                <button key={l} onClick={() => toggle('targetLanguages', l)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${form.targetLanguages.includes(l) ? 'bg-green-600 border-green-600 text-white' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-5 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900">Validation et mode d&apos;assignation</h2>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Mode d&apos;assignation des influenceurs</label>
            <div
              onClick={() => setForm({...form, autoAssign: false})}
              className={`p-4 rounded-xl border-2 cursor-pointer transition ${!form.autoAssign ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
            >
              <p className={`font-medium text-sm ${!form.autoAssign ? 'text-purple-700' : 'text-gray-700'}`}>✋ Validation manuelle</p>
              <p className="text-xs text-gray-500 mt-1">Vous recevrez les profils proposés et validerez chaque influenceur un par un.</p>
            </div>
            <div
              onClick={() => setForm({...form, autoAssign: true})}
              className={`p-4 rounded-xl border-2 cursor-pointer transition ${form.autoAssign ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
            >
              <p className={`font-medium text-sm ${form.autoAssign ? 'text-purple-700' : 'text-gray-700'}`}>🤖 Assignation automatique</p>
              <p className="text-xs text-gray-500 mt-1">Notre algorithme sélectionne et assigne automatiquement les meilleurs profils selon vos critères.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-sm">
            <p className="font-medium text-gray-900 mb-3">Récapitulatif</p>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between"><span>Titre</span><span className="font-medium text-gray-900 text-right max-w-48 truncate">{form.title || '—'}</span></div>
              <div className="flex justify-between"><span>Budget</span><span className="font-medium text-gray-900">{form.budget ? `${form.budget}€` : '—'}</span></div>
              <div className="flex justify-between"><span>Catégorie</span><span className="font-medium text-gray-900">{form.targetCategory || 'Toutes'}</span></div>
              <div className="flex justify-between"><span>Centres d&apos;intérêt</span><span className="font-medium text-gray-900">{form.targetInterests.length > 0 ? form.targetInterests.slice(0,2).join(', ') : '—'}</span></div>
              <div className="flex justify-between"><span>Pays</span><span className="font-medium text-gray-900">{form.targetCountries.length > 0 ? form.targetCountries.slice(0,2).join(', ') : '—'}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </button>
        ) : <div />}
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 bg-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-purple-800 transition">
            Suivant
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={() => setSubmitted(true)} className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition">
            <Check className="w-4 h-4" />
            Soumettre la campagne
          </button>
        )}
      </div>
    </div>
  )
}
