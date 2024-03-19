import { Module } from '@nestjs/common';
import { AccueilService } from './accueil.service';
import { AccueilController } from './accueil.controller';
import { Accueil } from './entities/accueil.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Accueil])],
  controllers: [AccueilController],
  providers: [AccueilService],
})
export class AccueilModule {}
