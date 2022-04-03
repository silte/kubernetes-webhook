import { Test, TestingModule } from '@nestjs/testing';

import { FinancerController } from './financer.controller';

describe('FinancerController', () => {
  let controller: FinancerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancerController],
    }).compile();

    controller = module.get<FinancerController>(FinancerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
