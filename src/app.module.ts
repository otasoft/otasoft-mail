import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from './db/db.module';
import { HealthModule } from './health/health.module';
import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, SendgridModule, HealthModule],
})
export class AppModule {}
