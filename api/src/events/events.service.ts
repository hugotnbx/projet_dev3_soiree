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
      return await this.eventsRepository.find();
    }

    async getEventRelations(idProfil:number): Promise<Events[]> {
      return this.eventsRepository.createQueryBuilder('events')
        .select(['events.id', 'events.nom', 'events.heure', 'events.lieu', 'events.date', 'events.etatdelete'])
        .leftJoinAndSelect('events.usersRelations', 'usersRelations')
        .where('usersRelations.idProfil = :idProfil', { idProfil })
        .getMany();
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
      eventsEntities.etatdelete = eventsDto.etatdelete;
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

    async toggleEtatDelete(id: number): Promise<void> {
      const event = await this.eventsRepository.findOne({ where: { id } }); // Spécifier l'option de recherche
      if (!event) {
        throw new Error('Événement non trouvé');
      }
      // Basculez l'état de suppression de l'événement
      event.etatdelete = !event.etatdelete;
      await this.eventsRepository.save(event);
    }
}
