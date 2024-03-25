import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from './entities/accueil.entity';
import { Repository } from 'typeorm';
import { Accueil } from './entities/accueil.entity';
import { UtilisateurDto } from './dto/utilisateur.dto';

@Injectable()
export class UtilisateurService{
    constructor(
        @InjectRepository(Utilisateur)
        private readonly utilisateurRepository: Repository<Utilisateur>,
      ) {}

    async findAll(): Promise<Utilisateur[]> {
        return await this.
        utilisateurRepository.find();
    }

    async read(id_utilisateur: number): Promise<Utilisateur>{
      return await this.utilisateurRepository.findOne({
        where: {
          id_utilisateur,
        }
      });
    }

    async  create(utilisateurDto : UtilisateurDto) {
        const utilisateurEntities = new Utilisateur();
        utilisateurEntities.id_utilisateur = utilisateurDto.id_utilisateur;
        utilisateurEntities.nom = utilisateurDto.nom;
        utilisateurEntities.prenom= utilisateurDto.prenom;
        utilisateurEntities.email = utilisateurDto.email;
        utilisateurEntities.numeroTelephone = utilisateurDto.numeroTelephone;
        const utilisateur = this.utilisateurRepository.create(utilisateurEntities);
        await this.utilisateurRepository.save(utilisateur);
        return utilisateur;
    
      }

      async update(id_utilisateur : number , data : Partial<Utilisateur> ){
        await this.utilisateurRepository.update({id_utilisateur},data);
        const utilisateur= this.utilisateurRepository.findOne({where:{id_utilisateur}})
        return utilisateur 
      }

      async delete(id_utilisateur : number){
        const utilisateur =await this.utilisateurRepository.findOne({ where: { id_utilisateur } });
        await this.utilisateurRepository.delete({id_utilisateur});
        return utilisateur ;
    }
}