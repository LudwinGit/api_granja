import { Test, TestingModule } from '@nestjs/testing';
import { SellersResolver } from '../sellers.resolver';

describe('SellersResolver', () => {
  let resolver: SellersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellersResolver],
    }).compile();

    resolver = module.get<SellersResolver>(SellersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
