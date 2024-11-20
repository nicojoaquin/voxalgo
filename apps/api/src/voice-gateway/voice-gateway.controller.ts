import { Controller, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CallDetails } from 'apps/voice_gateway/src/interfaces/voice-gateway.interface';
import { lastValueFrom } from 'rxjs';

@Controller('voice-gateway')
export class VoiceGatewayController {
  constructor(@Inject('VOICE_GATEWAY_SERVICE') private client: ClientProxy) {}

  @Post('make-call')
  async makeCall(@Body() params: CallDetails) {
    return lastValueFrom(this.client.send('voice-gateway.make-call', params));
  }

  @Post('end-call')
  async endCall(@Body('callId') callId: string) {
    return lastValueFrom(this.client.send('voice-gateway.end-call', callId));
  }

  @Post('get-call-status')
  async getCallStatus(@Body('callId') callId: string) {
    return lastValueFrom(this.client.send('voice-gateway.get-call-status', callId));
  }

  @Post('send-assistant-config')
  async sendAssistantConfig(@Body('configData') configData: string) {
    return lastValueFrom(this.client.send('voice-gateway.send-assistant-config', configData));
  }
}
