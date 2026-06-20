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

// Global geographic list for procedural fallback (making combinations look infinite)
const REGIONS = [
  "Tokyo, Japan", "São Paulo, Brazil", "Lagos, Nigeria", "Berlin, Germany", 
  "Mumbai, India", "Nairobi, Kenya", "New York, USA", "Sydney, Australia", 
  "London, UK", "Cairo, Egypt", "Jakarta, Indonesia", "Seoul, South Korea",
  "Mexico City, Mexico", "Cape Town, South Africa", "Toronto, Canada",
  "Singapore", "Paris, France", "Manila, Philippines", "Bangkok, Thailand",
  "Bogotá, Colombia"
];

const SEGMENTS = [
  "Local Street Food Vendors", "Independent Cafe Owners", "Freelance Designers", 
  "Elderly Residents", "First-Time Apartment Renters", "Pet Owners", 
  "Bicycle Commuters", "Micro-bakery Owners", "College Students", 
  "Working Parents", "Home Gardeners", "Eco-conscious Consumers",
  "Gym Instructors", "Independent Bookstores", "Carpenters & Tradespeople",
  "Micro-farmers", "App Developers", "Coffee Shop Owners", "Boutique Retailers"
];

const PAINS = [
  {
    title: "Produce Waste",
    intensity: "High" as const,
    description: "struggles to predict fresh food and inventory decay rates, leading to heavy waste of daily profits.",
    potential: "A lightweight mobile inventory forecaster predicting shelf life based on temperature and weekly foot-traffic."
  },
  {
    title: "Tool Tracking",
    intensity: "Medium" as const,
    description: "loses track of expensive physical equipment and tools loaned out to team members or subcontractors.",
    potential: "An NFC/QR-based check-in app for workshops that alerts owners when tools are unreturned after 24h."
  },
  {
    title: "Deposit Collections",
    intensity: "Medium" as const,
    description: "forgets to redeem container deposit values because manual return stations are too far or time-consuming.",
    potential: "A neighborhood collector network where users request home pick-ups of recyclables in exchange for split credits."
  },
  {
    title: "Elderly Medication Alert",
    intensity: "High" as const,
    description: "forgets to take daily prescription pills or struggles to recall whether they already swallowed them.",
    potential: "A simple cellular smart pillcap companion that blinks red and sends a SMS if not unscrewed at daily scheduled times."
  },
  {
    title: "Multi-Currency Invoicing",
    intensity: "High" as const,
    description: "struggles to calculate and declare freelance income received across multiple foreign currencies for taxation.",
    potential: "A single-click invoice converter that logs exchange rates in real-time and exports tax-compliant ledgers."
  },
  {
    title: "Babysitting Verification",
    intensity: "High" as const,
    description: "struggles to find verified, trusted child care on short notice during sudden working hours or emergencies.",
    potential: "A localized peer-to-peer verification circle where neighbors co-sign and recommend trusted babysitters."
  },
  {
    title: "Plant Moisture Balance",
    intensity: "Medium" as const,
    description: "struggles to keep delicate indoor house plants alive due to over-watering or under-watering while traveling.",
    potential: "A solar-powered clay insert that tracks moisture levels and sends simple alert emails when dry."
  },
  {
    title: "Lost Product Warranties",
    intensity: "Medium" as const,
    description: "loses physical paper receipts and warranty documents, preventing repair requests when devices break down.",
    potential: "A digital receipt scanner app that tracks warranty expiration dates and auto-generates support claims."
  },
  {
    title: "Group Study Schedules",
    intensity: "Medium" as const,
    description: "struggles to coordinate meeting times for team projects across scattered work schedules and classes.",
    potential: "A calendar sync utility that highlights overlapping free slots without revealing private calendar details."
  },
  {
    title: "Salary Transparency Gap",
    intensity: "High" as const,
    description: "cannot determine fair market rates for specialized freelance tasks without relying on outdated aggregate sites.",
    potential: "An anonymous salary-sharing board for specific geographic niches, verified by redacting invoice uploads."
  },
  {
    title: "Package Delay Losses",
    intensity: "High" as const,
    description: "loses customers to international giants because shipping packages within the country takes over 5 days.",
    potential: "A local hub-and-spoke fulfillment system using idle storage rooms in local small businesses."
  },
  {
    title: "Dog Walking Scheduling",
    intensity: "Medium" as const,
    description: "struggles to find trusted pet walkers who can check in on pets during sudden overtime work hours.",
    potential: "A dynamic local on-demand pet check-in app with GPS tracking and door photo verification."
  },
  {
    title: "Street Food Hygiene Scores",
    intensity: "High" as const,
    description: "loses sales because customers are hesitant to buy due to a lack of visible hygiene compliance indicators.",
    potential: "A QR-based public feedback ledger where vendors scan raw ingredient sources for transparency."
  }
];

function generateProceduralProblems(count: number): GenerateProblemsOutput {
  const shuffledRegions = [...REGIONS].sort(() => 0.5 - Math.random());
  const shuffledSegments = [...SEGMENTS].sort(() => 0.5 - Math.random());
  const shuffledPains = [...PAINS].sort(() => 0.5 - Math.random());

  const problems = [];
  for (let i = 0; i < count; i++) {
    const region = shuffledRegions[i % shuffledRegions.length];
    const segment = shuffledSegments[i % shuffledSegments.length];
    const pain = shuffledPains[i % shuffledPains.length];

    problems.push({
      id: `gen-mock-${i}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `${pain.title} in ${region.split(',')[0]}`,
      segment: `${segment} (${region})`,
      intensity: pain.intensity,
      description: `${segment} in ${region} ${pain.description}`,
      potential: pain.potential
    });
  }
  return { problems };
}

export async function generateMarketProblems(
  input: GenerateProblemsInput
): Promise<GenerateProblemsOutput> {
  return generateProblemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProblemsPrompt',
  model: 'googleai/gemini-2.5-pro',
  input: { schema: GenerateProblemsInputSchema },
  output: { schema: GenerateProblemsOutputSchema },
  prompt: `You are the RiseForge Problem Scout. Your job is to identify high-specificity, real-world struggles or "pains" that real demographics or businesses face today in different parts of the world.

Avoid generic, high-level AI tropes (like "people want to be happy" or "climate change is bad"). Instead, focus on narrow, relatable, and concrete daily problems in specific global cities/regions (e.g. Tokyo, Lagos, São Paulo, Mumbai, Berlin, London, New York).

Generate {{{count}}} unique, realistic, and highly relatable struggles from different parts of the world. For each struggle, provide:
1. A short, catchy, professional title describing the pain and mentioning or localizing the struggle.
2. A specific demographic or sector segment localized to a region (e.g., "Street Food Vendors (Mumbai)", "Apartment Renters (Berlin)", "Freelancers (Tokyo)").
3. A pain level (Medium or High).
4. A simple, detailed explanation of what is actually hard for them and why it causes friction (max 25 words).
5. A realistic, commercially viable product/service concept that could solve this.

Ensure the struggles feel authentic, urgent, and inspire solid business ideas.`,
});

const generateProblemsFlow = ai.defineFlow(
  {
    name: 'generateProblemsFlow',
    inputSchema: GenerateProblemsInputSchema,
    outputSchema: GenerateProblemsOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output || !output.problems || output.problems.length === 0) {
        throw new Error('Failed to generate problems: Empty output');
      }
      return output;
    } catch (e) {
      console.warn("Genkit AI generation failed, using infinite procedural fallback. Error:", e);
      return generateProceduralProblems(input.count);
    }
  }
);
