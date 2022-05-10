import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './configuration/configuration';
import { HealthCheckModule } from './health-check/health-check.module';
import { FinancerModule } from './modules/financer/financer.module';
import { KubernetesModule } from './modules/kubernetes/kubernetes.module';
import { WorkoutTrackerModule } from './modules/workout-tracker/workout-tracker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
      isGlobal: true,
    }),
    HealthCheckModule,
    KubernetesModule,
    FinancerModule,
    WorkoutTrackerModule,
  ],
  controllers: [],
})
export class AppModule {}
