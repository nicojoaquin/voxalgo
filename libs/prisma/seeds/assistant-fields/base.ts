export const base = {
  assistant: {
    name: '001LTPD (%assistantVersion%)',
    voice: {
      model: 'eleven_turbo_v2_5',
      style: 0,
      voiceId: 'g1gkVFi2jgj2rTKdNDq7',
      provider: '11labs',
      stability: 0.7,
      similarityBoost: 0.9,
      useSpeakerBoost: true,
      optimizeStreamingLatency: 4,
      inputPunctuationBoundaries: ['!', '?', '۔']
    },
    model: {
      model: 'gpt-4o-mini',
      tools: '(%tools%)',
      messages: [
        {
          role: 'system',
          content: '(%prompt%)'
        }
      ],
      knowledgeBase: '(%knowledgeBase%)',
      provider: 'openai',
      maxTokens: 1000,
      temperature: 0.1
    },
    recordingEnabled: true,
    firstMessage: '(%greeting%)',
    endCallFunctionEnabled: true,
    transcriber: {
      model: 'nova-2',
      smartFormat: false,
      language: 'multi',
      provider: 'deepgram'
    },
    clientMessages: ['tool-calls', 'tool-calls-result'],
    serverMessages: ['end-of-call-report', 'tool-calls'],
    responseDelaySeconds: 0.2,
    endCallPhrases: ['Goodbye', 'bye bye', 'have an awesome day'],
    hipaaEnabled: false,
    llmRequestDelaySeconds: 0,
    maxDurationSeconds: 260,
    numWordsToInterruptAssistant: 3,
    backgroundSound: 'office',
    backchannelingEnabled: false,
    analysisPlan: {
      summaryPrompt:
        'You are an expert note-taker and call summarizer. Given a transcript of a call, your task is to produce a concise summary in English that captures the main points and purpose of the conversation. The summary should be no longer than two sentences. Ensure all spelling errors are corrected, and translate any non-English content into English as needed for clarity.',
      structuredDataPrompt: '.',
      structuredDataSchema: {
        type: 'object',
        properties: {
          name: {
            description: 'the name of the caller',
            type: 'string'
          },
          email: {
            description: "the caller's email address",
            type: 'string'
          },
          phone: {
            description: "the caller's phone number",
            type: 'string'
          },
          bool01: {
            description:
              'If Parties are the main focus of this call indicate it here with a TRUE',
            type: 'boolean'
          },
          bool02: {
            description:
              'If Field Trips are the main focus of this call indicate it here with a TRUE',
            type: 'boolean'
          },
          bool03: {
            description:
              'If the caller is inquirying about a NEW event (party or field trip) indicate it here with a TRUE',
            type: 'boolean'
          },
          bool04: {
            description:
              'If the caller is inquirying about a Change or Cancellation of an existing event (party or field trip) indicate it here with a TRUE',
            type: 'boolean'
          },
          bool05: {
            description:
              'If the caller is asked if they would like to receive our food menu and they accept it, set this to TRUE. Otherwise keep it as false.',
            type: 'boolean'
          },
          bool06: {
            description: 'Have the caller visited our website already?',
            type: 'boolean'
          },
          bool07: {
            description:
              'indicates if the caller showed interest in information on our parties (only for NEW parties)',
            type: 'boolean'
          },
          bool08: {
            description:
              'indicates if the caller showed interest in information on our field trips (only for NEW field trips)',
            type: 'boolean'
          },
          bool09: {
            description:
              'indicates if the caller wants instructions or help on how to buy tickets online or want information on our jump options',
            type: 'boolean'
          },
          bool10: {
            description:
              'indicates if the caller confirmed that the number they are calling from is good for text messages or if the caller informed a new phone number.',
            type: 'boolean'
          },
          reason: {
            description:
              'the reasons for the call. One of more separated by commas. Examples: Book a Party, Schedule a Field Trip, General Information, Directions, Hours, Cancellation',
            type: 'string'
          },
          field01: {
            description:
              'stores the type of event being discussed. this can be either Party, Field Trip, Group Event, or a combination of them',
            type: 'string'
          },
          field02: {
            description:
              "stores the information regarding when the caller intend to have the event (party, field trip, etc). It can be a date or just a loose reference like 'next week'.",
            type: 'string'
          },
          field03: {
            description:
              'store here the size of the group (field trips) or the number of kids (in a party). Valid for Parties or Field Trips',
            type: 'string'
          },
          field04: {
            description:
              'in case of parties, store here the name of the package (or packages) that the caller demonstrated some interest in',
            type: 'string'
          },
          field05: {
            description:
              'once the caller indicates for how long would they want the kids to jump for (in a party or field trip), store it here (just as they say it)',
            type: 'string'
          },
          field06: {
            description:
              'the name of the school, camp, or organization to which the caller is part of',
            type: 'string'
          },
          field07: {
            description:
              'store the answer given for question #1 of the survey (surveyQuestion1)',
            type: 'string'
          },
          field08: {
            description:
              'store the answer given for question #2 of the survey (surveyQuestion2)',
            type: 'string'
          },
          field09: {
            description:
              'store the answer given for question #3 of the survey (surveyQuestion3)',
            type: 'string'
          },
          field10: {
            description:
              'stores the information regarding when the caller intend to have the event (party, field trip, etc). Convert it to an actual date (example: tomorrow should be stored as the calculated date for [today] + 1 day. So, if today is 2024-07-28, this property should get the value 2024-07-29)',
            type: 'string'
          },
          comments: {
            description:
              "if the caller makes any comment, observations, additional questions, remarks, any type of request, or question not answered through your 'knowledge base', store it in 'comments' (this field). In case of an unanswered question, say \"I'm sorry but I won't be able to answer that. I will add this as a note to our team for when they contact you later.\"",
            type: 'string'
          },
          language: {
            description:
              'the language been spoken by the assistant (result must be stored in english)',
            type: 'string'
          },
          assistant: {
            description: 'name of the current assistant',
            type: 'string'
          },
          commerror: {
            description:
              'set this to true if the communication with the caller had issues, was dropped, or you could not understand what they were saying. This property should be set to false if you were able to collect at least the name of the caller.',
            type: 'boolean'
          },
          generatelead: {
            description:
              'set this to true if the caller asked for a call, wanted to speak to someone, had or made questions, or anything that was not fully answered to the caller. This will determine if a Lead email will be sent to our team.',
            type: 'string'
          }
        }
      },
      successEvaluationPrompt:
        "You are an expert evaluator. Given a call transcript and the AI participant's system prompt, assess the call's success based on the objectives outlined in the system prompt. The transcript may be in English, Spanish, or Portuguese, but your evaluation and output should always be in English. Rate the call's success on a numeric scale from 1 to 5, where 1 = Not Successful, 2 = Partially Successful, 3 = Moderately Successful, 4 = Mostly Successful, and 5 = Highly Successful. Provide a brief justification for your rating in no more than one sentence.",
      successEvaluationRubric: 'NumericScale'
    },
    backgroundDenoisingEnabled: true,
    artifactPlan: {
      videoRecordingEnabled: false
    },
    startSpeakingPlan: {
      waitSeconds: 0.5,
      smartEndpointingEnabled: true
    },
    stopSpeakingPlan: {
      numWords: 0,
      voiceSeconds: 0.1
    }
  }
};
