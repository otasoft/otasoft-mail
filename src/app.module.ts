import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule,
  ],
})
export class AppModule {}
