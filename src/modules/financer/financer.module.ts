import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { KubernetesModule } from '../kubernetes/kubernetes.module';

import { FinancerController } from './financer.controller';
import { FinancerService } from './financer.service';

@Module({
  imports: [ConfigModule, KubernetesModule],
  controllers: [FinancerController],
  providers: [FinancerService],
})
export class FinancerModule {}
