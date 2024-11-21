import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { VoiceGatewayModule } from './voice-gateway.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    VoiceGatewayModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER],
        queue: process.env.VOICE_GATEWAY_QUEUE
      }
    }
  );
  app.listen();
}
bootstrap();
