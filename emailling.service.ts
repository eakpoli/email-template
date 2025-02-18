import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailStatus, PrismaClient } from '@prisma/client';
import {
  WelcomeTemplateData,
  welcomeTemplate,
} from './templates/welcome.template';
import {
  ResetPasswordTemplateData,
  resetPasswordTemplate,
} from './templates/reset-password.template';
import {
  BookingConfirmationData,
  bookingConfirmationTemplate,
} from './templates/booking-confirmation.template';
import {
  BookingCancellationData,
  bookingCancellationTemplate,
} from './templates/booking-cancellation.template';
import {
  ListingApprovedData,
  listingApprovedTemplate,
} from './templates/listing-approved.template';
import {
  ListingRejectedData,
  listingRejectedTemplate,
} from './templates/listing-rejected.template';
import {
  PaymentConfirmationData,
  paymentConfirmationTemplate,
} from './templates/payment-confirmation.template';
import {
  PaymentFailedData,
  paymentFailedTemplate,
} from './templates/payment-failed.template';
import {
  UserVerificationData,
  userVerificationTemplate,
} from './templates/user-verification.template';
import {
  ForgotPasswordData,
  forgotPasswordTemplate,
} from './templates/auth/forgot-password.template';
import {
  RegistrationData,
  registrationTemplate,
} from './templates/auth/registration.template';
import {
  PasswordChangedData,
  passwordChangedTemplate,
} from './templates/auth/password-changed.template';
import {
  ReceiveMessageByWebSiteData,
  receiveMessageTemplate,
} from './templates/contact/receive.message.template';
import {
  confirmationDeReceptionTemplate,
  ConfirmationReceptionMessageData,
} from './templates/contact/confirmation.message.template';
import {
  RentVehicleCreatedData,
  rentVehicleCreatedTemplate,
} from './templates/rent-vehicle-created.template';
import {
  notificationForAdminAfterServiceCreated,
  NotificationForAdminAfterServiceCreatedData,
} from './templates/notitication-admin-after-service-created.template';
import {
  VehicleStatusChangedData,
  vehicleStatusChangedTemplate,
} from './templates/vehicle-status-changed.template';
import {
  RentPropertyCreatedData,
  rentPropertyCreatedTemplate,
} from './templates/rent-property-created.template';
import {
  RentConciergeCreatedData,
  rentConciergeCreatedTemplate,
} from './templates/rent-concierge-created.template';
import {
  RentExperienceCreatedData,
  rentExperienceCreatedTemplate,
} from './templates/rent-experience-created.template';
import {
  WalletRechargeConfirmationData,
  walletRechargeConfirmationTemplate,
} from './templates/wallet-payment-confirmation.template';
import {
  AccountDeletedData,
  accountDeletedTemplate,
} from './templates/account-deleted.template';
import {
  BankAccountAddedData,
  bankAccountAddedTemplate,
} from './templates/bank-account/bank-account-added.template';
import {
  BankAccountDeletedData,
  bankAccountDeletedTemplate,
} from './templates/bank-account/bank-account-deleted.template';
import {
  BankAccountUpdatedData,
  bankAccountUpdatedTemplate,
} from './templates/bank-account/bank-account-updated.template';
import {
  WithdrawalStatusChangeData,
  withdrawalStatusChangeTemplate,
} from './templates/withdrawal/withdral-status-change.template';
import {
  WithdrawalRequestData,
  withdrawalRequestTemplate,
} from './templates/withdrawal/withdrawal-request.template';
import {
  AdminWithdrawalNotificationData,
  adminWithdrawalNotificationTemplate,
} from './templates/withdrawal/admin-withdral-notification.template';
import {
  SubscriptionNotificationData,
  subscriptionNotificationTemplate,
} from './templates/subscription/subscription-notification.template';
import {
  SubscriptionNotificationAdminData,
  subscriptionNotificationAdminTemplate,
} from './templates/subscription/subscription-notification-admin.template';
import {
  ChangePlanNotificationData,
  changePlanNotificationTemplate,
} from './templates/subscription/change-plan-notification.template';
import {
  ChangePlanNotificationAdminData,
  changePlanNotificationAdminTemplate,
} from './templates/subscription/change-plan-admin-notification.template';
import {
  NewDocumentNotificationData,
  newDocumentNotificationTemplate,
} from './templates/compliance/compliance-document-added.template';
import {
  DocumentRemovalNotificationData,
  documentRemovalNotificationTemplate,
} from './templates/compliance/compliance-document-remove.template';
import {
  AdminComplianceUploadNotificationData,
  adminComplianceUploadNotificationTemplate,
} from './templates/compliance/admin-compliance-upload-notification.template';
import {
  ComplianceDocumentStatusChangeData,
  complianceDocumentStatusChangeTemplate,
} from './templates/compliance/compliance-document-status-change-notification.template';

@Injectable()
export class EmaillingService {
  private transporter: nodemailer.Transporter;
  private readonly companyName: string;
  private readonly companyAddress: string;
  private prisma: PrismaClient;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE'),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });

    this.companyName = this.configService.get(
      'COMPANY_NAME',
      'Notre Entreprise',
    );
    this.companyAddress = this.configService.get(
      'COMPANY_ADDRESS',
      "Adresse de l'entreprise",
    );
    this.prisma = new PrismaClient();
  }

  private replaceTemplateVars(template: string): string {
    return template
      .replace(/{{companyName}}/g, this.companyName)
      .replace(/{{year}}/g, new Date().getFullYear().toString())
      .replace(/{{address}}/g, this.companyAddress);
  }

  async sendMail(options: {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    template?: string;
    metadata?: Record<string, any>;
    attachments?: Array<{ filename: string; path: string }>;
  }) {
    const to = Array.isArray(options.to) ? options.to : [options.to];

    const emailLog = await this.prisma.emailLog.create({
      data: {
        to,
        subject: options.subject,
        template: options.template || 'custom',
        metadata: options.metadata || {},
      },
    });

    const mailOptions = {
      from: this.configService.get('SMTP_FROM'),
      ...options,
      html: options.html ? this.replaceTemplateVars(options.html) : undefined,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);

      await this.prisma.emailLog.update({
        where: { id: emailLog.id },
        data: {
          status: EmailStatus.SENT,
          sentAt: new Date(),
        },
      });

      return info;
    } catch (error: any) {
      await this.prisma.emailLog.update({
        where: { id: emailLog.id },
        data: {
          status: EmailStatus.FAILED,
          error: error.message,
        },
      });

      throw new Error(`Erreur d'envoi d'email: ${error.message} `);
    }
  }

  // Templates existants
  async sendWelcomeEmail(to: string, data: WelcomeTemplateData) {
    return this.sendMail({
      to,
      subject: 'Bienvenue !',
      html: welcomeTemplate(data),
      template: 'welcome',
      metadata: data,
    });
  }

  async accountDeletedEmail(to: string, data: AccountDeletedData) {
    return this.sendMail({
      to,
      subject: 'Compte supprimé',
      html: accountDeletedTemplate(data),
      template: 'account-deleted',
      metadata: data,
    });
  }

  async sendResetPasswordEmail(to: string, data: ResetPasswordTemplateData) {
    return this.sendMail({
      to,
      subject: 'Réinitialisation de mot de passe',
      html: resetPasswordTemplate(data),
      template: 'reset-password',
      metadata: data,
    });
  }

  // Nouveaux templates
  async sendBookingConfirmationEmail(
    to: string,
    data: BookingConfirmationData,
  ) {
    return this.sendMail({
      to,
      subject: 'Confirmation de réservation',
      html: bookingConfirmationTemplate(data),
      template: 'booking-confirmation',
      metadata: data,
    });
  }

  async sendBookingCancellationEmail(
    to: string,
    data: BookingCancellationData,
  ) {
    return this.sendMail({
      to,
      subject: 'Annulation de réservation',
      html: bookingCancellationTemplate(data),
      template: 'booking-cancellation',
      metadata: data,
    });
  }

  async sendListingApprovedEmail(to: string, data: ListingApprovedData) {
    return this.sendMail({
      to,
      subject: 'Annonce approuvée',
      html: listingApprovedTemplate(data),
      template: 'listing-approved',
      metadata: data,
    });
  }

  async sendListingRejectedEmail(to: string, data: ListingRejectedData) {
    return this.sendMail({
      to,
      subject: 'Annonce rejetée',
      html: listingRejectedTemplate(data),
      template: 'listing-rejected',
      metadata: data,
    });
  }
  // annonce de location de véhicule créée avec succès
  async sendVehicleRentCreatedEmail(to: string, data: RentVehicleCreatedData) {
    const action = data?.action || 'CREATED';

    console.log('images', data.images);

    return this.sendMail({
      to,
      subject: `Annonce ${action === 'CREATED' ? 'créée' : action === 'UPDATED' ? 'mise à jour' : 'supprimée'} avec succès`,
      html: rentVehicleCreatedTemplate(data),
      template: 'rent-vehicle-created',
      metadata: data,
    });
  }

  async sendNotificationForAdminAfterServiceCreatedEmail(
    to: string,
    data: NotificationForAdminAfterServiceCreatedData,
  ) {
    const action = data?.action || 'CREATED';
    return this.sendMail({
      to,
      subject: `Annonce ${action === 'CREATED' ? "créée en attente d'approbation" : action === 'UPDATED' ? "mise à jour en attente d'approbation" : 'supprimée'}`,
      html: notificationForAdminAfterServiceCreated(data),
      template: 'notification-for-admin-after-service-created',
      metadata: data,
    });
  }

  async sendPaymentConfirmationEmail(
    to: string,
    data: PaymentConfirmationData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject: 'Paiement confirmé',
      text: 'Votre paiement a été traité avec succès.',
      html: paymentConfirmationTemplate(data),
      template: 'payment-confirmation',
      metadata: data,
      attachments: attachments,
    });
  }
  async sendWalletDepositConfirmationEmail(
    to: string,
    data: WalletRechargeConfirmationData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject: 'Recharge de votre portefeuille',
      text: 'Votre recharge a été traité avec succès.',
      html: walletRechargeConfirmationTemplate(data),
      template: 'wallet-payment-confirmation',
      metadata: data,
      attachments: attachments,
    });
  }

  async sendPaymentFailedEmail(to: string, data: PaymentFailedData) {
    return this.sendMail({
      to,
      subject: 'Échec du paiement',
      html: paymentFailedTemplate(data),
      template: 'payment-failed',
      metadata: data,
    });
  }

  async sendVerificationEmail(to: string, data: UserVerificationData) {
    return this.sendMail({
      to,
      subject: 'Vérifiez votre adresse email',
      html: userVerificationTemplate(data),
      template: 'user-verification',
      metadata: data,
    });
  }

  async reSendVerificationEmail(to: string, data: UserVerificationData) {
    return this.sendMail({
      to,
      subject: 'Renvoi de code de vérification',
      html: userVerificationTemplate(data),
      template: 'resend-user-verification',
      metadata: data,
    });
  }

  async getEmailLogs(filters?: {
    status?: EmailStatus;
    template?: string;
    from?: Date;
    to?: Date;
  }) {
    return this.prisma.emailLog.findMany({
      where: {
        status: filters?.status,
        template: filters?.template,
        createdAt: {
          gte: filters?.from,
          lte: filters?.to,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async sendForgotPasswordEmail(to: string, data: ForgotPasswordData) {
    return this.sendMail({
      to,
      subject: 'Réinitialisation de votre mot de passe',
      html: forgotPasswordTemplate(data),
      template: 'forgot-password',
      metadata: data,
    });
  }

  async sendRegistrationEmail(to: string, data: RegistrationData) {
    return this.sendMail({
      to,
      subject: 'Bienvenue sur notre plateforme',
      html: registrationTemplate(data),
      template: 'registration',
      metadata: data,
    });
  }

  async sendPasswordChangedEmail(to: string, data: PasswordChangedData) {
    return this.sendMail({
      to,
      subject: 'Mot de passe modifié',
      html: passwordChangedTemplate(data),
      template: 'password-changed',
      metadata: data,
    });
  }

  async receiveMessageEmail(to: string, data: ReceiveMessageByWebSiteData) {
    return this.sendMail({
      to,
      subject: 'Sejour24 | Message reçu',
      html: receiveMessageTemplate(data),
      template: 'receive-message',
      metadata: data,
    });
  }

  async confirmationDeReceptionEmail(
    to: string,
    data: ConfirmationReceptionMessageData,
  ) {
    return this.sendMail({
      to,
      subject: 'Sejour24 | Confirmation de réception',
      html: confirmationDeReceptionTemplate(data),
      template: 'confirmation-reception',
      metadata: data,
    });
  }

  async vehicleStatusChanged(to: string, data: VehicleStatusChangedData) {
    return this.sendMail({
      to,
      subject: 'Statut de votre véhicule (' + data.service.title + ') modifié',
      html: vehicleStatusChangedTemplate(data),
      template: 'vehicle-status-changed',
      metadata: data,
    });
  }

  async sendPropertyCreatedEmail(to: string, data: RentPropertyCreatedData) {
    const action = data?.action || 'CREATED';
    return this.sendMail({
      to,
      subject: `Annonce ${action === 'CREATED' ? 'créée' : action === 'UPDATED' ? 'mise à jour' : 'supprimée'} avec succès`,
      html: rentPropertyCreatedTemplate(data),
      template: 'rent-property-created',
      metadata: data,
    });
  }

  async sendConciergeCreatedEmail(to: string, data: RentConciergeCreatedData) {
    const action = data?.action || 'CREATED';
    return this.sendMail({
      to,
      subject: `Annonce de service de conciergerie  ${action === 'CREATED' ? 'créée' : action === 'UPDATED' ? 'mise à jour' : 'supprimée'} avec succès`,
      html: rentConciergeCreatedTemplate(data),
      template: 'rent-concierge-created',
      metadata: data,
    });
  }

  async sendExperienceCreatedEmail(
    to: string,
    data: RentExperienceCreatedData,
  ) {
    const action = data?.action || 'CREATED';
    return this.sendMail({
      to,
      subject: `Annonce d'experience ${action === 'CREATED' ? 'créée' : action === 'UPDATED' ? 'mise à jour' : 'supprimée'} avec succès`,
      html: rentExperienceCreatedTemplate(data),
      template: 'rent-experience-created',
      metadata: data,
    });
  }

  // bank account
  async sendBankAccountAddedEmail(to: string, data: BankAccountAddedData) {
    return this.sendMail({
      to,
      subject: 'Compte bancaire ajouté avec succès',
      html: bankAccountAddedTemplate(data),
      template: 'bank-account-added',
      metadata: data,
    });
  }

  async sendBankAccountUpdatedEmail(to: string, data: BankAccountUpdatedData) {
    return this.sendMail({
      to,
      subject: 'Compte bancaire modifié avec succès',
      html: bankAccountUpdatedTemplate(data),
      template: 'bank-account-updated',
      metadata: data,
    });
  }

  async sendBankAccountDeletedEmail(to: string, data: BankAccountDeletedData) {
    return this.sendMail({
      to,
      subject: 'Compte bancaire supprimé avec succès',
      html: bankAccountDeletedTemplate(data),
      template: 'bank-account-deleted',
      metadata: data,
    });
  }

  // withdrawal

  async sendWithdrawalStatusChangeEmail(
    to: string,
    data: WithdrawalStatusChangeData,
  ) {
    return this.sendMail({
      to,
      subject: 'Changement de statut de votre demande de retrait',
      html: withdrawalStatusChangeTemplate(data),
      template: 'withdrawal-status-change',
      metadata: data,
    });
  }

  async sendWithdrawalRequestEmail(to: string, data: WithdrawalRequestData) {
    return this.sendMail({
      to,
      subject: 'Votre demande de retrait N°' + data.referenceNumber,
      html: withdrawalRequestTemplate(data),
      template: 'withdrawal-request',
      metadata: data,
    });
  }

  async sendAdminWithdrawalNotificationEmail(
    to: string,
    data: AdminWithdrawalNotificationData,
  ) {
    return this.sendMail({
      to,
      subject: 'Nouvelle demande de retrait n°' + data.referenceNumber,
      html: adminWithdrawalNotificationTemplate(data),
      template: 'admin-withdrawal-notification',
      metadata: data,
    });
  }
  async sendSubscriptionNotificationEmail(
    to: string,
    data: SubscriptionNotificationData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject: 'Confirmation de votre abonnement',
      text: 'Votre abonnement a été créé avec succès.',
      html: subscriptionNotificationTemplate(data),
      template: 'subscription-notification',
      metadata: data,
      attachments: attachments,
    });
  }

  async subscriptionNotificationAdminEmail(
    to: string,
    data: SubscriptionNotificationAdminData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject: 'Nouvel abonnement créé avec succès (' + data.subscriberId + ')',
      text: 'Un nouvel abonnement a été créé avec succès.',
      html: subscriptionNotificationAdminTemplate(data),
      template: 'subscription-notification-admin',
      metadata: data,
      attachments: attachments,
    });
  }

  async changePlanNotificationEmail(
    to: string,
    data: ChangePlanNotificationData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject: "Changement de plan d'abonnement",
      text: "Votre plan d'abonnement a été modifié avec succès.",
      html: changePlanNotificationTemplate(data),
      template: 'change-plan-notification',
      metadata: data,
      attachments: attachments,
    });
  }
  async changePlanNotificationAdminEmail(
    to: string,
    data: ChangePlanNotificationAdminData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject: "Notification de changement de plan d'abonnement",
      text: "Un utilisateur a modifié son plan d'abonnement.",
      html: changePlanNotificationAdminTemplate(data),
      template: 'change-plan-admin-notification',
      metadata: data,
      attachments: attachments,
    });
  }

  // add compliance document
  async sendComplianceDocumentAddedEmail(
    to: string,
    data: NewDocumentNotificationData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject:
        'Nouveau document ajouté à votre dossier de conformité (#' +
        (Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000) +
        ')',
      text: 'Un nouveau document a été ajouté à votre dossier de conformité.',
      html: newDocumentNotificationTemplate(data),
      template: 'compliance-document-added',
      metadata: data,
      attachments: attachments,
    });
  }

  async sendComplianceDocumentRemovedEmail(
    to: string,
    data: DocumentRemovalNotificationData,
  ) {
    return this.sendMail({
      to,
      subject: 'Document supprimé de votre dossier de conformité',
      html: documentRemovalNotificationTemplate(data),
      template: 'compliance-document-removed',
      metadata: data,
    });
  }

  // notify admin
  async sendAdminComplianceUploadNotificationEmail(
    to: string,
    data: AdminComplianceUploadNotificationData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject: 'Nouveau document de conformité téléversé',
      text: 'Un nouveau document de conformité a été téléversé par un vendeur.',
      html: adminComplianceUploadNotificationTemplate(data),
      template: 'admin-compliance-upload-notification',
      metadata: data,
      attachments: attachments,
    });
  }

  async sendComplianceDocumentStatusChangeEmail(
    to: string,
    data: ComplianceDocumentStatusChangeData,
    attachments: Array<{ filename: string; path: string }> = [],
  ) {
    return this.sendMail({
      to,
      subject: 'Changement de statut de votre document de conformité',
      text: 'Le statut de votre document de conformité a changé.',
      html: complianceDocumentStatusChangeTemplate(data),
      template: 'compliance-document-status-change-notification',
      metadata: data,
      attachments: attachments,
    });
  }
}
