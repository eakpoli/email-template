import { baseTemplate } from '../layouts/base.template';

export interface PasswordChangedData {
  userName: string;
  deviceInfo?: {
    browser: string;
    os: string;
    location?: string;
    ip?: string;
    date: string;
    time: string;
  };
  supportEmail?: string;
  securityTips?: string[];
}

export const passwordChangedTemplate = (data: PasswordChangedData) => {
  const content = `
    <h2>Votre mot de passe a été changé</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Nous vous informons que votre mot de passe a été récemment modifié.</p>
    
    ${
      data.deviceInfo
        ? `
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails de la modification</h3>
      <p><strong>Date :</strong> ${data.deviceInfo.date}</p>
      <p><strong>Heure :</strong> ${data.deviceInfo.time}</p>
      <p><strong>Navigateur :</strong> ${data.deviceInfo.browser}</p>
      <p><strong>Système :</strong> ${data.deviceInfo.os}</p>
      ${data.deviceInfo.location ? `<p><strong>Localisation :</strong> ${data.deviceInfo.location}</p>` : ''}
      ${data.deviceInfo.ip ? `<p><strong>Adresse IP :</strong> ${data.deviceInfo.ip}</p>` : ''}
    </div>
    `
        : ''
    }

    ${
      data.securityTips
        ? `
    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Conseils de sécurité</h3>
      <ul>
        ${data.securityTips.map((tip) => `<li>${tip}</li>`).join('')}
      </ul>
    </div>
    `
        : ''
    }

    <p>Si vous n'êtes pas à l'origine de cette modification, veuillez contacter immédiatement notre support${data.supportEmail ? ` à ${data.supportEmail}` : ''}.</p>
  `;

  return baseTemplate(content);
};
