import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contribution } from './entities/contribution.entity';
import { ContributionDto } from './dto/contribution.dto';

@Injectable()
export class ContributionService {

    constructor(
        @InjectRepository(Contribution)
        private readonly contributionRepository: Repository<Contribution>,
      ) {}

    async findAll(): Promise<Contribution[]> {
        return await this.contributionRepository.find();
    }

    async read(idContribution: number): Promise<Contribution>{
      return await this.contributionRepository.findOne({
        where: {
          idContribution
        }
      });
    }

    async  create(contributionDto : ContributionDto) {
        const contributionEntities = new Contribution();
        contributionEntities.idContribution = contributionDto.idContribution;
        contributionEntities.nom = contributionDto.nom;
        contributionEntities.prix = contributionDto.prix;
        const contribution = this.contributionRepository.create(contributionEntities);
        await this.contributionRepository.save(contribution);
        return contribution;
    
      }

}