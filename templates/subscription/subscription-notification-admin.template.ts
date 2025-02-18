import { baseTemplate } from '../layouts/base.template';

export interface SubscriptionNotificationAdminData {
  adminName: string; // Nom de l'administrateur
  subscriberId: string; // ID de l'abonné
  subscriberDetails: {
    subscriberName: string; // Nom de l'abonné
    subscriberEmail: string; // Email de l'abonné
    subscriberPhone?: string; // Téléphone de l'abonné (optionnel)
  };
  subscriptionDetails: {
    subscriptionName: string; // Nom de l'abonnement
    subscriptionPrice: number; // Prix de l'abonnement
    subscriptionDuration: number; // Durée de l'abonnement
    subscriptionStartDate: string; // Date de début de l'abonnement
    subscriptionEndDate: string; // Date de fin de l'abonnement
    subscriptionStatus: string; // Statut de l'abonnement
  };
}

export const subscriptionNotificationAdminTemplate = (
  data: SubscriptionNotificationAdminData,
) => {
  const {
    adminName,
    subscriberDetails: { subscriberName, subscriberEmail, subscriberPhone },
    subscriptionDetails: {
      subscriptionName,
      subscriptionPrice,
      subscriptionDuration,
      subscriptionStartDate,
      subscriptionEndDate,
      subscriptionStatus,
    },
  } = data;

  const content = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #81016e; text-align: center; margin-bottom: 20px; font-size: 24px; font-weight: bold;">
        Nouvel abonnement créé
      </h2>
      <p>Bonjour <strong>${adminName}</strong>,</p>
      <p>Un nouvel abonnement a été créé avec les détails suivants :</p>

      <h3 style="color: #81016e; font-size: 18px; margin-top: 20px; margin-bottom: 10px;">Informations de l'abonné :</h3>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Nom de l'abonné :</strong> ${subscriberName}</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email de l'abonné :</strong> ${subscriberEmail}</li>
        ${subscriberPhone ? `<li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Téléphone de l'abonné :</strong> ${subscriberPhone}</li>` : ''}
      </ul>

      <h3 style="color: #81016e; font-size: 18px; margin-top: 20px; margin-bottom: 10px;">Détails de l'abonnement :</h3>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Nom de l'abonnement :</strong> ${subscriptionName}</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Prix de l'abonnement :</strong> ${subscriptionPrice.toFixed(2)} €</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Durée de l'abonnement :</strong> ${subscriptionDuration}</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date de début :</strong> ${subscriptionStartDate}</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date de fin :</strong> ${subscriptionEndDate}</li>
        <li style="padding: 8px 0;"><strong>Statut de l'abonnement :</strong> ${subscriptionStatus}</li>
      </ul>

      <p style="margin-top: 30px; text-align: center; color: #777; font-size: 14px;">
        Cet e-mail est une notification automatique. Aucune action n'est requise de votre part.
      </p>
      <p style="text-align: center; color: #777; font-size: 14px;">Cordialement,</p>
      <p style="text-align: center; color: #777; font-size: 14px;"><em>L'équipe Support</em></p>
    </div>
  `;

  return baseTemplate(content);
};
