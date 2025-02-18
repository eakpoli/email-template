import { baseTemplate } from '../layouts/base.template';

export interface BankAccountAddedData {
  userName: string; // Nom de l'utilisateur
  bankAccountDetails: {
    bankName: string; // Nom de la banque
    accountNumber: string; // Numéro de compte (masqué pour des raisons de sécurité)
    accountType: 'SAVINGS' | 'CURRENT'; // Type de compte (épargne ou courant)
    addedDate: string; // Date d'ajout du compte
  };
  actionLink?: string; // Lien pour gérer le compte bancaire
}

export const bankAccountAddedTemplate = (data: BankAccountAddedData) => {
  const content = `
    <h2>Compte bancaire ajouté avec succès</h2>
    <p>Bonjour ${data.userName},</p>
    
    <p>Votre compte bancaire a été ajouté avec succès à votre compte. Voici les détails :</p>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du compte bancaire</h3>
      <p><strong>Banque :</strong> ${data.bankAccountDetails.bankName}</p>
      <p><strong>Numéro de compte :</strong> ${data.bankAccountDetails.accountNumber}</p>
      <p><strong>Type de compte :</strong> ${data.bankAccountDetails.accountType === 'SAVINGS' ? 'Épargne' : 'Courant'}</p>
      <p><strong>Date d'ajout :</strong> ${data.bankAccountDetails.addedDate}</p>
    </div>

    ${
      data.actionLink
        ? `
    <p>Vous pouvez gérer votre compte bancaire en cliquant sur le lien ci-dessous :</p>
    <a href="${data.actionLink}" class="button">Gérer mon compte bancaire</a>
    `
        : ''
    }

    <p>Si vous n'avez pas effectué cette action, veuillez nous contacter immédiatement.</p>
  `;

  return baseTemplate(content);
};
