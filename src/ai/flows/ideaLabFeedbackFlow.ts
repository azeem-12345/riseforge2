'use server';
/**
 * @fileOverview Provides AI-powered feedback and suggestions for submitted business ideas.
 *
 * - ideaLabFeedback - A function that generates feedback for a business idea.
 * - IdeaLabFeedbackInput - The input type for the ideaLabFeedback function.
 * - IdeaLabFeedbackOutput - The return type for the ideaLabFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdeaLabFeedbackInputSchema = z.object({
  problem: z
    .string()
    .describe("The core problem the business idea aims to solve."),
  targetAudience: z
    .string()
    .describe("The specific group of people the business idea is designed for."),
  solution: z
    .string()
    .describe("The proposed solution or product/service of the business idea."),
  revenueModel: z
    .string()
    .describe("How the business idea plans to generate revenue."),
});
export type IdeaLabFeedbackInput = z.infer<typeof IdeaLabFeedbackInputSchema>;

const IdeaLabFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe("Encouraging and constructive overall feedback on the business idea."),
  suggestions: z
    .array(z.string())
    .describe("A list of specific improvement suggestions for the business idea."),
  nextStepsPrompts: z
    .array(z.string())
    .describe("Smart prompts for the user to consider for their next steps or further development."),
});
export type IdeaLabFeedbackOutput = z.infer<typeof IdeaLabFeedbackOutputSchema>;

export async function ideaLabFeedback(
  input: IdeaLabFeedbackInput
): Promise<IdeaLabFeedbackOutput> {
  return ideaLabFeedbackFlow(input);
}

const ideaLabFeedbackPrompt = ai.definePrompt({
  name: 'ideaLabFeedbackPrompt',
  input: {schema: IdeaLabFeedbackInputSchema},
  output: {schema: IdeaLabFeedbackOutputSchema},
  prompt: `You are an experienced and encouraging business mentor and startup advisor.
Your goal is to provide insightful, constructive feedback and actionable suggestions to an entrepreneur on their business idea.

Here is the business idea:

Problem: {{{problem}}}
Target Audience: {{{targetAudience}}}
Solution: {{{solution}}}
Revenue Model: {{{revenueModel}}}

Based on the details provided, please provide:
1.  **Encouraging Feedback**: Start with positive reinforcement, then offer constructive criticism in a supportive tone.
2.  **Improvement Suggestions**: Provide 2-3 concrete and actionable suggestions to strengthen the idea, covering areas like clarity, market fit, differentiation, or feasibility.
3.  **Smart Prompts for Next Steps**: Ask 2-3 thought-provoking questions or suggest specific research/action items to guide the entrepreneur's next steps in refining their idea.

Ensure your response is clear, concise, and professional, avoiding jargon where possible.`,
});

const ideaLabFeedbackFlow = ai.defineFlow(
  {
    name: 'ideaLabFeedbackFlow',
    inputSchema: IdeaLabFeedbackInputSchema,
    outputSchema: IdeaLabFeedbackOutputSchema,
  },
  async input => {
    const {output} = await ideaLabFeedbackPrompt(input);
    if (!output) {
      throw new Error('Failed to get feedback from the AI model.');
    }
    return output;
  }
);
