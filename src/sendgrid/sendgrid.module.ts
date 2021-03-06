import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EmailRepository } from '../db/repositories/email.repository';
import { SendgridController } from './sendgrid.controller';
import { SendgridService } from './sendgrid.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailRepository]), CqrsModule],
  controllers: [SendgridController],
  providers: [
    SendgridService,
    ConfigService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
})
export class SendgridModule {}
