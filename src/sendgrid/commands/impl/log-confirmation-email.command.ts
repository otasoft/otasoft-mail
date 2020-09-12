import { SendEmailDto } from "src/sendgrid/dto/send-email.dto";

export class LogConfirmationEmailCommand {
    constructor(
        public readonly sendEmailDto: SendEmailDto,
    ) {}
}