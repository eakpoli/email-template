import { baseTemplate } from '../layouts/base.template';
import { getDocumentTypeLabel } from './utils/lib';

export interface NewDocumentNotificationData {
  userName: string;
  shopName: string;
  documentType: 'IDENTITY' | 'RIB' | 'RESIDENCE' | 'UBO' | 'OTHER' | 'INVOICE';
  documentName: string;
  uploadedDate: string;
  complianceStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  actionLink?: string;
}

export const newDocumentNotificationTemplate = (
  data: NewDocumentNotificationData,
) => {
  const getStatusMessage = () => {
    switch (data.complianceStatus) {
      case 'PENDING':
        return 'Votre dossier de conformité est en attente de vérification.';
      case 'APPROVED':
        return 'Votre dossier de conformité a été approuvé avec succès.';
      case 'REJECTED':
        return 'Votre dossier de conformité a été rejeté. Veuillez vérifier les documents fournis.';
      case 'UNDER_REVIEW':
        return 'Votre dossier de conformité est en cours de vérification.';
    }
  };

  const content = `
    <p>Bonjour ${data.userName},</p>
    
    <p>Un nouveau document a été ajouté à votre dossier de conformité sur le site <strong>${data.shopName}</strong>.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du document</h3>
      <p><strong>Type de document :</strong> ${getDocumentTypeLabel(data)}</p>
      <p><strong>Date de téléversement :</strong> ${data.uploadedDate}</p>
    </div>

    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Statut de la conformité</h3>
      <p>${getStatusMessage()}</p>
    </div>

    ${
      data.actionLink
        ? `
    <a href="${data.actionLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
      Voir le fichier
    </a>
    `
        : ''
    }
  `;

  return baseTemplate(content);
};
