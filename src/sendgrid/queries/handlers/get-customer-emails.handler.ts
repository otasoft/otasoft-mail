import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { EmailRepository } from '../../../db/repositories/email.repository';
import { EmailEntity } from '../../../db/entities/email.entity';
import { GetCustomerEmailsQuery } from '../impl';

@QueryHandler(GetCustomerEmailsQuery)
export class GetCustomerEmailsHandler
  implements IQueryHandler<GetCustomerEmailsQuery> {
  constructor(
    @InjectRepository(EmailRepository)
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(query: GetCustomerEmailsQuery) {
    const { customer_email } = query.sendEmailDto;
    const customerEmails: EmailEntity[] = await this.emailRepository.find(
      { where: { customer_email: customer_email } },
    );

    if (!customerEmails) {
      throw new RpcException('User has no mail history');
    }

    return customerEmails;
  }
}
