import { baseTemplate } from './layouts/base.template';

export interface BookingCancellationData {
  userName: string;
  bookingReference: string;
  refundInfo?: {
    amount: string;
    delay: string;
  };
}

export const bookingCancellationTemplate = (data: BookingCancellationData) => {
  const content = `
    <h2>Annulation de réservation</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Votre réservation (réf: ${data.bookingReference}) a été annulée avec succès.</p>
    
    ${
      data.refundInfo
        ? `
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Informations de remboursement</h3>
      <p>Montant : ${data.refundInfo.amount}</p>
      <p>Délai de remboursement : ${data.refundInfo.delay}</p>
    </div>
    `
        : ''
    }
    
    <p>Nous espérons vous revoir bientôt !</p>
  `;

  return baseTemplate(content);
};
