import { Module } from '@nestjs/common';
import { VapiGatewayService } from './services/vapi-gateway.service';
import { VoiceController } from 'apps/api/src/controllers/voice.controllers';

@Module({
  controllers: [VoiceController],
  providers: [{provide: "VoiceGateway", useClass: VapiGatewayService}],
})
export class VoiceModule {}
