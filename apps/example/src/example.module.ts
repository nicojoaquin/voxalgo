import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
  ],
})
export class ExampleModule {}
