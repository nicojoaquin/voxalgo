import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule, HealthModule]
})
export class ExampleModule {}
