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
      host: process.env.DB_HOST,
      username:  process.env.DB_USERNAME,
      password:  process.env.DB_PASSWORD,
      database:  process.env.DB_DATABASE,
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