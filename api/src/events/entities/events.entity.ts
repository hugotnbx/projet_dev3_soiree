import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { UsersRelations } from 'src/users-relations/entities/users-relations.entity';
import { v4 as uuidv4 } from 'uuid';

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

    @Column({ unique: true })
    code: string;
  
    constructor() {
      this.code = uuidv4(); // Générez un code unique lors de la création de l'entité
    }
    @Column()
    nbrLit:number;

    @Column()
    nbrBob:number;

    @Column({ default: false })
    etatdelete:boolean;

    @OneToMany(() => UsersRelations, usersRelations => usersRelations.event)
    usersRelations: UsersRelations[];
}