import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { StatusesModule } from './statuses/statuses.module';
import { ContributionsModule } from './contributions/contributions.module';
import { UsersRelationsModule } from './users-relations/users-relations.module';
import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [
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
    EventsModule,
    UsersModule,
    StatusesModule,
    ContributionsModule,
    UsersRelationsModule,
    AuthModule,
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {
  constructor(private dataSource:DataSource){}
}