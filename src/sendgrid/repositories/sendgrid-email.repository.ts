import { RpcException } from '@nestjs/microservices';
import { EntityRepository, Repository } from 'typeorm';
import { SendgridEmailEntity } from '../../db/entities/sendgrid-email.entity';
import { SendEmailDto } from '../dto/send-email.dto';
import { emailTemplates } from '../../templates/email-templates';

@EntityRepository(SendgridEmailEntity)
export class SendgridEmailRepository extends Repository<SendgridEmailEntity> {
  async logConfirmationEmail(sendEmailDto: SendEmailDto): Promise<void> {
    const { customer_email, email_type } = sendEmailDto;

    const email = new SendgridEmailEntity();
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
