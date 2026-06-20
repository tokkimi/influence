'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm">
            🍪 Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.
            En cliquant sur &quot;Accepter&quot;, vous consentez à l&apos;utilisation de tous les cookies.{' '}
            <Link href="/cookies" className="text-purple-300 underline hover:text-purple-200">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm border border-gray-500 rounded-lg hover:bg-gray-800 transition"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-purple-600 rounded-lg hover:bg-purple-500 transition font-medium"
          >
            Accepter tout
          </button>
        </div>
      </div>
    </div>
  )
}
