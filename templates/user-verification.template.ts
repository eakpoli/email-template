import { baseTemplate } from './layouts/base.template';

export interface UserVerificationData {
  userName: string;
  verificationCode: string;
  verificationLink: string;
  expirationTime: string;
  deviceInfo?: {
    browser: string;
    os: string;
    location?: string;
    ip?: string;
    date: string;
    time: string;
  };
}

export const userVerificationTemplate = (data: UserVerificationData) => {
  const content = `
    <h2>Vérifiez votre adresse email</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Merci de vérifier votre adresse email en cliquant sur le bouton ci-dessous :</p>
    
    <a href="${data.verificationLink}" class="button">Vérifier mon email</a>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <p>Vous pouvez aussi utiliser ce code de vérification :</p>
      <h3 style="text-align: center; letter-spacing: 5px; font-size: 24px;">${data.verificationCode}</h3>
    </div>

    ${
      data.deviceInfo
        ? `
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails de la demande</h3>
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
    
    <p>Ce code expirera dans ${data.expirationTime}.</p>
  `;

  return baseTemplate(content);
};
