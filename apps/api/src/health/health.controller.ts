import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    @Inject('EXAMPLE_SERVICE') private readonly exampleService: ClientProxy,
  ) {}

  @Get()
  async test() {
    return this.exampleService.send(
      {
        cmd: 'test',
      },
      { status: 'Alive!' },
    );
  }
}
