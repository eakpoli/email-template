import { baseTemplate } from '../layouts/base.template';

export interface WithdrawalStatusChangeData {
  userName: string; // Nom de l'utilisateur
  requestDate: string; // Date de la demande
  referenceNumber?: string; // Numéro de référence de la demande
  newStatus: string; // Nouveau statut de la demande (ex: "En traitement", "Approuvé", "Rejeté")
  bankDetails: {
    bankName: string; // Nom de la banque
    accountName: string; // Nom du titulaire du compte
    accountNumber: string; // Numéro de compte (IBAN)
  };
  amount: number; // Montant du retrait
  currency: string; // Devise (ex: EUR, USD)
  processingDelay?: string; // Délai de traitement (optionnel)
  additionalInfo?: string[]; // Informations supplémentaires (optionnel)
  supportEmail?: string; // E-mail de support
}

export const withdrawalStatusChangeTemplate = (
  data: WithdrawalStatusChangeData,
) => {
  const content = `
    <h2 style="margin-bottom: 20px;">Changement de statut de votre demande de retrait</h2>
    <p>Bonjour <strong>${data.userName}</strong>,</p>
    <p>
      Nous vous informons que le statut de votre demande de retrait du <strong>${
        data.requestDate
      }</strong> a été mis à jour.
    </p>
    ${
      data.referenceNumber
        ? `<p>Votre numéro de référence pour cette demande est : <strong>${data.referenceNumber}</strong>.</p>`
        : ''
    }
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p><strong>Nouveau statut :</strong> ${data.newStatus}</p>
      <p><strong>Montant du retrait :</strong> ${data.amount} ${
        data.currency
      }</p>
      <p><strong>Compte bancaire :</strong> ${data.bankDetails.accountName} (${
        data.bankDetails.bankName
      })</p>
      <p><strong>Numéro de compte (IBAN) :</strong> ${
        data.bankDetails.accountNumber
      }</p>
      ${
        data.processingDelay
          ? `<p><strong>Délai de traitement :</strong> ${data.processingDelay}</p>`
          : ''
      }
    </div>
    ${
      data.additionalInfo
        ? `<div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Informations supplémentaires :</strong></p>
            <ul style="list-style: none; padding: 0;">
              ${data.additionalInfo.map((info) => `<li>${info}</li>`).join('')}
            </ul>
          </div>`
        : ''
    }
    <p>
      Si vous avez des questions ou besoin d'assistance, veuillez contacter notre équipe de support à l'adresse suivante :
      <a href="mailto:${
        data.supportEmail || 'support@votredomaine.com'
      }" style="color: #2e7d32;">${
        data.supportEmail || 'support@votredomaine.com'
      }</a>.
    </p>
    <p style="margin-top: 20px;">
      Nous vous remercions pour votre confiance et restons à votre disposition pour toute assistance.
    </p>
  `;

  return baseTemplate(content);
};
