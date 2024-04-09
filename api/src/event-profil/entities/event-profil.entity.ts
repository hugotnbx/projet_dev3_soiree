import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Profil } from 'src/profil/entities/profil.entity';
import { Events } from 'src/events/entities/events.entity';
import { Status } from 'src/status/entities/status.entity';
import { Contributions } from 'src/contributions/entities/contributions.entity';

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

    @ManyToOne(() => Contributions, contributions => contributions.profilEvents)
    @JoinColumn({ name: 'idContribution' }) // Nom de la colonne de clé étrangère vers Profil
    contributions: Contributions;

    @ManyToOne(() => Profil, profil => profil.profilEvents)
    @JoinColumn({ name: 'idProfil' }) // Nom de la colonne de clé étrangère vers Profil
    profil: Profil;

    @ManyToOne(() => Events, events => events.profilEvents)
    @JoinColumn({ name: 'idEvent' }) // Nom de la colonne de clé étrangère vers Event
    events: Events;
}