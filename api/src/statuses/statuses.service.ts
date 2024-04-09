import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statuses } from './entities/statuses.entity';
import { StatusesDto } from './dto/statuses.dto';

@Injectable()
export class StatusesService {
    constructor(
      @InjectRepository(Statuses)
      private readonly statusesRepository: Repository<Statuses>,
    ) {}

    async findAll(): Promise<Statuses[]> {
      return await this.statusesRepository.find();
    }

    async read(idStatus:number): Promise<Statuses>{
      return await this.statusesRepository.findOne({where:{idStatus}});
    }
    
    async create(statusesDto : StatusesDto) {
      const statusesEntities = new Statuses();
      statusesEntities.idStatus = statusesDto.idStatus;
      statusesEntities.status = statusesDto.status;
    
      const statuses = this.statusesRepository.create(statusesEntities);
      await this.statusesRepository.save(statuses);
      return statuses;
    }
}
