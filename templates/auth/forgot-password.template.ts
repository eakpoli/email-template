import { baseTemplate } from '../layouts/base.template';

export interface ForgotPasswordData {
  userName: string;
  resetLink: string;
  expirationTime: string;
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

export const forgotPasswordTemplate = (data: ForgotPasswordData) => {
  const content = `
    <h2>Réinitialisation de votre mot de passe</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <p>Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous :</p>
      <a href="${data.resetLink}" class="button">Réinitialiser mon mot de passe</a>
      <p style="margin-top: 15px; color: #6c757d;">Ce lien expire dans ${data.expirationTime}</p>
    </div>

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

    <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email${data.supportEmail ? ` et contactez immédiatement notre support à ${data.supportEmail}` : ''}.</p>
  `;

  return baseTemplate(content);
};
