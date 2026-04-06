'use server';
/**
 * @fileOverview A Genkit flow for evaluating user submissions for the Challenge Arena missions.
 *
 * - evaluateMissionSubmission - Analyzes user evidence for effort and relevance.
 * - EvaluateMissionInput - The input type for evaluation.
 * - EvaluateMissionOutput - The return type for evaluation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EvaluateMissionInputSchema = z.object({
  missionTitle: z.string().describe('The title of the challenge.'),
  missionGoal: z.string().describe('The core objective of the challenge.'),
  submissionText: z.string().describe('The user\'s provided evidence or action report.'),
});
export type EvaluateMissionInput = z.infer<typeof EvaluateMissionInputSchema>;

const EvaluateMissionOutputSchema = z.object({
  isSuccess: z.boolean().describe('Whether the submission is valid and shows sufficient effort.'),
  feedback: z.string().describe('Feedback on why the mission passed or failed.'),
  authenticityScore: z.number().min(0).max(100).describe('A score representing the depth and realism of the report.'),
});
export type EvaluateMissionOutput = z.infer<typeof EvaluateMissionOutputSchema>;

export async function evaluateMissionSubmission(
  input: EvaluateMissionInput
): Promise<EvaluateMissionOutput> {
  return evaluateMissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateMissionPrompt',
  input: { schema: EvaluateMissionInputSchema },
  output: { schema: EvaluateMissionOutputSchema },
  prompt: `You are the RiseForge Mission Verifier, an elite AI gatekeeper for entrepreneurial excellence.
Your task is to evaluate a founder's "Action Report" for a specific mission.

MISSION CONTEXT:
Title: {{{missionTitle}}}
Goal: {{{missionGoal}}}

USER SUBMISSION:
"{{{submissionText}}}"

CRITERIA FOR SUCCESS:
1. RELEVANCE: Does the text actually address the mission goal?
2. EFFORT: Is the text longer than just a few words? Does it contain specific details, metrics, or logical steps?
3. AUTHENTICITY: Reject gibberish (e.g., "asdfghjkl", "hdhdvdbd"), repetitive characters, or generic "done" messages.

If the submission is low-effort, irrelevant, or gibberish, set isSuccess to false and provide constructive but firm feedback. If it shows real strategic thought, set isSuccess to true.

Output your evaluation in the requested JSON format.`,
});

const evaluateMissionFlow = ai.defineFlow(
  {
    name: 'evaluateMissionFlow',
    inputSchema: EvaluateMissionInputSchema,
    outputSchema: EvaluateMissionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Failed to verify mission.');
    return output;
  }
);
