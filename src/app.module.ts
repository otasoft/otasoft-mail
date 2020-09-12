import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { DbModule } from './db/db.module';
import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule,
    SendgridModule,
  ],
})
export class AppModule {}
