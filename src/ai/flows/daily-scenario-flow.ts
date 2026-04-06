
'use server';
/**
 * @fileOverview A Genkit flow for generating daily high-impact entrepreneurship scenarios.
 * 
 * - generateDailyScenario - Generates a tactical dilemma with multiple choices.
 * - DailyScenarioInput - Input for scenario generation.
 * - DailyScenarioOutput - The generated scenario and consequences.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DailyScenarioInputSchema = z.object({
  level: z.number(),
  founderStage: z.string().describe('The current stage of the founder (e.g., Dreamer, Builder).'),
});
export type DailyScenarioInput = z.infer<typeof DailyScenarioInputSchema>;

const DailyScenarioOutputSchema = z.object({
  title: z.string().describe('Short, punchy title.'),
  scenario: z.string().describe('The dilemma text, max 200 chars.'),
  options: z.array(z.object({
    id: z.string(),
    label: z.string().describe('The action text.'),
    consequence: z.string().describe('What happens immediately after.'),
    impact: z.object({
      xp: z.number(),
      revenue: z.number(),
      investorConfidence: z.number(),
      brandReputation: z.number(),
      strategicThinking: z.number().optional(),
    }),
  })).min(2).max(3),
});
export type DailyScenarioOutput = z.infer<typeof DailyScenarioOutputSchema>;

export async function generateDailyScenario(input: DailyScenarioInput): Promise<DailyScenarioOutput> {
  return dailyScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyScenarioPrompt',
  input: { schema: DailyScenarioInputSchema },
  output: { schema: DailyScenarioOutputSchema },
  prompt: `You are the RiseForge Scenario Architect. Create a high-stakes, 30-second decision for a founder.

Founder Profile:
- Level: {{{level}}}
- Stage: {{{founderStage}}}

The scenario should be a "hard choice" where every option has a trade-off.
For example: High growth vs. Burn rate, or Team morale vs. Speed.

Options must include specific numerical impacts for:
- XP (10-100)
- Revenue (-500 to 2000)
- Investor Confidence (-10 to 15)
- Brand Reputation (-10 to 15)
- Strategic Thinking (0-5)

Ensure the language is direct and intense, fitting for a "God-Level" startup engine.`,
});

const dailyScenarioFlow = ai.defineFlow(
  {
    name: 'dailyScenarioFlow',
    inputSchema: DailyScenarioInputSchema,
    outputSchema: DailyScenarioOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Failed to generate scenario.');
    return output;
  }
);
