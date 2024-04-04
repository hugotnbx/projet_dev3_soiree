import { Controller, Get, Post, Body, Patch, Param, Delete , Put } from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './entities/status.entity';
import { StatusDto } from './dto/status.dto';
import { ApiResponse } from '@nestjs/swagger'
import { ApiTags } from '@nestjs/swagger';

@Controller('status')
@ApiTags("Status")
export class StatusController {
    constructor(private readonly statusService: StatusService) {}
    @Get()
  @ApiResponse({
    status :201,
    description:"Liste des messages",
  })
  @ApiResponse({
    status :404,
    description:"no page",
    
  })
  getAll():Promise<Status[]>{
    return this.statusService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status :201,
    description:"reception event",
  })
  @ApiResponse({
    status :404,
    description:"no page. try again!",
  })
  getById(@Param ('id')id : number):Promise<Status>{
    return this.statusService.read(id);
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
  create(@Body() statusDto:StatusDto):Promise<Status>{
    return this.statusService.create(statusDto);
  }
}
