import { RpcException } from '@nestjs/microservices';
import { EntityRepository, Repository } from 'typeorm';

import { EmailEntity } from '../../db/entities/email.entity';
import { SendEmailDto } from '../dto/send-email.dto';
import { emailTemplates } from '../../templates/email-templates';

@EntityRepository(EmailEntity)
export class SendgridEmailRepository extends Repository<EmailEntity> {
  async logConfirmationEmail(sendEmailDto: SendEmailDto): Promise<void> {
    const { customer_email, email_type } = sendEmailDto;

    const email = new EmailEntity();
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
