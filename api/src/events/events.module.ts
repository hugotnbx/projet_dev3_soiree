import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Events } from './entities/events.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Events,])],
  controllers: [EventsController,],
  providers: [EventsService,],
})
export class EventsModule {}
