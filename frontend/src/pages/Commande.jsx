import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PAYS_EUROPE = [
  'france', 'belgique', 'suisse', 'luxembourg', 'allemagne', 'espagne',
  'italie', 'portugal', 'pays-bas', 'netherlands', 'autriche', 'suede',
  'sweden', 'norvege', 'norway', 'danemark', 'denmark', 'finlande',
  'finland', 'pologne', 'poland', 'grece', 'greece', 'roumanie',
  'romania', 'hongrie', 'hungary', 'tcheque', 'czech', 'slovaquie',
  'slovakia', 'croatie', 'croatia', 'bulgarie', 'bulgaria', 'irlande',
  'ireland', 'monaco', 'andorre', 'andorra', 'liechtenstein', 'malte',
  'malta', 'chypre', 'cyprus', 'estonie', 'estonia', 'lettonie',
  'latvia', 'lituanie', 'lithuania', 'slovenie', 'slovenia'
];

function Commande() {
  const { cart, total, fraisLivraison, totalFinal, clearCart } = useCart();
  const navigate = useNavigate();

  const [etape, setEtape] = useState(1);
  const [erreurPays, setErreurPays] = useState('');
  const [modePaiement, setModePaiement] = useState('carte');
  const [formData, setFormData] = useState({
    prenom: '', nom: '', email: '', adresse: '', ville: '', codePostal: '', pays: ''
  });
  const [paiementData, setPaiementData] = useState({
    numeroCarte: '', nomCarte: '', expiration: '', cvv: ''
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'pays') setErreurPays('');
  }

  function handlePaiementChange(e) {
    let value = e.target.value;
    if (e.target.name === 'numeroCarte') {
      value = value.replace(/\D/g, '').substring(0, 16);
      value = value.replace(/(.{4})/g, '$1 ').trim();
    }
    if (e.target.name === 'expiration') {
      value = value.replace(/\D/g, '').substring(0, 4);
      if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 3);
    }
    setPaiementData({ ...paiementData, [e.target.name]: value });
  }

  function handleLivraison(e) {
    e.preventDefault();
    const paysNormalise = formData.pays.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const estEnEurope = PAYS_EUROPE.some(p => p === paysNormalise);
    if (!estEnEurope) {
      setErreurPays(`Désolé, nous ne livrons pas au "${formData.pays}". Livraison en Europe uniquement.`);
      return;
    }
    setEtape(2);
  }

  function handlePaiement(e) {
    e.preventDefault();
    clearCart();
    setEtape(3);
  }

  if (cart.length === 0 && etape !== 3) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'Georgia, serif' }}>
        <p style={{ fontSize: '18px', color: 'var(--color-text-light)' }}>Votre panier est vide 🛒</p>
        <a href="/catalogue" style={{ color: 'var(--color-primary)' }}>Voir le catalogue</a>
      </div>
    );
  }

  if (etape === 3) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 40px', fontFamily: 'Georgia, serif', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
        <h1 style={{ fontWeight: 'normal', fontSize: '32px', color: 'var(--color-text)', marginBottom: '16px' }}>
          Commande confirmée !
        </h1>
        <p style={{ color: 'var(--color-text-light)', fontSize: '15px', lineHeight: '1.8', marginBottom: '8px' }}>
          Merci <strong>{formData.prenom} {formData.nom}</strong> pour votre commande.
        </p>
        <p style={{ color: 'var(--color-text-light)', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' }}>
          Un email de confirmation sera envoyé à <strong>{formData.email}</strong>.
          Votre bijou sera expédié sous 24-48h.
        </p>
        <button onClick={() => navigate('/')} style={{
          background: 'var(--color-primary)', color: 'white', padding: '12px 32px',
          border: 'none', borderRadius: '4px', cursor: 'pointer',
          fontFamily: 'Georgia, serif', fontSize: '14px'
        }}>
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '10px', border: '1px solid var(--color-border)',
    borderRadius: '4px', fontFamily: 'Georgia, serif', fontSize: '14px', boxSizing: 'border-box'
  };
  const labelStyle = {
    display: 'block', fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '6px'
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Georgia, serif', maxWidth: '1000px', margin: '0 auto' }}>

      {/* Indicateur étapes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
        {['Livraison', 'Paiement', 'Confirmation'].map((e, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: etape >= i + 1 ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 'bold'
            }}>
              {i + 1}
            </div>
            <span style={{
              fontSize: '13px',
              color: etape === i + 1 ? 'var(--color-primary)' : 'var(--color-text-light)',
              fontWeight: etape === i + 1 ? 'bold' : 'normal'
            }}>
              {e}
            </span>
            {i < 2 && <span style={{ color: 'var(--color-border)', margin: '0 4px' }}>→</span>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

        {/* ÉTAPE 1 — Livraison */}
        {etape === 1 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontWeight: 'normal', fontSize: '20px', color: 'var(--color-primary)', margin: 0 }}>
                Adresse de livraison
              </h2>
              <button onClick={() => navigate('/panier')} style={{
                background: 'none', border: 'none', color: 'var(--color-text-light)',
                cursor: 'pointer', fontSize: '13px', textDecoration: 'underline', fontFamily: 'Georgia, serif'
              }}>
                ← Modifier le panier
              </button>
            </div>

            <div style={{
              padding: '10px 14px', background: '#EBF5FB',
              borderRadius: '6px', marginBottom: '20px', fontSize: '12px', color: '#1A5276'
            }}>
              🌍 Livraison disponible uniquement dans les pays européens
            </div>

            <form onSubmit={handleLivraison}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Prénom</label>
                  <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nom</label>
                  <input type="text" name="nom" value={formData.nom} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <label style={labelStyle}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ marginTop: '12px' }}>
                <label style={labelStyle}>Adresse</label>
                <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div>
                  <label style={labelStyle}>Ville</label>
                  <input type="text" name="ville" value={formData.ville} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Code postal</label>
                  <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <label style={labelStyle}>Pays</label>
                <input type="text" name="pays" value={formData.pays} onChange={handleChange}
                  placeholder="Ex: France, Belgique, Italie..." required
                  style={{ ...inputStyle, borderColor: erreurPays ? '#e74c3c' : 'var(--color-border)' }} />
                {erreurPays && (
                  <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '6px' }}>
                    ❌ {erreurPays}
                  </p>
                )}
              </div>
              <button type="submit" style={{
                width: '100%', padding: '14px', background: 'var(--color-primary)',
                color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
                fontFamily: 'Georgia, serif', fontSize: '14px', marginTop: '20px', letterSpacing: '1px'
              }}>
                Continuer vers le paiement →
              </button>
            </form>
          </div>
        )}

        {/* ÉTAPE 2 — Paiement */}
        {etape === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontWeight: 'normal', fontSize: '20px', color: 'var(--color-primary)', margin: 0 }}>
                Paiement sécurisé 🔒
              </h2>
              <button onClick={() => setEtape(1)} style={{
                background: 'none', border: 'none', color: 'var(--color-text-light)',
                cursor: 'pointer', fontSize: '13px', textDecoration: 'underline', fontFamily: 'Georgia, serif'
              }}>
                ← Modifier la livraison
              </button>
            </div>

            {/* Résumé adresse */}
            <div style={{
              padding: '10px 14px', background: 'var(--color-background)',
              borderRadius: '6px', marginBottom: '20px', fontSize: '12px', color: 'var(--color-text-light)'
            }}>
              📦 {formData.prenom} {formData.nom} — {formData.adresse}, {formData.codePostal} {formData.ville}, {formData.pays}
            </div>

            {/* Simulation paiement */}
            <div style={{
              padding: '10px 14px', background: '#FFF8E1',
              borderRadius: '6px', marginBottom: '20px', fontSize: '12px', color: '#7D6608',
              border: '1px solid #F9E79F'
            }}>
              ℹ️ <strong>Mode démonstration</strong> — Aucun paiement réel ne sera effectué
            </div>

            {/* Choix mode paiement */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ ...labelStyle, fontSize: '14px', color: 'var(--color-text)', marginBottom: '12px' }}>
                Mode de paiement
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div onClick={() => setModePaiement('carte')} style={{
                  flex: 1, padding: '14px', border: `2px solid ${modePaiement === 'carte' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                  background: modePaiement === 'carte' ? '#FDF2F4' : 'white'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>💳</div>
                  <div style={{ fontSize: '13px', fontWeight: modePaiement === 'carte' ? 'bold' : 'normal', color: modePaiement === 'carte' ? 'var(--color-primary)' : 'var(--color-text)' }}>
                    Carte bancaire
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-light)', marginTop: '4px' }}>Visa, Mastercard, CB</div>
                </div>
                <div onClick={() => setModePaiement('paypal')} style={{
                  flex: 1, padding: '14px', border: `2px solid ${modePaiement === 'paypal' ? '#0070BA' : 'var(--color-border)'}`,
                  borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                  background: modePaiement === 'paypal' ? '#EBF5FB' : 'white'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>🅿️</div>
                  <div style={{ fontSize: '13px', fontWeight: modePaiement === 'paypal' ? 'bold' : 'normal', color: modePaiement === 'paypal' ? '#0070BA' : 'var(--color-text)' }}>
                    PayPal
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-light)', marginTop: '4px' }}>Paiement rapide</div>
                </div>
              </div>
            </div>

            <form onSubmit={handlePaiement}>
              {modePaiement === 'carte' && (
                <>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Numéro de carte</label>
                    <input type="text" name="numeroCarte" value={paiementData.numeroCarte}
                      onChange={handlePaiementChange} placeholder="1234 5678 9012 3456" required style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Nom sur la carte</label>
                    <input type="text" name="nomCarte" value={paiementData.nomCarte}
                      onChange={handlePaiementChange} placeholder="JEAN DUPONT" required style={inputStyle} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <label style={labelStyle}>Date d'expiration</label>
                      <input type="text" name="expiration" value={paiementData.expiration}
                        onChange={handlePaiementChange} placeholder="MM/AA" required style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>CVV</label>
                      <input type="text" name="cvv" value={paiementData.cvv}
                        onChange={handlePaiementChange} placeholder="123" required style={inputStyle} />
                    </div>
                  </div>
                </>
              )}

              {modePaiement === 'paypal' && (
                <div style={{
                  padding: '24px', background: '#EBF5FB', borderRadius: '8px',
                  textAlign: 'center', marginBottom: '16px'
                }}>
                  <p style={{ fontSize: '14px', color: '#0070BA', marginBottom: '8px' }}>
                    Vous seriez redirigé vers PayPal pour finaliser le paiement.
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>
                    (Simulation — aucune redirection réelle)
                  </p>
                </div>
              )}

              <div style={{
                padding: '10px 14px', background: '#f0f9f0',
                borderRadius: '6px', marginBottom: '16px', fontSize: '12px', color: '#27ae60'
              }}>
                🔒 Paiement 100% sécurisé — données chiffrées
              </div>

              <button type="submit" style={{
                width: '100%', padding: '14px',
                background: modePaiement === 'paypal' ? '#0070BA' : 'var(--color-primary)',
                color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
                fontFamily: 'Georgia, serif', fontSize: '14px', letterSpacing: '1px'
              }}>
                {modePaiement === 'paypal'
                  ? `Payer avec PayPal — ${(totalFinal || 0).toFixed(2)} €`
                  : `Confirmer le paiement — ${(totalFinal || 0).toFixed(2)} €`}
              </button>
            </form>
          </div>
        )}

        {/* Récapitulatif */}
        <div>
          <h2 style={{ fontWeight: 'normal', fontSize: '20px', marginBottom: '20px', color: 'var(--color-primary)' }}>
            Récapitulatif
          </h2>
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '20px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.image && <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text)' }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-light)' }}>Qté : {item.quantity}</p>
                  </div>
                </div>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>Sous-total</span>
              <span>{(total || 0).toFixed(2)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>Livraison Europe</span>
              <span style={{ color: (fraisLivraison || 0) === 0 ? '#27ae60' : 'var(--color-text)' }}>
                {(fraisLivraison || 0) === 0 ? 'Gratuite ✓' : `${(fraisLivraison || 4.99).toFixed(2)} €`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Total</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                {(totalFinal || 0).toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commande;

