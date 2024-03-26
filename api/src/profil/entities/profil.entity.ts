import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Profil{
    @PrimaryGeneratedColumn()
    idProfil:number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 100 })
    mail: string;

    @Column({ length: 20 })
    numberPhone: string;

    @Column({ length: 100 })
    address: string;

    @Column({ length: 20 })
    instagram: string;

    @Column({ length: 20 })
    facebook: string;

    @Column({ length: 20 })
    description: string;

    @Column({ length: 20 })
    bank: string;
    
   
}