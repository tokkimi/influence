'use client'

import { useState } from 'react'
import { Send, Users, Mail } from 'lucide-react'

const subscribers = [
  { email: 'sophie.martin@email.com', date: '10/10/2024' },
  { email: 'contact@maison-elegance.fr', date: '12/10/2024' },
  { email: 'lucas.dupont@gmail.com', date: '15/10/2024' },
  { email: 'amina.b@outlook.fr', date: '18/10/2024' },
  { email: 'prmarque@startup.io', date: '22/10/2024' },
]

export default function AdminNewsletter() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    setSubject('')
    setBody('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Newsletter</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Send form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5 text-purple-700" />
            </div>
            <h2 className="font-semibold text-gray-900">Envoyer une newsletter</h2>
          </div>

          {sent && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm">
              ✅ Newsletter envoyée à {subscribers.length} abonnés !
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
              <input
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
                placeholder="Nouveautés Dot The Talents – Novembre 2024"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                required
                rows={8}
                placeholder="Rédigez votre newsletter ici..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{subscribers.length} destinataires</p>
              <button type="submit" className="flex items-center gap-2 bg-purple-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-800 transition text-sm">
                <Send className="w-4 h-4" />
                Envoyer
              </button>
            </div>
          </form>
        </div>

        {/* Subscribers */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-700" />
              </div>
              <h2 className="font-semibold text-gray-900">Abonnés ({subscribers.length})</h2>
            </div>
          </div>
          <div className="space-y-2">
            {subscribers.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{s.email}</span>
                </div>
                <span className="text-xs text-gray-400">{s.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
