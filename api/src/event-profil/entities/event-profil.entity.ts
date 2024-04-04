import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Profil } from 'src/profil/entities/profil.entity';
import { Accueil } from 'src/accueil/entities/accueil.entity';
import { Status } from 'src/status/entities/status.entity';

@Entity()
export class EventProfil {
    @PrimaryColumn()
    idProfil:string;

    @PrimaryColumn()
    idEvent:number;
    
    @Column({ nullable: true })
    idStatus: string;

    @Column({ nullable: true })
    role: string;

    @ManyToOne(() => Status, status => status.profilEvents)
    @JoinColumn({ name: 'idStatus' }) // Nom de la colonne de clé étrangère vers Profil
    status: Status;

    @ManyToOne(() => Profil, profil => profil.profilEvents)
    @JoinColumn({ name: 'idProfil' }) // Nom de la colonne de clé étrangère vers Profil
    profil: Profil;

    @ManyToOne(() => Accueil, accueil => accueil.profilEvents)
    @JoinColumn({ name: 'idEvent' }) // Nom de la colonne de clé étrangère vers Event
    event: Event;

    
}