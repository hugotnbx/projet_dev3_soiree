import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './entities/events.entity';
import { EventsDto } from './dto/events.dto';

@Injectable()
export class EventsService {
    constructor(
      @InjectRepository(Events)
      private readonly eventsRepository: Repository<Events>,
    ) {}

    async findAll(): Promise<Events[]> {
      return await this.eventsRepository.find();
    }

    async read(id:number): Promise<Events>{
      return await this.eventsRepository.findOne({where:{id}})
    }

    async readDate(date:Date): Promise<Events>{
      return await this.eventsRepository.findOne({where:{date}})
    }

    async create(accueilDto : EventsDto) {
      const eventsEntities = new Events();
      eventsEntities.id = accueilDto.id;
      eventsEntities.nom = accueilDto.nom;
      eventsEntities.heure= accueilDto.heure;
      eventsEntities.date= accueilDto.date;
      eventsEntities.lieu = accueilDto.lieu;
      eventsEntities.nbrLit = accueilDto.nbrLit;
      eventsEntities.nbrBob = accueilDto.nbrBob;
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
