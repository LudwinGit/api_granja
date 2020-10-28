import { Test, TestingModule } from '@nestjs/testing';
import { SaleproductResolver } from '../saleproduct.resolver';

describe('SaleproductResolver', () => {
  let resolver: SaleproductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleproductResolver],
    }).compile();

    resolver = module.get<SaleproductResolver>(SaleproductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
