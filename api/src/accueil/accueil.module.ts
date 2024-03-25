import { Module } from '@nestjs/common';
import { AccueilService } from './accueil.service';
import { UtilisateurService } from './utilisateur.service';
import { AccueilController } from './accueil.controller';
import { Accueil } from './entities/accueil.entity';
import { Utilisateur } from './entities/accueil.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurController } from './utilisateur.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Accueil, Utilisateur])],
  controllers: [AccueilController, UtilisateurController],
  providers: [AccueilService, UtilisateurService],
})
export class AccueilModule {}
