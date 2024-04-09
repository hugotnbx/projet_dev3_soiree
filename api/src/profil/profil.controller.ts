import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { Profil } from './entities/profil.entity';
import { ProfilDto } from './dto/profil.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('profil')
@ApiTags("Profil")
export class ProfilController {
    constructor(private readonly profilService: ProfilService) {}

    @Get()
    @ApiOperation({ summary: 'Liste des profils', description: 'Récupère la liste de tous les profils.' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des profils.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getAll(): Promise<Profil[]> {
        return this.profilService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Récupérer un profil à partir de son id', description: 'Récupère un profil à partir de son id.' })
    @ApiParam({ name: 'id', description: 'id du profil à récupérer', type: 'string' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne le profil correspondant à l\'id spécifié.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getById(@Param('id') id: string): Promise<Profil> {
        return this.profilService.read(id);
    }

    @Post()
    @ApiOperation({ summary: 'Créer un nouveau profil', description: 'Crée un nouveau profil avec ses informations générales associées.' })
    @ApiBody({ type: ProfilDto })
    @ApiResponse({ status: 201, description: 'Profil créé avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async create(@Body() profilDto: ProfilDto): Promise<Profil> {
        return this.profilService.create(profilDto);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Mettre à jour un profil existant', description: 'Met à jour les informations générales relatives à un profil existant à partir de son id.' })
    @ApiParam({ name: 'id', description: 'id du profil à mettre à jour', type: 'string' })
    @ApiBody({ type: ProfilDto })
    @ApiResponse({ status: 201, description: 'Profil mis à jour avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async update(@Param('id') id: string, @Body() profilDto: ProfilDto): Promise<Profil> {
        return this.profilService.update(id, profilDto);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Supprimer un profil existant', description: 'Supprime un profil existant à partir de son id.' })
    @ApiParam({ name: 'id', description: 'id du profil à supprimer', type: 'string' })
    @ApiResponse({ status: 201, description: 'Profil supprimé avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async delete(@Param('id') id: string): Promise<Profil> {
        return this.profilService.delete(id);
    }
}