import {
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
  FunctionDefinition
} from 'openai/resources';

interface BaseVapiPayload {
  type: VapiWebhookEnum; // Common to all types
  timestamp: number; // Timestamp of the event
  call: VapiBaseCall; // Shared across all events
}
interface VapiBaseCall {
  id: string;
  org_id: string;
  created_at: string;
  updated_at: string;
  phone_call_provider: string;
  phone_call_provider_id: string;
  phone_call_transport: 'pstn' | 'voip';
  phone_number_id: string;
}
interface VapiInboundCall extends VapiBaseCall {
  type: 'inboundPhoneCall';
  customer: {
    number: string;
    name?: string;
  };
}
interface VapiOutboundCall extends VapiBaseCall {
  type: 'outboundPhoneCall';
  destinationNumber: string;
  timeZone: Date;
  scheduleTime: Date;
  retryCount: Number;
  assistant_id?: string;
}
export interface EndOfCallReportPayload {
  type: VapiWebhookEnum.END_OF_CALL_REPORT;
  endedReason: string;
  transcript: string;
  messages: ConversationMessage[];
  summary: string;
  recordingUrl?: string;
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
export interface VapiAssistantResponse {
  success: boolean;
  assistantId?: string;
  error?: string;
}
export interface AssistantTemplate {
  id: string;
  template: string; // Template with placeholders, i.e., "Hello, {name}!"
  placeholders: Record<string, string>; // keys and values to replace in the template
}
export interface AssistantRequestPayload extends BaseVapiPayload {
  type: VapiWebhookEnum.ASSISTANT_REQUEST;
}
export interface GeneratedAssistantResponse {
  assistantId: string;
  name: string;
  firstMessage: string;
  endCallMessage: string;
  placeholders: Record<string, string>;
}
export interface ToolFunction {
  toolId: string;
  name?: string;
  parameters: Record<string, any>;
}

export interface VapiToolFunctionRequest {
  id: string;
  type: 'function'; //or string?
  function: {
    name: string; // Function name (e.g., "processBooking")
    arguments: Record<string, any>;
  };
}
export interface VapiToolFunctionResponse {
  results: {
    tool_call_id: string; // Matches the tool call ID from the request
    result: Record<string, any>;
  }[];
  error?: string;
}
export interface PreCallAction {
  action: string;
  parameters: Record<string, any>; // e.g., { phoneId: string }
}

export interface PostCallAction {
  action: string;
  parameters: Record<string, any>;
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
export interface StatusUpdatePayload extends BaseVapiPayload {
  type: VapiWebhookEnum.STATUS_UPDATE;
  status: VapiCallStatus;
  duration?: number;
  billed_seconds?: number;
  ended_reason?: string;
  messages?: ChatCompletionMessageParam[];
}
export interface FunctionCallPayload extends BaseVapiPayload { // REMOVE I THINK
  type: VapiWebhookEnum.FUNCTION_CALL;
  functionCall: ChatCompletionCreateParams.Function;
}
export interface ConversationMessage { //REMOVE
  role: 'user' | 'system' | 'bot' | 'function_call' | 'function_result';
  message?: string;
  name?: string;
  args?: Record<string, any>;
  result?: string;
  time: number;
  endTime?: number;
  secondsFromStart: number;
}

const VAPI_CALL_STATUSES = [
  'queued',
  'ringing',
  'in-progress',
  'forwarding',
  'ended'
] as const;

export type VapiCallStatus = (typeof VAPI_CALL_STATUSES)[number];

export enum VapiWebhookEnum {
  ASSISTANT_REQUEST = 'assistant-request',
  FUNCTION_CALL = 'function-call',
  STATUS_UPDATE = 'status-update',
  END_OF_CALL_REPORT = 'end-of-call-report'
}
