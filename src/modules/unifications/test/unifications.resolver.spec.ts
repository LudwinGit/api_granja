import { Test, TestingModule } from '@nestjs/testing';
import { UnificationsResolver } from '../unifications.resolver';

describe('UnificationsResolver', () => {
  let resolver: UnificationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnificationsResolver],
    }).compile();

    resolver = module.get<UnificationsResolver>(UnificationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
