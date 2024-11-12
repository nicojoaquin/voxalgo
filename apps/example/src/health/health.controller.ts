import { Controller } from '@nestjs/common';
import { HealthService } from './health.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @MessagePattern({ cmd: 'test' })
  test(@Payload() data: { status: string }) {
    return this.healthService.test(data);
  }
}
