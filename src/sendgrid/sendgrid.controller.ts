import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { CheckConfirmationTokenDto } from './dto/check-confirmation-token.dto';
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

    // @MessagePattern({ role: 'mail', cmd: 'check', type: 'confirmation' })
    // async checkConfirmationToken(@Body() checkConfirmationTokenDto: CheckConfirmationTokenDto) {
    //     return this.sendgridService.checkConfirmationToken(checkConfirmationTokenDto);
    // }
}
