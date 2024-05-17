import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    async getEventRelations(idProfil:number): Promise<Events[]> {
      return this.eventsRepository.createQueryBuilder('events')
        .select(['events.id', 'events.nom', 'events.heure', 'events.lieu', 'events.date'])
        .leftJoinAndSelect('events.usersRelations', 'usersRelations')
        .where('usersRelations.idProfil = :idProfil', { idProfil })
        .getMany();
    }

    async read(id:number): Promise<Events>{
      return await this.eventsRepository.findOne({where:{id}})
    }

    async verify(code: string): Promise<Events[]> {
      try {
        
        
        const event = await this.eventsRepository.findOne({ where: { code } });
    
        const eventWithContributions = await this.eventsRepository.createQueryBuilder('event')
        .select([
          'event.id',
          'event.nom',
          'usersRelations.idEvent',
          'usersRelations.idContribution',
          'contribution.idContribution',
          'contribution.nom',
          'contribution.prix'
        ])
        .leftJoin('event.usersRelations', 'usersRelations')
        .leftJoin('usersRelations.contribution', 'contribution')
        .where('event.id = :eventId', { eventId: event.id })
        .andWhere('usersRelations.idStatus = :statusId', { statusId: 3 })
        .getMany();
    
        return eventWithContributions;
    
      } catch (error) {
        throw new Error(`Erreur lors de la vérification de l'événement: ${code}`);
      }
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
