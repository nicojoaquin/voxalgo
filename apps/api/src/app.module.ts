import { Module } from '@nestjs/common';
import { NatsClientModule } from './nats-client/nats-client.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [NatsClientModule, HealthModule]
})
export class AppModule {}
