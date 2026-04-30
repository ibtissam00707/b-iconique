function PolitiqueRetour() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ fontWeight: 'normal', fontSize: '32px', color: '#8B2635', marginBottom: '32px', textAlign: 'center' }}>
        Politique de Retour
      </h1>
      {[
        { titre: "Délai de retour", contenu: "Vous disposez de 14 jours calendaires à compter de la réception de votre commande pour retourner un article. Passé ce délai, aucun retour ne sera accepté." },
        { titre: "Conditions de retour", contenu: "Les articles doivent être retournés dans leur état d'origine, non portés, non lavés, avec tous leurs accessoires et dans leur emballage d'origine. Tout article endommagé, utilisé ou incomplet ne sera pas remboursé." },
        { titre: "Procédure de retour", contenu: "Contactez notre service client à contact@b-iconique.fr en indiquant votre numéro de commande et le motif du retour. Nous vous enverrons une étiquette de retour par email sous 48h." },
        { titre: "Remboursement", contenu: "Le remboursement sera effectué dans les 14 jours suivant la réception des articles retournés, sur le moyen de paiement utilisé lors de la commande." },
        { titre: "Articles non remboursables", contenu: "Les articles personnalisés, les bijoux avec gravure et les articles marqués comme en promotion finale ne sont pas éligibles au retour." },
      ].map((section, i) => (
        <div key={i} style={{ marginBottom: '32px' }}>
          <h2 style={{ fontWeight: 'normal', fontSize: '20px', color: '#8B2635', marginBottom: '12px' }}>
            {section.titre}
          </h2>
          <p style={{ color: '#555', lineHeight: '1.8', fontSize: '14px' }}>{section.contenu}</p>
        </div>
      ))}
    </div>
  );
}
export default PolitiqueRetour;

