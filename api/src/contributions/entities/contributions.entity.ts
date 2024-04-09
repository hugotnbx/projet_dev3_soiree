import {Entity, Column, PrimaryGeneratedColumn,PrimaryColumn, OneToMany} from 'typeorm';
import { EventProfil } from 'src/event-profil/entities/event-profil.entity';

@Entity()
export class Contributions {
    @PrimaryColumn()
    idContribution:number;

    @Column()
    nom:string;
    
    @Column('decimal', { precision: 6, scale: 2 })
    prix: number

    @OneToMany(() => EventProfil, EventProfil => EventProfil.idContribution)
    profilEvents: EventProfil[];
}