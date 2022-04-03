import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './configuration/configuration';
import { FinancerModule } from './modules/financer/financer.module';
import { KubernetesModule } from './modules/kubernetes/kubernetes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
      isGlobal: true,
    }),
    KubernetesModule,
    FinancerModule,
  ],
  controllers: [],
})
export class AppModule {}
