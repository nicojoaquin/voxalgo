import { Module } from '@nestjs/common';
import { NatsClientModule } from './nats-client/nats-client.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsClientModule,
    HealthModule
  ]
})
export class AppModule {}
