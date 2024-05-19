import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRelations } from './entities/users-relations.entity';
import { UsersRelationsDto } from './dto/users-relations.dto';

@Injectable()
export class UsersRelationsService {
    constructor(
      @InjectRepository(UsersRelations)
      private readonly UsersRelationsRepository: Repository<UsersRelations>,
    ) {}

    async findAll(): Promise<UsersRelations[]> {
      return await this.UsersRelationsRepository.find();
    }

    async getUserRelations(idEvent:number): Promise<UsersRelations[]> {
      return this.UsersRelationsRepository.createQueryBuilder('usersrelations')
        .leftJoinAndSelect('usersrelations.status', 'status')
        .leftJoinAndSelect('usersrelations.user', 'user')
        .where('usersrelations.idEvent = :idEvent', { idEvent })
        .getMany();
    }

    async readEvent(idEvent:number): Promise<UsersRelations[]>{
      return await this.UsersRelationsRepository.find({
        where: {
          idEvent,
        }
      });
    }

    async readEventProfil(idProfil:number,idEvent:number): Promise<UsersRelations>{
      return await this.UsersRelationsRepository.findOne({
        where: {
          idProfil,
          idEvent,
        }
      });
    }
    
    async create(usersRelationsDto:UsersRelationsDto) {
      const usersRelationsEntities = new UsersRelations();
      usersRelationsEntities.idProfil = usersRelationsDto.idProfil;
      usersRelationsEntities.idEvent = usersRelationsDto.idEvent;
      usersRelationsEntities.idStatus = usersRelationsDto.idStatus;
      usersRelationsEntities.idContribution = usersRelationsDto.idContribution;
    
      const usersRelations = this.UsersRelationsRepository.create(usersRelationsEntities);
      await this.UsersRelationsRepository.save(usersRelations);
      return usersRelations;
    }

    async updateOnEventId(idEvent: number, idProfil: number, idContribution: number, data: Partial<UsersRelations>) {
      await this.UsersRelationsRepository.update({ idEvent, idProfil, idContribution }, data);
      const userRelation = await this.UsersRelationsRepository.findOne({ where: { idEvent, idProfil, idContribution } });
      return userRelation;
    }    

    async update(idEvent : number , idContribution : number, data : Partial<UsersRelations> ){
      await this.UsersRelationsRepository.update({idEvent , idContribution},data);
      const users = this.UsersRelationsRepository.findOne({where:{idEvent , idContribution}})
      return users;
    }

    async delete(idProfil:number,idEvent:number){
      const usersRelations = await this.UsersRelationsRepository.findOne({where:{ idProfil,idEvent}});
      await this.UsersRelationsRepository.delete({idProfil,idEvent});
      return usersRelations;
    }
}
