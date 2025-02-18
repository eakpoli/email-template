import { DocumentStatus, DocumentType } from '@prisma/client';
import { baseTemplate } from '../layouts/base.template';
import { getDocumentTypeLabel } from './utils/lib';

export interface ComplianceDocumentStatusChangeData {
  sellerName: string;
  shopName: string;
  documentType: DocumentType;
  documentName: string;
  uploadedDate: string;
  complianceStatus: DocumentStatus;
  previousComplianceStatus: DocumentStatus;
  actionLink?: string;
}

export const complianceDocumentStatusChangeTemplate = (
  data: ComplianceDocumentStatusChangeData,
) => {
  const getStatusMessage = () => {
    switch (data.complianceStatus) {
      case DocumentStatus.PENDING:
        return 'Votre document de conformité est en attente de vérification.';
      case DocumentStatus.VERIFIED:
        return 'Votre document de conformité a été approuvé avec succès.';
      case DocumentStatus.REJECTED:
        return 'Votre document de conformité a été rejeté. Une action est requise.';
      case DocumentStatus.EXPIRED:
        return 'Votre document de conformité a expiré.';
      default:
        return 'Statut de conformité inconnu.';
    }
  };

  const content = `
    <p>Bonjour ${data.sellerName}, </p>
    
    <p>Le statut d'un document de conformité que vous avez téléversé pour vos services sur <strong>${data.shopName}</strong> a changé.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du document</h3>
      <p><strong>Type de document :</strong> ${getDocumentTypeLabel(data)}</p>
      <p><strong>Nom du document :</strong> ${data.documentName}</p>
      <p><strong>Date de téléversement :</strong> ${data.uploadedDate}</p>
    </div>

    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Statut de la conformité</h3>
      <p><strong>Statut précédent :</strong> ${data.previousComplianceStatus}</p>
      <p><strong>Nouveau statut :</strong> ${data.complianceStatus}</p>
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
