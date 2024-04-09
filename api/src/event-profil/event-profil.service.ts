import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventProfil } from './entities/event-profil.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventProfilDto } from './dto/event-profil.dto';

@Injectable()
export class EventProfilService {
    constructor(
      @InjectRepository(EventProfil)
      private readonly EventProfilRepository: Repository<EventProfil>,
    ) {}

    async findAll(): Promise<EventProfil[]> {
      return await this.EventProfilRepository.find();
    }

    async readEvent(idEvent:number): Promise<EventProfil[]>{
      return await this.EventProfilRepository.find({
        where: {
          idEvent,
        }
      });
    }

    async readEventProfil(idProfil: string,idEvent:number): Promise<EventProfil>{
      return await this.EventProfilRepository.findOne({
        where: {
          idProfil,
          idEvent,
        }
      });
    }
    
    async create(eventProfilDto : EventProfilDto) {
      const eventProfilEntities = new EventProfil();
      eventProfilEntities.idProfil = eventProfilDto.idProfil;
      eventProfilEntities.idEvent = eventProfilDto.idEvent;
      eventProfilEntities.idStatus = eventProfilDto.idStatus;
      eventProfilEntities.role = eventProfilDto.role;
      eventProfilEntities.idContribution = eventProfilDto.idContribution;
    
      const eventProfil = this.EventProfilRepository.create(eventProfilEntities);
      await this.EventProfilRepository.save(eventProfil);
      return eventProfil;
    }

    async delete(idProfil : string,idEvent:number){
      const eventProfil =await this.EventProfilRepository.findOne({ where: { idProfil,idEvent } });
      await this.EventProfilRepository.delete({idProfil,idEvent});
      return eventProfil ;
    }
}
