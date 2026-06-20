import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { api } from '../lib/api';
import { useT } from '../lib/store';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const t = useT();
  const [auctions, setAuctions] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    api.get('/items?type=auction&limit=5&status=active').then(d => setAuctions(d.items || [])).catch(() => {});
    api.get('/items?type=fixed&limit=5&status=active').then(d => setSales(d.items || [])).catch(() => {});
  }, []);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero */}
      <div style={{ position: 'relative', backgroundColor: '#1a1a1a', minHeight: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2520 50%, #1a1a1a 100%)' }} />
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '45%', height: '80%', opacity: 0.1, backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '3rem 2rem', maxWidth: '600px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '1rem' }}>
            MAGALI BERDAH · MODE DE LUXE
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 400, lineHeight: '1.15', marginBottom: '1.25rem' }}>
            Des pièces d'exception,<br />
            <span style={{ color: '#c9a96e' }}>vendues ou aux enchères.</span>
          </h1>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.9rem', color: '#9e8e7e', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '460px' }}>
            Sélection exclusive de vêtements et accessoires de luxe, depuis des boutiques vérifiées.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/catalogue?type=fixed" className="btn-gold">VENTE DIRECTE</Link>
            <Link to="/catalogue?type=auction" className="btn-outline" style={{ borderColor: '#c9a96e', color: '#c9a96e' }}>ENCHÈRES EN COURS</Link>
          </div>
        </div>
      </div>

      {/* Auctions */}
      <div style={{ padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.75rem', maxWidth: '1200px', margin: '0 auto 1.75rem' }}>
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: '#c9a96e', marginBottom: '4px' }}>EN COURS</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 400, color: '#1a1a1a' }}>{t('featuredAuctions')}</h2>
          </div>
          <Link to="/catalogue?type=auction" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#9e8e7e' }}>
            TOUT VOIR <ChevronRight size={13} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
          {auctions.length > 0
            ? auctions.map(item => <ItemCard key={item.id} item={item} />)
            : [1,2,3,4,5].map(i => (
                <div key={i} style={{ backgroundColor: '#f8f4ef', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#c9a96e' }}>Chargement…</span>
                </div>
              ))
          }
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ borderTop: '1px solid #e8d5b7' }} />
      </div>

      {/* Sales */}
      <div style={{ padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.75rem', maxWidth: '1200px', margin: '0 auto 1.75rem' }}>
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: '#c9a96e', marginBottom: '4px' }}>DISPONIBLES</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 400, color: '#1a1a1a' }}>Vente directe</h2>
          </div>
          <Link to="/catalogue?type=fixed" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#9e8e7e' }}>
            TOUT VOIR <ChevronRight size={13} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
          {sales.length > 0
            ? sales.map(item => <ItemCard key={item.id} item={item} />)
            : [1,2,3,4,5].map(i => (
                <div key={i} style={{ backgroundColor: '#f8f4ef', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#c9a96e' }}>Chargement…</span>
                </div>
              ))
          }
        </div>
      </div>

      {/* Pro CTA */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '3.5rem 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.4em', color: '#c9a96e', marginBottom: '0.75rem' }}>VOUS ÊTES UN PROFESSIONNEL ?</p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: 400, color: 'white', marginBottom: '0.75rem' }}>Ouvrez votre boutique</h2>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.85rem', color: '#9e8e7e', marginBottom: '1.75rem', maxWidth: '420px', margin: '0 auto 1.75rem' }}>
          Vendez et mettez aux enchères vos pièces de luxe. 10 articles gratuits, Premium 129€/mois.
        </p>
        <Link to="/pro" className="btn-gold">CRÉER MA BOUTIQUE</Link>
      </div>
    </div>
  );
}
