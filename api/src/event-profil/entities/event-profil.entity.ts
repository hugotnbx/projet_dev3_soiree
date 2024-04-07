import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Profil } from 'src/profil/entities/profil.entity';
import { Accueil } from 'src/accueil/entities/accueil.entity';
import { Status } from 'src/status/entities/status.entity';
import { Contribution } from 'src/contribution/entities/contribution.entity';

@Entity()
export class EventProfil {
    @PrimaryColumn()
    idProfil:string;

    @PrimaryColumn()
    idEvent:number;

    @PrimaryColumn()
    idContribution: number;
    
    @Column()
    idStatus: number;

    @Column({ nullable: true })
    role: string;

    
    

    @ManyToOne(() => Status, status => status.profilEvents)
    @JoinColumn({ name: 'idStatus' }) // Nom de la colonne de clé étrangère vers Profil
    status: Status;

    @ManyToOne(() => Contribution, contribution => contribution.profilEvents)
    @JoinColumn({ name: 'idContribution' }) // Nom de la colonne de clé étrangère vers Profil
    contribution: Contribution;

    @ManyToOne(() => Profil, profil => profil.profilEvents)
    @JoinColumn({ name: 'idProfil' }) // Nom de la colonne de clé étrangère vers Profil
    profil: Profil;

    @ManyToOne(() => Accueil, accueil => accueil.profilEvents)
    @JoinColumn({ name: 'idEvent' }) // Nom de la colonne de clé étrangère vers Event
    event: Event;

    
}