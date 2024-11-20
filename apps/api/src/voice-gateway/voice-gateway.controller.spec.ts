import { Test, TestingModule } from '@nestjs/testing';
import { VoiceGatewayController } from './voice-gateway.controller';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('VoiceGatewayController', () => {
  let controller: VoiceGatewayController;
  let client: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceGatewayController],
      providers: [
        {
          provide: 'VOICE_GATEWAY_SERVICE',
          useValue: {
            send: jest.fn(() => of({ message: 'success' })),
          },
        },
      ],
    }).compile();

    controller = module.get<VoiceGatewayController>(VoiceGatewayController);
    client = module.get<ClientProxy>('VOICE_GATEWAY_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should make a call', async () => {
    const result = await controller.makeCall({
      to: '+1234567890',
      from: '+0987654321',
    });
    expect(result).toEqual({ message: 'success' });
    expect(client.send).toHaveBeenCalledWith('voice-gateway.make-call', {
      to: '+1234567890',
      from: '+0987654321',
    });
  });

  it('should end a call', async () => {
    const result = await controller.endCall('vapi-call-123');
    expect(result).toEqual({ message: 'success' });
    expect(client.send).toHaveBeenCalledWith(
      'voice-gateway.end-call',
      'vapi-call-123'
    );
  });

  it('should fetch call status', async () => {
    const result = await controller.getCallStatus('vapi-call-123');
    expect(result).toEqual({ message: 'success' });
    expect(client.send).toHaveBeenCalledWith(
      'voice-gateway.get-call-status',
      'vapi-call-123'
    );
  });

  it('should send assistant config', async () => {
    const result = await controller.sendAssistantConfig('{"name": "Assistant"}');
    expect(result).toEqual({ message: 'success' });
    expect(client.send).toHaveBeenCalledWith(
      'voice-gateway.send-assistant-config',
      '{"name": "Assistant"}'
    );
  });
});
