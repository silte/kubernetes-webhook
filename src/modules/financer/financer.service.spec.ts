import { Test, TestingModule } from '@nestjs/testing';

import { FinancerService } from './financer.service';

describe('FinancerService', () => {
  let service: FinancerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancerService],
    }).compile();

    service = module.get<FinancerService>(FinancerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
