import { Test, TestingModule } from '@nestjs/testing';
import { VapiGatewayService } from './vapi-gateway.service';
import { ConfigService } from '@nestjs/config';
import { CallDetails } from '../interfaces/voice-gateway.interface';

describe('VapiGatewayService', () => {
  let service: VapiGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VapiGatewayService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'VAPI_API_ENDPOINT') return 'https://api.example.com';
              if (key === 'VAPI_AUTH_TOKEN') return 'dummy-token';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<VapiGatewayService>(VapiGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize successfully', async () => {
    const logSpy = jest.spyOn(console, 'log');
    await service.initialize();
    expect(logSpy).toHaveBeenCalledWith('Initializing VAPI Gateway...');
  });

  it('should make a call and return call details', async () => {
    const callDetails: CallDetails = { to: '+1234567890', from: '+0987654321' };
    const result = await service.makeCall(callDetails);
    expect(result).toEqual({ callId: 'vapi-call-123', status: 'queued' });
  });

  it('should end a call successfully', async () => {
    const logSpy = jest.spyOn(console, 'log');
    await service.endCall('vapi-call-123');
    expect(logSpy).toHaveBeenCalledWith('Ending call vapi-call-123 via VAPI');
  });

  it('should fetch call status successfully', async () => {
    const result = await service.getCallStatus('vapi-call-123');
    expect(result).toEqual({
      callId: 'vapi-call-123',
      status: 'completed',
      duration: 180,
    });
  });

  it('should send assistant configuration successfully', async () => {
    const logSpy = jest.spyOn(console, 'log');
    await service.sendAssistantConfig('{"name": "Assistant"}');
    expect(logSpy).toHaveBeenCalledWith(
      'Sending assistant configuration to VAPI:',
      '{"name": "Assistant"}'
    );
  });

  it('should execute tool function successfully', async () => {
    const result = await service.executeToolFunction({
      functionName: 'exampleFunction',
      arguments: { param1: 'value1' },
    });
    expect(result).toEqual({
      success: true,
      result: { message: 'Function executed successfully' },
    });
  });
});
