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
import { VapiClient, Vapi } from '@vapi-ai/server-sdk';
import { log } from 'console';

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

  async sendAssistant() {
    const payload = {
      name: 'INBOUND',
      voice: {
        model: 'eleven_turbo_v2',
        style: 0.1,
        voiceId: 'Pid5DJleNF2sxsuF6YKD',
        provider: '11labs',
        stability: 0.7,
        similarityBoost: 0.9,
        useSpeakerBoost: true,
        inputMinCharacters: 6,
        optimizeStreamingLatency: 4
      },
      model: {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              '# Role\nYou are Woofie, a friendly AI assistant for Woof Gang Bakery & Grooming. Your role is to assist customers in scheduling grooming appointments for their pets and provide relevant information about the services offered. You are friendly and casual. You keep the conversation engaging and polite. You use simple and clear language. You are fluent in English and Spanish.\n\n# Task\nAssist users in booking grooming appointments for their pets using voice commands and sending necessary follow-up text messages. Respond in the same language used by the caller and keep the conversation flowing.\n\n# Specifics\n1. Guide users through the entire booking process: get client details, select service, choose provider, pick a date and time, and confirm the appointment.\n2. Use tool functions to look up client information, check availability, and book the appointment.\n3. Confirm all details and send necessary text messages for deposit payment and waiver signing.\n\n# Context\nAssist customers of Woof Gang Bakery & Grooming to seamlessly book grooming appointments for their pets via voice interactions, ensuring clarity and confirming all necessary details through text messages.\n\n# Examples\n**Step 1: Get Name and Phone Number**\n- **AI:** "Welcome to Woof Gang Bakery & Grooming. May I have your phone number to start with the booking?"\n- **Caller:** "It\'s 555-123-4567."\n- **AI:** call function clientLookup\n  - If results were found:\n    - **AI:** "I found your details. How are you today, [name]?"\n    - **User:** "I\'m good."\n    - **AI:** "Great. Nice to hear from you again.. Is this appointment for [pet\'s name]?"\n    - **User:** "Yes."\n\n  - If client not found:\n    - try calling the function once again. if still can\'t find the details:\n    - **AI:** "I couldn\'t find your details. Can I have your name, please?"\n    - **User:** "John Doe."\n    - **AI:** "Nice to meet you, John. And what would be your pet\'s name?."\n    - **User:** "Her name is Mia."\n    - **AI:** "And what would be Mia\'s breed and age?.."\n    - **User:** "She is a 2 year old poodle."\n\n\n**Step 2: Select the Service**\n- **AI:** "What type of grooming service does your dog need? You can choose from a FULL groom, MINI groom, or LUXURY BATH."\n- **User:** "A full groom."\n- **AI:** "Great choice.."\n\n**Step 3: Call AvailableProviders**\n- **AI:** call function checkAvailableProviders\n  - If results were found and the caller decided to go with a different provider than last time:\n    - **AI:** "The following groomers are available: [read the results from the function call].. Which one would you prefer?"\n    - **User:** "I would like Amanda"\n    - **AI:** "Ok. Amanda.."\n- if the caller selected "First Available"\n    - **AI:** "I am noting here that you would like the First Available provider.."\n\n**Step 4: Ask for Desired Date**\n- **AI:** "What date would you prefer for the appointment?"\n- **User:** "Next Monday."\n- **AI:** call function checkAvailability\n- **AI:** "Here are the available times:.. [List of Available Times].. .. Which time works best for you?"\n- **User:** "10 AM."\n- **AI:** "Very Good.. 10 AM.. Next Monday.. with [Provider Name].. Correct?"\n- **User:** "Yes"\n\n**Step 6: Confirm Booking and Send Text for Deposit**\n- **AI:** "To confirm your appointment, we require a $30 deposit.. I will send you a link to make the payment and sign the waiver.. Is that okay?"\n- **User:** "Yes."\n- **AI:** "Please hold one for a moment.."\n- **AI:**  call function bookAppointment (body = "Hi [name]. To confirm [Pet\'s name]\'s appointment on abobrinhasalgada, please click here (https://bit.ly/payment) to pay the deposit and here (https://bit.ly/waiver) to sign the waiver. There is a 5 minutes grace period to finalize the process. Thank you for choosing WoofGang Oviedo"\n- if result was \'booked\':\n- **AI:** "Ok.. I have sent you a link to make the deposit payment.. and sign the waiver.. .. Please complete this within the next 5 minutes to confirm your booking.. .."\n\n**Step 7: Confirm Completion**\n- **AI:** "Thank you [name], for choosing Woof Gang Bakery & Grooming! .. Bye Bye!"\n\n'
          }
        ],
        provider: 'openai',
        temperature: 0.1
      },
      firstMessage: "Hi! This is Woofie from Bob's Pet Shop and Grooming...",
      endCallFunctionEnabled: true,
      endCallMessage: 'Bye Bye! , Have an Awesome Day',
      transcriber: {
        model: 'nova-2-general',
        keywords: ['woof:30', 'gang:30', 'woofgang:50'],
        language: 'en',
        provider: 'deepgram'
      },
      silenceTimeoutSeconds: 30,
      serverMessages: ['end-of-call-report', 'status-update', 'tool-calls'],
      responseDelaySeconds: 0,
      serverUrl: 'https://b21c-46-210-29-49.ngrok-free.app',
      endCallPhrases: ['goodbye', 'have an awesome day', 'bye bye'],
      llmRequestDelaySeconds: 0,
      maxDurationSeconds: 240,
      numWordsToInterruptAssistant: 3,
      backgroundSound: 'office',
      analysisPlan: {
        summaryPrompt:
          'You are an expert note-taker. You will be given a transcript of a call. Summarize the call in 2-3 sentences, if applicable. You will also extract important and relevant keywords and show them with an \'#\' at the bottom of the summary underneath the summary and under the "Keywords" title. The original transcript may be in English, Spanish, or Portuguese but your output and results should always be in English.',
        structuredDataPrompt:
          'You will be given a transcript with a call and, as an experienced sales person and lead generation specialist, you will extract every single bit of important information. This information is crucial so our event coordinators so they can tackle every single request the caller had once they call them back. The original transcript may be in English, Spanish, or Portuguese but your output and results should always be in English.',
        structuredDataSchema: {
          type: 'object',
          properties: {
            name: {
              description: 'Name of the caller',
              type: 'string'
            }
          }
        },
        successEvaluationPrompt:
          'You are an expert evaluator. You will be given a transcript of a call and the system prompt of the AI participant. Determine if the call was successful based on the objectives inferred from the system prompt. The original transcript may be in English, Spanish, or Portuguese but your output and results should always be in English.',
        successEvaluationRubric: 'AutomaticRubric'
      },
      backgroundDenoisingEnabled: true,
      messagePlan: {
        idleMessages: [
          'Are you still there?',
          'Is there anything else you need help with?',
          'Feel free to ask me any questions.',
          'How can I assist you further?',
          'Let me know if there’s anything you need.',
          "I'm still here if you need assistance.",
          "I'm ready to help whenever you are.",
          "Is there something specific you're looking for?",
          "I'm here to help with any questions you have."
        ]
      }
    };
    return payload;
  }

  async initialize() {
    console.log('Preparing payload to send to VAPI...');

    // Create the assistant
    const assistant = await this.sendAssistant();

    return { assistant };
  }

  /*
  async initialize() {
    console.log('Preparing payload to send to VAPI...');

    const assistantResponse = {
      assistant: {
        name: 'INBOUND',
        voice: {
          model: 'eleven_turbo_v2',
          style: 0.1,
          voiceId: 'Pid5DJleNF2sxsuF6YKD',
          provider: '11labs',
          stability: 0.7,
          similarityBoost: 0.9,
          useSpeakerBoost: true,
          inputMinCharacters: 6,
          optimizeStreamingLatency: 4
        },
        model: {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: "# Role\nYou are Woofie, a friendly AI assistant for Woof Gang Bakery & Grooming. Your role is to assist customers in scheduling grooming appointments for their pets and provide relevant information about the services offered. You are friendly and casual. You keep the conversation engaging and polite. You use simple and clear language. You are fluent in English and Spanish.\n\n# Task\nAssist users in booking grooming appointments for their pets using voice commands and sending necessary follow-up text messages. Respond in the same language used by the caller and keep the conversation flowing.\n\n# Specifics\n1. Guide users through the entire booking process: get client details, select service, choose provider, pick a date and time, and confirm the appointment.\n2. Use tool functions to look up client information, check availability, and book the appointment.\n3. Confirm all details and send necessary text messages for deposit payment and waiver signing.\n\n# Context\nAssist customers of Woof Gang Bakery & Grooming to seamlessly book grooming appointments for their pets via voice interactions, ensuring clarity and confirming all necessary details through text messages.\n\n# Examples\n**Step 1: Get Name and Phone Number**\n- **AI:** \"Welcome to Woof Gang Bakery & Grooming. May I have your phone number to start with the booking?\"\n- **Caller:** \"It's 555-123-4567.\"\n- **AI:** call function clientLookup\n  - If results were found:\n    - **AI:** \"I found your details. How are you today, [name]?\"\n    - **User:** \"I'm good.\"\n    - **AI:** \"Great. Nice to hear from you again.. Is this appointment for [pet's name]?\"\n    - **User:** \"Yes.\"\n\n  - If client not found:\n    - try calling the function once again. if still can't find the details:\n    - **AI:** \"I couldn't find your details. Can I have your name, please?\"\n    - **User:** \"John Doe.\"\n    - **AI:** \"Nice to meet you, John. And what would be your pet's name?.\"\n    - **User:** \"Her name is Mia.\"\n    - **AI:** \"And what would be Mia's breed and age?..\"\n    - **User:** \"She is a 2 year old poodle.\"\n\n\n**Step 2: Select the Service**\n- **AI:** \"What type of grooming service does your dog need? You can choose from a FULL groom, MINI groom, or LUXURY BATH.\"\n- **User:** \"A full groom.\"\n- **AI:** \"Great choice..\"\n\n**Step 3: Call AvailableProviders**\n- **AI:** call function checkAvailableProviders\n  - If results were found and the caller decided to go with a different provider than last time:\n    - **AI:** \"The following groomers are available: [read the results from the function call].. Which one would you prefer?\"\n    - **User:** \"I would like Amanda\"\n    - **AI:** \"Ok. Amanda..\"\n- if the caller selected \"First Available\"\n    - **AI:** \"I am noting here that you would like the First Available provider..\"\n\n**Step 4: Ask for Desired Date**\n- **AI:** \"What date would you prefer for the appointment?\"\n- **User:** \"Next Monday.\"\n- **AI:** call function checkAvailability\n- **AI:** \"Here are the available times:.. [List of Available Times].. .. Which time works best for you?\"\n- **User:** \"10 AM.\"\n- **AI:** \"Very Good.. 10 AM.. Next Monday.. with [Provider Name].. Correct?\"\n- **User:** \"Yes\"\n\n**Step 6: Confirm Booking and Send Text for Deposit**\n- **AI:** \"To confirm your appointment, we require a $30 deposit.. I will send you a link to make the payment and sign the waiver.. Is that okay?\"\n- **User:** \"Yes.\"\n- **AI:** \"Please hold one for a moment..\"\n- **AI:**  call function bookAppointment (body = \"Hi [name]. To confirm [Pet's name]'s appointment on abobrinhasalgada, please click here (https://bit.ly/payment) to pay the deposit and here (https://bit.ly/waiver) to sign the waiver. There is a 5 minutes grace period to finalize the process. Thank you for choosing WoofGang Oviedo\"\n- if result was 'booked':\n- **AI:** \"Ok.. I have sent you a link to make the deposit payment.. and sign the waiver.. .. Please complete this within the next 5 minutes to confirm your booking.. ..\"\n\n**Step 7: Confirm Completion**\n- **AI:** \"Thank you [name], for choosing Woof Gang Bakery & Grooming! .. Bye Bye!\"\n\n"
            }
          ],
          provider: 'openai',
          temperature: 0.1
        },
        firstMessage: "Hi! This is Woofie from Bob's Pet Shop and Grooming...",
        endCallFunctionEnabled: true,
        endCallMessage: 'Bye Bye! , Have an Awesome Day',
        transcriber: {
          model: 'nova-2-general',
          keywords: ['woof:30', 'gang:30', 'woofgang:50'],
          language: 'en',
          provider: 'deepgram'
        },
        silenceTimeoutSeconds: 30,
        serverMessages: ['end-of-call-report', 'status-update', 'tool-calls'],
        responseDelaySeconds: 0,
        serverUrl: 'https://b21c-46-210-29-49.ngrok-free.app',
        endCallPhrases: ['goodbye', 'have an awesome day', 'bye bye'],
        llmRequestDelaySeconds: 0,
        maxDurationSeconds: 240,
        numWordsToInterruptAssistant: 3,
        backgroundSound: 'office',
        analysisPlan: {
          summaryPrompt: "You are an expert note-taker. You will be given a transcript of a call. Summarize the call in 2-3 sentences, if applicable. You will also extract important and relevant keywords and show them with an '#' at the bottom of the summary underneath the summary and under the \"Keywords\" title. The original transcript may be in English, Spanish, or Portuguese but your output and results should always be in English.",
          structuredDataPrompt: 'You will be given a transcript with a call and, as an experienced sales person and lead generation specialist, you will extract every single bit of important information. This information is crucial so our event coordinators so they can tackle every single request the caller had once they call them back. The original transcript may be in English, Spanish, or Portuguese but your output and results should always be in English.',
          structuredDataSchema: {
            type: 'object',
            properties: {
              name: {
                description: 'Name of the caller',
                type: 'string'
              }
            }
          },
          successEvaluationPrompt: 'You are an expert evaluator. You will be given a transcript of a call and the system prompt of the AI participant. Determine if the call was successful based on the objectives inferred from the system prompt. The original transcript may be in English, Spanish, or Portuguese but your output and results should always be in English.',
          successEvaluationRubric: 'AutomaticRubric'
        },
        backgroundDenoisingEnabled: true,
        messagePlan: {
          idleMessages: [
            'Are you still there?',
            'Is there anything else you need help with?',
            'Feel free to ask me any questions.',
            'How can I assist you further?',
            'Let me know if there’s anything you need.',
            "I'm still here if you need assistance.",
            "I'm ready to help whenever you are.",
            "Is there something specific you're looking for?",
            "I'm here to help with any questions you have."

          ]
        }
      }
    };

    await this.client.assistants.create(assistantResponse);

    console.log(
      'Response sent to VAPI:',
      JSON.stringify(assistantResponse, null, 2)
    );
    return assistantResponse;
  }
*/

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
