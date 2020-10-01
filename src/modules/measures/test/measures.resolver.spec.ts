import { Test, TestingModule } from '@nestjs/testing';
import { MeasuresResolver } from '../measures.resolver';

describe('MeasuresResolver', () => {
  let resolver: MeasuresResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasuresResolver],
    }).compile();

    resolver = module.get<MeasuresResolver>(MeasuresResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
