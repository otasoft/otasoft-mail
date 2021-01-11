import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import * as sendgrid from '@sendgrid/mail';

import { SendEmailDto } from './dto/send-email.dto';
import { emailTemplates } from '../templates/email-templates';
import { LogEmailToDbCommand } from './commands/impl';
import { ISendgridEmail } from './interfaces/sendgrid-email.interface';
import { SuccessResponseModel } from '../models/success-response.model';
import { IEmailObject } from '../interfaces/email-object.interface';

@Injectable()
export class SendgridService {
  constructor(
    private configService: ConfigService,
    private readonly commandBus: CommandBus,
  ) {
    sendgrid.setApiKey(this.configService.get('SENDGRID_KEY'));
  }

  async sendConfirmCreateAccountEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { customer_email, token } = sendEmailDto;
    const email_type = 'confirmCreateAccount';

    const confirmAccountEmailTemplate = emailTemplates.find(template => template.name === email_type);

    const message: ISendgridEmail = {
      to: customer_email,
      from: 'noreply@otasoft.org',
      subject: confirmAccountEmailTemplate.subject,
      text: confirmAccountEmailTemplate.text,
      html: `<a href="${this.configService.get(
        'SERVER_URL',
      )}/local-auth/confirm/${token}">Click me to confirm</a>`,
    };

    const confirmAccountEmail: IEmailObject = {
      customer_email,
      email_type,
      subject: confirmAccountEmailTemplate.subject,
      text: confirmAccountEmailTemplate.text,
    };

    try {
      await sendgrid.send(message).then(() => {
        this.commandBus.execute(new LogEmailToDbCommand(confirmAccountEmail));
      });
    } catch (error) {
      console.log(error);
    }
    return { response: 'Confirmation sent' };
  }

  async sendForgotPasswordEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { customer_email, token } = sendEmailDto;
    const email_type = 'forgotPassword';

    const forgotPasswordEmailTemplate = emailTemplates.find(template => template.name === email_type);

    const message: ISendgridEmail = {
      to: customer_email,
      from: 'noreply@otasoft.org',
      subject: forgotPasswordEmailTemplate.subject,
      text: forgotPasswordEmailTemplate.text,
      html: `<a href="${this.configService.get(
        'SERVER_URL',
      )}/auth/reset/${token}">Click me to reset your password</a>`,
    };

    const resetPasswordEmail: IEmailObject = {
      customer_email,
      email_type,
      subject: forgotPasswordEmailTemplate.subject,
      text: forgotPasswordEmailTemplate.text,
    };

    try {
      await sendgrid.send(message).then(() => {
        this.commandBus.execute(new LogEmailToDbCommand(resetPasswordEmail));
      });
    } catch (error) {
      console.log(error);
    }

    return { response: 'Forgot password email sent' };
  }

  async sendSetNewPasswordEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { customer_email } = sendEmailDto;
    const email_type = 'setNewPassword';

    const setNewPasswordEmailTemplate = emailTemplates.find(template => template.name === email_type);

    const message: ISendgridEmail = {
      to: customer_email,
      from: 'noreply@otasoft.org',
      subject: setNewPasswordEmailTemplate.subject,
      text: setNewPasswordEmailTemplate.text,
    };

    const setNewPasswordEmail: IEmailObject = {
      customer_email,
      email_type,
      subject: setNewPasswordEmailTemplate.subject,
      text: setNewPasswordEmailTemplate.text,
    };

    try {
      await sendgrid.send(message).then(() => {
        this.commandBus.execute(new LogEmailToDbCommand(setNewPasswordEmail));
      });
    } catch (error) {
      console.log(error);
    }

    return { response: 'New password set' };
  }

  async sendConfirmBookingEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { customer_email } = sendEmailDto;
    const email_type = 'confirmBooking';

    const confirmBookingEmailTemplate = emailTemplates.find(template => template.name === email_type)

    // TODO
    // In the future, subject and text of this message should be dynamically generated.
    // It will contain the booking ID, customer data, and so on.
    const message: ISendgridEmail = {
      to: customer_email,
      from: 'noreply@otasoft.org',
      subject: confirmBookingEmailTemplate.subject,
      text: confirmBookingEmailTemplate.text,
    };

    const confirmBookingEmail: IEmailObject = {
      customer_email,
      email_type,
      subject: confirmBookingEmailTemplate.subject,
      text: confirmBookingEmailTemplate.text,
    };

    try {
      await sendgrid.send(message).then(() => {
        this.commandBus.execute(new LogEmailToDbCommand(confirmBookingEmail));
      });
    } catch (error) {
      console.log(error);
    }

    return { response: 'Booking confirmation has been sent' };
  }

  async sendDeleteAccountMail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { customer_email } = sendEmailDto;
    const email_type = 'deleteAccount';

    const deleteAccountEmailTemplate = emailTemplates.find(template => template.name === email_type)

    const message: ISendgridEmail = {
      to: customer_email,
      from: 'noreply@otasoft.org',
      subject: deleteAccountEmailTemplate.subject,
      text: deleteAccountEmailTemplate.text,
    };

    const deleteAccountEmail: IEmailObject = {
      customer_email,
      email_type,
      subject: deleteAccountEmailTemplate.subject,
      text: deleteAccountEmailTemplate.text,
    };

    try {
      await sendgrid.send(message).then(() => {
        this.commandBus.execute(new LogEmailToDbCommand(deleteAccountEmail));
      });
    } catch (error) {
      console.log(error);
    }

    return { response: 'Delete account email has been sent' };
  }
}
