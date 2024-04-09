import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { UsersRelations } from 'src/users-relations/entities/users-relations.entity';

@Entity()
export class Statuses {
    @PrimaryGeneratedColumn()
    idStatus:number;

    @Column()
    status:string;

    @OneToMany(() => UsersRelations, usersRelations => usersRelations.idStatus)
    usersRelations: UsersRelations[];
}