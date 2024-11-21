import { Test, TestingModule } from '@nestjs/testing';
import { VapiGatewayService } from '../services/vapi-gateway.service';
import { VoiceGateway } from '../interfaces/voice-gateway.interface';
import { CallDetails } from '../interfaces/voice-gateway.interface';
import { VoiceController } from './voice-gateway.controller';

describe('VoiceController', () => {
  let controller: VoiceController;
  let service: VapiGatewayService;

  const mockService = {
    makeCall: jest.fn(),
    endCall: jest.fn(),
    getCallStatus: jest.fn(),
    sendAssistantConfig: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceController],
      providers: [
        { provide: VapiGatewayService, useValue: mockService }, // Mock of service
        { provide: 'VoiceGateway', useExisting: VapiGatewayService }, 
      ],
    }).compile();

    controller = module.get<VoiceController>(VoiceController);
    service = module.get<VapiGatewayService>(VapiGatewayService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call makeCall on the service', async () => {
    const params: CallDetails = { to: '123456789', from: '987654321' };
    mockService.makeCall.mockResolvedValue({ callId: '123', status: 'queued' });

    const result = await controller.makeCall(params);
    expect(service.makeCall).toHaveBeenCalledWith(params);
    expect(result).toEqual({ callId: '123', status: 'queued' });
  });

  it('should call endCall on the service', async () => {
    const callId = '123';
    mockService.endCall.mockResolvedValue(undefined);

    await controller.endCall(callId);
    expect(service.endCall).toHaveBeenCalledWith(callId);
  });

  it('should call getCallStatus on the service', async () => {
    const callId = '123';
    const statusResponse = { callId, status: 'completed', duration: 180 };
    mockService.getCallStatus.mockResolvedValue(statusResponse);

    const result = await controller.getCallStatus(callId);
    expect(service.getCallStatus).toHaveBeenCalledWith(callId);
    expect(result).toEqual(statusResponse);
  });

  it('should call sendAssistantConfig on the service', async () => {
    const configData = 'test-config';
    const processedResponse = 'Processed configuration: test-config';
    mockService.sendAssistantConfig.mockResolvedValue(processedResponse);

    const result = await controller.sendAssistantConfig(configData);
    expect(service.sendAssistantConfig).toHaveBeenCalledWith(configData);
    expect(result).toEqual({
      message: 'Assistant configuration processed successfully',
      response: processedResponse,
    });
  });
});
