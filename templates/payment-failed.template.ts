import { baseTemplate } from './layouts/base.template';

export interface PaymentFailedData {
  userName: string;
  paymentDetails: {
    amount: string;
    reference: string;
  };
  errorMessage: string;
  retryUrl: string;
}

export const paymentFailedTemplate = (data: PaymentFailedData) => {
  const content = `
    <h2>Échec du paiement</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Nous n'avons pas pu traiter votre paiement.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails</h3>
      <p><strong>Montant :</strong> ${data.paymentDetails.amount}</p>
      <p><strong>Référence :</strong> ${data.paymentDetails.reference}</p>
      <p><strong>Erreur :</strong> ${data.errorMessage}</p>
    </div>
    
    <p>Veuillez réessayer avec une autre méthode de paiement :</p>
    <a href="${data.retryUrl}" class="button">Réessayer le paiement</a>
  `;

  return baseTemplate(content);
};
