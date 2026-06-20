import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Wallet, Settings, Star, Plus, MessageCircle } from 'lucide-react';
import { useStore, useT } from '../../lib/store';
import { api } from '../../lib/api';

export default function ProLayout() {
  const t = useT();
  const { user, shop } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const nav = [
    { to: '/boutique', label: t('dashboard'), icon: LayoutDashboard, exact: true },
    { to: '/boutique/articles', label: t('myItems'), icon: Package },
    { to: '/boutique/commandes', label: 'Commandes', icon: ShoppingBag },
    { to: '/boutique/messages', label: 'Messages', icon: MessageCircle },
    { to: '/boutique/portefeuille', label: t('wallet'), icon: Wallet },
    { to: '/boutique/abonnement', label: t('subscription'), icon: Star },
    { to: '/boutique/profil', label: t('myStore'), icon: Settings },
  ];

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  if (!user || user.role !== 'pro') {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
        <p style={{ color: '#9e8e7e', marginBottom: '1rem' }}>Accès réservé aux boutiques professionnelles</p>
        <Link to="/" className="btn-gold">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', backgroundColor: '#1a1a1a', flexShrink: 0 }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #333' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#c9a96e', marginBottom: '4px' }}>ESPACE BOUTIQUE</p>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: 'white' }}>{shop?.shop_name || user.name}</p>
          {shop?.subscription_active ? (
            <span style={{ fontSize: '0.65rem', color: '#c9a96e', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>★ Premium</span>
          ) : (
            <span style={{ fontSize: '0.65rem', color: '#666', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>Gratuit · 10 articles max</span>
          )}
        </div>
        <nav style={{ padding: '1rem 0' }}>
          {nav.map(({ to, label, icon: Icon, exact }) => (
            <Link key={to} to={to}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 1.5rem', textDecoration: 'none', color: isActive(to, exact) ? '#c9a96e' : '#888', borderLeft: isActive(to, exact) ? '2px solid #c9a96e' : '2px solid transparent', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', marginBottom: '2px' }}>
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #333' }}>
          <Link to="/boutique/articles/nouveau" className="btn-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.7rem' }}>
            <Plus size={14} /> AJOUTER UN ARTICLE
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f8f4ef', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
