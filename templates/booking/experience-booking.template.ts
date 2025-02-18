import { baseTemplate } from '../layouts/base.template';

export interface ExperienceBookingData {
  userName: string;
  bookingType: 'new' | 'modification' | 'cancellation';
  bookingDetails: {
    reference: string;
    experienceName: string;
    date: string;
    time: string;
    location: string;
    duration: string;
    participants: number;
    price: string;
    includedItems?: string[];
    requirements?: string[];
  };
  modificationDetails?: {
    oldDate?: string;
    oldTime?: string;
    priceDifference?: string;
  };
  cancellationDetails?: {
    refundAmount?: string;
    refundDelay?: string;
  };
  hostInfo?: {
    name: string;
    phone: string;
    meetingPoint: string;
  };
  actionLink?: string;
}

export const experienceBookingTemplate = (data: ExperienceBookingData) => {
  const getTitle = () => {
    switch (data.bookingType) {
      case 'new':
        return "Confirmation de réservation d'expérience";
      case 'modification':
        return "Modification de votre réservation d'expérience";
      case 'cancellation':
        return "Annulation de votre réservation d'expérience";
    }
  };

  const content = `
    <h2>${getTitle()}</h2>
    <p>Bonjour ${data.userName},</p>
    
    ${
      data.bookingType === 'new'
        ? `
    <p>Votre réservation d'expérience a été confirmée avec succès.</p>
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
      <h3 style="margin-top: 0;">Détails de l'expérience</h3>
      <p><strong>Référence :</strong> ${data.bookingDetails.reference}</p>
      <p><strong>Expérience :</strong> ${data.bookingDetails.experienceName}</p>
      <p><strong>Date :</strong> ${data.bookingDetails.date}</p>
      <p><strong>Heure :</strong> ${data.bookingDetails.time}</p>
      <p><strong>Lieu :</strong> ${data.bookingDetails.location}</p>
      <p><strong>Durée :</strong> ${data.bookingDetails.duration}</p>
      <p><strong>Nombre de participants :</strong> ${data.bookingDetails.participants}</p>
      ${
        data.bookingDetails.includedItems
          ? `
      <p><strong>Ce qui est inclus :</strong></p>
      <ul>
        ${data.bookingDetails.includedItems.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      `
          : ''
      }
      ${
        data.bookingDetails.requirements
          ? `
      <p><strong>À prévoir :</strong></p>
      <ul>
        ${data.bookingDetails.requirements.map((req) => `<li>${req}</li>`).join('')}
      </ul>
      `
          : ''
      }
      <p><strong>Prix total :</strong> ${data.bookingDetails.price}</p>
    </div>

    ${
      data.hostInfo
        ? `
    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Informations sur votre hôte</h3>
      <p><strong>Nom :</strong> ${data.hostInfo.name}</p>
      <p><strong>Téléphone :</strong> ${data.hostInfo.phone}</p>
      <p><strong>Point de rendez-vous :</strong> ${data.hostInfo.meetingPoint}</p>
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
