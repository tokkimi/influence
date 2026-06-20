'use client'

import { useState } from 'react'
import { Send, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const initialMessages = [
  { id: 1, from: 'brand', name: 'Maison Élégance', content: 'Bonjour Marie ! Nous sommes ravis de travailler avec vous pour notre campagne Mode Automne.', time: '10:30' },
  { id: 2, from: 'influencer', name: 'Marie Dupont', content: 'Bonjour ! Merci beaucoup pour cette opportunité. J\'ai bien reçu le brief, c\'est très clair.', time: '10:32' },
  { id: 3, from: 'brand', name: 'Maison Élégance', content: 'Parfait ! N\'hésitez pas si vous avez des questions. Le code promo à mentionner est MAISON10.', time: '10:35' },
  { id: 4, from: 'influencer', name: 'Marie Dupont', content: 'Noté ! Je pense publier le contenu autour du 25 novembre, ça vous convient ?', time: '11:00' },
  { id: 5, from: 'brand', name: 'Maison Élégance', content: 'Oui, ça nous convient parfaitement ! La deadline est le 15 décembre de toute façon.', time: '11:05' },
]

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState(initialMessages)
  const [text, setText] = useState('')

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    setMessages(m => [...m, {
      id: Date.now(),
      from: 'influencer',
      name: 'Moi',
      content: text,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    }])
    setText('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <Link href="javascript:history.back()" className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">ME</div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">Maison Élégance</p>
          <p className="text-xs text-gray-400">Campagne Mode Automne</p>
        </div>
        <div className="ml-auto">
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">En ligne</span>
        </div>
      </div>

      {/* Campaign info banner */}
      <div className="bg-purple-50 border-b border-purple-100 px-4 py-2">
        <p className="text-xs text-purple-700 text-center">
          💼 Mission: Campagne Mode Automne · Code promo: <span className="font-bold">MAISON10</span> · Rémunération: <span className="font-bold">400€</span>
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === 'influencer' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${msg.from === 'influencer' ? 'order-2' : 'order-1'}`}>
              <div className={`rounded-2xl px-4 py-3 text-sm ${
                msg.from === 'influencer'
                  ? 'bg-purple-700 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
              }`}>
                {msg.content}
              </div>
              <p className={`text-xs text-gray-400 mt-1 ${msg.from === 'influencer' ? 'text-right' : 'text-left'}`}>
                {msg.name} · {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <form onSubmit={send} className="flex gap-3 max-w-2xl mx-auto">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button type="submit" disabled={!text.trim()} className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center hover:bg-purple-800 transition disabled:opacity-40">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
