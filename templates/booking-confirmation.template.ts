import { baseTemplate } from './layouts/base.template';

export interface BookingConfirmationData {
  userName: string;
  bookingDetails: {
    reference: string;
    date: string;
    time?: string;
    location?: string;
    price: string;
  };
  cancellationLink: string;
}

export const bookingConfirmationTemplate = (data: BookingConfirmationData) => {
  const content = `
    <h2>Confirmation de réservation</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Votre réservation a été confirmée avec succès !</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails de la réservation</h3>
      <p><strong>Référence :</strong> ${data.bookingDetails.reference}</p>
      <p><strong>Date :</strong> ${data.bookingDetails.date}</p>
      ${data.bookingDetails.time ? `<p><strong>Heure :</strong> ${data.bookingDetails.time}</p>` : ''}
      ${data.bookingDetails.location ? `<p><strong>Lieu :</strong> ${data.bookingDetails.location}</p>` : ''}
      <p><strong>Prix :</strong> ${data.bookingDetails.price}</p>
    </div>

    <p>Si vous souhaitez annuler votre réservation, cliquez sur le lien ci-dessous :</p>
    <a href="${data.cancellationLink}" class="button">Annuler la réservation</a>
  `;

  return baseTemplate(content);
};
