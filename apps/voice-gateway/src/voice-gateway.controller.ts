import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VoiceGateway } from 'apps/voice-gateway/src/interfaces/voice-gateway.interface';

@Controller('voice-gateway')
export class VoiceGatewayController {
  constructor(
    @Inject('VoiceGateway') private readonly voiceGateway: VoiceGateway
  ) {}

  @MessagePattern('voice.initialize')
  async initialize() {
    return this.voiceGateway.initialize();
  }

  // @Post('make-call')
  // async makeCall(@Body() params: CallDetails) {
  //   const response = await this.voiceGateway.makeCall(params);
  //   return response;
  // }

  // @Post('end-call')
  // async endCall(@Body('callId') callId: string) {
  //   await this.voiceGateway.endCall(callId);
  //   return { message: 'Call ended successfully' };
  // }

  // @Post('get-call-status')
  // async getCallStatus(@Body('callId') callId: string) {
  //   const status = await this.voiceGateway.getCallStatus(callId);
  //   return status;
  // }

  // @Post('send-assistant-config')
  // async sendAssistantConfig(@Body('configData') configData: string) {
  //   await this.voiceGateway.sendAssistantConfig(configData);
  //   return { message: 'Assistant configuration sent successfully' };
  // }
}
