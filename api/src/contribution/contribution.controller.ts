import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { Contribution } from './entities/contribution.entity';
import { ContributionDto } from './dto/contribution.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('contribution')
@ApiTags('Contribution')
export class ContributionController {

    constructor(private readonly contributionService: ContributionService) {}
    
    @Get()
    @ApiOperation({ summary: 'Liste des contributions', description: 'Récupère la liste de toutes les contributions.' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des contributions.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getAll(): Promise<Contribution[]> {
        return this.contributionService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Récupérer une contribution à partir de son id', description: 'Récupère une contribution à partir de son id.' })
    @ApiParam({ name: 'id', description: 'id de la contribution à récupérer', type: 'number' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la contribution correspondant à l\'id spécifié.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getById(@Param('id') id: number): Promise<Contribution> {
        return this.contributionService.read(id);
    }

    @Post()
    @ApiOperation({ summary: 'Créer une nouvelle contribution', description: 'Crée une nouvelle contribution avec ses informations générales associées.' })
    @ApiBody({ type: ContributionDto })
    @ApiResponse({ status: 201, description: 'Contribution créée avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async create(@Body() contributionDto: ContributionDto): Promise<Contribution> {
        return this.contributionService.create(contributionDto);
    }
}