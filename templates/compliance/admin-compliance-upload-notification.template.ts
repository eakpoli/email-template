import { baseTemplate } from '../layouts/base.template';
import { getDocumentTypeLabel } from './utils/lib';

export interface AdminComplianceUploadNotificationData {
  adminName: string;
  sellerName: string;
  shopName: string;
  documentType: 'IDENTITY' | 'RIB' | 'RESIDENCE' | 'UBO' | 'OTHER' | 'INVOICE';
  documentName: string;
  uploadedDate: string;
  complianceStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  actionLink?: string;
}

export const adminComplianceUploadNotificationTemplate = (
  data: AdminComplianceUploadNotificationData,
) => {
  const getStatusMessage = () => {
    switch (data.complianceStatus) {
      case 'PENDING':
        return 'Le dossier de conformité est en attente de vérification.';
      case 'APPROVED':
        return 'Le dossier de conformité a été approuvé avec succès.';
      case 'REJECTED':
        return 'Le dossier de conformité a été rejeté. Une action est requise.';
      case 'UNDER_REVIEW':
        return 'Le dossier de conformité est en cours de vérification.';
    }
  };

  const content = `
    <p>Bonjour ${data.adminName}, cher administrateur de Sejour24 </p>
    
    <p>Un nouveau document de conformité a été téléversé par le vendeur <strong>${data.sellerName}</strong> pour dans le cadre de ses services sur <strong>${data.shopName}</strong>.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du document</h3>
      <p><strong>Type de document :</strong> ${getDocumentTypeLabel(data)}</p>
      <p><strong>Nom du document :</strong> ${data.documentName}</p>
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
      Vérifier le document
    </a>
    `
        : ''
    }

    <p>Le document est joint à cet e-mail pour votre référence.</p>
  `;

  return baseTemplate(content);
};
