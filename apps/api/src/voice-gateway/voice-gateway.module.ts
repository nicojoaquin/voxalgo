import { Module } from '@nestjs/common';
import { VoiceGatewayController } from './voice-gateway.controllers';


@Module({
  controllers: [VoiceGatewayController]
})
export class VoiceGatewayModule {}
