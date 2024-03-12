import { Module } from '@nestjs/common';
import { AccueilService } from './accueil.service';
import { AccueilController } from './accueil.controller';

@Module({
  controllers: [AccueilController],
  providers: [AccueilService],
})
export class AccueilModule {}
