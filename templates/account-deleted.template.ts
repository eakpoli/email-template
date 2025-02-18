import { baseTemplate } from './layouts/base.template';

export interface AccountDeletedData {
  userName: string;
  deletionDate?: string; // Date de suppression du compte
  supportEmail?: string; // E-mail de support pour contacter l'équipe
}

export const accountDeletedTemplate = (data: AccountDeletedData) => {
  const content = `
    <h2 style="color: #81016e; margin-bottom: 20px;">Confirmation de suppression de compte</h2>
    <p>Bonjour <strong>${data.userName}</strong>,</p>
    <p>
      Nous vous confirmons que votre compte a été supprimé avec succès le <strong>${
        data.deletionDate || new Date().toLocaleDateString('fr-FR')
      }</strong>.
    </p>
    <p>
      Toutes vos données personnelles ont été supprimées conformément à notre politique de confidentialité et au Règlement Général sur la Protection des Données (RGPD).
    </p>
    <p>
      Si vous avez des questions ou si vous avez effectué cette suppression par erreur, veuillez contacter notre équipe de support à l'adresse suivante :
      <a href="mailto:${
        data.supportEmail || 'support@sejour24.com'
      }" style="color: #81016e;">${
        data.supportEmail || 'support@sejour24.com'
      }</a>.
    </p>
    <p style="margin-top: 20px;">
      Nous vous remercions d'avoir utilisé nos services et espérons vous revoir bientôt.
    </p>
    <p style="font-style: italic;">L'équipe de Sejour24</p>
  `;

  return baseTemplate(content);
};
