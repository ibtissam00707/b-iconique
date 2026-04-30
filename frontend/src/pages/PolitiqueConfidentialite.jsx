function PolitiqueConfidentialite() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ fontWeight: 'normal', fontSize: '32px', color: '#8B2635', marginBottom: '32px', textAlign: 'center' }}>
        Politique de Confidentialité
      </h1>
      {[
        { titre: "Collecte des données", contenu: "Nous collectons uniquement les données nécessaires à la gestion de vos commandes : nom, prénom, adresse email, adresse de livraison. Ces données sont collectées lors de votre inscription ou de votre commande." },
        { titre: "Utilisation des données", contenu: "Vos données personnelles sont utilisées exclusivement pour le traitement de vos commandes, l'envoi de confirmations et le suivi de vos livraisons. Nous ne vendons ni ne partageons vos données avec des tiers." },
        { titre: "Sécurité", contenu: "Toutes vos données sont stockées de manière sécurisée. Les paiements sont chiffrés et sécurisés. Nous ne conservons jamais vos informations bancaires." },
        { titre: "Vos droits", contenu: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à contact@b-iconique.fr." },
        { titre: "Cookies", contenu: "Notre site utilise uniquement des cookies techniques nécessaires au bon fonctionnement (panier, session). Nous n'utilisons pas de cookies publicitaires ou de tracking." },
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
export default PolitiqueConfidentialite;

