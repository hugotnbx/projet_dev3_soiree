import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccueilModule } from './accueil/accueil.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProfilController } from './profil/profil.controller';
import { ProfilService } from './profil/profil.service';
import { ProfilModule } from './profil/profil.module';
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
      entities: ['././dist/accueil/entities/accueil.entity.js','././dist/profil/entities/profil.entity.js'],
      synchronize: true //attention à enlever lors de la production
    }),
    ProfilModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource:DataSource){}
}
