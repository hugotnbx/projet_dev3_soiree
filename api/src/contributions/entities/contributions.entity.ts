import {Entity, Column, PrimaryGeneratedColumn,PrimaryColumn, OneToMany} from 'typeorm';
import { UsersRelations } from 'src/users-relations/entities/users-relations.entity';

@Entity()
export class Contributions {
    @PrimaryColumn()
    idContribution:number;

    @Column()
    nom:string;
    
    @Column('decimal', { precision: 6, scale: 2 })
    prix: number

    @OneToMany(() => UsersRelations, usersRelations => usersRelations.idContribution)
    usersRelations: UsersRelations[];
}