import { Controller, Get, Post, Body, Patch, Param, Delete , Put } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { Profil } from './entities/profil.entity';
import { ProfilDto } from './dto/profil.dto';
import { ApiResponse } from "@nestjs/swagger";
import { ApiTags } from '@nestjs/swagger'

@Controller('profil')
@ApiTags("Profil")
export class ProfilController{
    constructor(private readonly profilService: ProfilService) {}

    @Get()
    @ApiResponse({
        status :201,
        description:"Liste des profil",
      })
      @ApiResponse({
        status :404,
        description:"Le serveur HTTP n'a pas trouvé la ressource demandée",
        
      })
    getAll(): Promise <Profil[]>{
        return this.profilService.findAll();
    }

    @Get('/:idProfil')
    getById(@Param('idProfil') idProfil: number): Promise<Profil>{
        return this.profilService.read(idProfil);
    }

    @Post()
    create(@Body() profilDto: ProfilDto): Promise<Profil>{
        return this.profilService.create(profilDto);
    }
    
    @Put('/:idProfil')
    update(@Param('idProfil')idProfil: number, @Body()profilDto: ProfilDto): Promise<Profil>{
        return this.profilService.update(idProfil, profilDto);
    }

    @Delete('/:idProfil')
    delete(@Param('idProfil') idProfil: number): Promise<Profil>{
        return this.profilService.delete(idProfil);
    }
}