import { Test, TestingModule } from '@nestjs/testing';
import { SaleproductService } from '../saleproduct.service';

describe('SaleproductService', () => {
  let service: SaleproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleproductService],
    }).compile();

    service = module.get<SaleproductService>(SaleproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
