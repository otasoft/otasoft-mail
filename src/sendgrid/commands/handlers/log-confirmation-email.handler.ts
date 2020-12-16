import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailRepository } from 'src/db/repositories/email.repository';
import { LogConfirmationEmailCommand } from '../impl';

@CommandHandler(LogConfirmationEmailCommand)
export class LogConfirmationEmailHandler
  implements ICommandHandler<LogConfirmationEmailCommand> {
  constructor(
    @InjectRepository(EmailRepository)
    private readonly emailRepository: EmailRepository,
  ) {}

  async execute(command: LogConfirmationEmailCommand) {
    return await this.emailRepository.logConfirmationEmail(
      command.sendEmailDto,
    );
  }
}
