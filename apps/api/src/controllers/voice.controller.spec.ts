import { Test, TestingModule } from '@nestjs/testing';
import { VoiceController } from './voice.controllers';
import { VapiGatewayService } from 'libs/prisma/voice-gateway/src/services/vapi-gateway.service';

describe('VoiceController', () => {
  let controller: VoiceController;
  let mockVapiService: Partial<VapiGatewayService>;

  beforeEach(async () => {
    mockVapiService = {
      makeCall: jest.fn().mockResolvedValue({ callId: 'mock123', status: 'initiated' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceController],
      providers: [
        {
          provide: VapiGatewayService,
          useValue: mockVapiService,
        },
      ],
    }).compile();

    controller = module.get<VoiceController>(VoiceController);
  });

  it('should call makeCall on the service', async () => {
    const result = await controller.makeCall({
      to: '+1234567890',
      from: '+0987654321',
      message: 'Hello!',
    });

    expect(mockVapiService.makeCall).toHaveBeenCalledWith({
      to: '+1234567890',
      from: '+0987654321',
      message: 'Hello!',
    });

    expect(result).toEqual({ callId: 'mock123', status: 'initiated' });
  });
});
