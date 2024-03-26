import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profil } from './entities/profil.entity';
import { ProfilDto } from './dto/profil.dto';


@Injectable()
export class ProfilService{
    constructor(
        @InjectRepository(Profil)
        private readonly profilRepository: Repository<Profil>,
      ) {}

    async findAll(): Promise<Profil[]> {
        return await this.profilRepository.find();
    }

    async read(idProfil: number): Promise<Profil>{
      return await this.profilRepository.findOne({
        where: {
          idProfil,
        }
      });
    }

    async  create(profilDto : ProfilDto) {
        const profilEntities = new Profil();
        profilEntities.idProfil = profilDto.idProfil;
        profilEntities.name = profilDto.name;
        profilEntities.firstName= profilDto.firstName;
        profilEntities.mail = profilDto.mail;
        profilEntities.numberPhone = profilDto.numberPhone;
        profilEntities.address = profilDto.address;
        profilEntities.instagram = profilDto.instagram;
        profilEntities.facebook = profilDto.facebook;
        profilEntities.description = profilDto.description;
        profilEntities.bank = profilDto.bank;
        const profil = this.profilRepository.create(profilEntities);
        await this.profilRepository.save(profil);
        return profil;
    
      }

      async update(idProfil : number , data : Partial<Profil> ){
        await this.profilRepository.update({idProfil},data);
        const profil= this.profilRepository.findOne({where:{idProfil}})
        return profil 
      }

      async delete(idProfil : number){
        const profil =await this.profilRepository.findOne({ where: { idProfil } });
        await this.profilRepository.delete({idProfil});
        return profil ;
    }
}