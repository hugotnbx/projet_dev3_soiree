import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { UsersRelations } from 'src/users-relations/entities/users-relations.entity';

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

    @OneToMany(() => UsersRelations, usersRelations => usersRelations.event)
    usersRelations: UsersRelations[];
}