import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Events } from 'src/events/entities/events.entity';
import { Users } from 'src/users/entities/users.entity';
import { Statuses } from 'src/statuses/entities/statuses.entity';
import { Contributions } from 'src/contributions/entities/contributions.entity';

@Entity()
export class UsersRelations {
    @PrimaryColumn()
    idProfil:number;

    @PrimaryColumn()
    idEvent:number;

    @PrimaryColumn()
    idContribution: number;
    
    @Column()
    idStatus: number;

    @ManyToOne(() => Events, event => event.usersRelations)
    @JoinColumn({ name: 'idEvent' })
    event: Events;

    @ManyToOne(() => Users, user => user.usersRelations)
    @JoinColumn({ name: 'idProfil' }) 
    user: Users;

    @ManyToOne(() => Statuses, status => status.usersRelations)
    @JoinColumn({ name: 'idStatus' })
    status: Statuses;

    @ManyToOne(() => Contributions, contribution => contribution.usersRelations)
    @JoinColumn({ name: 'idContribution' }) 
    contribution: Contributions;
}