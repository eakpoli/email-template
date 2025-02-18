import { baseTemplate } from '../layouts/base.template';

export interface DocumentRemovalNotificationData {
  userName: string;
  shopName: string;
  documentType: 'identity' | 'addressProof' | 'rib' | 'uboDocument';
  documentName: string;
  removalDate: string;
  complianceStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  actionLink?: string;
}

export const documentRemovalNotificationTemplate = (
  data: DocumentRemovalNotificationData,
) => {
  const getDocumentTypeLabel = () => {
    switch (data.documentType) {
      case 'identity':
        return "Pièce d'identité";
      case 'addressProof':
        return 'Justificatif de domicile';
      case 'rib':
        return 'RIB';
      case 'uboDocument':
        return 'Document UBO';
    }
  };

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
    <h2>Document supprimé - Sejour24</h2>
    <p>Bonjour ${data.userName},</p>
    
    <p>Un document a été supprimé de votre dossier de conformité sur le site <strong>${data.shopName}</strong>.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails du document</h3>
      <p><strong>Type de document :</strong> ${getDocumentTypeLabel()}</p>
      <p><strong>Nom du document :</strong> ${data.documentName}</p>
      <p><strong>Date de suppression :</strong> ${data.removalDate}</p>
    </div>

    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Statut de la conformité</h3>
      <p>${getStatusMessage()}</p>
    </div>

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
