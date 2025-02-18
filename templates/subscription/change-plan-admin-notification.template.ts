import { PricingPeriod } from '@prisma/client';
import { baseTemplate } from '../layouts/base.template';
import { formatPricingPeriod } from 'src/lib/utils';
export interface ChangePlanNotificationAdminData {
  userName: string; // Nom de l'administrateur
  user: {
    email: string; // Email de l'utilisateur
    phone?: string; // Téléphone de l'utilisateur (optionnel)
    name: string; // Nom de l'utilisateur
  };
  oldPlan: {
    name: string; // Nom de l'ancien plan
    price: number; // Prix de l'ancien plan
    billingPeriod: PricingPeriod; // Durée de l'ancien plan
    createdAt: string; // Date de création de l'ancien plan
  };
  newPlan: {
    name: string; // Nom du nouveau plan
    price: number; // Prix du nouveau plan
    billingPeriod: PricingPeriod; // Durée du nouveau plan
    createdAt: string; // Date de création du nouveau plan
  };
}

export const changePlanNotificationAdminTemplate = (
  data: ChangePlanNotificationAdminData,
) => {
  const { userName, oldPlan, newPlan } = data;

  const content = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #81016e; text-align: center; margin-bottom: 20px; font-size: 24px; font-weight: bold;">
                Notification de changement de plan d'abonnement
            </h2>
            <p>Bonjour <strong>${userName}</strong>,</p>
            <p>Nous vous informons que l'utilisateur <strong>${data.user.name}</strong> (${data.user.email}) a modifié son plan d'abonnement.</p>
            <p>Voici les détails de l'ancien plan :</p>
            <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Nom de l'ancien plan :</strong> ${oldPlan.name}</li>
                <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Prix de l'ancien plan :</strong> ${oldPlan.price.toFixed(2)} €</li>
                <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Durée de l'ancien plan :</strong> ${formatPricingPeriod(oldPlan.billingPeriod)}</li>
                <li style="padding: 8px 0;"><strong>Date de création de l'ancien plan :</strong> ${oldPlan.createdAt}</li>
            </ul>
            <p>Voici les détails du nouveau plan :</p>
            <ul style="list-style-type: none; padding: 0; margin: 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Nom du nouveau plan :</strong> ${newPlan.name}</li>
                <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Prix du nouveau plan :</strong> ${newPlan.price.toFixed(2)} €</li>
                <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Durée du nouveau plan :</strong> ${formatPricingPeriod(newPlan.billingPeriod)}</li>
                <li style="padding: 8px 0;"><strong>Date de création du nouveau plan :</strong> ${newPlan.createdAt}</li>
            </ul>
           
            <p style="text-align: center; color: #777; font-size: 14px;">Cordialement,</p>
            <p style="text-align: center; color: #777; font-size: 14px;"><em>L'équipe Support</em></p>
            
        </div>
    `;

  return baseTemplate(content);
};
