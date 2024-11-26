import { Controller, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { CallDetails } from 'apps/voice-gateway/src/interfaces/voice-gateway.interface';

@Controller('voice-gateway')
export class VoiceGatewayController {
  constructor(@Inject('VOICE_GATEWAY_SERVICE') private client: ClientProxy) {}

  @Get()
  async initialize() {
    return this.client.send('voice.initialize', {});
  }

  // @Post('make-call')
  // async makeCall(@Body() params) {
  //   return lastValueFrom(this.client.send('voice-gateway.make-call', params));
  // }

  // @Post('end-call')
  // async endCall(@Body('callId') callId: string) {
  //   return lastValueFrom(this.client.send('voice-gateway.end-call', callId));
  // }

  // @Post('get-call-status')
  // async getCallStatus(@Body('callId') callId: string) {
  //   return lastValueFrom(
  //     this.client.send('voice-gateway.get-call-status', callId)
  //   );
  // }

  // @Post('send-assistant-config')
  // async sendAssistantConfig(@Body('configData') configData: string) {
  //   try {
  //     return await lastValueFrom(
  //       this.client.send('voice-gateway.send-assistant-config', configData)
  //     );
  //   } catch (error) {
  //     console.error('Error in sendAssistantConfig:', error);
  //     throw error;
  //   }
  // }
}
