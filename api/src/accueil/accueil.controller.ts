import { Controller, Get, Post, Body, Patch, Param, Delete , Put } from '@nestjs/common';
import { AccueilService } from './accueil.service';
import { Accueil } from './entities/accueil.entity';
import { AccueilDto } from './dto/accueil.dto';

@Controller('accueil')
export class AccueilController {
  constructor(private readonly accueilService: AccueilService) {}

  @Get()
  getAll():Promise<Accueil[]>{
    return this.accueilService.findAll();
  }

  @Post()
  create(@Body() accueilDto:AccueilDto):Promise<Accueil>{
    return this.accueilService.create(accueilDto);
  }

  @Put('/:id')
  update(@Param('id') id : number , @Body()accueilDto:AccueilDto): Promise<Accueil>{
    return this.accueilService.update(id,accueilDto);
  }
}
