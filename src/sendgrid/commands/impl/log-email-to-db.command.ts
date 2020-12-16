import { IEmailObject } from '../../../interfaces/email-object.interface';

export class LogEmailToDbCommand {
  constructor(public readonly emailObject: IEmailObject) {}
}
