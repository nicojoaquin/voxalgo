import { Global, Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
  ClientProvider
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'EXAMPLE_SERVICE',
        useFactory: (configService: ConfigService): ClientProvider => ({
          transport: Transport.NATS,
          options: {
            servers: [configService.get<string>('NATS_SERVER')],
            queue: configService.get<string>('EXAMPLE_QUEUE')
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  exports: [
    ClientsModule.registerAsync([
      {
        name: 'EXAMPLE_SERVICE',
        useFactory: (configService: ConfigService): ClientProvider => ({
          transport: Transport.NATS,
          options: {
            servers: [configService.get<string>('NATS_SERVER')],
            queue: configService.get<string>('EXAMPLE_QUEUE')
          }
        }),
        inject: [ConfigService]
      }
    ])
  ]
})
export class NatsClientModule {}
