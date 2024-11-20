import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VapiGatewayService } from '../services/vapi-gateway.service';
import { CallDetails } from '../interfaces/voice-gateway.interface';
@Controller()
export class VoiceController {
  constructor(
    @Inject('VoiceGateway') private readonly voiceService: VapiGatewayService
  ) {}

  @MessagePattern('voice-gateway.make-call')
  async makeCall(@Payload() params: CallDetails) {
    console.log(
      'Received message for pattern "voice-gateway.make-call":',
      params
    );
    return { message: 'Hello from Example Service!' };
    //return this.voiceService.makeCall(params);
  }

  @MessagePattern('voice-gateway.end-call')
  async endCall(@Payload() callId: string) {
    return this.voiceService.endCall(callId);
  }

  @MessagePattern('voice-gateway.get-call-status')
  async getCallStatus(@Payload() callId: string) {
    return this.voiceService.getCallStatus(callId);
  }

  @MessagePattern('voice-gateway.send-assistant-config')
  async sendAssistantConfig(@Payload() configData: string) {
    return this.voiceService.sendAssistantConfig(configData);
  }
}
