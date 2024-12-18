import { Controller, Inject, Get, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { CallDetails } from 'apps/voice-gateway/src/interfaces/voice-gateway.interface';

@Controller('voice-gateway')
export class VoiceGatewayController {
  constructor(@Inject('VOICE_GATEWAY_SERVICE') private client: ClientProxy) {}

  @Post()
  async initialize(@Body() body: any) {
    console.log('Body received:', JSON.stringify(body, null, 2));
    const result = await this.client.send('voice.initialize', {});
    return result;
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
