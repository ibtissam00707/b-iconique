import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
function Accueil() {
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const categories = [
    {
      name: 'Colliers',
      slug: 'colliers',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80'
    },
    {
      name: 'Bracelets',
      slug: 'bracelets',
      image: 'https://images.unsplash.com/photo-1573408301185-9519f94815b4?w=400&q=80'
    },
    {
      name: 'Bagues',
      slug: 'bagues',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80'
    },
    {
      name: "Boucles d'oreilles",
      slug: 'boucles-oreilles',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80'
    },
  ];

  return (
    <div style={{ fontFamily: 'Georgia, serif' }}>

      {/* HERO SECTION */}
      <div style={{
        position: 'relative',
        height: '520px',
        overflow: 'hidden',
        background: '#EDE5DC'
      }}>
        <img
          src="https://images.unsplash.com/photo-1601821765780-754fa98637c1?w=1200&q=80"
          alt="Hero bijoux"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: '0.6'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          padding: '0 20px'
        }}>
          <p style={{
            color: 'var(--color-primary)',
            letterSpacing: '4px',
            fontSize: '12px',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            Collection 2026
          </p>
          <h1 style={{
            fontSize: '52px',
            color: 'var(--color-text)',
            marginBottom: '20px',
            fontWeight: 'normal',
            lineHeight: '1.2'
          }}>
            Des bijoux conçus<br />pour durer.
          </h1>
          <p style={{
            color: 'var(--color-text)',
            fontSize: '15px',
            maxWidth: '480px',
            margin: '0 auto 32px',
            lineHeight: '1.8',
            opacity: '0.8'
          }}>
            Acier inoxydable 316L — hypoallergénique,
            résistant à l'eau et inaltérable.
          </p>
          <Link to="/catalogue" style={{
            background: 'var(--color-primary)',
            color: 'white',
            padding: '14px 40px',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Découvrir
          </Link>
        </div>
      </div>

      {/* SECTION — Texte de marque */}
      <div style={{
        textAlign: 'center',
        padding: '50px 40px',
        background: 'var(--color-white)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <h2 style={{
          fontWeight: 'normal',
          fontSize: '26px',
          marginBottom: '16px',
          color: 'var(--color-text)'
        }}>
          Des bijoux conçus pour durer.
        </h2>
        <p style={{
          color: 'var(--color-text-light)',
          fontSize: '14px',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          Chez B-Icônique, nous utilisons uniquement de l'acier inoxydable 304 ou 316L
          (acier médical) hypoallergénique, résistant à l'eau et inaltérable.
          Portez-les chaque jour, sans compromis.
        </p>
      </div>

      {/* SECTION — Catégories avec photos */}
      <div style={{
        padding: '50px 40px',
        background: 'var(--color-background)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/catalogue?categorie=${cat.slug}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                width: '180px'
              }}
            >
              <div style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--color-border)'
              }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <span style={{
                color: 'var(--color-text)',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: 'Georgia, serif'
              }}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* SECTION — Best Sellers */}
      <div style={{
        padding: '50px 40px',
        background: 'var(--color-white)'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontWeight: 'normal',
          fontSize: '26px',
          marginBottom: '8px',
          color: 'var(--color-text)'
        }}>
          Découvrez nos incontournables
        </h2>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link to="/catalogue" style={{
            color: 'var(--color-text-light)',
            fontSize: '13px',
            textDecoration: 'underline',
            fontFamily: 'Georgia, serif'
          }}>
            voir tout
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '24px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {products.slice(0, 4).map(product => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
                background: 'var(--color-white)',
                transition: 'box-shadow 0.3s',
                boxShadow: hoveredId === product.id
                  ? '0 6px 20px rgba(0,0,0,0.1)'
                  : 'none'
              }}
            >
              {/* Image */}
              <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s',
                      transform: hoveredId === product.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'var(--color-background)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '64px'
                  }}>
                    💍
                  </div>
                )}
              </div>

              {/* Infos */}
              <div style={{ padding: '14px 16px' }}>
                <p style={{
                  fontSize: '11px',
                  color: 'var(--color-text-light)',
                  marginBottom: '4px',
                  letterSpacing: '0.5px'
                }}>
                  B-Icônique
                </p>
                <h3 style={{
                  margin: '0 0 4px',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  color: 'var(--color-text)'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: 'var(--color-primary)',
                  margin: '0 0 12px'
                }}>
                  {product.price} €
                </p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    width: '100%',
                    padding: '9px',
                    background: 'transparent',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-primary)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'var(--color-primary)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--color-primary)';
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION — Valeurs */}
      <div style={{
        padding: '50px 40px',
        background: 'var(--color-background)',
        borderTop: '1px solid var(--color-border)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
          flexWrap: 'wrap',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            { emoji: '🚚', title: 'Livraison en Europe', desc: 'Livraison rapide et fiable dans toute l\'Europe' },
            { emoji: '↩️', title: 'Retours faciles', desc: 'Processus de retour simple et sans tracas' },
            { emoji: '🎧', title: 'Support client 24/7', desc: 'Assistance clientèle disponible à tout moment' },
            { emoji: '🔒', title: 'Paiement 100% sécurisé', desc: 'Transactions financières protégées' },
          ].map((item, i) => (
            <div key={i} style={{
              textAlign: 'center',
              maxWidth: '180px'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.emoji}</div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: 'var(--color-text)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                {item.title}
              </h3>
              <p style={{
                color: 'var(--color-text-light)',
                fontSize: '12px',
                lineHeight: '1.6'
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
     <Footer />

    </div>
  );
}

export default Accueil;

