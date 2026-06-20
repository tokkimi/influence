'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setEmail('')
  }

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-purple-700" />
        </div>
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
          Restez informé(e) des dernières tendances
        </h3>
        <p className="text-gray-500 mb-6">
          Recevez nos conseils marketing, études de cas et actualités influence directement dans votre boîte mail.
        </p>
        {sent ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-6 py-4">
            ✅ Merci ! Vous êtes bien inscrit(e) à notre newsletter.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-800 transition text-sm"
            >
              S&apos;abonner
            </button>
          </form>
        )}
        <p className="text-xs text-gray-400 mt-3">
          Pas de spam. Désabonnement en un clic. Conformément au RGPD.
        </p>
      </div>
    </section>
  )
}
