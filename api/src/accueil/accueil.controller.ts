import { Controller, Get, Post, Body, Patch, Param, Delete , Put } from '@nestjs/common';
import { AccueilService } from './accueil.service';
import { Accueil } from './entities/accueil.entity';
import { AccueilDto } from './dto/accueil.dto';
import { ApiResponse } from '@nestjs/swagger'
import { ApiTags } from '@nestjs/swagger';

@Controller('accueil')
@ApiTags("Accueil")
export class AccueilController {
  constructor(private readonly accueilService: AccueilService) {}

  @Get()
  @ApiResponse({
    status :201,
    description:"Liste des messages",
  })
  @ApiResponse({
    status :404,
    description:"no page",
    
  })
  getAll():Promise<Accueil[]>{
    return this.accueilService.findAll();
  }

  @Get('/id')
  @ApiResponse({
    status :201,
    description:"Liste des messages",
  })
  @ApiResponse({
    status :404,
    description:"no page",
  })
  getById(@Param ('id')id : number):Promise<Accueil>{
    return this.accueilService.read(id);
  }

  @Post()
  @ApiResponse({
    status :201,
    description:"Liste des messages",
  })
  @ApiResponse({
    status :404,
    description:"no page",
  })
  create(@Body() accueilDto:AccueilDto):Promise<Accueil>{
    return this.accueilService.create(accueilDto);
  }

  @Put('/:id')
  @ApiResponse({
    status :201,
    description:"Liste des messages",
  })
  @ApiResponse({
    status :404,
    description:"no page",
  })
  update(@Param('id') id : number , @Body()accueilDto:AccueilDto): Promise<Accueil>{
    return this.accueilService.update(id,accueilDto);
  }

  @Delete('/:id')
  @ApiResponse({
    status :201,
    description:"Liste des messages",
  })
  @ApiResponse({
    status :404,
    description:"no page",
  })
  delete(@Param('id') id : number ): Promise<Accueil>{
    return this.accueilService.delete(id);
  }
}
