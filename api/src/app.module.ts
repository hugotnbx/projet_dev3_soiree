import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccueilModule } from './accueil/accueil.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProfilModule } from './profil/profil.module';
import { EventProfilModule } from './event-profil/event-profil.module';
import { StatusModule } from './status/status.module';
import { ContributionModule } from './contribution/contribution.module';
@Module({
  imports: [
    AccueilModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3333,
      username: 'iziplan_user',
      password: 'iziplan_psw',
      database: 'iziplan_db',
      //entities: ['././dist/accueil/entities/accueil.entity.js','././dist/profil/entities/profil.entity.js'],
      autoLoadEntities:true, 
      synchronize: true //attention à enlever lors de la production
    }),
    ProfilModule,
    EventProfilModule,
    StatusModule,
    ContributionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource:DataSource){}
}
