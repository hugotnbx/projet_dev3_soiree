import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersRelationsService } from './users-relations.service';
import { UsersRelations } from './entities/users-relations.entity';
import { UsersRelationsDto } from './dto/users-relations.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@Controller('users-relations')
@ApiTags("UsersRelations")
export class UsersRelationsController {
    constructor(private readonly usersRelationsService: UsersRelationsService) {}

    @Get()
    @ApiOperation({ summary: 'Liste des profils et des événements étant liés', description: 'Récupère la liste de tous les profils et événements qui sont liés.' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne la liste des profils et des événements qui sont liés.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getAll(): Promise<UsersRelations[]> {
        return this.usersRelationsService.findAll();
    }

    @Get('/:idEvent')
    @ApiOperation({ summary: 'Liste des profils participant à l\'événemenent à partir de l\'id de l\'événement', description: 'Récupère la liste de tous les profils qui partcipent à l\'événeement à partir de l\'id de l\'événement.' })
    @ApiParam({ name: 'idEvent', description: 'id de l\'événement pour lequel récupérer les profils qui y participent', type: 'number' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne les profils participants à l\'événement correspondant à l\'id spécifié.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getByIdEvent(@Param('idEvent') idEvent: number): Promise<UsersRelations[]> {
        return this.usersRelationsService.readEvent(idEvent);
    }

    @Get('/?idEvent=:idEvent&idProfil=:idProfil')
    @ApiOperation({ summary: 'Récupérer un événement et un profil lié à partir de l\'id de l\'événement et l\id du profil', description: 'Récupére un événement et un profil lié à partir de l\'id de l\'événement et l\id du profil.' })
    @ApiQuery({ name: 'idEvent', description: 'id de l\'événement', type: 'number' })
    @ApiQuery({ name: 'idProfil', description: 'id du profil', type: 'string' })
    @ApiResponse({ status: 200, description: 'Succès de la requête. Retourne l\'événement et le profil lié correspondant aux id spécifiés.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async getByIdEventProfil(@Param('idEvent') idEvent: number, @Param('idProfil') idProfil: string): Promise<UsersRelations> {
        return this.usersRelationsService.readEventProfil(idProfil, idEvent);
    }

    @Post()
    @ApiOperation({ summary: 'Créer un nouveau lien entre un événement et un profil', description: 'Crée un nouveau lien entre un événement et un profil.' })
    @ApiBody({ type: UsersRelationsDto })
    @ApiResponse({ status: 201, description: 'Lien entre l\'événement et le profil créé avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async create(@Body() usersRelationsDto: UsersRelationsDto): Promise<UsersRelations> {
        return this.usersRelationsService.create(usersRelationsDto);
    }

    @Delete('/?idEvent=:idEvent&idProfil=:idProfil')
    @ApiOperation({ summary: 'Supprimer un lien entre un événement et un profil à partir de l\'id de l\'événement et l\id du profil', description: 'Supprime un lien entre un événement et un profil à partir de l\'id de l\'événement et l\id du profil.' })
    @ApiQuery({ name: 'idEvent', description: 'id de l\'événement', type: 'number' })
    @ApiQuery({ name: 'idProfil', description: 'id du profil', type: 'string' })
    @ApiResponse({ status: 201, description: 'Lien entre l\'événement et le profil supprimé avec succès.' })
    @ApiResponse({ status: 404, description: 'Page introuvable, veuillez réessayer.' })
    async delete(@Param('idEvent') idEvent: number, @Param('idProfil') idProfil: string): Promise<UsersRelations> {
        return this.usersRelationsService.delete(idProfil, idEvent);
    }
}