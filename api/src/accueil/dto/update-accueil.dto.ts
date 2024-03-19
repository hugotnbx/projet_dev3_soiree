import { PartialType } from '@nestjs/mapped-types';
import { CreateAccueilDto } from './create-accueil.dto';

export class UpdateAccueilDto extends PartialType(CreateAccueilDto) {}
