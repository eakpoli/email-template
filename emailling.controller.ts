import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { EmaillingService } from './emailling.service';
import { EmailStatus } from '@prisma/client';

@Controller('mail')
export class EmaillingController {
  constructor(private readonly mailService: EmaillingService) {}

  @Post('test/welcome')
  async testWelcome(@Body() data: { email: string; userName: string }) {
    return this.mailService.sendWelcomeEmail(data.email, {
      userName: data.userName,
      activationLink: 'https://example.com/activate',
    });
  }

  @Post('test/reset-password')
  async testResetPassword(@Body() data: { email: string; userName: string }) {
    return this.mailService.sendResetPasswordEmail(data.email, {
      userName: data.userName,
      resetLink: 'https://example.com/reset-password',
      expirationTime: '24 heures',
    });
  }

  @Post('test/booking-confirmation')
  async testBookingConfirmation(
    @Body() data: { email: string; userName: string },
  ) {
    return this.mailService.sendBookingConfirmationEmail(data.email, {
      userName: data.userName,
      bookingDetails: {
        reference: 'BOOK-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        location: 'Paris',
        price: '150 €',
      },
      cancellationLink: 'https://example.com/cancel',
    });
  }

  @Post('test/booking-cancellation')
  async testBookingCancellation(
    @Body() data: { email: string; userName: string },
  ) {
    return this.mailService.sendBookingCancellationEmail(data.email, {
      userName: data.userName,
      bookingReference: 'BOOK-' + Date.now(),
      refundInfo: {
        amount: '150 €',
        delay: '5-7 jours ouvrés',
      },
    });
  }

  @Post('test/listing-approved')
  async testListingApproved(@Body() data: { email: string; userName: string }) {
    return this.mailService.sendListingApprovedEmail(data.email, {
      userName: data.userName,
      listingTitle: 'Appartement Paris 15ème',
      listingUrl: 'https://example.com/listing/123',
      moderationNotes:
        'Votre annonce respecte parfaitement nos critères de qualité.',
    });
  }

  @Post('test/listing-rejected')
  async testListingRejected(@Body() data: { email: string; userName: string }) {
    return this.mailService.sendListingRejectedEmail(data.email, {
      userName: data.userName,
      listingTitle: 'Appartement Paris 15ème',
      rejectionReason:
        'Les photos ne sont pas assez claires. Merci de fournir des photos de meilleure qualité.',
      editUrl: 'https://example.com/listing/edit/123',
    });
  }

  @Post('test/payment-confirmation')
  async testPaymentConfirmation(
    @Body() data: { email: string; userName: string },
  ) {
    return this.mailService.sendPaymentConfirmationEmail(data.email, {
      userName: data.userName,
      paymentDetails: {
        amount: '150 €',
        date: new Date().toISOString(),
        reference: 'PAY-' + Date.now(),
        method: 'Carte bancaire',
      },
      invoiceUrl: 'https://example.com/invoice/123',
    });
  }

  @Post('test/payment-failed')
  async testPaymentFailed(@Body() data: { email: string; userName: string }) {
    return this.mailService.sendPaymentFailedEmail(data.email, {
      userName: data.userName,
      paymentDetails: {
        amount: '150 €',
        reference: 'PAY-' + Date.now(),
      },
      errorMessage: 'Carte refusée par votre banque',
      retryUrl: 'https://example.com/payment/retry',
    });
  }

  @Post('test/verification')
  async testVerification(@Body() data: { email: string; userName: string }) {
    return this.mailService.sendVerificationEmail(data.email, {
      userName: data.userName,
      verificationCode: '123456',
      verificationLink: 'https://example.com/verify/123456',
      expirationTime: '24 heures',
    });
  }

  @Get('logs')
  async getLogs(
    @Query('status') status?: EmailStatus,
    @Query('template') template?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.mailService.getEmailLogs({
      status,
      template,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
    });
  }

  @Post('test/auth/forgot-password')
  async testForgotPassword(@Body() data: { email: string; userName: string }) {
    return this.mailService.sendForgotPasswordEmail(data.email, {
      userName: data.userName,
      resetLink: 'https://example.com/reset-password',
      expirationTime: '30 minutes',
      deviceInfo: {
        browser: 'Chrome',
        os: 'Windows 10',
        location: 'Paris, France',
        ip: '192.168.1.1',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
      supportEmail: 'security@example.com',
      securityTips: [
        'Choisissez un mot de passe fort et unique',
        'Ne partagez jamais votre mot de passe',
        "Activez l'authentification à deux facteurs",
        "Vérifiez régulièrement l'activité de votre compte",
      ],
    });
  }
}
