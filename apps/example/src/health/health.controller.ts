import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  @MessagePattern('health')
  getHello(@Payload() data: { status: string }) {
    return { message: 'Hello from Example Service!', ...data };
  }
}
