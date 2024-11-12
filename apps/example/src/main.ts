import { NestFactory } from '@nestjs/core';

import { SharedService } from '@app/shared';

import { ExampleModule } from './example.module';

async function bootstrap() {
  console.log('Starting example service...');
  const app = await NestFactory.create(ExampleModule);
  app.enableCors();

  const sharedService = app.get(SharedService);

  const queue = process.env.RABBITMQ_EXAMPLE_QUEUE;

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  await app.startAllMicroservices();

  await app.listen(6000);
}
bootstrap();
