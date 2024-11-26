import { Test, TestingModule } from '@nestjs/testing';
import { VapiGatewayService } from './vapi-gateway.service';
import { ConfigService } from '@nestjs/config';
import { CallDetails } from '../interfaces/voice-gateway.interface';
import { VapiToolFunctionRequest } from '../types/vapi.types';

describe('VapiGatewayService', () => {
  let service: VapiGatewayService;
  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'VAPI_API_ENDPOINT') return 'http://mock.api.endpoint';
      if (key === 'VAPI_AUTH_TOKEN') return 'mock-token';
      return null;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VapiGatewayService,
        { provide: ConfigService, useValue: mockConfigService }
      ]
    }).compile();

    service = module.get<VapiGatewayService>(VapiGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize the service', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await service.initialize();
    expect(consoleSpy).toHaveBeenCalledWith('Initializing VAPI Gateway...');
  });

  it('should make a call', async () => {
    const callDetails: CallDetails = { to: '123456789', from: '987654321' };
    const result = await service.makeCall(callDetails);
    expect(result).toEqual({ callId: 'vapi-call-123', status: 'queued' });
  });

  it('should end a call', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const callId = 'vapi-call-123';
    await service.endCall(callId);
    expect(consoleSpy).toHaveBeenCalledWith(`Ending call ${callId} via VAPI`);
  });

  it('should get call status', async () => {
    const callId = 'vapi-call-123';
    const result = await service.getCallStatus(callId);
    expect(result).toEqual({
      callId,
      status: 'completed',
      duration: 180
    });
  });

  it('should send assistant config', async () => {
    const configData = 'test-config';
    const result = await service.sendAssistantConfig(configData);
    expect(result).toEqual('Processed configuration: test-config');
  });

  it('should execute a tool function', async () => {
    const toolRequest: VapiToolFunctionRequest = {
      id: 'tool-1',
      type: 'function', 
      function: {
        name: 'processBooking',
        arguments: { key: 'value' }
      }
    };

    const result = await service.executeToolFunction(toolRequest);
    expect(result).toEqual({
      results: [
        {
          tool_call_id: 'tool-1',
          result: { message: 'Function executed successfully' }
        }
      ]
    });
  });
});
