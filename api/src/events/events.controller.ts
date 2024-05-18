import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { Events } from './entities/events.entity';
import { EventsDto } from './dto/events.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/auth/auth/publicDecorator';
@Controller('events')
@ApiTags("Events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  //@Public()
  @Get()
  @ApiOperation({ summary: 'Liste des événements', description: 'Récupère la liste de tous les événements.' })
  @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des événements.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async getAll(): Promise<Events[]> {
    return this.eventsService.findAll();

  }

  @Get('get-event-relations/:idProfil')
    async getStatus(@Param('idProfil') idProfil: number): Promise<Events[]> {
        return this.eventsService.getEventRelations(idProfil);
    }

  @Get('/:id')
  @ApiOperation({ summary: 'Récupérer un événement à partir de son id', description: 'Récupère un événement à partir de son id.' })
  @ApiParam({ name: 'id', description: 'id de l\'événement à récupérer', type: 'number' })
  @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne l\'événement d\' correspondant à l\'id spécifié.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async getById(@Param('id') id: number): Promise<Events> {
    return this.eventsService.read(id);
  }


  @Get('/verif/:id')
  @ApiOperation({ summary: 'Récupérer un événement à partir de son id', description: 'Récupère un événement à partir de son id.' })
  @ApiParam({ name: 'id', description: 'id de l\'événement à récupérer', type: 'number' })
  @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne l\'événement d\' correspondant à l\'id spécifié.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async verifById(@Param('id') id: string): Promise<Events[]> {
    return this.eventsService.verify(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Créer un nouvel événement', description: 'Crée un nouvel événement avec ses informations générales associées.' })
  @ApiBody({ type: EventsDto })
  @ApiResponse({ status: 201, description: 'Événement créé avec succès.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async create(@Body() eventsDto: EventsDto): Promise<Events> {
    return this.eventsService.create(eventsDto);
  }

  @Post('/deletevent/:id')
  @ApiOperation({ summary: 'Supprimer un événement', description: 'Supprimer un événement en le grisant. Les informations générales restent toute fois disponible' })
  @ApiBody({ type: EventsDto })
  @ApiResponse({ status: 201, description: 'Suppression réaliser avec succès.' })
  @ApiResponse({ status: 404, description: 'La suppression à échouer, veuillez réessayer.' })
  async toggleEtatDelete(@Param('id') id: number): Promise<void> {
    await this.eventsService.toggleEtatDelete(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Mettre à jour un événement existant', description: 'Met à jour un événement existant avec les informations générales fournies.' })
  @ApiParam({ name: 'id', description: 'ID de l\'accueil à mettre à jour', type: 'number' })
  @ApiBody({ type: EventsDto })
  @ApiResponse({ status: 201, description: 'Événement mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async update(@Param('id') id: number, @Body() eventsDto: EventsDto): Promise<Events> {
    return this.eventsService.update(id, eventsDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Supprimer un événement existant', description: 'Supprime un événement existant à partir de son id.' })
  @ApiParam({ name: 'id', description: 'id de l\'événement à supprimer', type: 'number' })
  @ApiResponse({ status: 201, description: 'Événement supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async delete(@Param('id') id: number): Promise<Events> {
    return this.eventsService.delete(id);
  }
}