export interface VoiceGateway {
  initialize();
  makeCall(params: CallDetails): Promise<CallResponse>;
  endCall(callId: string): Promise<void>;
  getCallStatus(callId: string): Promise<CallStatus>;
  sendAssistantConfig(configData: string): Promise<string>;
}

export type CallDetails = {
  to: string;
  from: string;
  message?: string;
  metadata?: Record<string, any>;
};

export type CallResponse = {
  callId: string;
  status: string;
};

export type CallStatus = {
  callId: string;
  status: string;
  duration?: number;
  additionalInfo?: Record<string, any>;
};
