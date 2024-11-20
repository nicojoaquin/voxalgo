import { VapiGatewayService } from './vapi-gateway.service';
import { CallDetails } from '../interfaces/voice-gateway.interface';

describe('VapiGatewayService', () => {
  let service: VapiGatewayService;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    service = new VapiGatewayService();
    spy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Evita interferencias con otros logs
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should initialize the VAPI Gateway', async () => {
    await service.initialize();
    expect(spy).toHaveBeenCalledWith('Initializing VAPI Gateway...');
  });

  it('should make a call and return a callId and status', async () => {
    const callDetails: CallDetails = { to: '+1234567890', from: '+0987654321' };
    const response = await service.makeCall(callDetails);
    expect(response).toEqual({ callId: 'vapi-call-123', status: 'queued' });
    expect(spy).toHaveBeenCalledWith(
      'Making call to +1234567890 from +0987654321'
    );
  });

  it('should fetch the status of a call', async () => {
    const status = await service.getCallStatus('vapi-call-123');
    expect(status).toEqual({
      callId: 'vapi-call-123',
      status: 'completed',
      duration: 180
    });
    expect(spy).toHaveBeenCalledWith(
      'Fetching status for call vapi-call-123 via VAPI'
    );
  });

  it('should end a call successfully', async () => {
    await service.endCall('vapi-call-123');
    expect(spy).toHaveBeenCalledWith('Ending call vapi-call-123 via VAPI'); // Nota: cambia según el mensaje real.
  });

  it('should send assistant configuration successfully', async () => {
    const spy = jest.spyOn(console, 'log');
    const configData = '{"name": "Assistant"}';
    await service.sendAssistantConfig(configData);
    expect(spy).toHaveBeenCalledWith(
      'Sending assistant configuration to VAPI:',
      configData
    );
  });
});
