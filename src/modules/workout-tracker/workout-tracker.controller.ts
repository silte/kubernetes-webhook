import {
  Body,
  Controller,
  Get,
  Headers,
  Injectable,
  Post,
} from '@nestjs/common';

import { WorkoutTrackerService } from './workout-tracker.service';

@Controller('workout-tracker')
@Injectable()
export class WorkoutTrackerController {
  constructor(private workoutTracker: WorkoutTrackerService) {}

  @Get('/rollout/dev')
  async rolloutDevDeployment(@Headers('authorization') authorization: string) {
    return this.workoutTracker.handleRolloutDevDeployment(authorization);
  }

  @Get('/rollout/prod')
  async rolloutProdDeployment(@Headers('authorization') authorization: string) {
    return this.workoutTracker.handleRolloutProdDeployment(authorization);
  }

  @Post('/webhook')
  async webhook(
    @Headers('X-Hub-Signature-256') contentHash: string,
    @Body() body: any,
  ) {
    return this.workoutTracker.handleWebhook(contentHash, body);
  }
}
