import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('EXAMPLE_SERVICE') private readonly exampleService: ClientProxy,
  ) {}

  @Get()
  async test() {
    return this.exampleService.send(
      {
        cmd: 'test',
      },
      {},
    );
  }
}
