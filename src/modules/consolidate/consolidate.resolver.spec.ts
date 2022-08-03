import { Test, TestingModule } from '@nestjs/testing';
import { ConsolidateResolver } from './consolidate.resolver';
import { ConsolidateService } from './consolidate.service';

describe('ConsolidateResolver', () => {
  let resolver: ConsolidateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsolidateResolver, ConsolidateService],
    }).compile();

    resolver = module.get<ConsolidateResolver>(ConsolidateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
