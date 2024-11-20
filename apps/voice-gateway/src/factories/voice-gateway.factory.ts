import { Injectable } from '@nestjs/common';
import { VoiceGateway } from '../interfaces/voice-gateway.interface';
import { VapiGatewayService } from '../services/vapi-gateway.service';

@Injectable()
export class VoiceGatewayFactory {
  static create(provider: 'VAPI'): VoiceGateway {
    switch (provider) {
      case 'VAPI':
        return new VapiGatewayService();
      default:
        throw new Error('Unsupported voice gateway provider');
    }
  }
}
