'use server';
/**
 * @fileOverview AI Simulation Feedback Flow.
 * 
 * - provides a summary of a founder's performance in a business simulation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimulationFeedbackInputSchema = z.object({
  industry: z.string(),
  finalValuation: z.number(),
  decisions: z.array(z.object({
    phase: z.string(),
    choice: z.string(),
    outcome: z.string()
  })),
  finalStatus: z.string(),
});
export type SimulationFeedbackInput = z.infer<typeof SimulationFeedbackInputSchema>;

const SimulationFeedbackOutputSchema = z.object({
  biggestStrength: z.string().describe('The most positive strategic trait identified.'),
  biggestMistake: z.string().describe('A critical tactical error or missed opportunity.'),
  riskProfile: z.string().describe('Analysis of the user\'s risk-taking behavior.'),
  strategicAdvice: z.string().describe('High-level advice for the next venture.'),
  skillImpactSummary: z.string().describe('How these decisions shaped the founder\'s cognitive skills.')
});
export type SimulationFeedbackOutput = z.infer<typeof SimulationFeedbackOutputSchema>;

export async function getSimulationFeedback(input: SimulationFeedbackInput): Promise<SimulationFeedbackOutput> {
  return simulationFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulationFeedbackPrompt',
  input: { schema: SimulationFeedbackInputSchema },
  output: { schema: SimulationFeedbackOutputSchema },
  prompt: `You are the RiseForge Simulation Auditor. Analyze the founder's performance in their recent business venture.

Context:
Industry: {{{industry}}}
Final Status: {{{finalStatus}}}
Final Valuation: {{{finalValuation}}}

Decisions Log:
{{#each decisions}}
Phase: {{{this.phase}}}
Decision: {{{this.choice}}}
Result: {{{this.outcome}}}
{{/each}}

Provide a surgical, direct, and professional analysis of their performance. Avoid generic praise. Focus on pattern recognition in their decision-making.`,
});

const simulationFeedbackFlow = ai.defineFlow(
  {
    name: 'simulationFeedbackFlow',
    inputSchema: SimulationFeedbackInputSchema,
    outputSchema: SimulationFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Failed to generate simulation audit.');
    return output;
  }
);
