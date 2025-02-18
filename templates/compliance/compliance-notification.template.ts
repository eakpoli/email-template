import { baseTemplate } from '../layouts/base.template';

export interface ComplianceNotificationData {
  userName: string;
  shopName: string;
  complianceStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  documents: {
    identityStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NOT_PROVIDED';
    addressProofStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NOT_PROVIDED';
    ribStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NOT_PROVIDED';
    uboDocumentStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NOT_PROVIDED';
  };
  actionLink?: string;
}

export const complianceNotificationTemplate = (
  data: ComplianceNotificationData,
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

  const getDocumentStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'En attente';
      case 'VERIFIED':
        return 'Vérifié';
      case 'REJECTED':
        return 'Rejeté';
      case 'NOT_PROVIDED':
        return 'Non fourni';
      default:
        return 'Inconnu';
    }
  };

  const content = `
    <h2>Notification de conformité - Sejour24</h2>
    <p>Bonjour ${data.userName},</p>
    
    <p>${getStatusMessage()}</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Statut des documents pour ${data.shopName}</h3>
      <p><strong>Pièce d'identité :</strong> ${getDocumentStatusLabel(data.documents.identityStatus)}</p>
      <p><strong>Justificatif de domicile :</strong> ${getDocumentStatusLabel(data.documents.addressProofStatus)}</p>
      <p><strong>RIB :</strong> ${getDocumentStatusLabel(data.documents.ribStatus)}</p>
      <p><strong>Document UBO :</strong> ${getDocumentStatusLabel(data.documents.uboDocumentStatus)}</p>
    </div>

    ${
      data.complianceStatus === 'REJECTED'
        ? `
    <div style="background-color: #f8d7da; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Action requise</h3>
      <p>Veuillez vérifier les documents rejetés et les retéléverser via votre espace vendeur.</p>
    </div>
    `
        : ''
    }

    ${
      data.actionLink
        ? `
    <a href="${data.actionLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
      Accéder à mon espace vendeur
    </a>
    `
        : ''
    }
  `;

  return baseTemplate(content);
};
