import { baseTemplate } from './layouts/base.template';

export interface PaymentConfirmationData {
  userName: string;
  paymentDetails: {
    amount: string;
    date: string;
    reference: string;
    method: string;
  };
  invoiceUrl?: string;
}

export const paymentConfirmationTemplate = (data: PaymentConfirmationData) => {
  const content = `
    <h2>Paiement confirmé</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Votre paiement a été traité avec succès.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du paiement</h3>
      <p><strong>Montant :</strong> ${data.paymentDetails.amount}</p>
      <p><strong>Date :</strong> ${data.paymentDetails.date}</p>
      <p><strong>Référence :</strong> ${data.paymentDetails.reference}</p>
      <p><strong>Méthode :</strong> ${data.paymentDetails.method}</p>
    </div>
    
    ${
      data.invoiceUrl
        ? `
    <p>Vous pouvez télécharger votre facture en cliquant sur le bouton ci-dessous :</p>
    <a href="${data.invoiceUrl}" class="button">Télécharger la facture</a>
    `
        : ''
    }
  `;

  return baseTemplate(content);
};
