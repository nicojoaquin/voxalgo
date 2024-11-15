import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';
import { PrismaModule } from './libs/prisma/prisma.module';

@Module({
  imports: [PrismaModule, HealthModule]
})
export class ExampleModule {}
