import { baseTemplate } from '../layouts/base.template';

export interface CarBookingData {
  userName: string;
  bookingType: 'new' | 'modification' | 'cancellation';
  bookingDetails: {
    reference: string;
    carModel: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    pickupLocation: string;
    returnLocation: string;
    price: string;
    insurance?: string;
  };
  modificationDetails?: {
    oldPickupDate?: string;
    oldReturnDate?: string;
    priceDifference?: string;
  };
  cancellationDetails?: {
    refundAmount?: string;
    refundDelay?: string;
  };
  actionLink?: string;
}

export const carBookingTemplate = (data: CarBookingData) => {
  const getTitle = () => {
    switch (data.bookingType) {
      case 'new':
        return 'Confirmation de réservation de voiture';
      case 'modification':
        return 'Modification de votre réservation de voiture';
      case 'cancellation':
        return 'Annulation de votre réservation de voiture';
    }
  };

  const content = `
    <h2>${getTitle()}</h2>
    <p>Bonjour ${data.userName},</p>
    
    ${
      data.bookingType === 'new'
        ? `
    <p>Votre réservation de voiture a été confirmée avec succès.</p>
    `
        : data.bookingType === 'modification'
          ? `
    <p>Votre réservation a été modifiée selon vos souhaits.</p>
    `
          : `
    <p>Votre réservation a été annulée avec succès.</p>
    `
    }
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails de la réservation</h3>
      <p><strong>Référence :</strong> ${data.bookingDetails.reference}</p>
      <p><strong>Modèle :</strong> ${data.bookingDetails.carModel}</p>
      <p><strong>Date de prise en charge :</strong> ${data.bookingDetails.pickupDate} à ${data.bookingDetails.pickupTime}</p>
      <p><strong>Lieu de prise en charge :</strong> ${data.bookingDetails.pickupLocation}</p>
      <p><strong>Date de retour :</strong> ${data.bookingDetails.returnDate} à ${data.bookingDetails.returnTime}</p>
      <p><strong>Lieu de retour :</strong> ${data.bookingDetails.returnLocation}</p>
      ${data.bookingDetails.insurance ? `<p><strong>Assurance :</strong> ${data.bookingDetails.insurance}</p>` : ''}
      <p><strong>Prix total :</strong> ${data.bookingDetails.price}</p>
    </div>

    ${
      data.modificationDetails
        ? `
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Modifications apportées</h3>
      ${data.modificationDetails.oldPickupDate ? `<p><strong>Ancienne date de prise en charge :</strong> ${data.modificationDetails.oldPickupDate}</p>` : ''}
      ${data.modificationDetails.oldReturnDate ? `<p><strong>Ancienne date de retour :</strong> ${data.modificationDetails.oldReturnDate}</p>` : ''}
      ${data.modificationDetails.priceDifference ? `<p><strong>Différence de prix :</strong> ${data.modificationDetails.priceDifference}</p>` : ''}
    </div>
    `
        : ''
    }

    ${
      data.cancellationDetails
        ? `
    <div style="background-color: #f8d7da; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Informations d'annulation</h3>
      ${data.cancellationDetails.refundAmount ? `<p><strong>Montant du remboursement :</strong> ${data.cancellationDetails.refundAmount}</p>` : ''}
      ${data.cancellationDetails.refundDelay ? `<p><strong>Délai de remboursement :</strong> ${data.cancellationDetails.refundDelay}</p>` : ''}
    </div>
    `
        : ''
    }

    ${
      data.actionLink
        ? `
    <a href="${data.actionLink}" class="button">
      ${
        data.bookingType === 'new'
          ? 'Gérer ma réservation'
          : data.bookingType === 'modification'
            ? 'Voir les détails'
            : 'Réserver à nouveau'
      }
    </a>
    `
        : ''
    }
  `;

  return baseTemplate(content);
};
