import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { Profil } from 'src/profil/entities/profil.entity';
import { Accueil } from 'src/accueil/entities/accueil.entity';

@Entity()
export class EventProfil {
    @PrimaryGeneratedColumn()
    idProfil:number;

    @PrimaryGeneratedColumn()
    idEvent:number;

    @OneToOne(()=> Profil,profil => profil.idProfil)
    profil : Profil ;  
    
    @OneToOne(()=>Accueil , accueil => accueil.id)
    accueil : Accueil;
    
}