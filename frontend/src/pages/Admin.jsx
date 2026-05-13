import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { isAdmin } from '../utils/auth';

function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', image: '', categoryId: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    chargerProduits();
    api.get('/api/categories').then(res => setCategories(res.data));
  }, []);

  function chargerProduits() {
    api.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleAjouter(e) {
    e.preventDefault();
    try {
      await api.post('/api/admin/products', {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: formData.image,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null
      });
      setShowForm(false);
      setFormData({ name: '', description: '', price: '', stock: '', image: '', categoryId: '' });
      chargerProduits();
      alert('Produit ajouté avec succès !');
    } catch (err) {
      alert('Erreur lors de l\'ajout du produit.');
    }
  }

  async function handleSupprimer(id) {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await api.delete(`/api/admin/products/${id}`);
      chargerProduits();
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  }

  if (loading) return <p style={{ padding: '40px', fontFamily: 'Georgia, serif' }}>Chargement...</p>;

  return (
    <div style={{ padding: '40px', fontFamily: 'Georgia, serif', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Titre */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontWeight: 'normal', fontSize: '28px', color: 'var(--color-text)' }}>
          Dashboard Admin
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 24px',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            fontSize: '14px'
          }}>
          {showForm ? 'Annuler' : '+ Ajouter un produit'}
        </button>
      </div>

      {/* Formulaire ajout */}
      {showForm && (
        <div style={{
          background: 'var(--color-white)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '28px',
          marginBottom: '32px'
        }}>
          <h2 style={{ fontWeight: 'normal', fontSize: '20px', marginBottom: '20px', color: 'var(--color-primary)' }}>
            Nouveau produit
          </h2>
          <form onSubmit={handleAjouter}>
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
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.name !== 'image'}
                    style={{
                      width: '100%', padding: '10px',
                      border: '1px solid var(--color-border)', borderRadius: '4px',
                      fontFamily: 'Georgia, serif', fontSize: '14px', boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '13px', color: 'var(--color-text-light)', display: 'block', marginBottom: '6px' }}>
                  Catégorie
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  style={{
                    width: '100%', padding: '10px',
                    border: '1px solid var(--color-border)', borderRadius: '4px',
                    fontFamily: 'Georgia, serif', fontSize: '14px', boxSizing: 'border-box',
                    background: 'white'
                  }}
                >
                  <option value="">-- Sans catégorie --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description pleine largeur */}
            <div style={{ marginTop: '16px' }}>
              <label style={{ fontSize: '13px', color: 'var(--color-text-light)', display: 'block', marginBottom: '6px' }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" style={{
              marginTop: '20px',
              padding: '12px 32px',
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              fontSize: '14px'
            }}>
              Enregistrer le produit
            </button>
          </form>
        </div>
      )}

      {/* Tableau des produits */}
      <div style={{
        background: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-background)', borderBottom: '1px solid var(--color-border)' }}>
              {['Photo', 'Nom', 'Catégorie', 'Prix', 'Stock', 'Actions'].map(col => (
                <th key={col} style={{
                  padding: '14px 16px',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'var(--color-text-light)',
                  fontWeight: 'normal',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} style={{
                borderBottom: '1px solid var(--color-border)',
                background: index % 2 === 0 ? 'white' : 'var(--color-background)'
              }}>
                <td style={{ padding: '12px 16px' }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  ) : (
                    <span style={{ fontSize: '24px' }}>💍</span>
                  )}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--color-text)' }}>
                  {product.name}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--color-text-light)' }}>
                  {product.category}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                  {product.price} €
                </td>
                <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                  <span style={{
                    color: product.stock > 5 ? '#27ae60' : '#e74c3c',
                    fontWeight: 'bold'
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button
                    onClick={() => handleSupprimer(product.id)}
                    style={{
                      padding: '6px 14px',
                      background: 'transparent',
                      color: '#e74c3c',
                      border: '1px solid #e74c3c',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontFamily: 'Georgia, serif',
                      fontSize: '12px'
                    }}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '24px',
        flexWrap: 'wrap'
      }}>
        {[
          { label: 'Total produits', value: products.length },
          { label: 'Valeur du stock', value: products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2) + ' €' },
          { label: 'Stock faible (< 5)', value: products.filter(p => p.stock < 5).length },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1,
            minWidth: '200px',
            background: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--color-primary)', margin: '0 0 8px' }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--color-text-light)', margin: 0 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Admin;