import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contributions } from './entities/contributions.entity';
import { ContributionsDto } from './dto/contributions.dto';

@Injectable()
export class ContributionsService {

    constructor(
      @InjectRepository(Contributions)
      private readonly contributionsRepository: Repository<Contributions>,
    ) {}

    async findAll(): Promise<Contributions[]> {
      return await this.contributionsRepository.find();
    }

    async read(idContribution: number): Promise<Contributions>{
      return await this.contributionsRepository.findOne({
        where: {
          idContribution
        }
      });
    }

    async create(contributionsDto : ContributionsDto) {
      const contributionsEntities = new Contributions();
      contributionsEntities.idContribution = contributionsDto.idContribution;
      contributionsEntities.nom = contributionsDto.nom;
      contributionsEntities.prix = contributionsDto.prix;
      const contributions = this.contributionsRepository.create(contributionsEntities);
      await this.contributionsRepository.save(contributions);
      return contributions;
    }
}