import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [envoye, setEnvoye] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEnvoye(true);
  }

  if (envoye) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'Georgia, serif' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontWeight: 'normal', color: '#333' }}>Message envoyé !</h2>
        <p style={{ color: '#666' }}>Nous vous répondrons dans les 48h.</p>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '10px', border: '1px solid #E0D8D0',
    borderRadius: '4px', fontFamily: 'Georgia, serif', fontSize: '14px', boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 40px', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ fontWeight: 'normal', fontSize: '32px', color: '#8B2635', marginBottom: '8px', textAlign: 'center' }}>
        Contactez-Nous
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '14px' }}>
        Notre équipe vous répond sous 48h
      </p>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', justifyContent: 'center' }}>
        {[
          { emoji: '📧', label: 'Email', value: 'contact@b-iconique.fr' },
          { emoji: '📍', label: 'Adresse', value: 'Paris, France' },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.emoji}</div>
            <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{item.label}</p>
            <p style={{ fontSize: '13px', color: '#333', margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '6px' }}>Nom</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '6px' }}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '6px' }}>Sujet</label>
          <input type="text" name="sujet" value={formData.sujet} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '6px' }}>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
            style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <button type="submit" style={{
          width: '100%', padding: '14px', background: '#8B2635',
          color: 'white', border: 'none', borderRadius: '4px',
          cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '14px'
        }}>
          Envoyer le message
        </button>
      </form>
    </div>
  );
}
export default Contact;

