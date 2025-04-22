import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorAuthController } from './moderator-auth.controller';

describe('ModeratorAuthController', () => {
  let controller: ModeratorAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeratorAuthController],
    }).compile();

    controller = module.get<ModeratorAuthController>(ModeratorAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
