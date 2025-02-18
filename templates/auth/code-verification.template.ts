import { baseTemplate } from '../layouts/base.template';

export interface CodeVerificationData {
  userName: string;
  code: string;
  expiresIn: string;
  deviceInfo?: {
    browser: string;
    os: string;
    location?: string;
    ip?: string;
  };
  supportEmail?: string;
}

export const codeVerificationTemplate = (data: CodeVerificationData) => {
  const content = `
    <h2>Code de vérification</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Voici votre code de vérification :</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
      <h1 style="letter-spacing: 5px; font-size: 32px; color: #007bff;">${data.code}</h1>
      <p style="color: #6c757d;">Ce code expire dans ${data.expiresIn}</p>
    </div>

    ${
      data.deviceInfo
        ? `
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails de la demande</h3>
      <p><strong>Navigateur :</strong> ${data.deviceInfo.browser}</p>
      <p><strong>Système :</strong> ${data.deviceInfo.os}</p>
      ${data.deviceInfo.location ? `<p><strong>Localisation :</strong> ${data.deviceInfo.location}</p>` : ''}
      ${data.deviceInfo.ip ? `<p><strong>Adresse IP :</strong> ${data.deviceInfo.ip}</p>` : ''}
    </div>
    `
        : ''
    }

    <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email${data.supportEmail ? ` ou contacter notre support à ${data.supportEmail}` : ''}.</p>
  `;

  return baseTemplate(content);
};
