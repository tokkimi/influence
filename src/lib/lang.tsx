"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type Lang = 'fr' | 'en'

const translations = {
  fr: {
    'nav.how': 'Comment ça marche',
    'nav.pricing': 'Tarifs',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    'hero.badge': 'Plateforme #1 du marketing d\'influence',
    'hero.title1': 'Connectez votre marque',
    'hero.title2': 'aux meilleurs talents',
    'hero.sub': 'Dot The Talents connecte les marques ambitieuses avec les influenceurs les plus engagés. Créez des campagnes percutantes et mesurez votre ROI en temps réel.',
    'hero.brand': 'Je suis une Marque',
    'hero.influencer': 'Je suis Influenceur(se)',
    'hero.stat1': 'Influenceurs',
    'hero.stat2': 'Marques',
    'hero.stat3': 'Pays',
    'features.title': 'Tout ce dont vous avez besoin',
    'features.sub': 'Une plateforme complète pour gérer vos campagnes d\'influence de A à Z.',
    'cta.title': 'Prêt à faire décoller votre influence ?',
    'cta.sub': 'Rejoignez des centaines de marques et d\'influenceurs qui font confiance à Dot The Talents.',
    'cta.brand': 'Démarrer en tant que Marque',
    'cta.influencer': 'Rejoindre en tant qu\'Influenceur',
    'footer.desc': 'La plateforme de référence pour le marketing d\'influence international.',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.how': 'How it works',
    'nav.pricing': 'Pricing',
    'nav.login': 'Log in',
    'nav.signup': 'Sign up',
    'hero.badge': '#1 Influence Marketing Platform',
    'hero.title1': 'Connect your brand',
    'hero.title2': 'with the best talents',
    'hero.sub': 'Dot The Talents connects ambitious brands with the most engaged influencers. Launch impactful campaigns and measure your ROI in real time.',
    'hero.brand': 'I\'m a Brand',
    'hero.influencer': 'I\'m an Influencer',
    'hero.stat1': 'Influencers',
    'hero.stat2': 'Brands',
    'hero.stat3': 'Countries',
    'features.title': 'Everything you need',
    'features.sub': 'A complete platform to manage your influence campaigns from A to Z.',
    'cta.title': 'Ready to scale your influence?',
    'cta.sub': 'Join hundreds of brands and influencers who trust Dot The Talents.',
    'cta.brand': 'Start as a Brand',
    'cta.influencer': 'Join as an Influencer',
    'footer.desc': 'The reference platform for international influence marketing.',
    'footer.rights': 'All rights reserved.',
  },
}

type TranslationKey = keyof typeof translations.fr

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}>({
  lang: 'fr',
  setLang: () => {},
  t: (key) => translations.fr[key],
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr')
  const t = (key: TranslationKey) => translations[lang][key] ?? translations.fr[key]
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
