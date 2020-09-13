import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SendEmailDto } from './dto/send-email.dto';
import { SendgridService } from './sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
    constructor(
        private readonly sendgridService: SendgridService,
    ) {}

    // Refactor to get the type from the message instead from the Body()
    @MessagePattern({ role: 'mail', cmd: 'send', type: 'confirmation' })
    async sendConfirmationEmail(@Body() sendEmailDto: SendEmailDto) {
        return await this.sendgridService.sendConfirmationEmail(sendEmailDto)
    }
}
