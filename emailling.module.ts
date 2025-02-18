import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmaillingService } from './emailling.service';
import { EmaillingController } from './emailling.controller';

@Module({
  imports: [ConfigModule],
  providers: [EmaillingService],
  exports: [EmaillingService],
  controllers: [EmaillingController],
})
export class EmaillingModule {}
