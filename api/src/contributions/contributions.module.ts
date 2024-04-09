import { Module } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { ContributionsController } from './contributions.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contributions } from './entities/contributions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Contributions,])],
  controllers: [ContributionsController,],
  providers: [ContributionsService,],
})
export class ContributionsModule {}


