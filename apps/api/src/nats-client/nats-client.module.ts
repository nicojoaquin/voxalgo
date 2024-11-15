import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXAMPLE_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVER],
          queue: process.env.EXAMPLE_QUEUE
        }
      }
    ])
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'EXAMPLE_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVER],
          queue: process.env.EXAMPLE_QUEUE
        }
      }
    ])
  ]
})
export class NatsClientModule {}
