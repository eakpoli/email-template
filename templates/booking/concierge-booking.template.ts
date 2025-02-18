import { baseTemplate } from '../layouts/base.template';

export interface ConciergeBookingData {
  userName: string;
  bookingType: 'new' | 'modification' | 'cancellation';
  bookingDetails: {
    reference: string;
    serviceName: string;
    date: string;
    time: string;
    location: string;
    duration?: string;
    price: string;
    serviceDetails: string[];
  };
  modificationDetails?: {
    oldDate?: string;
    oldTime?: string;
    priceDifference?: string;
    serviceChanges?: string[];
  };
  cancellationDetails?: {
    refundAmount?: string;
    refundDelay?: string;
  };
  conciergeInfo?: {
    name: string;
    phone: string;
    email: string;
  };
  actionLink?: string;
}

export const conciergeBookingTemplate = (data: ConciergeBookingData) => {
  const getTitle = () => {
    switch (data.bookingType) {
      case 'new':
        return 'Confirmation de service de conciergerie';
      case 'modification':
        return 'Modification de votre service de conciergerie';
      case 'cancellation':
        return 'Annulation de votre service de conciergerie';
    }
  };

  const content = `
    <h2>${getTitle()}</h2>
    <p>Bonjour ${data.userName},</p>
    
    ${
      data.bookingType === 'new'
        ? `
    <p>Votre demande de service de conciergerie a été confirmée avec succès.</p>
    `
        : data.bookingType === 'modification'
          ? `
    <p>Votre service a été modifié selon vos souhaits.</p>
    `
          : `
    <p>Votre service a été annulé avec succès.</p>
    `
    }
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du service</h3>
      <p><strong>Référence :</strong> ${data.bookingDetails.reference}</p>
      <p><strong>Service :</strong> ${data.bookingDetails.serviceName}</p>
      <p><strong>Date :</strong> ${data.bookingDetails.date}</p>
      <p><strong>Heure :</strong> ${data.bookingDetails.time}</p>
      <p><strong>Lieu :</strong> ${data.bookingDetails.location}</p>
      ${data.bookingDetails.duration ? `<p><strong>Durée estimée :</strong> ${data.bookingDetails.duration}</p>` : ''}
      <p><strong>Détails du service :</strong></p>
      <ul>
        ${data.bookingDetails.serviceDetails.map((detail) => `<li>${detail}</li>`).join('')}
      </ul>
      <p><strong>Prix total :</strong> ${data.bookingDetails.price}</p>
    </div>

    ${
      data.conciergeInfo
        ? `
    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Votre concierge dédié</h3>
      <p><strong>Nom :</strong> ${data.conciergeInfo.name}</p>
      <p><strong>Téléphone :</strong> ${data.conciergeInfo.phone}</p>
      <p><strong>Email :</strong> ${data.conciergeInfo.email}</p>
    </div>
    `
        : ''
    }

    ${
      data.modificationDetails
        ? `
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Modifications apportées</h3>
      ${data.modificationDetails.oldDate ? `<p><strong>Ancienne date :</strong> ${data.modificationDetails.oldDate}</p>` : ''}
      ${data.modificationDetails.oldTime ? `<p><strong>Ancien horaire :</strong> ${data.modificationDetails.oldTime}</p>` : ''}
      ${data.modificationDetails.priceDifference ? `<p><strong>Différence de prix :</strong> ${data.modificationDetails.priceDifference}</p>` : ''}
      ${
        data.modificationDetails.serviceChanges
          ? `
      <p><strong>Modifications des services :</strong></p>
      <ul>
        ${data.modificationDetails.serviceChanges.map((change) => `<li>${change}</li>`).join('')}
      </ul>
      `
          : ''
      }
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
