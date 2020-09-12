import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { mailMicroserviceOptions } from './microservice-connection/microservice-connection';

const logger = new Logger('MailMicroservice')

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, mailMicroserviceOptions);

  await app.listen(() => {
    logger.log('Microservice is listening')
  });
}
bootstrap();
