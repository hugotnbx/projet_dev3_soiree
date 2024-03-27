import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { EventProfil } from 'src/event-profil/entities/event-profil.entity';

@Entity()
export class Accueil {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nom:string;

    @Column()
    heure:string;

    @Column()
    date:string;

    @Column()
    lieu:string;

    @Column()
    nbrLit:number;

    @Column()
    nbrBob:number;

    OneToOne(() => EventProfil , eventProfil=> eventProfil.idEvent)
    ;


}