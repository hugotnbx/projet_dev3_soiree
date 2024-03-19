import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccueilService } from './accueil.service';
import { CreateAccueilDto } from './dto/create-accueil.dto';
import { UpdateAccueilDto } from './dto/update-accueil.dto';

@Controller('accueil')
export class AccueilController {
  constructor(private readonly accueilService: AccueilService) {}

  @Post()
  create(@Body() createAccueilDto: CreateAccueilDto) {
    return this.accueilService.create(createAccueilDto);
  }

  @Get()
  findAll() {
    return this.accueilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accueilService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccueilDto: UpdateAccueilDto) {
    return this.accueilService.update(+id, updateAccueilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accueilService.remove(+id);
  }
}
