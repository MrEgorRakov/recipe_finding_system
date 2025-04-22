import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorAuthService } from './moderator-auth.service';

describe('ModeratorAuthService', () => {
  let service: ModeratorAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModeratorAuthService],
    }).compile();

    service = module.get<ModeratorAuthService>(ModeratorAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
