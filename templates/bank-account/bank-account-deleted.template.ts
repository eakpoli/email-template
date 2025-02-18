import { baseTemplate } from '../layouts/base.template';

export interface BankAccountDeletedData {
  userName: string; // Nom de l'utilisateur
  deletedBankAccountDetails: {
    bankName: string; // Nom de la banque
    accountNumber: string; // Numéro de compte (masqué pour des raisons de sécurité)
    accountType: 'SAVINGS' | 'CURRENT'; // Type de compte (épargne ou courant)
    deletedDate: string; // Date de suppression
  };
  actionLink?: string; // Lien pour ajouter un nouveau compte bancaire
}

export const bankAccountDeletedTemplate = (data: BankAccountDeletedData) => {
  const content = `
    <h2>Compte bancaire supprimé avec succès</h2>
    <p>Bonjour ${data.userName},</p>
    
    <p>Votre compte bancaire a été supprimé avec succès. Voici les détails du compte supprimé :</p>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du compte supprimé</h3>
      <p><strong>Banque :</strong> ${data.deletedBankAccountDetails.bankName}</p>
      <p><strong>Numéro de compte :</strong> ${data.deletedBankAccountDetails.accountNumber}</p>
      <p><strong>Type de compte :</strong> ${data.deletedBankAccountDetails.accountType === 'SAVINGS' ? 'Épargne' : 'Courant'}</p>
      <p><strong>Date de suppression :</strong> ${data.deletedBankAccountDetails.deletedDate}</p>
    </div>

    ${
      data.actionLink
        ? `
    <p>Si vous souhaitez ajouter un nouveau compte bancaire, vous pouvez cliquer sur le lien ci-dessous :</p>
    <a href="${data.actionLink}" class="button">Ajouter un nouveau compte bancaire</a>
    `
        : ''
    }

    <p>Si vous n'avez pas effectué cette action, veuillez nous contacter immédiatement.</p>
  `;

  return baseTemplate(content);
};
