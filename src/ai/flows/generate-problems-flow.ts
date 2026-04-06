'use server';
/**
 * @fileOverview A Genkit flow for generating real-world market problems (struggles) for the Finding Problems page.
 *
 * - generateMarketProblems - A function that generates a list of simple market struggles.
 * - GenerateProblemsInput - The input type for the generateMarketProblems function.
 * - GenerateProblemsOutput - The return type for the generateMarketProblems function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProblemsInputSchema = z.object({
  count: z.number().int().min(1).max(5).default(3).describe('The number of problems to generate.'),
});
export type GenerateProblemsInput = z.infer<typeof GenerateProblemsInputSchema>;

const MarketProblemSchema = z.object({
  id: z.string().describe('A unique ID for the problem.'),
  title: z.string().describe('A simple, short title for the struggle.'),
  segment: z.string().describe('The category of the struggle (e.g., Home, Work, School, Money).'),
  intensity: z.enum(['Medium', 'High']).describe('How much this problem hurts people.'),
  description: z.string().describe('A simple explanation of why this is a struggle for people.'),
  potential: z.string().describe('A simple idea for how a business could fix this.'),
});

const GenerateProblemsOutputSchema = z.object({
  problems: z.array(MarketProblemSchema).describe('A list of generated market struggles.'),
});
export type GenerateProblemsOutput = z.infer<typeof GenerateProblemsOutputSchema>;

export async function generateMarketProblems(
  input: GenerateProblemsInput
): Promise<GenerateProblemsOutput> {
  return generateProblemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProblemsPrompt',
  input: { schema: GenerateProblemsInputSchema },
  output: { schema: GenerateProblemsOutputSchema },
  prompt: `You are the RiseForge Problem Scout. Your job is to find real-world struggles or "pains" that people face in their daily lives.

Use very simple English that a teenager or anyone can understand. Avoid business jargon.

Generate {{{count}}} unique and interesting struggles. For each struggle, provide:
1. A short, catchy title.
2. A simple category (e.g., "Daily Life", "Old People", "Environment", "Small Shops").
3. A pain level (Medium or High).
4. A simple description of what is actually hard for people (max 20 words).
5. A simple suggestion for a tool or service that could fix it.

Make the struggles feel real and relevant to today's world.`,
});

const generateProblemsFlow = ai.defineFlow(
  {
    name: 'generateProblemsFlow',
    inputSchema: GenerateProblemsInputSchema,
    outputSchema: GenerateProblemsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Failed to generate problems.');
    return output;
  }
);
