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
}

@Entity()
export class Utilisateur{
    @PrimaryGeneratedColumn()
    id_utilisateur:number;

    @Column({ length: 50 })
    nom: string;

    @Column({ length: 50 })
    prenom: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 20 })
    numeroTelephone: string;

}