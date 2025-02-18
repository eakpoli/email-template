import { baseTemplate } from '../layouts/base.template';

export interface BankAccountUpdatedData {
  userName: string; // Nom de l'utilisateur
  updatedBankAccountDetails: {
    bankName: string; // Nouveau nom de la banque
    accountNumber: string; // Nouveau numéro de compte (masqué pour des raisons de sécurité)
    accountType: 'SAVINGS' | 'CURRENT'; // Nouveau type de compte (épargne ou courant)
    updatedDate: string; // Date de la modification
  };
  oldBankAccountDetails?: {
    bankName?: string; // Ancien nom de la banque
    accountNumber?: string; // Ancien numéro de compte (masqué)
    accountType?: 'SAVINGS' | 'CURRENT'; // Ancien type de compte
  };
  actionLink?: string; // Lien pour gérer le compte bancaire
}

export const bankAccountUpdatedTemplate = (data: BankAccountUpdatedData) => {
  const content = `
    <h2>Compte bancaire modifié avec succès</h2>
    <p>Bonjour ${data.userName},</p>
    
    <p>Votre compte bancaire a été modifié avec succès. Voici les détails :</p>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Nouveaux détails du compte bancaire</h3>
      <p><strong>Banque :</strong> ${data.updatedBankAccountDetails.bankName}</p>
      <p><strong>Numéro de compte :</strong> ${data.updatedBankAccountDetails.accountNumber}</p>
      <p><strong>Type de compte :</strong> ${data.updatedBankAccountDetails.accountType === 'SAVINGS' ? 'Épargne' : 'Courant'}</p>
      <p><strong>Date de modification :</strong> ${data.updatedBankAccountDetails.updatedDate}</p>
    </div>

    ${
      data.oldBankAccountDetails
        ? `
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Anciens détails du compte bancaire</h3>
      ${data.oldBankAccountDetails.bankName ? `<p><strong>Ancienne banque :</strong> ${data.oldBankAccountDetails.bankName}</p>` : ''}
      ${data.oldBankAccountDetails.accountNumber ? `<p><strong>Ancien numéro de compte :</strong> ${data.oldBankAccountDetails.accountNumber}</p>` : ''}
      ${data.oldBankAccountDetails.accountType ? `<p><strong>Ancien type de compte :</strong> ${data.oldBankAccountDetails.accountType === 'SAVINGS' ? 'Épargne' : 'Courant'}</p>` : ''}
    </div>
    `
        : ''
    }

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
