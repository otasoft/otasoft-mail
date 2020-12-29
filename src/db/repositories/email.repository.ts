import { EntityRepository, Repository } from 'typeorm';

import { EmailEntity } from '../entities/email.entity';

@EntityRepository(EmailEntity)
export class EmailRepository extends Repository<EmailEntity> {}
