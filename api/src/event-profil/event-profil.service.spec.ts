import { Test, TestingModule } from '@nestjs/testing';
import { EventProfilService } from './event-profil.service';

describe('EventProfilService', () => {
  let service: EventProfilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventProfilService],
    }).compile();

    service = module.get<EventProfilService>(EventProfilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
