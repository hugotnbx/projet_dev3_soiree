import { Module } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';
import { Profil } from './entities/profil.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Profil,])],
  controllers: [ProfilController,],
  providers: [ProfilService,],
})
export class ProfilModule {}