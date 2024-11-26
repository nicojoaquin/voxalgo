import { Injectable } from '@nestjs/common';
import {
  VoiceGateway,
  CallDetails,
  CallResponse,
  CallStatus
} from '../interfaces/voice-gateway.interface';
import {
  VapiToolFunctionRequest,
  VapiToolFunctionResponse
} from '../types/vapi.types';
import { ConfigService } from '@nestjs/config';
import { VapiClient } from '@vapi-ai/server-sdk';

@Injectable()
export class VapiGatewayService implements VoiceGateway {
  private readonly apiEndpoint: string;
  private readonly authToken: string;
  private readonly client: VapiClient;

  constructor(private config: ConfigService) {
    this.apiEndpoint = config.get('VAPI_API_ENDPOINT') || '';
    this.authToken = config.get('VAPI_AUTH_TOKEN') || '';
    this.client = new VapiClient({ token: this.authToken });
  }

  async initialize() {
    const res = await this.client.assistants.create({
      name: 'First Assistant',
      firstMessage: 'Hey Ryan, how are you?',
      model: {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: "You're Ryan's assistant..."
          }
        ]
      }
    });

    return { res };
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

  async sendAssistantConfig(configData: string): Promise<string> {
    // Simulate the processing logic
    const processedConfig = `Processed configuration: ${configData}`;
    console.log('Processed config: ', configData);
    return processedConfig;
  }

  async executeToolFunction(
    toolRequest: VapiToolFunctionRequest
  ): Promise<VapiToolFunctionResponse> {
    console.log(
      `Executing tool function ${toolRequest.function.name} via VAPI`
    );
    const result = { message: 'Function executed successfully' };
    return {
      results: [
        {
          tool_call_id: toolRequest.id, // Use the ID from the request
          result: result // Attach the function result here
        }
      ]
    };
  }
}
