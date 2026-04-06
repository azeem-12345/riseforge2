'use server';
/**
 * @fileOverview A Genkit flow for evaluating startup pitches in the Pitch Arena.
 *
 * - evaluatePitch - Analyzes a startup pitch for clarity, market fit, and viability.
 * - PitchEvaluationInput - The input type for evaluation.
 * - PitchEvaluationOutput - The return type for evaluation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PitchEvaluationInputSchema = z.object({
  pitchText: z.string().describe('The founder\'s startup pitch or concept description.'),
});
export type PitchEvaluationInput = z.infer<typeof PitchEvaluationInputSchema>;

const PitchEvaluationOutputSchema = z.object({
  isSuccess: z.boolean().describe('Whether the pitch is a legitimate startup concept and not gibberish.'),
  score: z.number().min(0).max(100).describe('The overall strategic score of the pitch.'),
  clarity: z.number().min(0).max(100).describe('Score for how clear the problem and solution are.'),
  market: z.number().min(0).max(100).describe('Score for perceived market depth and target audience fit.'),
  viability: z.number().min(0).max(100).describe('Score for the business model and financial feasibility.'),
  feedback: z.string().describe('Constructive, high-level strategic feedback from an AI VC perspective.'),
});
export type PitchEvaluationOutput = z.infer<typeof PitchEvaluationOutputSchema>;

export async function evaluatePitch(input: PitchEvaluationInput): Promise<PitchEvaluationOutput> {
  return evaluatePitchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluatePitchPrompt',
  input: { schema: PitchEvaluationInputSchema },
  output: { schema: PitchEvaluationOutputSchema },
  prompt: `You are a Tier-1 Venture Capitalist AI auditor for RiseForge. Your mission is to evaluate a founder's "Elevator Pitch" with surgical precision.

FOUNDER TRANSMISSION:
"{{{pitchText}}}"

CRITICAL EVALUATION PROTOCOL:
1. AUTHENTICITY CHECK: Is this a real business idea? Reject strings like "dhevfudvd", "asdfghjkl", or random repetitive characters. If it is gibberish, set isSuccess to false and set all scores to 0.
2. CLARITY: Does the pitch define a clear problem and a proprietary solution?
3. MARKET: Is the target market significant or the niche well-defined?
4. VIABILITY: Does the revenue model or solution feel executable?

SCORING RULES:
- If isSuccess is false (gibberish/trash), feedback should be firm and state: "Transmission rejected. The Forge requires coherent strategic intent."
- If isSuccess is true, provide a score (60-95 for good ideas, 30-50 for weak ideas) and detailed feedback.

Output the evaluation in the requested JSON format.`,
});

const evaluatePitchFlow = ai.defineFlow(
  {
    name: 'evaluatePitchFlow',
    inputSchema: PitchEvaluationInputSchema,
    outputSchema: PitchEvaluationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Failed to audit pitch.');
    return output;
  }
);
