import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { Statuses } from './entities/statuses.entity';
import { StatusesDto } from './dto/statuses.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('statuses')
@ApiTags("Statuses")
export class StatusesController {
    constructor(private readonly statusesService: StatusesService) {}

    @Get()
    @ApiOperation({ summary: 'Liste des status', description: 'Récupère la liste de tous les status.' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des status.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getAll(): Promise<Statuses[]> {
        return this.statusesService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Récupérer un status à partir de son id', description: 'Récupère un status à partir de son ID.' })
    @ApiParam({ name: 'id', description: 'id du status à récupérer', type: 'number' })
    @ApiResponse({ status: 200, description: 'Succès. Retourne le status correspondant à l\'id spécifié.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getById(@Param('id') id: number): Promise<Statuses> {
        return this.statusesService.read(id);
    }

    @Post()
    @ApiOperation({ summary: 'Créer un nouveau status', description: 'Crée un nouveau status avec ses informations générales associées.' })
    @ApiBody({ type: StatusesDto })
    @ApiResponse({ status: 201, description: 'Status créé avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async create(@Body() statusesDto: StatusesDto): Promise<Statuses> {
        return this.statusesService.create(statusesDto);
    }
}