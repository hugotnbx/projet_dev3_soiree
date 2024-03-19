import { Injectable } from '@nestjs/common';
import { CreateAccueilDto } from './dto/create-accueil.dto';
import { UpdateAccueilDto } from './dto/update-accueil.dto';

@Injectable()
export class AccueilService {
  create(createAccueilDto: CreateAccueilDto) {
    return 'This action adds a new accueil';
  }

  findAll() {
    return `This action returns all accueil`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accueil`;
  }

  update(id: number, updateAccueilDto: UpdateAccueilDto) {
    return `This action updates a #${id} accueil`;
  }

  remove(id: number) {
    return `This action removes a #${id} accueil`;
  }
}
