import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { EventProfil } from 'src/event-profil/entities/event-profil.entity';

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    idStatus:number;

    @Column()
    status:string;


}