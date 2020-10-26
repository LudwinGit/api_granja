import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseproductService } from '../warehouseproduct.service';

describe('WarehouseproductService', () => {
  let service: WarehouseproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehouseproductService],
    }).compile();

    service = module.get<WarehouseproductService>(WarehouseproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
