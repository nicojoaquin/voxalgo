import { Module } from '@nestjs/common';
import { NatsClientModule } from './nats-client/nats-client.module';
import { HealthModule } from './health/health.module';
import { VoiceModule } from 'apps/voice-gateway/src/voice-gateway.module';

@Module({
  imports: [NatsClientModule, HealthModule, VoiceModule],
})
export class AppModule {}
