import { SendEmailDto } from 'src/sendgrid/dto/send-email.dto';

export class GetCustomerEmailsQuery {
  constructor(public readonly sendEmailDto: SendEmailDto) {}
}
