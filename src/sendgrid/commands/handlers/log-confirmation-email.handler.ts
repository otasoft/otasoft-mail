import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { emailTemplates } from '../../../templates/email-templates';
import { EmailRepository } from '../../../db/repositories/email.repository';
import { LogConfirmationEmailCommand } from '../impl';

@CommandHandler(LogConfirmationEmailCommand)
export class LogConfirmationEmailHandler
  implements ICommandHandler<LogConfirmationEmailCommand> {
  constructor(
    @InjectRepository(EmailRepository)
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(command: LogConfirmationEmailCommand) {
    const { customer_email, email_type } = command.sendEmailDto;

    const email = this.emailRepository.create();
    email.customer_email = customer_email;
    email.email_type = email_type;
    email.subject = emailTemplates.confirmCreateAccount.subject;
    email.text = emailTemplates.confirmCreateAccount.text;

    try {
      await email.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
