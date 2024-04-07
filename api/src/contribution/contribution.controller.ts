import { Controller, Get, Post, Body, Patch, Param, Delete , Put } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { Contribution } from './entities/contribution.entity';
import { ContributionDto } from './dto/contribution.dto';
import { ApiResponse } from "@nestjs/swagger";
import { ApiTags } from '@nestjs/swagger'

@Controller('contribution')
export class ContributionController {

    constructor(private readonly contributionService: ContributionService) {}
    
    
    @Get()
    @ApiResponse({
        status :201,
        description:"Liste des profil",
      })
      @ApiResponse({
        status :404,
        description:"Le serveur HTTP n'a pas trouvé la ressource demandée",
        
      })
    getAll(): Promise <Contribution[]>{
        return this.contributionService.findAll();
    }

    @Get('/:idContribution')
    getById(@Param('idContribution') idContribution: number): Promise<Contribution>{
        return this.contributionService.read(idContribution);
    }

    @Post()
    create(@Body() contributionDto: ContributionDto): Promise<Contribution>{
        return this.contributionService.create(contributionDto);
    }
    
}
