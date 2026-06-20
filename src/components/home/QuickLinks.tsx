"use client"
import Link from "next/link"
import { BookOpen, HelpCircle, ShieldCheck, ArrowRight, Star } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function QuickLinks() {
  const { lang } = useLang()

  const items = lang === 'fr' ? [
    { icon: BookOpen, title: "Comment ça marche", sub: "Guide complet de la plateforme", href: "/comment-ca-marche" },
    { icon: HelpCircle, title: "FAQ", sub: "Vos questions, nos réponses", href: "/faq" },
    { icon: Star, title: "Tarifs", sub: "Formules adaptées à votre besoin", href: "/tarifs" },
    { icon: ShieldCheck, title: "Certification", sub: "Talents vérifiés, marques garanties", href: "/auth/inscription" },
  ] : [
    { icon: BookOpen, title: "How it works", sub: "Complete platform guide", href: "/comment-ca-marche" },
    { icon: HelpCircle, title: "FAQ", sub: "Your questions, our answers", href: "/faq" },
    { icon: Star, title: "Pricing", sub: "Plans adapted to your needs", href: "/tarifs" },
    { icon: ShieldCheck, title: "Certification", sub: "Verified talents, guaranteed brands", href: "/auth/inscription" },
  ]

  return (
    <section className="bg-white border-y border-black/6">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-black/6">
          {items.map((item) => (
            <Link key={item.title} href={item.href} className="group flex items-center gap-4 px-6 py-6 hover:bg-[#fafaf8] transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#c9993a]/10" style={{background:'rgba(0,0,0,0.04)'}}>
                <item.icon className="w-4 h-4 text-[#c9993a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#0f0f0f] uppercase tracking-wider">{item.title}</p>
                <p className="text-[11px] text-[#aaaaaa] mt-0.5 truncate">{item.sub}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#aaaaaa] group-hover:text-[#c9993a] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
