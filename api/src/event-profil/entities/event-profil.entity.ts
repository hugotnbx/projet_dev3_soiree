import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Profil } from 'src/profil/entities/profil.entity';
import { Accueil } from 'src/accueil/entities/accueil.entity';

@Entity()
export class EventProfil {
    @PrimaryColumn()
    idProfil:string;

    @PrimaryColumn()
    idEvent:number;

    @ManyToOne(() => Profil, profil => profil.profilEvents)
    @JoinColumn({ name: 'idProfil' }) // Nom de la colonne de clé étrangère vers Profil
    profil: Profil;

    @ManyToOne(() => Accueil, accueil => accueil.profilEvents)
    @JoinColumn({ name: 'idEvent' }) // Nom de la colonne de clé étrangère vers Event
    event: Event;
    
}