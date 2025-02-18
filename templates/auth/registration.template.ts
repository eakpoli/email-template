import { baseTemplate } from '../layouts/base.template';

export interface RegistrationData {
  userName: string;
  email: string;
  accountType: string;
  verificationLink?: string;
  nextSteps: string[];
  welcomeGuideUrl?: string;
  supportInfo?: {
    email: string;
    phone?: string;
    hours?: string;
  };
}

export const registrationTemplate = (data: RegistrationData) => {
  const content = `
    <h2>Bienvenue sur notre plateforme !</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Nous sommes ravis de vous compter parmi nos utilisateurs.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Informations du compte</h3>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Type de compte :</strong> ${data.accountType}</p>
    </div>

    ${
      data.verificationLink
        ? `
    <p>Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
    <a href="${data.verificationLink}" class="button">Vérifier mon compte</a>
    `
        : ''
    }

    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Prochaines étapes</h3>
      <ul>
        ${data.nextSteps.map((step) => `<li>${step}</li>`).join('')}
      </ul>
    </div>

    ${
      data.welcomeGuideUrl
        ? `
    <p>Pour vous aider à démarrer, nous avons préparé un guide de bienvenue :</p>
    <a href="${data.welcomeGuideUrl}" class="button">Consulter le guide</a>
    `
        : ''
    }

    ${
      data.supportInfo
        ? `
    <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Support</h3>
      <p><strong>Email :</strong> ${data.supportInfo.email}</p>
      ${data.supportInfo.phone ? `<p><strong>Téléphone :</strong> ${data.supportInfo.phone}</p>` : ''}
      ${data.supportInfo.hours ? `<p><strong>Horaires :</strong> ${data.supportInfo.hours}</p>` : ''}
    </div>
    `
        : ''
    }
  `;

  return baseTemplate(content);
};
