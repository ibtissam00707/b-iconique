function FAQ() {
  const questions = [
    { q: "Quels matériaux utilisez-vous ?", r: "Nous utilisons uniquement de l'acier inoxydable 304 ou 316L (acier médical), hypoallergénique, résistant à l'eau et inaltérable." },
    { q: "Combien de temps dure la livraison ?", r: "La livraison prend généralement 3 à 5 jours ouvrés en France, et 5 à 10 jours ouvrés dans le reste de l'Europe." },
    { q: "Puis-je retourner un article ?", r: "Oui, vous disposez de 14 jours après réception pour retourner un article en bon état dans son emballage d'origine." },
    { q: "Comment entretenir mes bijoux ?", r: "Rincez-les à l'eau claire après contact avec le sel ou le chlore. Essuyez-les avec un chiffon doux. Évitez les produits chimiques agressifs." },
    { q: "Les bijoux sont-ils résistants à l'eau ?", r: "Oui ! L'acier inoxydable est parfaitement résistant à l'eau. Vous pouvez porter vos bijoux sous la douche ou à la plage." },
    { q: "Comment suivre ma commande ?", r: "Un email de confirmation avec un numéro de suivi vous sera envoyé dès l'expédition de votre commande." },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ fontWeight: 'normal', fontSize: '32px', color: '#8B2635', marginBottom: '8px', textAlign: 'center' }}>
        Questions Fréquentes
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '48px', fontSize: '14px' }}>
        Vous avez une question ? Nous avons la réponse.
      </p>
      {questions.map((item, i) => (
        <div key={i} style={{
          borderBottom: '1px solid #E0D8D0', paddingBottom: '24px', marginBottom: '24px'
        }}>
          <h3 style={{ fontWeight: 'normal', fontSize: '18px', color: '#333', marginBottom: '10px' }}>
            {item.q}
          </h3>
          <p style={{ color: '#666', lineHeight: '1.8', fontSize: '14px', margin: 0 }}>
            {item.r}
          </p>
        </div>
      ))}
    </div>
  );
}
export default FAQ;

