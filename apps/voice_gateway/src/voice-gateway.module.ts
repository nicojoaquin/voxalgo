import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/prisma';
import { VapiGatewayService } from './services/vapi-gateway.service';
import { VoiceController } from './controllers/voice-gateway.controller';

@Module({
  imports: [PrismaModule],
  controllers: [VoiceController],
  providers: [{provide: "VoiceGateway", useClass: VapiGatewayService}],
})
export class VoiceGatewayModule {}
