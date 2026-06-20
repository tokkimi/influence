import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Truck, Clock } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { api, imgUrl } from '../lib/api';
import { useStore, useT } from '../lib/store';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Countdown({ endTime }: { endTime: string }) {
  const [time, setTime] = useState('');
  useEffect(() => {
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
  return <span style={{ color: '#c9a96e', fontFamily: 'Georgia, serif', fontSize: '1.5rem' }}>{time}</span>;
}

export default function ItemDetail() {
  const t = useT();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useStore();
  const [item, setItem] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState(false);
  const [buying, setBuying] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/items/${id}`).then(d => {
      setItem(d.item);
      setBids(d.bids || []);
    }).catch(() => navigate('/catalogue'));

    // Socket.io for real-time bid updates
    const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;
    socket.emit('join-item', id);
    socket.on('bid-update', (bid: any) => {
      setItem((prev: any) => prev ? { ...prev, current_bid: bid.amount, current_bid_user_id: bid.user_id } : prev);
      setBids(prev => [bid, ...prev]);
    });
    return () => { socket.disconnect(); };
  }, [id]);

  const handleBid = async () => {
    setBidError('');
    const amount = parseFloat(bidAmount);
    if (isNaN(amount)) { setBidError('Montant invalide'); return; }
    try {
      await api.post(`/items/${id}/bid`, { amount });
      setBidSuccess(true);
      const d = await api.get(`/items/${id}`);
      setItem(d.item);
      setBids(d.bids || []);
      setBidAmount('');
    } catch (e: any) {
      setBidError(e.message);
    }
  };

  const handleBuyNow = async () => {
    if (!user) return;
    setBuying(true);
    try {
      await api.post('/orders', { item_id: id });
      navigate('/mes-achats');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBuying(false);
    }
  };

  if (!item) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: '#9e8e7e', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      Chargement...
    </div>
  );

  const minBid = (item.current_bid || item.auction_start_price || 0) + 1;
  const conditionMap: Record<string, string> = { excellent: 'Excellent état', very_good: 'Très bon état', good: 'Bon état', fair: 'État correct' };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Link to="/catalogue" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#9e8e7e', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', marginBottom: '2rem' }}>
        <ChevronLeft size={16} /> Retour au catalogue
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="md:grid-cols-2">
        {/* Photos */}
        <div>
          <div style={{ backgroundColor: '#f8f4ef', aspectRatio: '3/4', overflow: 'hidden', marginBottom: '1rem' }}>
            <img src={imgUrl(item.photos?.[activePhoto])} alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {item.photos?.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
              {item.photos.map((p: string, i: number) => (
                <button key={i} onClick={() => setActivePhoto(i)}
                  style={{ flexShrink: 0, width: '80px', height: '100px', border: i === activePhoto ? '2px solid #c9a96e' : '2px solid transparent', padding: 0, cursor: 'pointer', overflow: 'hidden' }}>
                  <img src={imgUrl(p)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#c9a96e', marginBottom: '0.5rem' }}>
            {item.brand?.toUpperCase()}
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '1rem', lineHeight: '1.2' }}>
            {item.title}
          </h1>

          {/* Price / bid */}
          <div style={{ borderTop: '1px solid #e8d5b7', borderBottom: '1px solid #e8d5b7', padding: '1.5rem 0', marginBottom: '1.5rem' }}>
            {item.auction_enabled && item.auction_end_time && new Date(item.auction_end_time) > new Date() ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e', letterSpacing: '0.1em', marginBottom: '4px' }}>
                      {item.current_bid ? t('currentBid').toUpperCase() : t('startingBid').toUpperCase()}
                    </p>
                    <p style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#1a1a1a' }}>
                      {(item.current_bid || item.auction_start_price || 0).toLocaleString('fr-FR')} €
                    </p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.75rem', color: '#9e8e7e', marginTop: '4px' }}>
                      {bids.length} offre{bids.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e', letterSpacing: '0.1em', marginBottom: '4px' }}>
                      {t('timeLeft').toUpperCase()}
                    </p>
                    <Countdown endTime={item.auction_end_time} />
                  </div>
                </div>

                {user ? (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)}
                        placeholder={`Min. ${minBid} €`}
                        style={{ flex: 1, border: '1px solid #e8d5b7', padding: '10px 12px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.85rem' }} />
                      <button onClick={handleBid} className="btn-gold">{t('placeBid')}</button>
                    </div>
                    {bidError && <p style={{ color: '#cc0000', fontSize: '0.8rem', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>{bidError}</p>}
                    {bidSuccess && <p style={{ color: '#2e7d32', fontSize: '0.8rem', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>✓ Votre offre a été placée !</p>}
                  </div>
                ) : (
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#9e8e7e' }}>
                    <Link to="#" style={{ color: '#c9a96e' }}>Connectez-vous</Link> pour enchérir
                  </p>
                )}
              </>
            ) : item.fixed_price ? (
              <>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>
                  {item.fixed_price.toLocaleString('fr-FR')} €
                </p>
                {user ? (
                  <button onClick={handleBuyNow} disabled={buying || item.status === 'sold'} className="btn-gold" style={{ width: '100%', fontSize: '0.85rem', padding: '1rem' }}>
                    {item.status === 'sold' ? 'VENDU' : buying ? 'Traitement...' : t('buyNow').toUpperCase()}
                  </button>
                ) : (
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#9e8e7e' }}>
                    <Link to="#" style={{ color: '#c9a96e' }}>Connectez-vous</Link> pour acheter
                  </p>
                )}
              </>
            ) : null}
          </div>

          {/* Attributes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: t('condition'), value: conditionMap[item.condition] || item.condition },
              ...(item.size ? [{ label: t('size'), value: item.size }] : []),
              ...(item.color ? [{ label: t('color'), value: item.color }] : []),
              ...(item.material ? [{ label: 'Matière', value: item.material }] : []),
            ].map(attr => (
              <div key={attr.label} style={{ backgroundColor: '#f8f4ef', padding: '0.75rem 1rem' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9e8e7e', marginBottom: '2px' }}>{attr.label.toUpperCase()}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.85rem', color: '#1a1a1a' }}>{attr.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          {item.description && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#9e8e7e', marginBottom: '0.75rem' }}>DESCRIPTION</p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#1a1a1a', lineHeight: '1.7' }}>{item.description}</p>
            </div>
          )}

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid #e8d5b7', paddingTop: '1.5rem' }}>
            {[
              { icon: Shield, text: 'Vendeur vérifié' },
              { icon: Truck, text: 'Livraison incluse' },
              { icon: Clock, text: 'Retrait sous 14j' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={16} color="#c9a96e" />
                <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Shop */}
          {item.shop_name && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #e8d5b7', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f8f4ef', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#c9a96e' }}>{item.shop_name[0]}</span>
              </div>
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#1a1a1a', fontWeight: 600 }}>{item.shop_name}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e' }}>Boutique professionnelle vérifiée</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bid history */}
      {bids.length > 0 && (
        <div style={{ marginTop: '4rem', borderTop: '1px solid #e8d5b7', paddingTop: '2rem' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 400, marginBottom: '1.5rem' }}>Historique des enchères</h2>
          <div style={{ maxWidth: '500px' }}>
            {bids.map((bid, i) => (
              <div key={bid.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f0ece6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {i === 0 && <span style={{ backgroundColor: '#c9a96e', color: 'white', fontSize: '0.6rem', padding: '2px 6px', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>MEILLEURE</span>}
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.8rem', color: '#1a1a1a' }}>{bid.bidder_name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#1a1a1a' }}>{bid.amount.toLocaleString('fr-FR')} €</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#9e8e7e' }}>
                    {new Date(bid.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
