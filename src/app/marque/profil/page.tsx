'use client'

import { useState } from 'react'
import { Save, Upload } from 'lucide-react'

export default function ProfilMarque() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    companyName: 'Maison Élégance',
    website: 'https://maison-elegance.fr',
    description: 'Maison de mode française créée en 2010, spécialisée dans le prêt-à-porter haut de gamme.',
    sector: 'Mode & Lifestyle',
    contactEmail: 'marketing@maison-elegance.fr',
    contactPhone: '+33 1 23 45 67 89',
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mon profil marque</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Logo de la marque</h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl font-bold text-purple-700">
              ME
            </div>
            <div>
              <button type="button" className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm hover:bg-gray-50 transition">
                <Upload className="w-4 h-4" />
                Changer le logo
              </button>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG · Max 2 Mo</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Informations de la marque</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l&apos;entreprise</label>
            <input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d&apos;activité</label>
            <input value={form.sector} onChange={e => setForm({...form, sector: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site internet</label>
            <input value={form.website} onChange={e => setForm({...form, website: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Contact</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email de contact</label>
            <input value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input value={form.contactPhone} onChange={e => setForm({...form, contactPhone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-800 transition">
          <Save className="w-4 h-4" />
          {saved ? '✅ Sauvegardé !' : 'Sauvegarder les modifications'}
        </button>
      </form>
    </div>
  )
}
