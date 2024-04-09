import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Events } from 'src/events/entities/events.entity';
import { Users } from 'src/users/entities/users.entity';
import { Statuses } from 'src/statuses/entities/statuses.entity';
import { Contributions } from 'src/contributions/entities/contributions.entity';

@Entity()
export class UsersRelations {
    @PrimaryColumn()
    idProfil:string;

    @PrimaryColumn()
    idEvent:number;

    @PrimaryColumn()
    idContribution: number;
    
    @Column()
    idStatus: number;

    @Column({ nullable: true })
    role: string;

    @ManyToOne(() => Events, events => events.usersRelations)
    @JoinColumn({ name: 'idEvent' }) 
    events: Events;

    @ManyToOne(() => Users, users => users.usersRelations)
    @JoinColumn({ name: 'idProfil' }) 
    users: Users;

    @ManyToOne(() => Statuses, statuses => statuses.usersRelations)
    @JoinColumn({ name: 'idStatus' })
    status: Statuses;

    @ManyToOne(() => Contributions, contributions => contributions.usersRelations)
    @JoinColumn({ name: 'idContribution' }) 
    contributions: Contributions;
}