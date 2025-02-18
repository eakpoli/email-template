import { baseTemplate } from '../layouts/base.template';

export interface ReceiveMessageByWebSiteData {
  userName: string;
  service: string;
  subject: string;
  name: string;
  email: string;
  message: string;
}

export const receiveMessageTemplate = (data: ReceiveMessageByWebSiteData) => {
  const content = `
    <h2>Message reçu</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Nous avons bien reçu votre message.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du message</h3>
      <p><strong>Sujet :</strong> ${data.subject}</p>
      <p><strong>Service :</strong> ${data.service}</p>
      <p><strong>Nom :</strong> ${data.name}</p>
      <p><strong>Email :</strong> ${data.email}</p>
       <p><strong>Message :</strong> </p>
      <p>${data.message}</p>
    </div>
    
    <p>Nous vous contacterons dans les plus brefs délais.</p>
  `;

  return baseTemplate(content);
};
