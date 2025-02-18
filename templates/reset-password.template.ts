import { baseTemplate } from './layouts/base.template';

export interface ResetPasswordTemplateData {
  userName: string;
  resetLink: string;
  expirationTime: string;
}

export const resetPasswordTemplate = (data: ResetPasswordTemplateData) => {
  const content = `
    <h2>Réinitialisation de mot de passe</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
    <p>Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
    <a href="${data.resetLink}" class="button">Réinitialiser mon mot de passe</a>
    <p>Ce lien expirera dans ${data.expirationTime}.</p>
    <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
  `;

  return baseTemplate(content);
};
