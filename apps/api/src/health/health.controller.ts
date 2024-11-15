import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('health')
export class HealthController {
  constructor(@Inject('EXAMPLE_SERVICE') private client: ClientProxy) {}

  @Get()
  async getHealth() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return lastValueFrom(this.client.send('health', { status: 'Alive!' }));
  }
}
