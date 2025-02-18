import { baseTemplate } from './layouts/base.template';

export interface WalletRechargeConfirmationData {
  userName: string;
  rechargeDetails: {
    amount: string;
    date: string;
    reference: string;
    method: string;
  };
  newBalance: string; // Solde mis à jour après la recharge
  supportEmail?: string; // E-mail de support personnalisé
}

export const walletRechargeConfirmationTemplate = (
  data: WalletRechargeConfirmationData,
) => {
  const content = `
    <h2 style="color: #2e7d32; margin-bottom: 20px;">Recharge de portefeuille confirmée</h2>
    <p>Bonjour <strong>${data.userName}</strong>,</p>
    <p>Nous vous confirmons que votre recharge de portefeuille électronique sur <strong>Séjour 24</strong> a été effectuée avec succès. Voici les détails de votre transaction :</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
      <h3 style="margin-top: 0; color: #333;">Détails de la recharge</h3>
      <p><strong>Montant rechargé :</strong> ${data.rechargeDetails.amount}</p>
      <p><strong>Date :</strong> ${data.rechargeDetails.date}</p>
      <p><strong>Référence :</strong> ${data.rechargeDetails.reference}</p>
      <p><strong>Méthode de paiement :</strong> ${data.rechargeDetails.method}</p>
      <p><strong>Nouveau solde :</strong> ${data.newBalance}</p>
    </div>
    
    <p>Vous pouvez dès maintenant utiliser votre portefeuille pour réserver vos séjours, activités et bien plus encore sur <strong>Séjour 24</strong>.</p>
    
    <p style="margin-top: 20px;">Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter à l'adresse suivante : <a href="mailto:${data.supportEmail || 'support@sejour24.com'}" style="color: #2e7d32;">${data.supportEmail || 'support@sejour24.com'}</a>.</p>
    <p>Merci pour votre confiance et à bientôt sur <strong>Séjour 24</strong> !</p>
    <p style="font-style: italic;">L'équipe de Séjour 24</p>
  `;

  return baseTemplate(content);
};
