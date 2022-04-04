import {
  Body,
  Controller,
  Get,
  Headers,
  Injectable,
  Post,
} from '@nestjs/common';

import { FinancerService } from './financer.service';

@Controller('financer')
@Injectable()
export class FinancerController {
  constructor(private financerService: FinancerService) {}

  @Get('/rollout/dev')
  async rolloutDevDeployment(@Headers('authorization') authorization: string) {
    return this.financerService.handleRolloutDevDeployment(authorization);
  }

  @Post('/webhook')
  async webhook(
    @Headers('X-Hub-Signature-256') contentHash: string,
    @Body() body: any,
  ) {
    return this.financerService.handleWebhook(contentHash, body);
  }
}
