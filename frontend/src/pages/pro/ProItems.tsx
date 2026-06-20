import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Star, Clock } from 'lucide-react';
import { api, imgUrl } from '../../lib/api';

export default function ProItems() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api.get('/items/shop/mine').then(d => setItems(d.items || [])).catch(() => {});
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/items/${id}`, { status });
      setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    } catch {}
  };

  const statusColors: Record<string, string> = {
    active: '#2e7d32', draft: '#9e8e7e', suspended: '#ff9800', sold: '#1976d2', removed: '#cc0000'
  };
  const statusLabels: Record<string, string> = {
    active: 'En ligne', draft: 'Brouillon', suspended: 'Suspendu', sold: 'Vendu', removed: 'Retiré'
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 400, color: '#1a1a1a' }}>Mes articles</h1>
        <Link to="/boutique/articles/nouveau" className="btn-gold" style={{ textDecoration: 'none', fontSize: '0.75rem' }}>+ AJOUTER</Link>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', border: '1px solid #e8d5b7' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#9e8e7e', marginBottom: '1rem' }}>Aucun article</p>
          <Link to="/boutique/articles/nouveau" className="btn-gold" style={{ textDecoration: 'none' }}>Ajouter mon premier article</Link>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', border: '1px solid #e8d5b7' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e8d5b7' }}>
                {['Article', 'Prix', 'Statut', 'Vues', 'Enchère', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#9e8e7e' }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0ece6' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={imgUrl(item.photos?.[0])} alt="" style={{ width: '48px', height: '60px', objectFit: 'cover', backgroundColor: '#f8f4ef' }} />
                      <div>
                        <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#1a1a1a', marginBottom: '2px' }}>{item.title}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: '#c9a96e' }}>{item.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'Georgia, serif', fontSize: '0.9rem' }}>
                    {item.fixed_price ? `${item.fixed_price.toLocaleString('fr-FR')} €` : '-'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.7rem', color: statusColors[item.status] || '#9e8e7e', fontWeight: 600 }}>
                      {statusLabels[item.status] || item.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.85rem', color: '#1a1a1a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={14} color="#9e8e7e" />{item.views || 0}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {item.auction_enabled ? (
                      <div>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.75rem', color: '#c9a96e' }}>
                          {(item.current_bid || item.auction_start_price || 0).toLocaleString('fr-FR')} €
                        </p>
                        {item.auction_end_time && (
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '0.65rem', color: '#9e8e7e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={10} /> {new Date(item.auction_end_time).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                    ) : '-'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/boutique/articles/${item.id}`} style={{ color: '#c9a96e', display: 'flex' }}><Edit size={16} /></Link>
                      {item.status === 'active' ? (
                        <button onClick={() => updateStatus(item.id, 'suspended')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff9800', display: 'flex' }} title="Suspendre">⏸</button>
                      ) : item.status === 'suspended' || item.status === 'draft' ? (
                        <button onClick={() => updateStatus(item.id, 'active')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2e7d32', display: 'flex' }} title="Mettre en ligne">▶</button>
                      ) : null}
                      <button onClick={() => updateStatus(item.id, 'removed')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cc0000', display: 'flex' }} title="Retirer"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
