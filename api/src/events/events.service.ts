import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './entities/events.entity';
import { EventsDto } from './dto/events.dto';
import { UsersRelations } from 'src/users-relations/entities/users-relations.entity';
import { UsersRelationsDto } from 'src/users-relations/dto/users-relations.dto';

@Injectable()
export class EventsService {
    constructor(
      @InjectRepository(Events)
      private readonly eventsRepository: Repository<Events>,
    ) {}

    async findAll(): Promise<Events[]> {
      return await this.eventsRepository.find({
        select: ['id', 'nom', 'heure', 'lieu', 'date'],
      });
    }

    async read(id:number): Promise<Events>{
      return await this.eventsRepository.findOne({where:{id}})
    }

    async create(eventsDto : EventsDto) {
      const eventsEntities = new Events();
      eventsEntities.id = eventsDto.id;
      eventsEntities.nom = eventsDto.nom;
      eventsEntities.heure= eventsDto.heure;
      eventsEntities.date= eventsDto.date;
      eventsEntities.lieu = eventsDto.lieu;
      eventsEntities.nbrLit = eventsDto.nbrLit;
      eventsEntities.nbrBob = eventsDto.nbrBob;
      const events = this.eventsRepository.create(eventsEntities);
      await this.eventsRepository.save(events);
      return events;
    }
      
    async update(id : number , data : Partial<Events> ){
      await this.eventsRepository.update({id},data);
      const events = this.eventsRepository.findOne({where:{id}})
      return events 
    }

    async delete(id : number){
      const events = await this.eventsRepository.findOne({where:{id}});
      await this.eventsRepository.delete({id});
      return events;
    }
}
