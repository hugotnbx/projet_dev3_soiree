import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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
}