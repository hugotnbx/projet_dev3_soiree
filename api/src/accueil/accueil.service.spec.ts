import { Test, TestingModule } from '@nestjs/testing';
import { AccueilService } from './accueil.service';

describe('AccueilService', () => {
  let service: AccueilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccueilService],
    }).compile();

    service = module.get<AccueilService>(AccueilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
