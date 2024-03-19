import { Test, TestingModule } from '@nestjs/testing';
import { AccueilController } from './accueil.controller';
import { AccueilService } from './accueil.service';

describe('AccueilController', () => {
  let controller: AccueilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccueilController],
      providers: [AccueilService],
    }).compile();

    controller = module.get<AccueilController>(AccueilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
