import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { SendgridEmailRepository } from '../../repositories/sendgrid-email.repository';
import { EmailEntity } from '../../../db/entities/email.entity';
import { GetCustomerEmailsQuery } from '../impl';

@QueryHandler(GetCustomerEmailsQuery)
export class GetCustomerEmailsHandler
  implements IQueryHandler<GetCustomerEmailsQuery> {
  constructor(
    @InjectRepository(SendgridEmailRepository)
    private readonly sendgridEmailRepository: SendgridEmailRepository,
  ) {}

  async execute(query: GetCustomerEmailsQuery) {
    const { customer_email } = query.sendEmailDto;
    const customerEmails: EmailEntity[] = await this.sendgridEmailRepository.find(
      { where: { customer_email: customer_email } },
    );

    if (!customerEmails) {
      throw new RpcException('User has no mail history');
    }

    return customerEmails;
  }
}
