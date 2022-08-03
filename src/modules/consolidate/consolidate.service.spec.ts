import { Test, TestingModule } from '@nestjs/testing';
import { ConsolidateService } from './consolidate.service';

describe('ConsolidateService', () => {
  let service: ConsolidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsolidateService],
    }).compile();

    service = module.get<ConsolidateService>(ConsolidateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
