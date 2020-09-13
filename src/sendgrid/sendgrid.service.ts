import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import * as sendgrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { emailTemplates } from 'src/templates/email-templates';
import { CommandBus } from '@nestjs/cqrs';
import { LogConfirmationEmailCommand } from './commands/impl';

@Injectable()
export class SendgridService {
    constructor(
        private configService: ConfigService,
        private readonly commandBus: CommandBus
    ) {
        sendgrid.setApiKey(this.configService.get('SENDGRID_KEY'));
    }

    async sendConfirmationEmail(sendEmailDto: SendEmailDto) {
        const { customer_email, confirmation_token } = sendEmailDto;

        const message = {
            to: customer_email,
            from: 'noreply@otasoft.org',
            subject: emailTemplates.confirmCreateAccount.subject,
            text: emailTemplates.confirmCreateAccount.text,
            html: `<a href="${this.configService.get('SERVER_URL')}/local-auth/confirm/${confirmation_token}">Click me to confirm</a>`,
          };

          try {
            await sendgrid.send(message)
            await this.commandBus.execute(new LogConfirmationEmailCommand(sendEmailDto))
          } catch (error) {
              console.log(error);
          }
          return 'Confirmation sent'
    }
}
