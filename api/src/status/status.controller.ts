import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './entities/status.entity';
import { StatusDto } from './dto/status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('status')
@ApiTags("Status")
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Get()
    @ApiOperation({ summary: 'Liste des status', description: 'Récupère la liste de tous les status.' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des status.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getAll(): Promise<Status[]> {
        return this.statusService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Récupérer un status à partir de son id', description: 'Récupère un status à partir de son ID.' })
    @ApiParam({ name: 'id', description: 'id du status à récupérer', type: 'number' })
    @ApiResponse({ status: 200, description: 'Succès. Retourne le status correspondant à l\'id spécifié.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getById(@Param('id') id: number): Promise<Status> {
        return this.statusService.read(id);
    }

    @Post()
    @ApiOperation({ summary: 'Créer un nouveau status', description: 'Crée un nouveau status avec ses informations générales associées.' })
    @ApiBody({ type: StatusDto })
    @ApiResponse({ status: 201, description: 'Status créé avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async create(@Body() statusDto: StatusDto): Promise<Status> {
        return this.statusService.create(statusDto);
    }
}