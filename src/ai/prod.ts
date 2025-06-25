import { config } from 'dotenv';
config();

// Import all flows for production
import '@/ai/flows/suggest-compression-algorithm';

console.log('AI flows loaded for production'); 