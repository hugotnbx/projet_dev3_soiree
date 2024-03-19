import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Accueil {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nom:string;

    @Column()
    date:string;

    @Column()
    lieu:string;
}
