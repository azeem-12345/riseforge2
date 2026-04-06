'use server';
/**
 * @fileOverview AI Founder Mentor flow.
 *
 * - founderMentor - Personalized mentorship based on user level.
 * - MentorInput - The input type for the mentor.
 * - MentorOutput - The return type for the mentor.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MentorInputSchema = z.object({
  userQuestion: z.string().describe('The question or dilemma the founder is facing.'),
  level: z.number(),
  levelTitle: z.string(),
});
export type MentorInput = z.infer<typeof MentorInputSchema>;

const MentorOutputSchema = z.object({
  advice: z.string().describe('The primary strategic advice provided by the mentor.'),
  actionSteps: z.array(z.string()).describe('Concrete, actionable steps for the founder to take.'),
  philosophicalInsight: z.string().describe('A deeper, mindset-shifting insight inspired by world-class founders.'),
  riskAssessment: z.string().describe('A specific warning or assessment of risks involved.'),
});
export type MentorOutput = z.infer<typeof MentorOutputSchema>;

export async function founderMentor(input: MentorInput): Promise<MentorOutput> {
  return founderMentorFlow(input);
}

const mentorPrompt = ai.definePrompt({
  name: 'founderMentorPrompt',
  input: { schema: MentorInputSchema },
  output: { schema: MentorOutputSchema },
  prompt: `You are the RiseForge Master Mentor, an elite AI advisor inspired by the strategic depth of Ratan Tata, the audacity of Elon Musk, and the psychological precision of top executive coaches.

Current Founder Profile:
- Level: {{{level}}} ({{{levelTitle}}})

The founder is facing this dilemma:
"{{{userQuestion}}}"

Your mission:
1. Provide advice that addresses their current hurdle with surgical precision.
2. Be direct, authoritative, yet encouraging.
3. Avoid generic business platitudes. Give "hard truths" when necessary.
4. Structure your response according to the schema.

Ensure the "philosophicalInsight" feels like something a legendary founder would say in a private boardroom.`,
});

const founderMentorFlow = ai.defineFlow(
  {
    name: 'founderMentorFlow',
    inputSchema: MentorInputSchema,
    outputSchema: MentorOutputSchema,
  },
  async (input) => {
    const { output } = await mentorPrompt(input);
    if (!output) throw new Error('Mentor failed to respond.');
    return output;
  }
);
