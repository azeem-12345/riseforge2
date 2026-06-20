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
  isSimulated: z.boolean().optional().describe('Indicates if this advice is locally simulated due to missing API keys.'),
});
export type MentorOutput = z.infer<typeof MentorOutputSchema>;

function generateProceduralAdvice(userQuestion: string, levelTitle: string): MentorOutput {
  const query = userQuestion.toLowerCase();
  
  // 1. Identify matched topics
  const matches: string[] = [];
  if (/price|pricing|cost|charge|fee|money|expensive|revenue|monetize/i.test(query)) matches.push("pricing");
  if (/mvp|build|product|features|launch|prototype|app|code|software/i.test(query)) matches.push("mvp");
  if (/market|niche|size|customer|target|competitor|competition|brand/i.test(query)) matches.push("market");
  if (/conflict|co-founder|partner|team|share|equity|founder|hiring|hire|recruit/i.test(query)) matches.push("team");
  if (/adopter|early|user|finding|get|growth|sales|traffic|acquire/i.test(query)) matches.push("sales");
  if (/funding|investor|raise|capital|pitch|deck|vc|angel|seed/i.test(query)) matches.push("funding");
  if (/legal|incorporate|llc|patent|trademark|contract|agreement/i.test(query)) matches.push("legal");

  const topic = matches[0] || "general";

  // 2. Define dynamic sentence pools for high-fidelity combinatorics
  const openings = [
    `As a founder at the stage of ${levelTitle}, you must realize that`,
    "Here is the hard truth about your question:",
    "Looking closely at your situation,",
    "My strategic recommendation for you is straightforward:",
    "In the early days of any high-growth venture,"
  ];

  const pricingAdvice = [
    "underpricing is a silent startup killer. Do not use cost-plus pricing. Your price is a strong signal of your product's positioning and value.",
    "pricing is a positioning tool, not an accounting exercise. Charge a premium to filter for high-intent early adopters who will give you quality feedback.",
    "most founders charge too little because they lack confidence. Double your price today; if nobody complains, you are still underpricing."
  ];

  const mvpAdvice = [
    "your MVP is a process to answer a critical business question, not a feature-complete product. Strip out 80% of what you planned to build.",
    "speed to market and direct customer feedback beat code perfection every single time. Launch your MVP before you feel ready.",
    "do not write code if you can validate the demand manually. Build a landing page, sell the vision, and handle the backend operations by hand."
  ];

  const marketAdvice = [
    "you must dominate a tiny, highly specific niche before trying to expand. Build a product that 100 people absolutely love rather than 10,000 who just find it okay.",
    "trying to sell to everyone means you sell to no one. Narrow down your Ideal Customer Profile (ICP) until your value proposition is undeniable.",
    "ignore large competitor footprints. Target the neglected, underserved sub-segment where competitors are too slow to innovate."
  ];

  const teamAdvice = [
    "co-founder misalignment is the leading cause of early-stage startup mortality. Have the hard conversations about roles, equity vesting, and goals immediately.",
    "equity splits should never be 50/50 without a 4-year vesting schedule and a 1-year cliff. Protect the company's cap table at all costs.",
    "hire for alignment on values and diversity of skills. Keep your team lean; every early hire sets the cultural DNA for the next 50 people."
  ];

  const salesAdvice = [
    "early traction does not come from paid ads or automated cold emails. Go out and find your first 10 customers manually through unscalable relationships.",
    "focus on solving a burning, immediate pain for 10 people first. Solve it manually, verify their willingness to pay, and then seek scalability.",
    "stop focusing on vanity metrics like landing page traffic. Look for deep usage, retention, and qualitative user delight."
  ];

  const fundingAdvice = [
    "raising capital is not a milestone of success; it is an obligation of future growth. Focus on building a cash-flowing machine first.",
    "investors fund moving trains, not static ideas. Show weekly traction before you step foot in a pitch meeting.",
    "treat fundraising like a structured sales pipeline. Run a tight, time-boxed process rather than drag-along chats."
  ];

  const legalAdvice = [
    "do not overcomplicate your early legal structure. Keep it simple, transparent, and standard so it does not block future investment round closings.",
    "protect your intellectual property and sign clear founder IP assignment agreements on day one to prevent future disputes.",
    "do not let trademark searches and patents slow down your launch. Customer validation is your ultimate protection."
  ];

  const generalAdvice = [
    "startups fail because they build something nobody wants or run out of cash. Prioritize validated learning above all active tasks.",
    "mistaking speed for direction is a common trap. Constantly measure whether your activities are moving you closer to product-market fit.",
    "keep your operating burn rate as close to zero as possible. Runway equals time to experiment and pivot."
  ];

  // Pick random element
  const rand = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  let selectedAdvice = "";
  let steps: string[] = [];
  let insight = "";
  let risk = "";

  if (topic === "pricing") {
    selectedAdvice = rand(openings) + " " + rand(pricingAdvice);
    steps = [
      "Conduct 5 discovery calls focusing on the financial impact of the pain point.",
      "Package your MVP with premium concierge onboarding to justify a higher price point.",
      "Formulate a value-based pricing tier that captures 15% of the saved costs or new revenue."
    ];
    insight = "If you are not embarrassed by your pricing, you started too cheap.";
    risk = "Underpricing attracts low-commitment users who complain the most and give the worst feedback.";
  } else if (topic === "mvp") {
    selectedAdvice = rand(openings) + " " + rand(mvpAdvice);
    steps = [
      "Write down the single core value proposition of your product.",
      "Remove all features except the absolute minimum required to deliver that value.",
      "Build a simple mockup or Wizard-of-Oz workflow to test the workflow within 3 days."
    ];
    insight = "If you are not embarrassed by the first version of your product, you shipped too late.";
    risk = "Building in isolation creates products looking for a problem. Launch early to survive.";
  } else if (topic === "market") {
    selectedAdvice = rand(openings) + " " + rand(marketAdvice);
    steps = [
      "Define your Ideal Customer Profile (ICP) down to their specific job title and software stack.",
      "Identify the top 3 communities where this niche customer hangs out.",
      "Draft a hyper-focused landing page messaging tailored solely to this persona."
    ];
    insight = "The riches are in the niches. Dominate a small pond before moving to the ocean.";
    risk = "Broad messaging resonates with nobody. Focus your fire to break through the noise.";
  } else if (topic === "team") {
    selectedAdvice = rand(openings) + " " + rand(teamAdvice);
    steps = [
      "Put all founders on a standard 4-year vesting schedule with a 1-year cliff.",
      "Document clear ownership domains (e.g., who makes final product vs marketing calls).",
      "Establish a weekly team health check to surface unspoken friction."
    ];
    insight = "Trust is built in drops and lost in buckets. Align incentives, not just hopes.";
    risk = "Equal splits without vesting lead to dead equity blocks when a founder leaves early.";
  } else if (topic === "sales") {
    selectedAdvice = rand(openings) + " " + rand(salesAdvice);
    steps = [
      "Find 15 potential early adopters on LinkedIn or specialized forums.",
      "Send a non-sales request asking for advice on how they handle their current problem.",
      "Manually onboard your first 3 users and watch them use the tool live."
    ];
    insight = "Do things that don't scale. Build relationships before you build automations.";
    risk = "Vanity metrics hide low retention. Focus on intense usage from a few, not casual visits from many.";
  } else if (topic === "funding") {
    selectedAdvice = rand(openings) + " " + rand(fundingAdvice);
    steps = [
      "Draft a 1-page executive summary highlighting traction metrics rather than visions.",
      "Build a target list of 20 angel investors or VCs who invest in your specific sector.",
      "Refine your pitch deck to focus on problem validation evidence."
    ];
    insight = "Raise money when you have traction, not when you have a slides deck.";
    risk = "Fundraising is a full-time distraction. Do not let it kill your product momentum.";
  } else if (topic === "legal") {
    selectedAdvice = rand(openings) + " " + rand(legalAdvice);
    steps = [
      "Use standard templates (like YC Clerky or Stripe Atlas) to incorporate.",
      "Ensure all founders sign an Intellectual Property (IP) assignment agreement on day one.",
      "Draft simple, standard Terms of Service and Privacy Policy for launch."
    ];
    insight = "Keep it simple. Clean corporate governance is the best legal protection.";
    risk = "Custom, complex legal setups early on create massive clean-up bills during due diligence.";
  } else {
    selectedAdvice = rand(openings) + " " + rand(generalAdvice);
    steps = [
      "Identify your top 3 unproven assumptions about your business model.",
      "Run a rapid test or experiment to validate demand for each assumption.",
      "Keep your fixed monthly burn rate as close to zero as possible."
    ];
    insight = "Execution is the only strategy the market respects. Get back to work.";
    risk = "Mistaking busywork (logos, office spaces, setups) for progress is the ultimate founder trap.";
  }

  return {
    advice: selectedAdvice,
    actionSteps: steps,
    philosophicalInsight: insight,
    riskAssessment: risk,
    isSimulated: true
  };
}

export async function founderMentor(input: MentorInput): Promise<MentorOutput> {
  return founderMentorFlow(input);
}

const mentorPrompt = ai.definePrompt({
  name: 'founderMentorPrompt',
  model: 'googleai/gemini-2.5-pro',
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
5. Set isSimulated to false.

Ensure the "philosophicalInsight" feels like something a legendary founder would say in a private boardroom.`,
});

const founderMentorFlow = ai.defineFlow(
  {
    name: 'founderMentorFlow',
    inputSchema: MentorInputSchema,
    outputSchema: MentorOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await mentorPrompt(input);
      if (!output) throw new Error('Mentor failed to respond: Empty output');
      return {
        ...output,
        isSimulated: false
      };
    } catch (e) {
      console.warn("Genkit AI Mentor failed, using high-quality procedural fallback. Error:", e);
      return generateProceduralAdvice(input.userQuestion, input.levelTitle);
    }
  }
);
