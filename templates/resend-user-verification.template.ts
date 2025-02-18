import { baseTemplate } from './layouts/base.template';
import { UserVerificationData } from './user-verification.template';

export const resendUserVerificationTemplate = (data: UserVerificationData) => {
  const content = `
    <h2>Renvoi de code de verification</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Nous avons remarqué que vous n'avez pas encore vérifié votre adresse email. Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse :</p>
    
    <a href="${data.verificationLink}" class="button">Vérifier mon email</a>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <p>Vous pouvez aussi utiliser ce code de vérification :</p>
      <h3 style="text-align: center; letter-spacing: 5px; font-size: 24px;">${data.verificationCode}</h3>
    </div>
    
    <p>Ce code expirera dans ${data.expirationTime}.</p>
  `;

  return baseTemplate(content);
};
