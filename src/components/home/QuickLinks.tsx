"use client"
import Link from "next/link"
import { BookOpen, HelpCircle, ShieldCheck, ArrowRight, Star } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function QuickLinks() {
  const { lang } = useLang()

  const items = lang === 'fr' ? [
    { icon: BookOpen, title: "Comment ça marche", sub: "Guide complet", href: "/comment-ca-marche" },
    { icon: HelpCircle, title: "FAQ", sub: "Vos questions, nos réponses", href: "/faq" },
    { icon: Star, title: "Tarifs", sub: "Formules adaptées", href: "/tarifs" },
    { icon: ShieldCheck, title: "Certification", sub: "Talents vérifiés", href: "/auth/inscription" },
  ] : [
    { icon: BookOpen, title: "How it works", sub: "Complete guide", href: "/comment-ca-marche" },
    { icon: HelpCircle, title: "FAQ", sub: "Your questions answered", href: "/faq" },
    { icon: Star, title: "Pricing", sub: "Adapted plans", href: "/tarifs" },
    { icon: ShieldCheck, title: "Certification", sub: "Verified talents", href: "/auth/inscription" },
  ]

  return (
    <section className="bg-white border-t border-black/6">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-black/6">
          {items.map((item) => (
            <Link key={item.title} href={item.href} className="group flex items-center gap-3 px-5 py-5 hover:bg-[#fafaf8] transition-colors">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(201,153,58,0.08)', border:'1px solid rgba(201,153,58,0.15)'}}>
                <item.icon className="w-3.5 h-3.5 text-[#c9993a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#0f0f0f] uppercase tracking-wider">{item.title}</p>
                <p className="text-[10px] text-[#aaaaaa] mt-0.5 truncate">{item.sub}</p>
              </div>
              <ArrowRight className="w-3 h-3 text-[#aaaaaa] group-hover:text-[#c9993a] transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
