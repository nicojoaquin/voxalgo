import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule.registerRmq(
      'EXAMPLE_SERVICE',
      process.env.RABBITMQ_EXAMPLE_QUEUE,
    ),
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
