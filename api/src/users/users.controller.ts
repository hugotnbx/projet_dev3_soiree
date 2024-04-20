import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { UsersDto } from './dto/users.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/auth/auth/publicDecorator';

@Controller('users')
@ApiTags("Users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Public()
    @Get()
    @ApiOperation({ summary: 'Liste des utilisateurs', description: 'Récupère la liste de tous les utilisateurs.' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des utilisateurs.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getAll(): Promise<Users[]> {
        return this.usersService.findAll();
    }

    @Get('get-users-relations')
    async getUsersRelations() {
        return this.usersService.getUsersRelations();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Récupérer un utilisateur à partir de son id', description: 'Récupère un utilisateur à partir de son id.' })
    @ApiParam({ name: 'id', description: 'id de l\'utilisateur à récupérer', type: 'string' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne l\'utilisateurs correspondant à l\'id spécifié.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getById(@Param('id') id: string): Promise<Users> {
        return this.usersService.read(id);
    }
    @Public()
    @Post()
    @ApiOperation({ summary: 'Créer un nouvel utilisateur', description: 'Crée un nouvel utilisateur avec ses informations générales associées.' })
    @ApiBody({ type: UsersDto })
    @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async create(@Body() usersDto: UsersDto): Promise<Users> {
        return this.usersService.create(usersDto);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Mettre à jour un utilisateur existant', description: 'Met à jour les informations générales relatives à un utilisateur existant à partir de son id.' })
    @ApiParam({ name: 'id', description: 'id de l\'utilisateur à mettre à jour', type: 'string' })
    @ApiBody({ type: UsersDto })
    @ApiResponse({ status: 201, description: 'Utilisateur mis à jour avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async update(@Param('id') id: string, @Body() usersDto: UsersDto): Promise<Users> {
        return this.usersService.update(id, usersDto);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Supprimer un utilisateur existant', description: 'Supprime un utilisateur existant à partir de son id.' })
    @ApiParam({ name: 'id', description: 'id de l\'utilisateur à supprimer', type: 'string' })
    @ApiResponse({ status: 201, description: 'Utilisateur supprimé avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async delete(@Param('id') id: string): Promise<Users> {
        return this.usersService.delete(id);
    }
}