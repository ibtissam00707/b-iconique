import { Link } from 'react-router-dom';
import { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');
  const [abonne, setAbonne] = useState(false);

  function handleNewsletter(e) {
    e.preventDefault();
    setAbonne(true);
    setEmail('');
  }

  return (
    <footer style={{ background: '#8B2635', color: 'white', padding: '50px 40px 30px', fontFamily: 'Georgia, serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', maxWidth: '1100px', margin: '0 auto 40px' }}>

        {/* Newsletter */}
        <div style={{ maxWidth: '220px' }}>
          <h4 style={{ marginBottom: '12px', letterSpacing: '1px', fontSize: '13px' }}>Inscrivez-Vous !</h4>
          <p style={{ fontSize: '12px', opacity: '0.8', marginBottom: '16px', lineHeight: '1.6' }}>
            Profitez de 5% de remise sur votre première commande
          </p>
          {abonne ? (
            <p style={{ fontSize: '12px', color: '#90EE90' }}>✓ Merci pour votre inscription !</p>
          ) : (
            <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Votre adresse e-mail" required
                style={{ flex: 1, padding: '8px', fontSize: '12px', border: 'none', borderRadius: '4px' }}
              />
              <button type="submit" style={{ padding: '8px 12px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                OK
              </button>
            </form>
          )}
        </div>

        {/* Aide */}
        <div>
          <h4 style={{ marginBottom: '12px', letterSpacing: '1px', fontSize: '13px' }}>Aide</h4>
          {[
            { label: 'FAQ', to: '/faq' },
            { label: 'Contactez-nous', to: '/contact' },
            { label: 'Politique de retour', to: '/politique-retour' },
          ].map(link => (
            <p key={link.to} style={{ fontSize: '12px', opacity: '0.8', marginBottom: '8px' }}>
              <Link to={link.to} style={{ color: 'white', textDecoration: 'none' }}>{link.label}</Link>
            </p>
          ))}
        </div>

        {/* Légalité */}
        <div>
          <h4 style={{ marginBottom: '12px', letterSpacing: '1px', fontSize: '13px' }}>Légalité</h4>
          {[
            { label: 'Politique de confidentialité', to: '/politique-confidentialite' },
            { label: "Conditions d'utilisation", to: '/cgu' },
          ].map(link => (
            <p key={link.to} style={{ fontSize: '12px', opacity: '0.8', marginBottom: '8px' }}>
              <Link to={link.to} style={{ color: 'white', textDecoration: 'none' }}>{link.label}</Link>
            </p>
          ))}
        </div>

        {/* Boutique */}
        <div>
          <h4 style={{ marginBottom: '12px', letterSpacing: '1px', fontSize: '13px' }}>Boutique</h4>
          {[
            { label: 'Accueil', to: '/' },
            { label: 'Catalogue', to: '/catalogue' },
            { label: 'Colliers', to: '/catalogue?categorie=colliers' },
            { label: 'Bagues', to: '/catalogue?categorie=bagues' },
            { label: 'Bracelets', to: '/catalogue?categorie=bracelets' },
          ].map(link => (
            <p key={link.to} style={{ fontSize: '12px', opacity: '0.8', marginBottom: '8px' }}>
              <Link to={link.to} style={{ color: 'white', textDecoration: 'none' }}>{link.label}</Link>
            </p>
          ))}
        </div>

      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', opacity: '0.6' }}>
          Copyright © 2026 B-Icônique. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

