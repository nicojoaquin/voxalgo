import { Module } from '@nestjs/common';
import { NatsClientModule } from './nats-client/nats-client.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { VoiceGatewayModule } from './voice-gateway/voice-gateway.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsClientModule,
    HealthModule,
    VoiceGatewayModule
  ]
})
export class AppModule {}
