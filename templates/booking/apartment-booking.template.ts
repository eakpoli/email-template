import { baseTemplate } from '../layouts/base.template';

export interface ApartmentBookingData {
  userName: string;
  bookingType: 'new' | 'modification' | 'cancellation';
  bookingDetails: {
    reference: string;
    apartmentName: string;
    checkIn: string;
    checkOut: string;
    address: string;
    guests: number;
    price: string;
    amenities?: string[];
  };
  modificationDetails?: {
    oldCheckIn?: string;
    oldCheckOut?: string;
    priceDifference?: string;
  };
  cancellationDetails?: {
    refundAmount?: string;
    refundDelay?: string;
  };
  checkInInstructions?: {
    keyCollection: string;
    contactPerson: string;
    phone: string;
  };
  actionLink?: string;
}

export const apartmentBookingTemplate = (data: ApartmentBookingData) => {
  const getTitle = () => {
    switch (data.bookingType) {
      case 'new':
        return "Confirmation de réservation d'appartement";
      case 'modification':
        return "Modification de votre réservation d'appartement";
      case 'cancellation':
        return "Annulation de votre réservation d'appartement";
    }
  };

  const content = `
    <h2>${getTitle()}</h2>
    <p>Bonjour ${data.userName},</p>
    
    ${
      data.bookingType === 'new'
        ? `
    <p>Votre réservation d'appartement a été confirmée avec succès.</p>
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
      <p><strong>Appartement :</strong> ${data.bookingDetails.apartmentName}</p>
      <p><strong>Adresse :</strong> ${data.bookingDetails.address}</p>
      <p><strong>Arrivée :</strong> ${data.bookingDetails.checkIn}</p>
      <p><strong>Départ :</strong> ${data.bookingDetails.checkOut}</p>
      <p><strong>Nombre de voyageurs :</strong> ${data.bookingDetails.guests}</p>
      ${
        data.bookingDetails.amenities
          ? `
      <p><strong>Équipements :</strong></p>
      <ul>
        ${data.bookingDetails.amenities.map((amenity) => `<li>${amenity}</li>`).join('')}
      </ul>
      `
          : ''
      }
      <p><strong>Prix total :</strong> ${data.bookingDetails.price}</p>
    </div>

    ${
      data.checkInInstructions
        ? `
    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Instructions d'arrivée</h3>
      <p><strong>Récupération des clés :</strong> ${data.checkInInstructions.keyCollection}</p>
      <p><strong>Personne à contacter :</strong> ${data.checkInInstructions.contactPerson}</p>
      <p><strong>Téléphone :</strong> ${data.checkInInstructions.phone}</p>
    </div>
    `
        : ''
    }

    ${
      data.modificationDetails
        ? `
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Modifications apportées</h3>
      ${data.modificationDetails.oldCheckIn ? `<p><strong>Ancienne date d'arrivée :</strong> ${data.modificationDetails.oldCheckIn}</p>` : ''}
      ${data.modificationDetails.oldCheckOut ? `<p><strong>Ancienne date de départ :</strong> ${data.modificationDetails.oldCheckOut}</p>` : ''}
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
