'use server';

/**
 * @fileOverview Suggests the best compression algorithm for a given file type.
 *
 * - suggestCompressionAlgorithm - A function that suggests the best compression algorithm.
 * - SuggestCompressionAlgorithmInput - The input type for the suggestCompressionAlgorithm function.
 * - SuggestCompressionAlgorithmOutput - The return type for the suggestCompressionAlgorithm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCompressionAlgorithmInputSchema = z.object({
  fileType: z.string().describe('The type of the file to be compressed (e.g., text, image, binary).'),
});
export type SuggestCompressionAlgorithmInput = z.infer<typeof SuggestCompressionAlgorithmInputSchema>;

const SuggestCompressionAlgorithmOutputSchema = z.object({
  suggestedAlgorithm: z.string().describe('The suggested compression algorithm for the given file type (e.g., Huffman, RLE, LZ77, DEFLATE).'),
});
export type SuggestCompressionAlgorithmOutput = z.infer<typeof SuggestCompressionAlgorithmOutputSchema>;

export async function suggestCompressionAlgorithm(input: SuggestCompressionAlgorithmInput): Promise<SuggestCompressionAlgorithmOutput> {
  return suggestCompressionAlgorithmFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCompressionAlgorithmPrompt',
  input: {schema: SuggestCompressionAlgorithmInputSchema},
  output: {schema: SuggestCompressionAlgorithmOutputSchema},
  prompt: `Given the file type: {{{fileType}}}, suggest the most effective compression algorithm.

Only consider these algorithms:
- Huffman Coding
- Run-Length Encoding
- LZ77
- DEFLATE

Return only the name of the suggested algorithm. For example: "DEFLATE".
`,
  model: 'googleai/gemini-2.0-flash',
});

const suggestCompressionAlgorithmFlow = ai.defineFlow(
  {
    name: 'suggestCompressionAlgorithmFlow',
    inputSchema: SuggestCompressionAlgorithmInputSchema,
    outputSchema: SuggestCompressionAlgorithmOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
