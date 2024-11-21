import {
    ChatCompletionCreateParams,
    ChatCompletionMessageParam,
    FunctionDefinition,
  } from 'openai/resources';

export interface VapiAssistantResponse {
    success: boolean;
    assistantId?: string;
    error?: string;
  }
  
  export interface VapiToolFunctionRequest {
    functionName: string;
    arguments: Record<string, any>;
  }
  
  export interface VapiToolFunctionResponse {
    success: boolean;
    result?: any;
    error?: string;
  }
  
  export interface Model {
    model: string;
    systemPrompt?: string;
    temperature?: number;
    functions?: {
      name: string;
      async?: boolean;
      description?: string;
      parameters?: FunctionDefinition | any;
    }[];
    provider: string;
    url?: string;
  }
  
  export interface Voice {
    provider: string;
    voiceId: string;
    speed?: number;
    stability?: number;
    similarityBoost?: number;
    style?: number;
    useSpeakerBoost?: boolean;
    temperature?: number;
    emotion?: string;
  }
  
  export interface Assistant {
    name?: string;
    model?: Model;
    voice?: Voice;
    language?: string;
    firstMessage?: string;
    endCallMessage?: string;
    id?: string;
    orgId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface ConversationMessage {
    role: 'user' | 'system' | 'bot' | 'function_call' | 'function_result';
    message?: string;
    name?: string;
    args?: Record<string, any>;
    result?: string;
    time: number; // Timestamp en milisegundos
    endTime?: number; // Tiempo final del mensaje
    secondsFromStart: number; // Diferencia desde el inicio de la conversación
  }
  
  const VAPI_CALL_STATUSES = ['queued', 'ringing', 'in-progress', 'forwarding', 'ended'] as const;
  export type VapiCallStatus = (typeof VAPI_CALL_STATUSES)[number];
  
  export enum VapiWebhookEnum {
    ASSISTANT_REQUEST = 'assistant-request',
    FUNCTION_CALL = 'function-call',
    STATUS_UPDATE = 'status-update',
    END_OF_CALL_REPORT = 'end-of-call-report',
  }
  
  interface BaseVapiPayload {
    call: VapiCall;
  }
  
  export interface AssistantRequestPayload extends BaseVapiPayload {
    type: VapiWebhookEnum.ASSISTANT_REQUEST;
  }
  
  export interface StatusUpdatePayload extends BaseVapiPayload {
    type: VapiWebhookEnum.STATUS_UPDATE;
    status: VapiCallStatus;
    messages?: ChatCompletionMessageParam[];
  }
  
  export interface FunctionCallPayload extends BaseVapiPayload {
    type: VapiWebhookEnum.FUNCTION_CALL;
    functionCall: ChatCompletionCreateParams.Function;
  }
  
  export interface EndOfCallReportPayload {
    type: VapiWebhookEnum.END_OF_CALL_REPORT;
    endedReason: string;
    transcript: string;
    messages: ConversationMessage[];
    summary: string;
    recordingUrl?: string;
  }
  
  export interface VapiCall {}