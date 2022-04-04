import { Controller, Get, Headers, Injectable } from '@nestjs/common';

import { FinancerService } from './financer.service';

@Controller('financer')
@Injectable()
export class FinancerController {
  constructor(private financerService: FinancerService) {}

  @Get('/rollout/dev')
  async rolloutDevDeployment(@Headers('authorization') authorization: string) {
    return this.financerService.handleRolloutDevDeployment(authorization);
  }
}
