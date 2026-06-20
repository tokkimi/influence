import { create } from 'zustand';
import { api } from './api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  verified: number;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
}

interface Shop {
  id: string;
  shop_name: string;
  subscription_active: number;
  commission_rate: number;
  wallet_balance: number;
  total_sales: number;
}

interface Store {
  user: User | null;
  shop: Shop | null;
  token: string | null;
  lang: 'fr' | 'en';
  setLang: (l: 'fr' | 'en') => void;
  login: (token: string, user: User, shop?: Shop) => void;
  logout: () => void;
  updateUser: (u: Partial<User>) => void;
  fetchMe: () => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  shop: null,
  token: localStorage.getItem('mb_token'),
  lang: (localStorage.getItem('mb_lang') as 'fr' | 'en') || 'fr',
  setLang: (l) => {
    localStorage.setItem('mb_lang', l);
    set({ lang: l });
  },
  login: (token, user, shop) => {
    localStorage.setItem('mb_token', token);
    set({ token, user, shop: shop || null });
  },
  logout: () => {
    localStorage.removeItem('mb_token');
    set({ token: null, user: null, shop: null });
  },
  updateUser: (u) => set(s => ({ user: s.user ? { ...s.user, ...u } : null })),
  fetchMe: async () => {
    if (!get().token) return;
    try {
      const data = await api.get('/auth/me');
      set({ user: data.user, shop: data.shop || null });
    } catch {
      localStorage.removeItem('mb_token');
      set({ token: null, user: null, shop: null });
    }
  },
}));

// Translations
type TKey = keyof typeof translations.fr;

export const translations = {
  fr: {
    sales: 'Ventes',
    auctions: 'Enchères',
    women: 'Femme',
    men: 'Homme',
    bags: 'Sacs',
    accessories: 'Accessoires',
    search: 'Rechercher...',
    login: 'Connexion',
    register: "S'inscrire",
    logout: 'Déconnexion',
    profile: 'Mon Profil',
    myOrders: 'Mes Achats',
    myBids: 'Mes Enchères',
    favorites: 'Favoris',
    newItems: 'Nouvelles Pièces',
    featuredAuctions: 'Enchères à la Une',
    buyNow: 'Acheter',
    bidNow: 'Enchérir',
    currentBid: 'Enchère actuelle',
    startingBid: 'Mise de départ',
    timeLeft: 'Temps restant',
    brand: 'Marque',
    condition: 'État',
    size: 'Taille',
    color: 'Couleur',
    description: 'Description',
    shipping: 'Livraison incluse',
    placeBid: 'Placer une offre',
    yourBid: 'Votre offre (€)',
    minBid: 'Offre minimale',
    excellent: 'Excellent état',
    very_good: 'Très bon état',
    good: 'Bon état',
    fair: 'État correct',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Restez informé(e) des dernières pièces',
    subscribe: "S'abonner",
    cgv: 'CGV',
    privacy: 'Politique de confidentialité',
    contact: 'Contact',
    aboutUs: 'À propos',
    cookieConsent: 'Nous utilisons des cookies pour améliorer votre expérience.',
    acceptCookies: 'Accepter',
    refuseCookies: 'Refuser',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    add: 'Ajouter',
    noResults: 'Aucun résultat',
    price: 'Prix',
    sortBy: 'Trier par',
    newest: 'Plus récents',
    priceLow: 'Prix croissant',
    priceHigh: 'Prix décroissant',
    mostViewed: 'Plus vus',
    endingSoon: 'Fin imminente',
    proAccount: 'Espace Boutique',
    dashboard: 'Tableau de bord',
    myItems: 'Mes Articles',
    myStore: 'Ma Boutique',
    wallet: 'Portefeuille',
    subscription: 'Abonnement',
    addItem: 'Ajouter un article',
    chatbot: 'Assistance',
    adminPanel: 'Administration',
    home: 'Accueil',
    allItems: 'Tous les articles',
  },
  en: {
    sales: 'Sales',
    auctions: 'Auctions',
    women: 'Women',
    men: 'Men',
    bags: 'Bags',
    accessories: 'Accessories',
    search: 'Search...',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'My Profile',
    myOrders: 'My Purchases',
    myBids: 'My Bids',
    favorites: 'Favorites',
    newItems: 'New Arrivals',
    featuredAuctions: 'Featured Auctions',
    buyNow: 'Buy Now',
    bidNow: 'Bid Now',
    currentBid: 'Current bid',
    startingBid: 'Starting bid',
    timeLeft: 'Time left',
    brand: 'Brand',
    condition: 'Condition',
    size: 'Size',
    color: 'Color',
    description: 'Description',
    shipping: 'Shipping included',
    placeBid: 'Place a bid',
    yourBid: 'Your bid (€)',
    minBid: 'Minimum bid',
    excellent: 'Excellent condition',
    very_good: 'Very good condition',
    good: 'Good condition',
    fair: 'Fair condition',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Stay updated on latest arrivals',
    subscribe: 'Subscribe',
    cgv: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    contact: 'Contact',
    aboutUs: 'About',
    cookieConsent: 'We use cookies to enhance your experience.',
    acceptCookies: 'Accept',
    refuseCookies: 'Decline',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    noResults: 'No results',
    price: 'Price',
    sortBy: 'Sort by',
    newest: 'Newest',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    mostViewed: 'Most viewed',
    endingSoon: 'Ending soon',
    proAccount: 'Shop Space',
    dashboard: 'Dashboard',
    myItems: 'My Items',
    myStore: 'My Store',
    wallet: 'Wallet',
    subscription: 'Subscription',
    addItem: 'Add Item',
    chatbot: 'Assistant',
    adminPanel: 'Admin Panel',
    home: 'Home',
    allItems: 'All items',
  }
};

export function useT() {
  const lang = useStore(s => s.lang);
  return (key: TKey) => translations[lang][key] || translations.fr[key] || key;
}
