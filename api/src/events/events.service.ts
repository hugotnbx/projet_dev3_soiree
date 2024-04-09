import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './entities/events.entity';
import { EventsDto } from './dto/events.dto';

@Injectable()
export class EventsService {
    constructor(
      @InjectRepository(Events)
      private readonly accueilRepository: Repository<Events>,
    ) {}

    async findAll(): Promise<Events[]> {
      return await this.accueilRepository.find();
    }

    async read(id:number): Promise<Events>{
      return await this.accueilRepository.findOne({where:{id}})
    }

    async readDate(date:Date): Promise<Events>{
      return await this.accueilRepository.findOne({where:{date}})
    }

    async create(accueilDto : EventsDto) {
      const accueilEntities = new Events();
      accueilEntities.id = accueilDto.id;
      accueilEntities.nom = accueilDto.nom;
      accueilEntities.heure= accueilDto.heure;
      accueilEntities.date= accueilDto.date;
      accueilEntities.lieu = accueilDto.lieu;
      accueilEntities.nbrLit = accueilDto.nbrLit;
      accueilEntities.nbrBob = accueilDto.nbrBob;
      const accueil = this.accueilRepository.create(accueilEntities);
      await this.accueilRepository.save(accueil);
      return accueil;
    }
      
    async update(id : number , data : Partial<Events> ){
      await this.accueilRepository.update({id},data);
      const accueil= this.accueilRepository.findOne({where:{id}})
      return accueil 
    }

    async delete(id : number){
      const accueil =await this.accueilRepository.findOne({ where: { id } });
      await this.accueilRepository.delete({id});
      return accueil ;
    }
}
