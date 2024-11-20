import { Injectable } from '@nestjs/common';
import {
  VoiceGateway,
  CallDetails,
  CallResponse,
  CallStatus
} from '../interfaces/voice-gateway.interface';
import { VapiToolFunctionRequest, VapiToolFunctionResponse } from '../types/vapi.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VapiGatewayService implements VoiceGateway {
  private readonly apiEndpoint: string;
  private readonly authToken: string;

  constructor(private config: ConfigService) {
    this.apiEndpoint = config.get("VAPI_API_ENDPOINT") || '';
    this.authToken = config.get("VAPI_AUTH_TOKEN") || '';
  }

  async initialize(): Promise<void> {
    console.log('Initializing VAPI Gateway...');
  }

  async makeCall(params: CallDetails): Promise<CallResponse> {
    console.log(`Making call to ${params.to} from ${params.from}`);
    return { callId: 'vapi-call-123', status: 'queued' };
  }

  async endCall(callId: string): Promise<void> {
    console.log(`Ending call ${callId} via VAPI`);
  }

  async getCallStatus(callId: string): Promise<CallStatus> {
    console.log(`Fetching status for call ${callId} via VAPI`);
    return { callId, status: 'completed', duration: 180 };
  }

  async sendAssistantConfig(configData: string): Promise<void> {
    console.log('Sending assistant configuration to VAPI:', configData);
  }

  async executeToolFunction(
    toolRequest: VapiToolFunctionRequest
  ): Promise<VapiToolFunctionResponse> {
    console.log(`Executing tool function ${toolRequest.functionName} via VAPI`);
    return {
      success: true,
      result: { message: 'Function executed successfully' }
    };
  }
}
