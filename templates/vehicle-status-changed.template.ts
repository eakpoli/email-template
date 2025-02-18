import { ServiceStatus } from '@prisma/client';
import { baseTemplate } from './layouts/base.template';

export interface VehicleStatusChangedData {
  userName: string;
  status: ServiceStatus;
  serviceLink: string;
  service: any;
  date: Date;
}

export const vehicleStatusChangedTemplate = (
  data: VehicleStatusChangedData,
): string => {
  const content = `
      <h2>Changement du status de votre annonce</h2>
        <p>Bonjour ${data.userName},</p>
        <p>Votre annonce a été mise à jour.</p>
       
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Détails de l'annonce</h3>
            <p><strong>Titre de l'annonce :</strong> ${data.service.title ?? 'N/A'}</p>
            <p><strong>Date de création :</strong> ${new Date(data.service.createdAt).toLocaleDateString() + ' ' + new Date(data.service.createdAt).toLocaleTimeString()}</p>
            <p><strong>Status :</strong> ${data.status}</p>
        </div>

        <h2>Informations sur le status</h2>
        <p><strong>Date :</strong> ${data.date.toLocaleDateString()}</p>
        <p><strong>Status :</strong> ${data.status}</p>
        <h2>Statut de votre véhicule</h2>
        <p>Le statut de votre véhicule est actuellement : <strong>${data.status}</strong></p>
        ${data.status === 'PENDING' ? '<p>Votre annonce est en attente de validation.</p>' : ''}
        ${data.status === 'APPROVED' ? '<p>Votre annonce a été approuvée.</p>' : ''}
        ${data.status === 'REJECTED' ? '<p>Votre annonce a été rejetée.</p>' : ''}
        ${data.status === 'MAINTENANCE' ? '<p>Votre véhicule est en maintenance.</p>' : ''}
        ${data.status === 'AVAILABLE' ? '<p>Votre véhicule est disponible.</p>' : ''}
        ${data.status === 'UNAVAILABLE' ? '<p>Votre véhicule est indisponible.</p>' : ''}


        <p>Vous pouvez consulter l'annonce en cliquant sur le bouton ci-dessous :</p>
        <a href="${data.serviceLink}" class="button">Voir l'annonce</a>

        <p>Merci de votre confiance.</p>


    `;

  return baseTemplate(content);
};
