import { baseTemplate } from './layouts/base.template';

export interface WelcomeTemplateData {
  userName: string;
  activationLink?: string;
}

export const welcomeTemplate = (data: WelcomeTemplateData) => {
  const content = `
    <h2>Bienvenue ${data.userName} !</h2>
    <p>Nous sommes ravis de vous accueillir parmi nous.</p>
    ${
      data.activationLink
        ? `
    <p>Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
    <a href="${data.activationLink}" class="button">Activer mon compte</a>
    `
        : ''
    }
  `;

  return baseTemplate(content);
};
