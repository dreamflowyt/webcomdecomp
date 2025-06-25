import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: ['googleai/gemini-2.0-flash', 'googleai/gemini-1.5-flash'],
  enableTracingAndMetrics: process.env.NODE_ENV === 'production',
  logLevel: process.env.NODE_ENV === 'development' ? 'info' : 'warn',
});
