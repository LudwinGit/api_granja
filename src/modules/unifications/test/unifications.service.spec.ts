import { Test, TestingModule } from '@nestjs/testing';
import { UnificationsService } from '../unifications.service';

describe('UnificationsService', () => {
  let service: UnificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnificationsService],
    }).compile();

    service = module.get<UnificationsService>(UnificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
