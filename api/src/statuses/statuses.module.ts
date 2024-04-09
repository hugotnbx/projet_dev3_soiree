import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { Statuses } from './entities/statuses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Statuses,])],
  controllers: [StatusesController,],
  providers: [StatusesService,],
})
export class StatusesModule {}
