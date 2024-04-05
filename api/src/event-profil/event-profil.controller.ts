import { Controller, Get, Post, Body, Patch, Param, Delete , Put } from '@nestjs/common';
import { EventProfilService } from './event-profil.service';
import { EventProfil } from './entities/event-profil.entity';
import { EventProfilDto } from './dto/event-profil.dto';
import { ApiResponse } from '@nestjs/swagger'
import { ApiTags } from '@nestjs/swagger';

@Controller('event-profil')
@ApiTags("EventProfil")
export class EventProfilController {
  constructor(private readonly eventProfilService: EventProfilService) {}

  @Get()
  @ApiResponse({
    status :201,
    description:"Liste des messages",
  })
  @ApiResponse({
    status :404,
    description:"no page",
    
  })
  getAll():Promise<EventProfil[]>{
    return this.eventProfilService.findAll();
  }

  @Get('/:idE')
  @ApiResponse({
    status :201,
    description:"reception event",
  })
  @ApiResponse({
    status :404,
    description:"no page. try again!",
  })
  getByIdEvent(@Param ('idE')idE : number):Promise<EventProfil[]>{
    return this.eventProfilService.readEvent(idE);
  }

  @Get('/?idEvent=:idE&idProfil=:idP')
  @ApiResponse({
    status :201,
    description:"reception event",
  })
  @ApiResponse({
    status :404,
    description:"no page. try again!",
  })
  getByIdEventProfil(@Param ('idE')idE : number,@Param("idP")idP:string):Promise<EventProfil>{
    return this.eventProfilService.readEventProfil(idP,idE);
  }

  @Post()
  @ApiResponse({
    status :201,
    description:"creation event",
  })
  @ApiResponse({
    status :404,
    description:"no page. try again!",
  })
  create(@Body() eventProfilDto:EventProfilDto):Promise<EventProfil>{
    return this.eventProfilService.create(eventProfilDto);
  }

  @Put('/:id')
  @ApiResponse({
    status :201,
    description:"modification event",
  })
  @ApiResponse({
    status :404,
    description:"no page. try again!",
  })
  /*update(@Param('id') id : number , @Body()eventProfilDto:EventProfilDto): Promise<EventProfil>{
    return this.eventProfilService.update(id,eventProfilDto);
  }*/

  @Delete('/:idE&:idP')
  @ApiResponse({
    status :201,
    description:"suppression event",
  })
  @ApiResponse({
    status :404,
    description:"no page. try again!",
  })
  delete(@Param('idE') idE : number,@Param("idP")idP:string ): Promise<EventProfil>{
    return this.eventProfilService.delete(idP,idE);
  }
}
