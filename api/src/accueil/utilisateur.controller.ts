import { Controller, Get, Post, Body, Patch, Param, Delete , Put } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './entities/accueil.entity';
import { UtilisateurDto } from './dto/utilisateur.dto';
import { ApiResponse } from "@nestjs/swagger";

@Controller('utilisateur')
export class UtilisateurController{
    constructor(private readonly utilisateurService: UtilisateurService) {}

    @Get()
    @ApiResponse({
        status :201,
        description:"Liste des utilisateurs",
      })
      @ApiResponse({
        status :404,
        description:"Le serveur HTTP n'a pas trouvé la ressource demandée",
        
      })
    getAll(): Promise <Utilisateur[]>{
        return this.utilisateurService.findAll();
    }

    @Get('/:id_utilisateur')
    getById(@Param('id_utilisateur') id_utilisateur: number): Promise<Utilisateur>{
        return this.utilisateurService.read(id_utilisateur);
    }

    @Post()
    create(@Body() utilisateurDto: UtilisateurDto): Promise<Utilisateur>{
        return this.utilisateurService.create(utilisateurDto);
    }
    
    @Put('/:id_utilisateur')
    update(@Param('id_utilisateur')id_utilisateur: number, @Body()utilisateurDto: UtilisateurDto): Promise<Utilisateur>{
        return this.utilisateurService.update(id_utilisateur, utilisateurDto);
    }

    @Delete('/:id_utilisateur')
    delete(@Param('id_utilisateur') id_utilisateur: number): Promise<Utilisateur>{
        return this.utilisateurService.delete(id_utilisateur);
    }
}