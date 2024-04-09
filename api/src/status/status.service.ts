import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { StatusDto } from './dto/status.dto';


@Injectable()
export class StatusService {
    constructor(
      @InjectRepository(Status)
      private readonly statusRepository: Repository<Status>,
    ) {}

    async findAll(): Promise<Status[]> {
      return await this.statusRepository.find();
    }

    async read(idStatus:number): Promise<Status>{
      return await this.statusRepository.findOne({where:{idStatus}});
    }
    
    async create(statusDto : StatusDto) {
      const statusEntities = new Status();
      statusEntities.idStatus = statusDto.idStatus;
      statusEntities.status = statusDto.status;
    
      const status = this.statusRepository.create(statusEntities);
      await this.statusRepository.save(status);
      return status;
    
    }
}
