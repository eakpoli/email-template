import { baseTemplate } from '../layouts/base.template';

export interface ComplianceData {
  userName: string;
  notificationType: 'warning' | 'violation' | 'update' | 'verification';
  subject: string;
  details: string;
  requiredActions?: string[];
  deadline?: string;
  consequences?: string[];
  documentationUrl?: string;
  appealProcess?: {
    deadline: string;
    instructions: string;
    formUrl?: string;
  };
  supportContact?: {
    email: string;
    phone?: string;
  };
}

export const complianceTemplate = (data: ComplianceData) => {
  const getTitle = () => {
    switch (data.notificationType) {
      case 'warning':
        return 'Avertissement de conformité';
      case 'violation':
        return "Violation des conditions d'utilisation";
      case 'update':
        return 'Mise à jour des règles de conformité';
      case 'verification':
        return 'Vérification de conformité requise';
    }
  };

  const getHeaderColor = () => {
    switch (data.notificationType) {
      case 'warning':
        return '#fff3cd';
      case 'violation':
        return '#f8d7da';
      case 'update':
        return '#d4edda';
      case 'verification':
        return '#cce5ff';
    }
  };

  const content = `
    <div style="background-color: ${getHeaderColor()}; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h2 style="margin-top: 0;">${getTitle()}</h2>
      <p><strong>${data.subject}</strong></p>
    </div>

    <p>Bonjour ${data.userName},</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails</h3>
      <p>${data.details}</p>
    </div>

    ${
      data.requiredActions
        ? `
    <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Actions requises</h3>
      <ul>
        ${data.requiredActions.map((action) => `<li>${action}</li>`).join('')}
      </ul>
      ${data.deadline ? `<p><strong>Date limite :</strong> ${data.deadline}</p>` : ''}
    </div>
    `
        : ''
    }

    ${
      data.consequences
        ? `
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Conséquences potentielles</h3>
      <ul>
        ${data.consequences.map((consequence) => `<li>${consequence}</li>`).join('')}
      </ul>
    </div>
    `
        : ''
    }

    ${
      data.appealProcess
        ? `
    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Processus d'appel</h3>
      <p>${data.appealProcess.instructions}</p>
      <p><strong>Date limite d'appel :</strong> ${data.appealProcess.deadline}</p>
      ${
        data.appealProcess.formUrl
          ? `
      <a href="${data.appealProcess.formUrl}" class="button">Formulaire d'appel</a>
      `
          : ''
      }
    </div>
    `
        : ''
    }

    ${
      data.documentationUrl
        ? `
    <p>Pour plus d'informations, consultez notre documentation :</p>
    <a href="${data.documentationUrl}" class="button">Consulter la documentation</a>
    `
        : ''
    }

    ${
      data.supportContact
        ? `
    <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Contact support</h3>
      <p><strong>Email :</strong> ${data.supportContact.email}</p>
      ${data.supportContact.phone ? `<p><strong>Téléphone :</strong> ${data.supportContact.phone}</p>` : ''}
    </div>
    `
        : ''
    }
  `;

  return baseTemplate(content);
};
