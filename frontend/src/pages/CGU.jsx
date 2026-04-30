function CGU() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ fontWeight: 'normal', fontSize: '32px', color: '#8B2635', marginBottom: '32px', textAlign: 'center' }}>
        Conditions Générales d'Utilisation
      </h1>
      {[
        { titre: "1. Présentation", contenu: "B-Icônique est une boutique en ligne spécialisée dans la vente de bijoux en acier inoxydable. En accédant à ce site, vous acceptez les présentes conditions d'utilisation." },
        { titre: "2. Commandes", contenu: "Toute commande passée sur notre site vaut acceptation des prix et descriptions des produits. B-Icônique se réserve le droit d'annuler une commande en cas de stock insuffisant, avec remboursement intégral." },
        { titre: "3. Prix", contenu: "Les prix affichés sont en euros TTC. Les frais de livraison sont de 4,99€ et offerts dès 50€ d'achat pour toute livraison en Europe." },
        { titre: "4. Paiement", contenu: "Le paiement est sécurisé et s'effectue par carte bancaire (Visa, Mastercard) ou PayPal. La commande est validée après confirmation du paiement." },
        { titre: "5. Livraison", contenu: "Nous livrons uniquement dans les pays européens. Les délais de livraison sont de 3 à 10 jours ouvrés selon le pays de destination." },
        { titre: "6. Propriété intellectuelle", contenu: "Tous les contenus du site (photos, textes, logo) sont la propriété exclusive de B-Icônique et sont protégés par le droit de la propriété intellectuelle." },
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
export default CGU;

