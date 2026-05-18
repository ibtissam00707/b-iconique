import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { isAdmin } from '../utils/auth';

const STATUS_LABELS = {
  pending:   { label: 'En attente',  color: '#e67e22' },
  confirmed: { label: 'Confirmée',   color: '#2980b9' },
  shipped:   { label: 'Expédiée',    color: '#8e44ad' },
  delivered: { label: 'Livrée',      color: '#27ae60' },
  cancelled: { label: 'Annulée',     color: '#e74c3c' },
};

function Admin() {
  const [onglet, setOnglet] = useState('produits');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', image: '', categoryId: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) { navigate('/'); return; }
    chargerProduits();
    chargerCommandes();
    api.get('/api/categories').then(res => setCategories(res.data));
  }, []);

  function chargerProduits() {
    api.get('/api/products')
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }

  function chargerCommandes() {
    api.get('/api/admin/orders')
      .then(res => setOrders(res.data))
      .catch(() => {});
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function ouvrirFormulaire(product = null) {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        image: product.image || '',
        categoryId: categories.find(c => c.name === product.category)?.id || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', price: '', stock: '', image: '', categoryId: '' });
    }
    setShowForm(true);
  }

  async function handleSauvegarder(e) {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.image,
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null
    };
    try {
      if (editingId) {
        await api.put(`/api/admin/products/${editingId}`, payload);
      } else {
        await api.post('/api/admin/products', payload);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', description: '', price: '', stock: '', image: '', categoryId: '' });
      chargerProduits();
    } catch {
      alert('Erreur lors de la sauvegarde.');
    }
  }

  async function handleSupprimer(id) {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await api.delete(`/api/admin/products/${id}`);
      chargerProduits();
    } catch {
      alert('Erreur lors de la suppression.');
    }
  }

  async function handleStatutCommande(id, status) {
    try {
      await api.patch(`/api/admin/orders/${id}/status`, { status });
      chargerCommandes();
    } catch {
      alert('Erreur lors du changement de statut.');
    }
  }

  // ── Calculs dashboard ──────────────────────────────────────────────
  const ordersActives = orders.filter(o => o.status !== 'cancelled');
  const revenueTotal = ordersActives.reduce((s, o) => s + parseFloat(o.total || 0), 0);
  const panierMoyen = ordersActives.length ? revenueTotal / ordersActives.length : 0;

  const statusCounts = Object.keys(STATUS_LABELS).reduce((acc, key) => {
    acc[key] = orders.filter(o => o.status === key).length;
    return acc;
  }, {});

  const revenueParCategorie = {};
  ordersActives.forEach(order => {
    (order.items || []).forEach(item => {
      const prod = products.find(p => p.id === item.id || p.name === item.name);
      const cat = prod?.category || 'Autre';
      revenueParCategorie[cat] = (revenueParCategorie[cat] || 0) + parseFloat(item.price || 0) * (item.quantity || 1);
    });
  });
  const maxRevCat = Math.max(...Object.values(revenueParCategorie), 1);

  const btnTab = (key, label) => (
    <button
      onClick={() => setOnglet(key)}
      style={{
        padding: '10px 24px',
        background: onglet === key ? 'var(--color-primary)' : 'transparent',
        color: onglet === key ? 'white' : 'var(--color-text)',
        border: `1px solid ${onglet === key ? 'var(--color-primary)' : 'var(--color-border)'}`,
        borderRadius: '4px',
        cursor: 'pointer',
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
      }}
    >
      {label}
    </button>
  );

  if (loading) return <p style={{ padding: '40px', fontFamily: 'Georgia, serif' }}>Chargement...</p>;

  return (
    <div style={{ padding: '40px', fontFamily: 'Georgia, serif', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontWeight: 'normal', fontSize: '28px', color: 'var(--color-text)' }}>
          Dashboard Admin
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {btnTab('dashboard', '📊 Dashboard')}
          {btnTab('produits', `🛍 Produits (${products.length})`)}
          {btnTab('commandes', `📦 Commandes (${orders.length})`)}
        </div>
      </div>

      {/* ===================== ONGLET DASHBOARD ===================== */}
      {onglet === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: '💰', label: "Chiffre d'affaires", value: revenueTotal.toFixed(2) + ' €', color: '#27ae60' },
              { icon: '📦', label: 'Commandes totales', value: orders.length, color: 'var(--color-primary)' },
              { icon: '🛒', label: 'Panier moyen', value: panierMoyen.toFixed(2) + ' €', color: '#2980b9' },
              { icon: '⏳', label: 'En attente', value: statusCounts.pending || 0, color: '#e67e22' },
              { icon: '🛍', label: 'Produits actifs', value: products.length, color: '#8e44ad' },
              { icon: '⚠️', label: 'Stock faible (< 5)', value: products.filter(p => p.stock < 5).length, color: '#e74c3c' },
            ].map((kpi, i) => (
              <div key={i} style={{
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: '10px', padding: '20px', textAlign: 'center',
                borderTop: `4px solid ${kpi.color}`
              }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{kpi.icon}</div>
                <div style={{ fontSize: '26px', fontWeight: 'bold', color: kpi.color, marginBottom: '6px' }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-light)', letterSpacing: '0.5px' }}>
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            {/* Statuts des commandes */}
            <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '24px' }}>
              <h2 style={{ fontWeight: 'normal', fontSize: '18px', color: 'var(--color-text)', marginBottom: '20px', margin: '0 0 20px' }}>
                📋 Statut des commandes
              </h2>
              {orders.length === 0 ? (
                <p style={{ color: 'var(--color-text-light)', fontSize: '14px' }}>Aucune commande.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(STATUS_LABELS).map(([key, val]) => {
                    const count = statusCounts[key] || 0;
                    const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
                    return (
                      <div key={key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--color-text)' }}>
                            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: val.color, marginRight: '8px' }} />
                            {val.label}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: val.color }}>
                            {count} <span style={{ fontWeight: 'normal', color: 'var(--color-text-light)' }}>({pct}%)</span>
                          </span>
                        </div>
                        <div style={{ background: 'var(--color-background)', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${pct}%`, height: '100%',
                            background: val.color, borderRadius: '4px',
                            transition: 'width 0.6s ease'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Revenus par catégorie */}
            <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '24px' }}>
              <h2 style={{ fontWeight: 'normal', fontSize: '18px', color: 'var(--color-text)', margin: '0 0 20px' }}>
                💎 Revenus par catégorie
              </h2>
              {Object.keys(revenueParCategorie).length === 0 ? (
                <p style={{ color: 'var(--color-text-light)', fontSize: '14px' }}>Aucune donnée disponible.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {Object.entries(revenueParCategorie)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, rev], i) => {
                      const pct = Math.round((rev / maxRevCat) * 100);
                      const colors = ['var(--color-primary)', '#2980b9', '#27ae60', '#8e44ad', '#e67e22'];
                      const col = colors[i % colors.length];
                      return (
                        <div key={cat}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', color: 'var(--color-text)', textTransform: 'capitalize' }}>{cat}</span>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', color: col }}>{rev.toFixed(2)} €</span>
                          </div>
                          <div style={{ background: 'var(--color-background)', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${pct}%`, height: '100%',
                              background: col, borderRadius: '4px',
                              transition: 'width 0.6s ease'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text)' }}>Total</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      {Object.values(revenueParCategorie).reduce((a, b) => a + b, 0).toFixed(2)} €
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dernières commandes */}
          <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '24px' }}>
            <h2 style={{ fontWeight: 'normal', fontSize: '18px', color: 'var(--color-text)', margin: '0 0 20px' }}>
              🕐 Dernières commandes
            </h2>
            {orders.length === 0 ? (
              <p style={{ color: 'var(--color-text-light)', fontSize: '14px' }}>Aucune commande.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--color-background)' }}>
                    {['#', 'Client', 'Montant', 'Statut', 'Date'].map(col => (
                      <th key={col} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', color: 'var(--color-text-light)', fontWeight: 'normal', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid var(--color-border)' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order, i) => {
                    const st = STATUS_LABELS[order.status] || { label: order.status, color: '#888' };
                    return (
                      <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)', background: i % 2 === 0 ? 'white' : 'var(--color-background)' }}>
                        <td style={{ padding: '10px 14px', fontSize: '13px', color: 'var(--color-text-light)' }}>#{order.id}</td>
                        <td style={{ padding: '10px 14px', fontSize: '13px', color: 'var(--color-text)' }}>{order.firstName} {order.lastName}</td>
                        <td style={{ padding: '10px 14px', fontSize: '13px', fontWeight: 'bold', color: 'var(--color-primary)' }}>{parseFloat(order.total).toFixed(2)} €</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ background: st.color, color: 'white', fontSize: '11px', padding: '2px 10px', borderRadius: '12px' }}>{st.label}</span>
                        </td>
                        <td style={{ padding: '10px 14px', fontSize: '12px', color: 'var(--color-text-light)' }}>{order.createdAt?.slice(0, 10)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ===================== ONGLET PRODUITS ===================== */}
      {onglet === 'produits' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button
              onClick={() => ouvrirFormulaire()}
              style={{
                padding: '10px 24px', background: 'var(--color-primary)', color: 'white',
                border: 'none', borderRadius: '4px', cursor: 'pointer',
                fontFamily: 'Georgia, serif', fontSize: '14px'
              }}>
              + Ajouter un produit
            </button>
          </div>

          {/* Formulaire ajout/édition */}
          {showForm && (
            <div style={{
              background: 'var(--color-white)', border: '1px solid var(--color-border)',
              borderRadius: '8px', padding: '28px', marginBottom: '32px'
            }}>
              <h2 style={{ fontWeight: 'normal', fontSize: '20px', marginBottom: '20px', color: 'var(--color-primary)' }}>
                {editingId ? '✏️ Modifier le produit' : '+ Nouveau produit'}
              </h2>
              <form onSubmit={handleSauvegarder}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { label: 'Nom du produit', name: 'name', type: 'text' },
                    { label: 'Prix (€)', name: 'price', type: 'number' },
                    { label: 'Stock', name: 'stock', type: 'number' },
                    { label: "URL de l'image", name: 'image', type: 'text' },
                  ].map(field => (
                    <div key={field.name}>
                      <label style={{ fontSize: '13px', color: 'var(--color-text-light)', display: 'block', marginBottom: '6px' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type} name={field.name} value={formData[field.name]}
                        onChange={handleChange} required={field.name !== 'image'}
                        style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'Georgia, serif', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: '13px', color: 'var(--color-text-light)', display: 'block', marginBottom: '6px' }}>Catégorie</label>
                    <select name="categoryId" value={formData.categoryId} onChange={handleChange}
                      style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'Georgia, serif', fontSize: '14px', boxSizing: 'border-box', background: 'white' }}>
                      <option value="">-- Sans catégorie --</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--color-text-light)', display: 'block', marginBottom: '6px' }}>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'Georgia, serif', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" style={{ padding: '12px 32px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '14px' }}>
                    {editingId ? 'Enregistrer les modifications' : 'Enregistrer le produit'}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                    style={{ padding: '12px 24px', background: 'transparent', color: 'var(--color-text-light)', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '14px' }}>
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tableau produits */}
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-background)', borderBottom: '1px solid var(--color-border)' }}>
                  {['Photo', 'Nom', 'Catégorie', 'Prix', 'Stock', 'Actions'].map(col => (
                    <th key={col} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', color: 'var(--color-text-light)', fontWeight: 'normal', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)', background: index % 2 === 0 ? 'white' : 'var(--color-background)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      {product.image
                        ? <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        : <span style={{ fontSize: '24px' }}>💍</span>}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--color-text)' }}>{product.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--color-text-light)' }}>{product.category}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--color-primary)', fontWeight: 'bold' }}>{product.price} €</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                      <span style={{ color: product.stock > 5 ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>{product.stock}</span>
                    </td>
                    <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                      <button onClick={() => ouvrirFormulaire(product)}
                        style={{ padding: '6px 14px', background: 'transparent', color: '#2980b9', border: '1px solid #2980b9', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '12px' }}>
                        ✏️ Modifier
                      </button>
                      <button onClick={() => handleSupprimer(product.id)}
                        style={{ padding: '6px 14px', background: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '12px' }}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap' }}>
            {[
              { label: 'Total produits', value: products.length },
              { label: 'Valeur du stock', value: products.reduce((s, p) => s + p.price * p.stock, 0).toFixed(2) + ' €' },
              { label: 'Stock faible (< 5)', value: products.filter(p => p.stock < 5).length },
              { label: 'Total commandes', value: orders.length },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, minWidth: '180px', background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-primary)', margin: '0 0 8px' }}>{stat.value}</p>
                <p style={{ fontSize: '13px', color: 'var(--color-text-light)', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===================== ONGLET COMMANDES ===================== */}
      {onglet === 'commandes' && (
        <>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-light)' }}>
              <p style={{ fontSize: '18px' }}>Aucune commande pour le moment.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map(order => {
                const st = STATUS_LABELS[order.status] || { label: order.status, color: '#888' };
                return (
                  <div key={order.id} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 'bold', color: 'var(--color-text)', fontSize: '15px' }}>
                            Commande #{order.id}
                          </span>
                          <span style={{
                            background: st.color, color: 'white', fontSize: '11px',
                            padding: '2px 10px', borderRadius: '12px', fontWeight: 'bold'
                          }}>
                            {st.label}
                          </span>
                        </div>
                        <p style={{ margin: '0 0 2px', fontSize: '13px', color: 'var(--color-text-light)' }}>
                          {order.firstName} {order.lastName} — {order.email}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-light)' }}>
                          {order.city}, {order.country} · {order.createdAt}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                          {parseFloat(order.total).toFixed(2)} €
                        </p>
                        <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--color-text-light)' }}>
                          Livraison : {parseFloat(order.shipping) === 0 ? 'Gratuite' : parseFloat(order.shipping).toFixed(2) + ' €'}
                        </p>
                        <select
                          value={order.status}
                          onChange={e => handleStatutCommande(order.id, e.target.value)}
                          style={{ padding: '6px 10px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'Georgia, serif', fontSize: '12px', cursor: 'pointer' }}
                        >
                          {Object.entries(STATUS_LABELS).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Articles */}
                    <div style={{ marginTop: '14px', borderTop: '1px solid var(--color-border)', paddingTop: '14px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {(order.items || []).map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-background)', padding: '8px 12px', borderRadius: '6px' }}>
                          {item.image && <img src={item.image} alt={item.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />}
                          <span style={{ fontSize: '13px', color: 'var(--color-text)' }}>{item.name}</span>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>× {item.quantity}</span>
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                            {(item.price * item.quantity).toFixed(2)} €
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
