import { Profile, User } from '@prisma/client';
import { baseTemplate } from './layouts/base.template';

export interface NotificationForAdminAfterServiceCreatedData {
  userName: string;
  serviceLink?: string;
  service: any;
  serviceType: string;
  images?: string[];
  aprobationLink?: string;
  author: User & { profile: Profile };
  action?: 'CREATED' | 'UPDATED' | 'DELETED';
}

export const notificationForAdminAfterServiceCreated = (
  data: NotificationForAdminAfterServiceCreatedData,
) => {
  const action = data?.action || 'CREATED';
  const content = `
    <h2>Annonce ${action === 'CREATED' ? "en attente d'approbation" : action === 'UPDATED' ? 'mise à jour' : 'supprimée'}</h2>
    <p>Bonjour ${data.userName}, cher administrateur</p>
    <p>Un service a été ${action === 'CREATED' ? 'créé' : action === 'UPDATED' ? 'mis à jour' : 'supprimé'} avec succès.</p>
     ${
       data.aprobationLink
         ? `
    <p>Vous pouvez approuver le service en cliquant sur le bouton ci-dessous :</p>
    <a href="${data.aprobationLink}" class="button">Approuver le service</a>
    `
         : ''
     }
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Détails du service</h3>
        <p><strong>Type de service :</strong> ${data.serviceType}</p>
        <p><strong>Nom du service :</strong> ${data.service.title ?? 'N/A'}</p>
        <p><strong>Date de création :</strong> ${new Date(data.service.createdAt).toLocaleDateString() + ' ' + new Date(data.service.createdAt).toLocaleTimeString()}</p>
    </div>

    <p>Créé par : ${data.author.profile.givenName ?? 'N/A'} ${data.author.profile.familyName ?? 'N/A'}</p>
    <p>Email : ${data.author.email ?? 'N/A'}</p>
    <p>Numéro de téléphone : ${data.author.phoneNumber ?? ''}</p>
    <p>Date d'inscription : ${new Date(data.author.createdAt).toLocaleDateString() + ' ' + new Date(data.author.createdAt).toLocaleTimeString()}</p>
    
    ${
      data.serviceLink
        ? `
    <p>Vous pouvez consulter le service en cliquant sur le bouton ci-dessous :</p>
    <a href="${data.serviceLink}" class="button">Voir le service</a>
    `
        : ''
    }

    ${
      data.images && data.images.length
        ? `
    <h3>Images du service</h3>
    <ul>
    ${data.images.map((url) => `<li><img src="${url}" alt="Image du service" /></li>`).join('')}
  </ul>
    `
        : ''
    }

   
`;

  return baseTemplate(content);
};
