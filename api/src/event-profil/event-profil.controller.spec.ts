import { Test, TestingModule } from '@nestjs/testing';
import { EventProfilController } from './event-profil.controller';

describe('EventProfilController', () => {
  let controller: EventProfilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventProfilController],
    }).compile();

    controller = module.get<EventProfilController>(EventProfilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
