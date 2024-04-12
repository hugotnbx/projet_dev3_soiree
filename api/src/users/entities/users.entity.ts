import {Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';
import { UsersRelations } from 'src/users-relations/entities/users-relations.entity';

@Entity()
export class Users {
    @PrimaryColumn()
    idProfil:string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 100 })
    mail: string;

    @Column({ length: 20 , nullable:true })
    numberPhone: string;

    @Column({ length: 100 , nullable:true})
    address: string;

    @Column({ length: 20 , nullable:true})
    instagram: string;

    @Column({ length: 20 , nullable:true})
    facebook: string;

    @Column({ length: 20 , nullable:true})
    description: string;

    @Column({ length: 20 , nullable:true})
    bank: string;

    @OneToMany(() => UsersRelations, usersRelations => usersRelations.user)
    usersRelations: UsersRelations[];   
}