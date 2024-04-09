import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRelationsService } from './users-relations.service';
import { UsersRelationsController } from './users-relations.controller';
import { UsersRelations } from './entities/users-relations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRelations,])],
  providers: [UsersRelationsService],
  controllers: [UsersRelationsController]
})
export class UsersRelationsModule {}