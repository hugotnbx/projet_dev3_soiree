import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AccueilService } from './accueil.service';
import { Accueil } from './entities/accueil.entity';
import { AccueilDto } from './dto/accueil.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('accueil')
@ApiTags('Événement')
export class AccueilController {
  constructor(private readonly accueilService: AccueilService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des événements', description: 'Récupère la liste de tous les événements.' })
  @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des événements.' })
  @ApiResponse({ status: 404, description: 'Page non trouvée.' })
  async getAll(): Promise<Accueil[]> {
    return this.accueilService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Récupérer un événement à partir de son id', description: 'Récupère un événement à partir de son id.' })
  @ApiParam({ name: 'id', description: 'id de l\'événement à récupérer', type: 'number' })
  @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne l\'événement d\' correspondant à l\'id spécifié.' })
  @ApiResponse({ status: 404, description: 'Page non trouvée.' })
  async getById(@Param('id') id: number): Promise<Accueil> {
    return this.accueilService.read(id);
  }

  @Get('/:date')
  @ApiOperation({ summary: 'Récupérer un événement à partir de sa date', description: 'Récupère un événement en fonction de sa date.' })
  @ApiParam({ name: 'date', description: 'Date de l\'événement à récupérer', type: 'string' })
  @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne l\'événement correspondant à la date spécifiée.' })
  @ApiResponse({ status: 404, description: 'Page non trouvée.' })
  async getByDate(@Param('date') date: Date): Promise<Accueil> {
    return this.accueilService.readDate(date);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel événement', description: 'Crée un nouvel événement avec ses informations générales associées.' })
  @ApiBody({ type: AccueilDto })
  @ApiResponse({ status: 201, description: 'Événement créé avec succès.' })
  @ApiResponse({ status: 404, description: 'Page non trouvée.' })
  async create(@Body() accueilDto: AccueilDto): Promise<Accueil> {
    return this.accueilService.create(accueilDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Mettre à jour un événement existant', description: 'Met à jour un événement existant avec les informations générales fournies.' })
  @ApiParam({ name: 'id', description: 'ID de l\'accueil à mettre à jour', type: 'number' })
  @ApiBody({ type: AccueilDto })
  @ApiResponse({ status: 201, description: 'Événement mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Page non trouvée.' })
  async update(@Param('id') id: number, @Body() accueilDto: AccueilDto): Promise<Accueil> {
    return this.accueilService.update(id, accueilDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Supprimer un événement existant', description: 'Supprime un événement existant à partir de son id.' })
  @ApiParam({ name: 'id', description: 'id de l\'événement à supprimer', type: 'number' })
  @ApiResponse({ status: 201, description: 'Événement supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Page non trouvée.' })
  async delete(@Param('id') id: number): Promise<Accueil> {
    return this.accueilService.delete(id);
  }
}