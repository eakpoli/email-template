import { baseTemplate } from './layouts/base.template';

export interface ListingApprovedData {
  userName: string;
  listingTitle: string;
  listingUrl: string;
  moderationNotes?: string;
}

export const listingApprovedTemplate = (data: ListingApprovedData) => {
  const content = `
    <h2>Annonce approuvée</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Votre annonce "${data.listingTitle}" a été approuvée et est maintenant visible sur notre plateforme.</p>
    
    ${
      data.moderationNotes
        ? `
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Notes de modération</h3>
      <p>${data.moderationNotes}</p>
    </div>
    `
        : ''
    }
    
    <a href="${data.listingUrl}" class="button">Voir mon annonce</a>
  `;

  return baseTemplate(content);
};
