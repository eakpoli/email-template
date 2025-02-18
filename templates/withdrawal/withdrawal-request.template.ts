import { baseTemplate } from '../layouts/base.template';

export interface WithdrawalRequestData {
  userName: string;
  requestDate: string; // Date de la demande
  referenceNumber?: string; // Numéro de référence de la demande
  amount: number; // Montant du retrait
  currency: string; // Devise (ex: EUR, USD)
  bankDetails: {
    bankName: string; // Nom de la banque
    accountName: string; // Nom du titulaire du compte
    accountNumber: string; // Numéro de compte (IBAN)
    accountType: string; // Type de compte (épargne ou courant)
    swiftCode?: string; // Code SWIFT (optionnel)
  };
  processingDelay: string; // Délai de traitement du virement
  supportEmail?: string; // E-mail de support
  additionalInfo?: string[]; // Informations supplémentaires (optionnel)
}

export const withdrawalRequestTemplate = (data: WithdrawalRequestData) => {
  const content = `
    <h2 style="margin-bottom: 20px;">Notification de demande de retrait</h2>
    <p>Bonjour <strong>${data.userName}</strong>,</p>
    <p>
            Nous vous confirmons avoir bien reçu votre demande de <strong>retrait</strong> le <strong>${data.requestDate}</strong>.
    </p>
    ${
      data.referenceNumber
        ? `<p>Votre numéro de référence pour cette demande est : <strong>${data.referenceNumber}</strong>.</p>`
        : ''
    }

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Montant du retrait :</strong> ${data.amount.toLocaleString('fr-FR', { style: 'currency', currency: data.currency })}</p>
    </div>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Détails du compte bancaire :</strong></p>
            <ul style="list-style: none; padding: 0;">
                    <li><strong>Banque :</strong> ${data.bankDetails.bankName}</li>
                    <li><strong>Titulaire du compte :</strong> ${data.bankDetails.accountName}</li>
                    <li><strong>Numéro de compte (IBAN) :</strong> ${data.bankDetails.accountNumber}</li>
                    <li><strong>Type de compte :</strong> ${data.bankDetails.accountType === 'SAVINGS' ? 'Épargne' : 'Courant'}</li>
                    ${
                      data.bankDetails.swiftCode
                        ? `<li><strong>Code SWIFT :</strong> ${data.bankDetails.swiftCode}</li>`
                        : ''
                    }
            </ul>
    </div>
    <p>
            Notre équipe traite actuellement votre demande. Le délai de traitement estimé pour votre virement est de <strong>${data.processingDelay}</strong>.
    </p>
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
            Si vous avez des questions ou souhaitez modifier votre demande, veuillez contacter notre équipe de support à l'adresse suivante :
            <a href="mailto:${data.supportEmail || 'support@votredomaine.com'}" style="color: #2e7d32;">${data.supportEmail || 'support@votredomaine.com'}</a>.
    </p>
    <p style="margin-top: 20px;">
            Nous vous remercions pour votre confiance et restons à votre disposition pour toute assistance.
    </p>
`;

  return baseTemplate(content);
};
