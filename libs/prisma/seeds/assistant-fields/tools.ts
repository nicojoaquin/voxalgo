export const tools = [
  {
    type: 'function',
    function: {
      name: 'getOpenCloseSpanish',
      async: false,
      description:
        'Retrieve the Open and Close times for a specific date informed by the caller. The result should be read back to the caller in Spanish. This toll should only be used when the current language is **Spanish**.',
      parameters: {
        type: 'object',
        properties: {
          openclosedate: {
            description:
              'The date which the caller is interested to know the open and close times.',
            type: 'string'
          }
        }
      }
    },
    messages: [
      {
        type: 'request-start',
        content: 'Dame un segundo mientras reviso eso...'
      },
      {
        type: 'request-failed',
        content:
          'Lo siento. No pude obtener esa información. ¿Quieres que te diga el horario regular en su lugar?'
      },
      {
        type: 'request-response-delayed',
        content:
          'Estamos experimentando un breve retraso al comunicarnos con nuestro servidor.',
        timingMilliseconds: 4000
      }
    ],
    server: {
      url: 'https://hook.us1.make.com/83919oyqtncua7gkzm06ru3spyrwvfhx'
    },
    async: false
  },
  {
    type: 'function',
    function: {
      name: 'getOpenClose',
      async: false,
      description:
        'Retrieve the Open and Close times for a specific date informed by the caller. The result should be read back to the caller in English. This toll should only be used when the current language is **English**.',
      parameters: {
        type: 'object',
        properties: {
          openclosedate: {
            description:
              'The date which the caller is interested to know the open and close times.',
            type: 'string'
          }
        }
      }
    },
    messages: [
      {
        type: 'request-start',
        content: 'Give me a second while I check that...'
      },
      {
        type: 'request-failed',
        content:
          'Sorry. I was not able to retrieve that information. Would you want the listen the regular hours instead?'
      },
      {
        type: 'request-response-delayed',
        content:
          "We're experiencing a brief delay communicating with our server.",
        timingMilliseconds: 4000
      }
    ],
    server: {
      url: 'https://hook.us1.make.com/83919oyqtncua7gkzm06ru3spyrwvfhx'
    },
    async: false
  }
];
