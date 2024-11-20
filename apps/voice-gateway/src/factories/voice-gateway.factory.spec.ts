import { VoiceGatewayFactory } from './voice-gateway.factory';
import { VapiGatewayService } from '../services/vapi-gateway.service';

describe('VoiceGatewayFactory', () => {
  it('should create a VAPI gateway instance', () => {
    const gateway = VoiceGatewayFactory.create('VAPI');
    expect(gateway).toBeInstanceOf(VapiGatewayService);
  });
});
