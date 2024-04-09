import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { Events } from './entities/events.entity';
import { EventsDto } from './dto/events.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('events')
@ApiTags("Events")
export class EventsController {
  constructor(private readonly accueilService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des événements', description: 'Récupère la liste de tous les événements.' })
  @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des événements.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async getAll(): Promise<Events[]> {
    return this.accueilService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Récupérer un événement à partir de son id', description: 'Récupère un événement à partir de son id.' })
  @ApiParam({ name: 'id', description: 'id de l\'événement à récupérer', type: 'number' })
  @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne l\'événement d\' correspondant à l\'id spécifié.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async getById(@Param('id') id: number): Promise<Events> {
    return this.accueilService.read(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel événement', description: 'Crée un nouvel événement avec ses informations générales associées.' })
  @ApiBody({ type: EventsDto })
  @ApiResponse({ status: 201, description: 'Événement créé avec succès.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async create(@Body() accueilDto: EventsDto): Promise<Events> {
    return this.accueilService.create(accueilDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Mettre à jour un événement existant', description: 'Met à jour un événement existant avec les informations générales fournies.' })
  @ApiParam({ name: 'id', description: 'ID de l\'accueil à mettre à jour', type: 'number' })
  @ApiBody({ type: EventsDto })
  @ApiResponse({ status: 201, description: 'Événement mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async update(@Param('id') id: number, @Body() accueilDto: EventsDto): Promise<Events> {
    return this.accueilService.update(id, accueilDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Supprimer un événement existant', description: 'Supprime un événement existant à partir de son id.' })
  @ApiParam({ name: 'id', description: 'id de l\'événement à supprimer', type: 'number' })
  @ApiResponse({ status: 201, description: 'Événement supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
  async delete(@Param('id') id: number): Promise<Events> {
    return this.accueilService.delete(id);
  }
}