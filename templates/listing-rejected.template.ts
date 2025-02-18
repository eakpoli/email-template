import { baseTemplate } from './layouts/base.template';

export interface ListingRejectedData {
  userName: string;
  listingTitle: string;
  rejectionReason: string;
  editUrl: string;
}

export const listingRejectedTemplate = (data: ListingRejectedData) => {
  const content = `
    <h2>Annonce rejetée</h2>
    <p>Bonjour ${data.userName},</p>
    <p>Votre annonce "${data.listingTitle}" n'a pas été approuvée pour le moment.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Motif du rejet</h3>
      <p>${data.rejectionReason}</p>
    </div>
    
    <p>Vous pouvez modifier votre annonce en tenant compte de ces remarques :</p>
    <a href="${data.editUrl}" class="button">Modifier mon annonce</a>
  `;

  return baseTemplate(content);
};
