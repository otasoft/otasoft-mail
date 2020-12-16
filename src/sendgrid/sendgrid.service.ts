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

  async sendConfirmationEmail(sendEmailDto: SendEmailDto): Promise<SuccessResponseModel> {
    const { customer_email, token, email_type } = sendEmailDto;

    const message: ISendgridEmail = {
      to: customer_email,
      from: 'noreply@otasoft.org',
      subject: emailTemplates.confirmCreateAccount.subject,
      text: emailTemplates.confirmCreateAccount.text,
      html: `<a href="${this.configService.get(
        'SERVER_URL',
      )}/local-auth/confirm/${token}">Click me to confirm</a>`,
    };

    const confirmAccountEmail: IEmailObject = {
      customer_email,
      email_type,
      subject: emailTemplates.confirmCreateAccount.subject,
      text: emailTemplates.confirmCreateAccount.text
    };

    try {
      await sendgrid.send(message).then(() => {
        this.commandBus.execute(
          new LogEmailToDbCommand(confirmAccountEmail),
        );
      });
    } catch (error) {
      console.log(error);
    }
    return { response: 'Confirmation sent' };
  }

  async sendResetPasswordEmail(sendEmailDto: SendEmailDto): Promise<SuccessResponseModel> {
    const { customer_email, token, email_type } = sendEmailDto;

    const message: ISendgridEmail = {
      to: customer_email,
      from: 'noreply@otasoft.org',
      subject: emailTemplates.resetPassword.subject,
      text: emailTemplates.resetPassword.text,
      html: `<a href="${this.configService.get(
        'SERVER_URL',
      )}/auth/reset/${token}">Click me to reset your password</a>`,
    };


    const resetPasswordEmail: IEmailObject = {
      customer_email,
      email_type,
      subject: emailTemplates.resetPassword.subject,
      text: emailTemplates.resetPassword.text
    };

    try {
      await sendgrid.send(message).then(() => {
        this.commandBus.execute(
          new LogEmailToDbCommand(resetPasswordEmail)
        );
      });
    } catch (error) {
      console.log(error);
    }

    return { response: 'Reset password sent' }
  }
}
