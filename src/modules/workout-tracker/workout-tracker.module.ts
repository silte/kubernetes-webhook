import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { KubernetesModule } from '../kubernetes/kubernetes.module';

import { WorkoutTrackerController } from './workout-tracker.controller';
import { WorkoutTrackerService } from './workout-tracker.service';

@Module({
  imports: [ConfigModule, KubernetesModule],
  controllers: [WorkoutTrackerController],
  providers: [WorkoutTrackerService],
})
export class WorkoutTrackerModule {}
