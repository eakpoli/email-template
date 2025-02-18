import { baseTemplate } from '../layouts/base.template';

export interface SubscriptionNotificationData {
  userName: string; // Nom de l'utilisateur
  subscriptionName: string; // Nom de l'abonnement
  subscriptionPrice: number; // Prix de l'abonnement
  subscriptionDuration: number; // Durée de l'abonnement
  subscriptionStartDate: string; // Date de début de l'abonnement
  subscriptionEndDate: string; // Date de fin de l'abonnement
  subscriptionStatus: string; // Statut de l'abonnement
  invoiceUrl: string; // URL pour télécharger la facture
}

export const subscriptionNotificationTemplate = (
  data: SubscriptionNotificationData,
) => {
  const {
    userName,
    subscriptionName,
    subscriptionPrice,
    subscriptionDuration,
    subscriptionStartDate,
    subscriptionEndDate,
    subscriptionStatus,
    invoiceUrl,
  } = data;

  const content = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #81016e; text-align: center; margin-bottom: 20px; font-size: 24px; font-weight: bold;">
        Confirmation de votre abonnement
      </h2>
      <p>Bonjour <strong>${userName}</strong>,</p>
      <p>Nous sommes ravis de vous informer que votre abonnement à <strong>${subscriptionName}</strong> a été créé avec succès.</p>
      <p>Voici les détails de votre abonnement :</p>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Prix de l'abonnement :</strong> ${subscriptionPrice.toFixed(2)} €</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Durée de l'abonnement :</strong> ${subscriptionDuration} mois</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date de début :</strong> ${subscriptionStartDate}</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date de fin :</strong> ${subscriptionEndDate}</li>
        <li style="padding: 8px 0;"><strong>Statut de l'abonnement :</strong> ${subscriptionStatus}</li>
      </ul>
      <p style="margin-top: 20px; text-align: center;">Vous pouvez télécharger votre facture en cliquant sur le bouton ci-dessous :</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="${invoiceUrl}" style="display: inline-block; padding: 12px 24px; background-color: #81016e; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; transition: background-color 0.3s ease;">
          Télécharger la facture
        </a>
      </div>
      <p style="margin-top: 30px; text-align: center; color: #777; font-size: 14px;">
        Merci pour votre confiance. Si vous avez des questions, n'hésitez pas à nous contacter.
      </p>
      <p style="text-align: center; color: #777; font-size: 14px;">Cordialement,</p>
      <p style="text-align: center; color: #777; font-size: 14px;"><em>L'équipe Support</em></p>
    </div>
  `;

  return baseTemplate(content);
};
