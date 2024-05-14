import {Entity, Column, PrimaryColumn, OneToMany, PrimaryGeneratedColumn,Unique} from 'typeorm';
import { UsersRelations } from 'src/users-relations/entities/users-relations.entity';

//@Unique(["mail", "username"])
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    idProfil: number;

    @Column({ length: 20 ,unique:true})
    username: string;

    @Column({ length: 50 })
    password: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 100 ,unique:true})
    mail: string;

    @Column({ length: 20 , nullable:true })
    numberPhone: string;

    @Column({ length: 100 , nullable:true})
    address: string;

    @Column({ length: 20 , nullable:true})
    instagram: string;

    @Column({ length: 20 , nullable:true})
    facebook: string;

    @Column({ length: 100 , nullable:true})
    description: string;

    @OneToMany(() => UsersRelations, usersRelations => usersRelations.user)
    usersRelations: UsersRelations[];   
}