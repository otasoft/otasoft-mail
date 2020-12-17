import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { SuccessResponseModel } from '../models/success-response.model';
import { SendEmailDto } from './dto/send-email.dto';
import { SendgridService } from './sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) {}

  @MessagePattern({ role: 'mail', cmd: 'send', type: 'confirmation' })
  async sendConfirmationEmail(sendEmailDto: SendEmailDto): Promise<SuccessResponseModel> {
    return await this.sendgridService.sendConfirmationEmail(sendEmailDto);
  }

  @MessagePattern({ role: 'mail', cmd: 'send', type: 'reset-password' })
  async sendResetPasswordEmail(sendEmailDto: SendEmailDto): Promise<SuccessResponseModel> {
    return await this.sendgridService.sendResetPasswordEmail(sendEmailDto);
  }

  @MessagePattern({ role: 'mail', cmd: 'send', type: 'confirm-booking' })
  async sendConfirmBookingEmail(sendEmailDto: SendEmailDto): Promise <SuccessResponseModel> {
    return await this.sendgridService.sendConfirmBookingEmail(sendEmailDto);
  }
}
