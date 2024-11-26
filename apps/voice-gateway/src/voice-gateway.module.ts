import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/prisma';
import { VapiGatewayService } from './services/vapi-gateway.service';
import { ConfigModule } from '@nestjs/config';
import { VoiceGatewayController } from './voice-gateway.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [VoiceGatewayController],
  providers: [{ provide: 'VoiceGateway', useClass: VapiGatewayService }]
})
export class VoiceGatewayModule {}
