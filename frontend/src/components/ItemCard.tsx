import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore, useT } from '../lib/store';
import { api, imgUrl } from '../lib/api';

interface Item {
  id: string;
  title: string;
  brand: string;
  photos: string[];
  fixed_price?: number;
  auction_enabled: number;
  auction_start_price?: number;
  current_bid?: number;
  auction_end_time?: string;
  condition: string;
  size?: string;
  featured?: number;
}

function useCountdown(endTime?: string) {
  const [time, setTime] = useState('');
  useEffect(() => {
    if (!endTime) return;
    const update = () => {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) { setTime('Terminée'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime(d > 0 ? `${d}j ${h}h ${m}m` : `${h}h ${m}m ${s}s`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endTime]);
  return time;
}

export default function ItemCard({ item }: { item: Item }) {
  const t = useT();
  const { user } = useStore();
  const countdown = useCountdown(item.auction_end_time);
  const [faved, setFaved] = useState(false);

  const toggleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const data = await api.post(`/favorites/${item.id}`);
      setFaved(data.favorited);
    } catch {}
  };

  const price = item.auction_enabled
    ? (item.current_bid || item.auction_start_price || 0)
    : (item.fixed_price || 0);

  const conditionLabel: Record<string, string> = {
    excellent: 'Excellent',
    very_good: 'Très bon',
    good: 'Bon',
    fair: 'Correct',
  };

  return (
    <Link to={`/article/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} className="card-hover">
      <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8f4ef', aspectRatio: '3/4' }}>
        <img src={imgUrl(item.photos?.[0])} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />

        {item.featured ? (
          <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#c9a96e', color: 'white', padding: '3px 10px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em' }}>
            SÉLECTION
          </div>
        ) : null}

        {item.auction_enabled ? (
          <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#1a1a1a', color: '#c9a96e', padding: '3px 10px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
            ENCHÈRE
          </div>
        ) : null}

        {user && (
          <button onClick={toggleFav} style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'white', border: 'none', cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={16} fill={faved ? '#c9a96e' : 'none'} color={faved ? '#c9a96e' : '#1a1a1a'} />
          </button>
        )}
      </div>

      <div style={{ padding: '1rem 0.5rem' }}>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#c9a96e', marginBottom: '4px' }}>
          {item.brand?.toUpperCase()}
        </p>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#1a1a1a', marginBottom: '6px', lineHeight: '1.3' }}>
          {item.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {item.auction_enabled && (
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', color: '#9e8e7e', marginBottom: '2px' }}>
                {item.current_bid ? t('currentBid') : t('startingBid')}
              </p>
            )}
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#1a1a1a', fontWeight: 400 }}>
              {price.toLocaleString('fr-FR')} €
            </p>
          </div>
          {item.auction_enabled && countdown && (
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', color: countdown === 'Terminée' ? '#cc0000' : '#c9a96e' }} className={countdown !== 'Terminée' ? 'pulse' : ''}>
              {countdown}
            </p>
          )}
        </div>
        {item.size && (
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e', marginTop: '4px' }}>
            {conditionLabel[item.condition]} · {item.size}
          </p>
        )}
      </div>
    </Link>
  );
}
