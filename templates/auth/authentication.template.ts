import { baseTemplate } from '../layouts/base.template';

export interface AuthenticationData {
  userName: string;
  action: 'login' | 'logout' | 'password_change';
  deviceInfo: {
    browser: string;
    os: string;
    location?: string;
    ip?: string;
    date: string;
    time: string;
  };
  securityRecommendations?: string[];
  supportEmail?: string;
  securitySettingsUrl?: string;
}

export const authenticationTemplate = (data: AuthenticationData) => {
  const getTitle = () => {
    switch (data.action) {
      case 'login':
        return 'Nouvelle connexion détectée';
      case 'logout':
        return 'Déconnexion effectuée';
      case 'password_change':
        return 'Mot de passe modifié';
    }
  };

  const content = `
    <h2>${getTitle()}</h2>
    <p>Bonjour ${data.userName},</p>
    
    ${
      data.action === 'login'
        ? `
    <p>Une nouvelle connexion a été détectée sur votre compte.</p>
    `
        : data.action === 'logout'
          ? `
    <p>Une déconnexion a été effectuée sur votre compte.</p>
    `
          : `
    <p>Le mot de passe de votre compte a été modifié avec succès.</p>
    `
    }
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Détails de l'activité</h3>
      <p><strong>Date :</strong> ${data.deviceInfo.date}</p>
      <p><strong>Heure :</strong> ${data.deviceInfo.time}</p>
      <p><strong>Navigateur :</strong> ${data.deviceInfo.browser}</p>
      <p><strong>Système :</strong> ${data.deviceInfo.os}</p>
      ${data.deviceInfo.location ? `<p><strong>Localisation :</strong> ${data.deviceInfo.location}</p>` : ''}
      ${data.deviceInfo.ip ? `<p><strong>Adresse IP :</strong> ${data.deviceInfo.ip}</p>` : ''}
    </div>

    ${
      data.securityRecommendations
        ? `
    <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Recommandations de sécurité</h3>
      <ul>
        ${data.securityRecommendations.map((rec) => `<li>${rec}</li>`).join('')}
      </ul>
    </div>
    `
        : ''
    }

    ${
      data.securitySettingsUrl
        ? `
    <p>Vous pouvez gérer vos paramètres de sécurité en cliquant sur le bouton ci-dessous :</p>
    <a href="${data.securitySettingsUrl}" class="button">Paramètres de sécurité</a>
    `
        : ''
    }

    ${
      data.supportEmail
        ? `
    <p>Si vous n'êtes pas à l'origine de cette action, veuillez contacter immédiatement notre support à ${data.supportEmail}.</p>
    `
        : ''
    }
  `;

  return baseTemplate(content);
};
