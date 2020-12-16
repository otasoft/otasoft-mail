import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { SendgridEmailRepository } from 'src/db/repositories/sendgrid-email.repository';
import { LogConfirmationEmailCommand } from '../impl';

@CommandHandler(LogConfirmationEmailCommand)
export class LogConfirmationEmailHandler
  implements ICommandHandler<LogConfirmationEmailCommand> {
  constructor(
    @InjectRepository(SendgridEmailRepository)
    private readonly sendgridEmailRepository: SendgridEmailRepository,
  ) {}

  async execute(command: LogConfirmationEmailCommand) {
    return await this.sendgridEmailRepository.logConfirmationEmail(
      command.sendEmailDto,
    );
  }
}
