import { Module } from '@nestjs/common';
import { VoiceGatewayController } from './voice-gateway.controller';


@Module({
  controllers: [VoiceGatewayController]
})
export class VoiceGatewayModule {}
