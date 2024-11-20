import { Test, TestingModule } from '@nestjs/testing';
import { VoiceController } from './voice-gateway.controller';
import { VapiGatewayService } from '../services/vapi-gateway.service';

describe('VoiceController', () => {
  let controller: VoiceController;
  let service: VapiGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceController],
      providers: [
        {
          provide: VapiGatewayService,
          useValue: {
            makeCall: jest.fn().mockResolvedValue({ callId: 'vapi-call-123', status: 'queued' }),
            endCall: jest.fn().mockResolvedValue(undefined),
            getCallStatus: jest.fn().mockResolvedValue({ callId: 'vapi-call-123', status: 'completed', duration: 180 }),
            sendAssistantConfig: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<VoiceController>(VoiceController);
    service = module.get<VapiGatewayService>(VapiGatewayService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should make a call', async () => {
    const result = await controller.makeCall({
      to: '+1234567890',
      from: '+0987654321',
    });
    expect(result).toEqual({ callId: 'vapi-call-123', status: 'queued' });
    expect(service.makeCall).toHaveBeenCalledWith({
      to: '+1234567890',
      from: '+0987654321',
    });
  });

  it('should end a call', async () => {
    await controller.endCall('vapi-call-123');
    expect(service.endCall).toHaveBeenCalledWith('vapi-call-123');
  });

  it('should fetch call status', async () => {
    const result = await controller.getCallStatus('vapi-call-123');
    expect(result).toEqual({ callId: 'vapi-call-123', status: 'completed', duration: 180 });
    expect(service.getCallStatus).toHaveBeenCalledWith('vapi-call-123');
  });

  it('should send assistant config', async () => {
    await controller.sendAssistantConfig('{"name": "Assistant"}');
    expect(service.sendAssistantConfig).toHaveBeenCalledWith('{"name": "Assistant"}');
  });
});
