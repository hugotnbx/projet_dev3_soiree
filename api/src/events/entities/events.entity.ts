import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { EventProfil } from 'src/event-profil/entities/event-profil.entity';

@Entity()
export class Events {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nom:string;

    @Column()
    heure:string;

    @Column({ type : "date"})
    date:Date;

    @Column()
    lieu:string;

    @Column()
    nbrLit:number;

    @Column()
    nbrBob:number;

    @OneToMany(() => EventProfil, EventProfil => EventProfil.idEvent)
    profilEvents: EventProfil[];
}