import { baseTemplate } from '../layouts/base.template';

export interface AdminWithdrawalNotificationData {
  userName: string; // Nom de l'utilisateur
  user: {
    userName: string; // Nom de l'utilisateur
    email: string; // E-mail de l'utilisateur
  };
  requestDate: string; // Date de la demande
  referenceNumber?: string; // Numéro de référence de la demande
  bankDetails: {
    bankName: string; // Nom de la banque
    accountName: string; // Nom du titulaire du compte
    accountNumber: string; // Numéro de compte (IBAN)
    accountType: string; // Type de compte (épargne ou courant)
    swiftCode?: string; // Code SWIFT (optionnel)
  };
  amount: number; // Montant du retrait
  currency: string; // Devise (ex: EUR, USD)
  processingDelay: string; // Délai de traitement du virement
  additionalInfo?: string[]; // Informations supplémentaires (optionnel)
}

export const adminWithdrawalNotificationTemplate = (
  data: AdminWithdrawalNotificationData,
) => {
  const content = `
    <h2 style="margin-bottom: 20px;">Notification de demande de retrait</h2>
    <p>Bonjour ${data.userName}, </p>
    <p>Cher administrateur de sejour24,</p>
    <p>
      Une nouvelle demande de retrait a été effectuée par l'utilisateur suivant :
    </p>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Nom :</strong> ${data.user.userName}</li>
      <li><strong>E-mail :</strong> ${data.user.email}</li>
      <li><strong>Date de la demande :</strong> ${data.requestDate}</li>
      ${
        data.referenceNumber
          ? `<li><strong>Référence :</strong> ${data.referenceNumber}</li>`
          : ''
      }
    </ul>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p><strong>Détails du retrait :</strong></p>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Montant :</strong> ${data.amount} ${data.currency}</li>
        <li><strong>Délai de traitement :</strong> ${data.processingDelay}</li>
      </ul>
    </div>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p><strong>Détails du compte bancaire :</strong></p>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Banque :</strong> ${data.bankDetails.bankName}</li>
        <li><strong>Titulaire du compte :</strong> ${
          data.bankDetails.accountName
        }</li>
        <li><strong>Numéro de compte (IBAN) :</strong> ${
          data.bankDetails.accountNumber
        }</li>
        <li><strong>Type de compte :</strong> ${
          data.bankDetails.accountType === 'SAVINGS' ? 'Épargne' : 'Courant'
        }</li>
        ${
          data.bankDetails.swiftCode
            ? `<li><strong>Code SWIFT :</strong> ${data.bankDetails.swiftCode}</li>`
            : ''
        }
      </ul>
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
    <p style="margin-top: 20px;">
      Veuillez traiter cette demande dans les plus brefs délais. Si vous avez besoin de plus d'informations, contactez l'utilisateur à l'adresse suivante : <a href="mailto:${
        data.user.email
      }" style="color: #2e7d32;">${data.user.email}</a>.
    </p>
  `;

  return baseTemplate(content);
};
