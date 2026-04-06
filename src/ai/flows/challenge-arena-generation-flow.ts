'use server';
/**
 * @fileOverview A Genkit flow for generating personalized weekly missions for the Challenge Arena.
 *
 * - generateChallengeArenaMission - A function that handles the generation of a personalized entrepreneurial mission.
 * - ChallengeArenaGenerationInput - The input type for the generateChallengeArenaMission function.
 * - ChallengeArenaGenerationOutput - The return type for the generateChallengeArenaMission function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChallengeArenaGenerationInputSchema = z.object({
  playerLevel: z
    .enum(['Explorer', 'Builder', 'Creator', 'Innovator', 'Visionary', 'Gamechanger'])
    .describe('The current level of the player.'),
  unlockedSkills: z.array(z.string()).describe('A list of skills the player has already unlocked.'),
  completedLessons: z.array(z.string()).describe('A list of lessons the player has completed.'),
  currentStreak: z.number().int().min(0).describe('The player\'s current consecutive challenge completion streak.'),
  interests: z.array(z.string()).describe('A list of the player\'s stated interests from onboarding.'),
});
export type ChallengeArenaGenerationInput = z.infer<typeof ChallengeArenaGenerationInputSchema>;

const ChallengeArenaGenerationOutputSchema = z.object({
  title: z.string().describe('A catchy and engaging title for the challenge.'),
  description: z.string().describe('A detailed, quest-like description of the mission, including steps to complete it.'),
  xpReward: z.number().int().min(10).describe('The amount of XP awarded upon successful completion of the challenge.'),
  badgeReward: z.array(z.string()).describe('A list of badges (e.g., name of badge) awarded for completing the challenge. Can be empty.'),
  associatedSkills: z.array(z.string()).describe('A list of skills (e.g., \'Critical Thinking\', \'Opportunity Spotting\') that this challenge helps to develop or test.'),
  challengeGoal: z.string().describe('A concise, measurable goal for the player to achieve.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The estimated difficulty level of the challenge.'),
  estimatedCompletionTimeHours: z.number().min(0.5).max(48).describe('The estimated time in hours required to complete the challenge.'),
  theme: z.string().describe('A theme or category for the challenge, e.g., \'Market Research\', \'Idea Validation\', \'Problem Solving\'.'),
});
export type ChallengeArenaGenerationOutput = z.infer<typeof ChallengeArenaGenerationOutputSchema>;

export async function generateChallengeArenaMission(
  input: ChallengeArenaGenerationInput
): Promise<ChallengeArenaGenerationOutput> {
  return challengeArenaGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'challengeArenaGenerationPrompt',
  input: { schema: ChallengeArenaGenerationInputSchema },
  output: { schema: ChallengeArenaGenerationOutputSchema },
  prompt: `You are an AI game master for RiseForge, an entrepreneurial growth game. Your task is to generate a personalized and engaging weekly mission for a player in the Challenge Arena.

The challenge should feel like a quest, be relevant to entrepreneurship, and be tailored to the player's current progress and interests. Emphasize real-world application and problem-solving.

Here is the player's current information:
- Player Level: {{{playerLevel}}}
- Unlocked Skills: {{#each unlockedSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Completed Lessons: {{#each completedLessons}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Current Streak: {{{currentStreak}}}
- Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Consider the player's level to adjust complexity, unlocked skills to build upon their strengths or introduce new challenges in areas they might be ready for, and completed lessons to ensure the challenge is not repetitive and advances their learning.
If the player has a high streak, suggest a challenge that helps them maintain or extend it, perhaps with a slightly higher reward.
Integrate their interests to make the challenge more personal and motivating.

Generate a single, coherent challenge following the provided JSON schema.
`,
});

const challengeArenaGenerationFlow = ai.defineFlow(
  {
    name: 'challengeArenaGenerationFlow',
    inputSchema: ChallengeArenaGenerationInputSchema,
    outputSchema: ChallengeArenaGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
