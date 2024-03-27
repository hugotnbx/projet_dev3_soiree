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

  @Get('/?idEvent=:id')
  @ApiResponse({
    status :201,
    description:"reception event",
  })
  @ApiResponse({
    status :404,
    description:"no page. try again!",
  })
  getById(@Param ('id')id : number):Promise<EventProfil>{
    return this.eventProfilService.read(id);
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
  update(@Param('id') id : number , @Body()eventProfilDto:EventProfilDto): Promise<EventProfil>{
    return this.eventProfilService.update(id,eventProfilDto);
  }

  @Delete('/:id')
  @ApiResponse({
    status :201,
    description:"suppression event",
  })
  @ApiResponse({
    status :404,
    description:"no page. try again!",
  })
  delete(@Param('id') id : number ): Promise<EventProfil>{
    return this.eventProfilService.delete(id);
  }
}
