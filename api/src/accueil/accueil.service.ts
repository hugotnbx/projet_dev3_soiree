import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accueil } from './entities/accueil.entity';
import { AccueilDto } from './dto/accueil.dto';


@Injectable()
export class AccueilService {
    constructor(
      @InjectRepository(Accueil)
      private readonly accueilRepository: Repository<Accueil>,
    ) {}

    async findAll(): Promise<Accueil[]> {
        return await this.accueilRepository.find();
    }

    async read(id:number): Promise<Accueil>{
        return await this.accueilRepository.findOne({where:{id}})
    }

    async  create(accueilDto : AccueilDto) {
        const accueilEntities = new Accueil();
        accueilEntities.id = accueilDto.id;
        accueilEntities.nom = accueilDto.nom;
        accueilEntities.date= accueilDto.date;
        accueilEntities.lieu = accueilDto.lieu;
        const accueil = this.accueilRepository.create(accueilEntities);
        await this.accueilRepository.save(accueil);
        return accueil;
    
      }
      async update(id : number , data : Partial<Accueil> ){
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
