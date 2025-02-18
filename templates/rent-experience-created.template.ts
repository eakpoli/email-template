import { Experience, Place } from '@prisma/client';
import { baseTemplate } from './layouts/base.template';

export interface RentExperienceCreatedData {
  userName: string;
  listingTitle: string;
  listingUrl: string;
  data: Experience & { place: Place };
  images: string[];
  action?: 'CREATED' | 'UPDATED' | 'DELETED';
}

export const rentExperienceCreatedTemplate = (
  data: RentExperienceCreatedData,
) => {
  const action = data?.action || 'CREATED';
  const actionText =
    action === 'CREATED'
      ? 'créée'
      : action === 'UPDATED'
        ? 'mise à jour'
        : 'supprimée';
  const content = `
    <h2>Annonce ${actionText} avec succès</h2>
    <p>Bonjour ${data.userName},</p>
  <p>Votre expérience <strong>"${data.listingTitle}"</strong> a été ${actionText} avec succès.</p>
 <p>Vous pouvez la consulter en cliquant sur le bouton suivant : 
  
  <a href="${data.listingUrl}" class="button">Voir mon  expérience</a></p>
  <p>Vous pouvez également la consulter en cliquant sur le lien suivant : 
  <a href="${data.listingUrl}">Lien vers mon expérience</a>
  </p>
  <p>Voici les détails de votre expérience :</p>
  <ul>
    <li>Nombre minimum de personne : ${data.data.minPeople}</li>
    <li>Nombre maximum de personne : ${data.data.maxPeople}</li>
    <li>Durée : ${data.data.duration} </li>
    <li>Validité : ${data.data.validity}</li>
  </ul>

  <p>Lieu de votre Expérience :</p>
  <ul>
    <li>Adresse: ${data.data.place.streetAddress}</li>
    <li>Ville: ${data.data.place.city}</li>
    <li>État: ${data.data.place.state ?? 'N/A'}</li>
    <li>Code postal: ${data.data.place.postalCode}</li>
    <li>Pays: ${data.data.place.country}</li>
    <li>Latitude: ${data.data.place.latitude}</li>
    <li>Longitude: ${data.data.place.longitude}</li>
  </ul>

  <p>Images de votre expérience :</p>
  <ul>
    ${data.images.map((url) => `<li><img src="${url}" alt="Image du véhicule" /></li>`).join('')}
  </ul>


  <p>Vous pouvez voir l'emplacement de votre véhicule sur la carte en cliquant sur le lien suivant :</p>
  <p><a href="https://www.google.com/maps/search/?api=1&query=${data.data.place.latitude},${data.data.place.longitude}">Voir sur Google Maps</a></p>


  <p>Vous serez informé dès l'approbation de votre annonce.</p>

  <p>Merci de votre confiance.</p>

  `;

  return baseTemplate(content);
};
