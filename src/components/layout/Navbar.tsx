"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, Star } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-800 to-purple-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <span className="text-xl font-bold text-purple-800">Dot The Talents</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/comment-ca-marche" className="text-gray-600 hover:text-purple-800 transition-colors">Comment ça marche</Link>
            <Link href="/tarifs" className="text-gray-600 hover:text-purple-800 transition-colors">Tarifs</Link>
            <Link href="/faq" className="text-gray-600 hover:text-purple-800 transition-colors">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/connexion" className="text-purple-800 border border-purple-800 hover:bg-purple-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Connexion
            </Link>
            <Link href="/auth/inscription" className="bg-purple-800 text-white hover:bg-purple-900 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Inscription
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-100">
            <Link href="/comment-ca-marche" className="block text-gray-600 py-2" onClick={() => setIsOpen(false)}>Comment ça marche</Link>
            <Link href="/tarifs" className="block text-gray-600 py-2" onClick={() => setIsOpen(false)}>Tarifs</Link>
            <Link href="/faq" className="block text-gray-600 py-2" onClick={() => setIsOpen(false)}>FAQ</Link>
            <div className="flex flex-col space-y-2 pt-3">
              <Link href="/auth/connexion" className="text-center text-purple-800 border border-purple-800 px-4 py-2 rounded-md text-sm font-medium">Connexion</Link>
              <Link href="/auth/inscription" className="text-center bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium">Inscription</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
