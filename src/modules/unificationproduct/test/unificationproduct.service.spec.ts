import { Test, TestingModule } from '@nestjs/testing';
import { UnificationproductService } from '../unificationproduct.service';

describe('UnificationproductService', () => {
  let service: UnificationproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnificationproductService],
    }).compile();

    service = module.get<UnificationproductService>(UnificationproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
