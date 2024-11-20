import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ExampleModule } from './example.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ExampleModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_SERVER],
        queue: process.env.EXAMPLE_QUEUE
      }
    }
  );
  console.log(
    'Microservice listening on NATS queue:',
    process.env.VOICE_GATEWAY_QUEUE
  );
  app.listen();
}
bootstrap();
