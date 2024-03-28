import { Module } from '@nestjs/common';
import { EventProfilService } from './event-profil.service';
import { EventProfilController } from './event-profil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventProfil } from './entities/event-profil.entity';
@Module({
  imports: [TypeOrmModule.forFeature([EventProfil,])],
  providers: [EventProfilService],
  controllers: [EventProfilController]
})
export class EventProfilModule {}
