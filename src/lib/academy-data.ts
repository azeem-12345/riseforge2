
/**
 * @fileOverview The RiseForge Founder Academy Data Library.
 * Contains long-form premium theory content for the 52-week curriculum.
 */

export interface AcademyWeek {
  id: string;
  level: number;
  week: number;
  title: string;
  objective: string;
  theory: string;
  examples: string[];
  scenario: {
    title:string;
    description: string;
    options: {
      id: string;
      label: string;
      feedback: string;
      impact: {
        reputation?: number;
        xp?: number;
        skills?: string[];
      };
    }[];
  };
  vocabulary: { word: string; definition: string }[];
  mistakes: string[];
  simulationIntegration: {
    featureUnlock: string;
    decision: string;
    logic: string;
    unlockKey?: string;
  };
  summary: string;
  xpReward: number;
}

export const ACADEMY_CONTENT: Record<string, AcademyWeek> = {
  'week-1': {
    id: 'week-1',
    level: 1,
    week: 1,
    title: 'How to Start a Startup',
    objective: 'Understand the four core pillars of startup success: Idea, Product, Team, and Execution.',
    theory: `!!IMAGE:founder-vision!!

## How to Start a Startup
Startups are distinct from traditional companies; qualities like being poor and unknown can be advantageous.

## Overview of Four Key Success Areas
Success depends on four factors:
- **Great idea**
- **Great product**
- **Great team**
- **Great execution**
These factors overlap but are discussed separately for clarity.
Outcome roughly equals: **idea × product × execution × team × luck**, with luck being a highly variable factor.
!!IMAGE:startup-formula!!
Startups offer a relatively level playing field where both young/inexperienced and older/experienced individuals can succeed.

## Why Start a Startup?
Sam cautions that starting a startup is **not an easy path to wealth**; it is hard and painful.
One should start a startup only if **compelled by a specific problem** and believe a startup is the best way to solve it. Passion for the problem must come first.
The biggest successes at YC have stemmed from this passion-driven approach.

## The First Key Area: A Great Idea
The current trend downplays the importance of ideas in favour of rapid experimentation and pivots; however, this has swung too far.
**Great execution is crucial but will not save a bad idea.**
Most successful startups start with a **great idea, not a random pivot**.
Examples like Airbnb show pivots happen from problems founders personally experienced, not random shifts.
The idea includes the **market size, growth potential, defensibility, and strategy**, not just the product itself.
Founders should invest time upfront **thinking deeply about the idea's long-term value and defensibility**. Although plans change, exercising planning is valuable.
The idea should be expandable and ambitious, a solid kernel rather than a fully mapped-out path to global dominance.

## Mission-Driven and Defensible Ideas
Startups should wait to begin until they find an idea they feel **compelled to explore deeply**.
When choosing between ideas, pick the one you think about most even when not working.
Best companies are **mission-oriented**, which helps attract and maintain extreme focus, productivity, and team dedication.
Long-term involvement (often a decade) requires **genuine belief and passion** to withstand hardships.
Mission-driven companies attract more external support and make it **easier to start a hard startup than an easy, derivative one**.
Derivative startups (copies with minor tweaks) rarely excite teams or succeed.

## Characteristics of Great Startup Ideas
Great ideas often **seem bad or unappealing at first** (e.g., Airbnb, Facebook, Pinterest).
The best ideas target a **small market where monopoly is achievable**, then expand rapidly.
!!IMAGE:market-dynamics!!
Founders need **conviction and willingness to ignore naysayers**.
Good ideas are usually **easy to explain in a sentence** and **significantly different or entirely new** rather than minor variations.
Startups should start by dominating a **small, specific market** and expand from there.
Market growth rate is **more important than current market size**; investors often overlook this.
Being a student provides an advantage in intuiting which markets will grow rapidly.
One cannot create a market where there is no demand; market validity is paramount.
Tailwinds such as technological trends (e.g., "software eating the world") create fertile ground for startups.
The question "**Why now?**" is critical — the timing must be right for the idea's success.

## Product Development: Building a Great Product
Product is broadly defined to include **customer support, communication, and all user interactions**.
Turning a great idea into a great product is hard but fun and crucial.
Founders must be **fanatical about building something users love**.
Until this is achieved, other tasks like fundraising, PR, hiring, and partnerships are secondary.
The goal is to create a product that a **small number of users love intensely rather than a large number who just like it somewhat**.
!!IMAGE:growth-graph!!
It is easier to scale from "a few people love it" to "many people love it" than the reverse.
**Organic growth through word of mouth is a strong indicator of product success**; reliance on partnerships or paid channels early on is a warning sign.
Great products lead to long-term growth and competitive advantage.
Startups should begin with something **simple and focused**, excelling at one thing rather than a complex feature set.
Examples: first Facebook, Google, and iPhone versions were simple but effective.
Founders must be **obsessed with product quality, details, and customer satisfaction**, often responding rapidly to issues even at odd hours.
Early users should be recruited **manually and carefully to provide frequent feedback** — avoid paid ads initially.
The feedback loop—collecting user input, making product improvements, and iterating rapidly—is essential and should be as tight as possible.
Metrics matter: focus on **active users, retention, revenue, and net promoter scores**, not vanity metrics like total registrations.
Growth is the key signal of product-market fit.

## Founders' Direct Involvement and Culture
Successful founders directly handle sales and customer support in the early days to maintain closeness to users.
Embedding a **user feedback culture** from the start is critical.
The startup's direction is shaped by what the CEO measures and prioritizes.
Building a great product is foundational; without it, everything else is unlikely to succeed.

## Dustin Moskovitz: Why You Should Start a Startup
Discusses common reasons people want to start startups: glamour, being the boss, flexibility, impact, and potential financial gain.
Warns against romanticized views popularized by movies and media.
Reality includes **hard work, stress, and significant responsibility**.
Entrepreneurs face **constant pressure and must always be on call** for issues, including at odd hours.
**Founder stress and mental health challenges are real and significant.**
Media attention can be both positive and intrusive; unwanted publicity can be harmful.
Commitment is deep and long-term; founders cannot easily quit without damaging their careers and teams.
The role requires managing conflicts, making difficult decisions, and often disappointing stakeholders.
Flexible schedules are often a myth; founders set the tone and must work hard to keep their teams motivated.
Small business entrepreneurship is different from scaling startups; the latter requires full-time, intense involvement.

## Financial and Impact Considerations
Moskovitz compares financial outcomes for employees at big companies (e.g., Facebook, Dropbox) versus startup founders.
Employees at large tech companies can make **tens or hundreds of millions** with equity if they join early.
Founders' equity is diluted, and financial outcomes depend heavily on execution and market size.
Example startups like "Uber for Pet Sitting" (~$100M valuation potential) and "Uber for Space Travel" (~$2B potential) illustrate different scales and risks.
Financial reward often correlates with world impact.
Impact can also be achieved by **working at large companies**, leveraging existing massive user bases and infrastructure.
Great products like Google Maps, Gmail Chat, and Facebook's Like button were developed by employees, not founders.
Deciding whether to start a company depends on whether you have a **unique, passionate idea you must pursue** and are the right person to do so.

## The Best Reason to Start a Startup
The key reason to start a startup is that **you can't not do it**: either you are so passionate you must pursue it, or the world needs you to.
Passion is essential for enduring the hardships and recruiting talent.
The world needing your idea means it has significant value and no one else is solving it adequately.
If you are not the right person for the problem, your time may be better spent elsewhere.
Dustin shares his experience with Asana, where passion for solving a real problem drove the decision to start the company.

## Conclusion
Founders should seek **ideas that compel them deeply**, have potential for impact, and are timed well.
Starting a startup is hard, stressful, and requires commitment but offers potential for enormous impact and reward.
    `,
    examples: [
      'Airbnb: A "bad idea" that became a global giant because founders solved their own problem.',
      'Facebook: Started as a simple directory for one school and dominated through focus.',
      'Asana: Born from a genuine passion for making work easier.'
    ],
    scenario: {
      title: 'The Core Focus',
      description: 'You have a simple product that 10 users love intensely. A big company offers a partnership to show your product to 10,000 people who will only "kind of" like it. What do you do?',
      options: [
        { 
          id: 'focus', 
          label: 'Stay focused on the 10 obsessed users', 
          feedback: 'Correct. It is much easier to scale from love to many than from like to love.',
          impact: { xp: 500, skills: ['strategicThinking'] }
        },
        { 
          id: 'scale', 
          label: 'Take the partnership for fast growth', 
          feedback: 'Dangerous. Scaling a product that users don\'t love often leads to high churn and failure.',
          impact: { xp: 100 }
        }
      ]
    },
    vocabulary: [
      { word: 'Executive Briefing', definition: 'A high-level document designed to provide key information quickly.' },
      { word: 'Tailwinds', definition: 'External factors or trends that help a business grow faster.' },
      { word: 'Net Promoter Score', definition: 'A metric used to measure customer recommendation likelihood.' }
    ],
    mistakes: [
      'Building for many users who "like" it instead of a few who "love" it.',
      'Starting for glamour instead of the mission.',
      'Relying on paid ads before achieving organic word-of-mouth growth.'
    ],
    simulationIntegration: {
      featureUnlock: 'Opportunity Awareness Mode',
      decision: 'Identify 10 problems in your daily life before building.',
      logic: 'You cannot solve what you do not observe.',
      unlockKey: 'opportunity-scanner'
    },
    summary: 'The first step to building a giant company is building a simple product that a small group of people absolutely cannot live without.',
    xpReward: 1000
  },
  'week-2': {
    id: 'week-2',
    level: 1,
    week: 2,
    title: 'Hiring and Execution',
    objective: 'Learn how to pick the right partners, hire your first employees, and execute with surgical focus.',
    theory: `
## Finding Fast-Growing Markets
Young people have an edge in spotting fast-growing markets. They use new technologies first and see trends among their peers.
Watch what you and your friends use every day. Think about what markets will grow big over the next 10 years.
Older people often guess wrong about future trends. Direct experience beats predictions.

## Dealing with Founder Burnout
Burnout happens to every founder. You must keep going even when you feel exhausted.
Unlike school, startup work never stops. Your responsibilities are real and constant.
Vacations usually don't fix founder burnout. Build a support network of trusted people.
Face problems directly. Solve them to get your energy back.

## Choosing Co-Founders
Your co-founders are your most important relationships. Early startup failures usually come from co-founder fights.
Don't pick co-founders randomly. Choose people you have known for years and trust completely.
Data shows startups that added random co-founders all failed within a year.
Best co-founders are friends with strong bonds. They stick together during hard times.
If you're not in college, work at good tech companies to meet potential co-founders.
No co-founder is better than a bad one. But solo founders face bigger challenges.
Top startups all had 2-3 founders. One founder is risky. Five is too many.

## Traits of Great Co-Founders and Early Hires
Look for people who are relentlessly resourceful. They solve problems no matter what.
Great co-founders stay calm under pressure, make fast decisions, think creatively, and stay tough.
Technical skills matter most for software startups. Non-technical founders need technical partners.
Intelligence is important, but toughness and calmness matter even more.
Early hires should be people you respect and enjoy working with every day.

## Smart Hiring Strategies
Hire as few people as possible early on. Only hire when you absolutely need help.
Bad early hires can destroy your startup. They cost too much and slow you down.
Spend months finding your first few hires. Make sure they believe in your mission completely.
Spend 25% of your time recruiting when you need people.
Don't hire mediocre people early. They ruin your culture.
Get referrals from people you trust. Look beyond just local talent pools.
Senior roles need experience. Early hires just need ability and commitment.

## How to Interview Candidates
Check three things:
1. Are they smart?
2. Do they get things done?
3. Do you want to work with them every day?
Test them with a small paid project before hiring.
Skip brain teaser questions. Ask about their past work in detail.
Always check references. Ask if they rank in the top 5% of people they've worked with.
Good communication skills predict success.
Look for risk-takers with extreme determination.

## Employee Equity and Retention
Give generous equity to early employees. About 10% total for your first 10 hires.
Equity motivates people and keeps them long-term. Spread it over 4 years.
Don't be stingy with employees but generous with investors. Get this backwards.
Keep good employees by:
- Giving mostly positive feedback
- Praising wins publicly
- Avoiding micromanagement
- Giving new challenges
- Offering freedom, clear goals, and purpose
Most founders start as bad managers. Work to get better.

## Firing Employees
Fire fast when someone consistently underperforms or acts toxic.
Toxic people destroy company culture. They must go.
Everyone makes mistakes. But patterns of failure need action.
Firing becomes obvious when you watch performance honestly.

## Co-Founder Equity Split
Decide equity splits in the first weeks.
Make splits nearly equal. Unequal splits show problems.
Use 4-year vesting that starts after year one.
Vesting protects you if someone leaves early.
Startups without vesting usually fail.

## Why Remote Co-Founders Don't Work Early
Don't start with co-founders in different cities.
Fast communication builds trust and speed. Video calls aren't enough.
Almost no successful startups began with remote co-founders.

## Execution Makes Startups Succeed
Execution matters more than ideas. Founders create the culture through their actions.
CEOs must show hard work, attention to detail, customer focus, and frugality every day.
CEO jobs include:
1. Setting the vision
2. Raising money
3. Selling the company to recruits and partners
4. Building and managing the team
5. Setting high execution standards
Execution means knowing what to do AND getting it done.

## Focus for Great Execution
Pick 2-3 key goals each day. Ignore or delegate everything else.
Skip unnecessary meetings and distractions.
Repeat your main company goals constantly to everyone.
Small miscommunications kill focus.

## Intensity Wins
Startups need total commitment. You can't do many hobbies too.
Working slightly harder than competitors creates huge advantages over time.
Small improvements multiply into massive results.
Be decisive. Act fast. Success comes from steady progress.
Respond instantly to important issues, even if it means travel.

## Keep Momentum Alive
Momentum keeps startups alive. Losing it kills motivation and people.
Create regular small wins. Track weekly progress with numbers.
When momentum fades, don't give big speeches. Deliver small successes.
Use customer feedback to settle arguments.
Ignore competitor press. Focus on your shipped product.

| What to Do | How to Do It |
|---|---|
| Co-founders | Long-term friends, equal equity, vesting |
| Early hires | Only when desperate need, test with projects |
| Interviews | Past work focus, references, work tests |
| Equity | 10% for first 10 employees, 4-year vesting |
| Retention | Praise publicly, autonomy, new challenges |
| Firing | Fast action on consistent failure or toxicity |

| Focus Area | Key Actions |
|---|---|
| Daily Work | 2-3 priorities only |
| Intensity | Outwork everyone slightly |
| Momentum | Weekly wins + metrics |
| Culture | Founders model perfect behavior |
| Decisions | Customer data over opinions |
    `,
    examples: [
      'Airbnb: Spent 5 months interviewing their first employee.',
      'Facebook: Modeled extreme intensity and speed in the early campus days.',
      'Stripe: Founders personally recruited and vetted every single early hire.'
    ],
    scenario: {
      title: 'The Toxic Talent',
      description: 'Your best developer is very fast but acts mean to everyone else and complains constantly. What do you do?',
      options: [
        { 
          id: 'keep', 
          label: 'Keep them for their skill', 
          feedback: 'Dangerous. A toxic person ruins the team culture faster than their code helps.',
          impact: { xp: 100 }
        },
        { 
          id: 'fire', 
          label: 'Fire them quickly', 
          feedback: 'Correct. Protecting the team culture is more important than any single person\'s output.',
          impact: { xp: 500, skills: ['leadership'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Vesting', definition: 'The process of earning shares of a company over time.' },
      { word: 'Relentlessly Resourceful', definition: 'Finding a way to solve a problem no matter the obstacles.' },
      { word: 'Bias towards Action', definition: 'The tendency to act and test things quickly rather than just talking.' }
    ],
    mistakes: [
      'Hiring a "random" co-founder without a long prior relationship.',
      'Waiting too long to fire toxic or underperforming people.',
      'Having too many daily priorities (more than 3).'
    ],
    simulationIntegration: {
      featureUnlock: 'High-Intensity Execution Mode',
      decision: 'Review your task list and delete everything except the top 3 goals.',
      logic: 'Focus is the only way to maintain momentum.',
      unlockKey: 'company'
    },
    summary: 'Execution is the result of hiring the right people and keeping them focused on a few small, winning goals every single day.',
    xpReward: 1000
  },
  'week-3': {
    id: 'week-3',
    level: 1,
    week: 3,
    title: 'Startups Are Counterintuitive',
    objective: 'Understand why startup building requires unlearning traditional habits and focusing on real user value.',
    theory: `
## Introduction
This course gives advice for young adults, especially those interested in startups. It treats startup building like learning to ski. Your first instincts are often wrong and dangerous.
You must unlearn natural habits and learn new ones. Pause before acting on gut feelings.

## Founders Ignore Good Advice
Counterintuitive advice feels wrong. Founders often dismiss it and regret later.
This creates cognitive dissonance. Natural instincts fail in unfamiliar startup terrain.
Trust your gut about people. Life experience helps here. Pick co-founders and team members you truly like and respect.
Never work with impressive but untrustworthy people.

## You Don't Need Startup Expertise
Startup success does not require prior startup experience.
Deep user understanding matters more. Focus on knowing your customers better than anyone.
Mechanics like raising money come later. Many great founders learn these on the job.
The real danger is "playing house." This means copying startup forms without substance. Examples include raising money early, renting fancy offices, or hiring friends before building a real product.
Education trains you to game systems. Startups have no system to game. Users judge you honestly.

## Stop Gaming the System
Founders seek tricks and growth hacks. This works from school or jobs but fails in startups.
Users cannot be fooled. There is no boss to impress.
Fake progress might fool investors short-term. It wastes time and kills your startup.
Build real growth and user value. That attracts funding naturally.
No shortcuts exist. This is hard but creates opportunity for honest builders.

## Startups Take Over Your Life
Successful startups consume your life for years.
They change you forever, like having kids.
Great founders face endless problems daily. They cannot take breaks.
Stress stays hidden. Winners rarely complain publicly.
Know the high cost before starting. Prepare for lost freedom.

## Don't Start in College
Skip startups during college.
Be a real student first. Explore, learn deeply, travel.
Startups need total focus. You cannot do both well.
Delaying helps success odds. You gain experiences and maturity.
Even famous founders like Zuckerberg missed normal youth.
Startup success limits future options. Enjoy college freedom first.

## Startup Success Is Unpredictable
Past experience does not predict startup success.
Startups change who you are. No one knows if you have what it takes until you try.
Confidence means little. Hard to predict future toughness and success.
If unsure, test yourself later. Timing matters.

## Get Ideas and Co-Founders Right
Forced idea brainstorming creates bad ideas.
Great ideas come unconsciously from side projects.
Examples: Yahoo, Google, Facebook, Apple all began as hobbies.
How to do it:
- Learn about important topics
- Work on problems you like
- Team up with people you respect

This also finds co-founders naturally.

Domain knowledge helps. It does not need to be technical.

## What Makes Problems Interesting
No perfect test exists for real problems.
Personal rule: Avoid boring work at all costs.
Important problems sit at technology's leading edge. Think of it as an expanding pattern.
Live on that edge. Opportunities appear before others see them.
College plan: Follow curiosity. Build expertise without startup pressure.

| Question | Answer |
|---|---|
| Non-technical founder role? | Domain knowledge beats code. Handle sales, operations. |
| Business school worth it? | No. Teaches management after success. Learn by doing. |
| First hires? | Treat like co-founders. Self-driven peers. |
| Market bubble? | No. Valuations reflect real growth potential. |
| Startup labs? | Work if run right. Twitter began this way. |
| Women raising funds? | Build great growth. Numbers beat bias. |
| College major now? | Physics for curiosity, not calculation. |
| Personal efficiency? | Focus comes from caring. Kids force priorities. |
| Side project to startup? | When it takes over your time and mind. |
| Slow growth? | Do unscalable things that work. |
| Unfundable startups? | Almost none. Back bold ideas. |
| Spot what matters? | Follow curiosity. Hate boredom. |
| Team monoculture risk? | Likeable teams win big. Friends build best startups. |

| Lesson | Simple Rule |
|---|---|
| Instincts | Pause. They mislead in startups. |
| People | Only work with those you like and trust. |
| Expertise | Know users deeply. Mechanics later. |
| Traps | Skip fake startup forms. Build real value. |
| Shortcuts | None work. Users see truth. |
| Commitment | Total life takeover. Prepare now. |
| Timing | College first. Startups after. |
| Prediction | Impossible. Try when ready. |
| Ideas | Side projects with friends. |
| Prep | Curiosity + edge living. |
    `,
    examples: [
      'Yahoo and Google: Both began as side projects by PhD students who followed curiosity.',
      'Facebook: Started as a project for a single campus before global dominance.',
      'Many founders learn "business mechanics" like fundraising entirely on the job.'
    ],
    scenario: {
      title: 'The "Professional" Trap',
      description: 'An investor suggests you spend your first $10,000 on a high-end PR firm to get your name in the news before you have a working product. What do you do?',
      options: [
        { 
          id: 'reject', 
          label: 'Refuse. Focus on the product instead.', 
          feedback: 'Correct. PR before product is "playing house." Substance always beats hype.',
          impact: { xp: 500, skills: ['strategicThinking'] }
        },
        { 
          id: 'accept', 
          label: 'Accept. Famous startups need publicity.', 
          feedback: 'Dangerous. Hype without a product leads to high churn and wasted capital.',
          impact: { xp: 100 }
        }
      ]
    },
    vocabulary: [
      { word: 'Counterintuitive', definition: 'Contrary to what intuition or common sense would expect.' },
      { word: 'Playing House', definition: 'Acting like a successful company without actually building a product users love.' },
      { word: 'Cognitive Dissonance', definition: 'The mental discomfort of holding two conflicting beliefs at once.' }
    ],
    mistakes: [
      'Assuming your natural business instincts are always correct.',
      'Spending too much time on growth hacks instead of user value.',
      'Starting a company too early and missing out on broader education.'
    ],
    simulationIntegration: {
      featureUnlock: 'Counterintuitive Decision Shield',
      decision: 'Before every major spend, ask: Is this building value or just looking professional?',
      logic: 'Substance over form is the only way to survive.',
      unlockKey: 'pitch-arena'
    },
    summary: 'Building a startup requires unlearning school habits. Stop trying to "hack" success and focus on being relentlessly helpful to your users.',
    xpReward: 1000
  },
  'week-4': {
    id: 'week-4',
    level: 1,
    week: 4,
    title: 'The Consumer Mind',
    objective: 'Understand the psychological foundations of user growth and why people choose certain products over others.',
    theory: `
## THE PSYCHOLOGY OF STARTUPS
Building a product is only half the battle. The other half is understanding why people use things. Psychology is the foundation of growth.

## THE POWER OF FOCUS
Beginners try to please everyone. Experts focus on a tiny group. If you build for everyone, you build for no one. Find 100 people who love you. Their passion will drive your growth.

## WHY PEOPLE BUY
People don't buy products; they buy "better versions of themselves."
- A gym membership is "a healthy body."
- A fast computer is "more free time."
Focus on the result, not the features.

## THE FIRST 10 SECONDS
Users decide to stay or leave in seconds. Your website or app must answer three questions instantly:
1. What is this?
2. How does it help me?
3. What do I do next?
If users have to think, you have already lost them.

## WORD OF MOUTH IS EVERYTHING
The best growth is free. When people love something, they tell friends. If your users aren't talking about you, your product isn't good enough yet. Marketing cannot fix a bad product.

| Concept | Action |
|---|---|
| Target | Focus on 100 obsessed fans |
| Value | Sell the result, not the tool |
| Speed | Make the first 10 seconds perfect |
| Growth | Build for word of mouth |

| Lesson | Rule |
|---|---|
| Empathy | Think like the user, not the boss |
| Simplicity | Less choice = more action |
| Trust | Build reputation through quality |
    `,
    examples: [
      'iPhone: Sold the "feeling" of the future, not just a phone with internet.',
      'Slack: Focused on a tiny group of developers who loved it before scaling to offices.',
      'Google: Answered "What is this?" with a single search bar and nothing else.'
    ],
    scenario: {
      title: 'The Feature Fever',
      description: 'Your 50 users are asking for 10 new features. You only have time to build one. What do you do?',
      options: [
        { 
          id: 'listen', 
          label: 'Interview them to find the one biggest pain', 
          feedback: 'Correct. Users often ask for features but what they really want is a problem solved.',
          impact: { xp: 500, skills: ['marketAwareness'] }
        },
        { 
          id: 'build-all', 
          label: 'Try to build all 10 tiny versions', 
          feedback: 'Dangerous. Doing many things poorly is the fastest way to lose obsessed fans.',
          impact: { xp: 50 }
        }
      ]
    },
    vocabulary: [
      { word: 'User Persona', definition: 'A fictional character created to represent a user type.' },
      { word: 'Friction', definition: 'Anything that prevents a user from completing a task easily.' },
      { word: 'Value Proposition', definition: 'The simple reason why a customer should buy from you.' }
    ],
    mistakes: [
      'Selling features (specs) instead of benefits (feelings).',
      'Making the signup process too long and boring.',
      'Ignoring the first few users to chase "mass market" growth too early.'
    ],
    simulationIntegration: {
      featureUnlock: 'User Empathy Radar',
      decision: 'Review your product and remove 3 features that nobody uses.',
      logic: 'Simplicity is the ultimate sophistication in psychology.',
      unlockKey: 'idea-lab'
    },
    summary: 'Growth happens when you stop thinking about your business and start thinking deeply about your users\' lives and struggles.',
    xpReward: 1000
  },
  'week-5': {
    id: 'week-5',
    level: 1,
    week: 5,
    title: 'Vanities vs Reality',
    objective: 'Master the numbers that matter and avoid the traps of fake growth.',
    theory: `
## INTRODUCTION TO STARTUP FINANCE
Many founders think finance is about complex spreadsheets and accounting. In a startup, finance is much simpler: It is about survival.

## VANITY METRICS VS. REALITY
Vanity metrics make you feel good but don't show the truth. You must ignore them to build a real company.

| Category | Vanity (Fake) | Reality (True) |
|---|---|---|
| Growth | Total Signups | Active Daily Users |
| Money | Total Sales | Net Cash Flow |
| Social | Page Likes | Retention Rate |

## UNDERSTANDING BURN RATE
Burn rate is how much money you lose every month. It is the speed at which you are running out of money.
**Net Burn = Total Spending - Total Revenue.**
If you spend $10,000 and earn $2,000, your burn is $8,000.

## THE CONCEPT OF RUNWAY
Runway is how many months you have left before your company "dies" (runs out of cash).
**Runway = Cash in Bank / Monthly Burn.**
If you have $80,000 and burn $8,000, you have 10 months of life left.

## UNIT ECONOMICS: LTV AND CAC
- **CAC (Customer Acquisition Cost)**: How much it costs to get one new customer.
- **LTV (Lifetime Value)**: How much money that customer gives you before they stop.
Rule: LTV must be significantly higher than CAC (at least 3x).

| Concept | Simple Definition | Survival Rule |
|---|---|---|
| Burn Rate | Money lost per month | Keep it as low as possible |
| Runway | Months left to live | Raise money with 6 months left |
| LTV | Total value of a user | Must be 3x higher than CAC |
    `,
    examples: [
      'A company with 1 million signups but 0 revenue and 0 active users is worth nothing.',
      'A small app with 1,000 users paying $10/month and keeping 90% of users is a strong business.',
      'Raising $1M is not success; it is a debt of responsibility to grow the company.'
    ],
    scenario: {
      title: 'The Spending Choice',
      description: 'You have 6 months of runway. A salesperson says they can double your signups if you spend half your cash on ads. What do you do?',
      options: [
        { 
          id: 'wait', 
          label: 'Wait. Check if signups actually pay first.', 
          feedback: 'Correct. Scaling a non-paying user base is the fastest way to go bankrupt.',
          impact: { xp: 500, skills: ['financialIntelligence'] }
        },
        { 
          id: 'spend', 
          label: 'Spend it. We need the big numbers for investors.', 
          feedback: 'Dangerous. Investors care about retention and unit economics more than raw signup count.',
          impact: { xp: 50 }
        }
      ]
    },
    vocabulary: [
      { word: 'Burn Rate', definition: 'The rate at which a company uses up its initial capital.' },
      { word: 'Runway', definition: 'The amount of time a company can operate before running out of money.' },
      { word: 'Retention', definition: 'The ability of a company to keep its customers over time.' }
    ],
    mistakes: [
      'Hiring too many people before you have consistent revenue.',
      'Focusing on total signups instead of daily active users.',
      'Not knowing your exact bank balance every single morning.'
    ],
    simulationIntegration: {
      featureUnlock: 'Financial Command Center',
      decision: 'Review your monthly expenses and cut 20% of non-essential costs.',
      logic: 'Every dollar saved is a minute of extra runway.',
      unlockKey: 'leaderboard'
    },
    summary: 'Success is not about how much money you raise, but about how long you can stay alive until you find a product people will pay for.',
    xpReward: 1000
  },
  'week-6': {
    id: 'week-6',
    level: 1,
    week: 6,
    title: 'Growth Fundamentals',
    objective: 'Master the strategic principles of sustainable growth and the North Star metric.',
    theory: `
## Retention First
Retention is the single most important growth metric. Without users returning, all acquisition is wasted. Retention curves that flatten above zero signal product-market fit and business viability.
- Graph daily active users post-signup
- E-commerce: 20-30% monthly retention works
- Social: Needs 70%+ Day 7 retention
- Flatten above zero = sustainable business

## Product-Market Fit Prerequisite
Growth tactics fail without product-market fit. Virality, ads, SEO amplify a good product—they can't fix a bad one.
- Test retention before scaling acquisition
- "10 friends in 14 days" hooked early social users
- Magic moment = when users get the value

## North Star Metric
One company-wide metric aligns everyone. CEO owns it initially—no separate growth teams early.
| Company | North Star Metric |
|---|---|
| Social Media | Monthly Active Users |
| Marketplaces | Gross Merchandise Volume |
| Booking Apps | Nights Booked |
Pick metric tied to mission, not vanity.

## Magic Moment Identification
Single experience hooks users for retention.
- Social: See friends' profiles
- Selling: First item sold/purchased
- Messaging: First message sent
- Marketplaces: First transaction complete

## Growth Accounting Framework
Understand all user sources:
- **New users** (acquisition)
- **Resurrected users** (re-engagement)
- **Churned users** (lost)
Net growth = New + Resurrected - Churned

## Notification Strategy
Quality over quantity. Target marginal users, not power users.
| Channel | Best For | Avoid |
|---|---|---|
| Email | Older demo, transactional | Generic newsletters |
| SMS | Urgent, high-intent | Over-messaging |
| Push | Instant re-engagement | Notification fatigue |

## Vertical-Specific Benchmarks
| Vertical | Acceptable Retention |
|---|---|
| E-commerce | 20-30% monthly |
| Social | 70%+ Day 7 |
| Gaming | 40% Day 30 |
| SaaS | 90% Day 30 |

## Complete Growth Framework
1. **Nail retention first** (flatten curve >0%)
2. **Define North Star metric** (aligns company)
3. **Find magic moment** (hooks users)
4. **Build virality** (K-factor >1)
5. **Optimize notifications** (marginal users)
6. **CEO owns growth** (early stage essential)
    `,
    examples: [
      'Hotmail: Added "PS: Get your free email at Hotmail" to every signature.',
      'PayPal: Paid $5 for every friend referred, creating massive viral loops.',
      'Facebook: Discovered the "10 friends in 14 days" magic moment early on.'
    ],
    scenario: {
      title: 'The Viral Temptation',
      description: 'You have a 10% retention rate. An expert offers a "viral hack" that will bring in 50,000 new users tomorrow. What do you do?',
      options: [
        { 
          id: 'fix-retention', 
          label: 'Refuse. Fix retention first.', 
          feedback: 'Correct. Bringing users into a "leaky bucket" wastes potential and ruins your brand.',
          impact: { xp: 500, skills: ['marketAwareness'] }
        },
        { 
          id: 'take-hack', 
          label: 'Accept. We need the big numbers now.', 
          feedback: 'Dangerous. If only 10% stay, 45,000 people will have a bad first experience and never return.',
          impact: { xp: 50 }
        }
      ]
    },
    vocabulary: [
      { word: 'K-Factor', definition: 'A metric measuring viral growth; if k > 1, the product is growing virally.' },
      { word: 'North Star Metric', definition: 'The primary metric that aligns the company’s growth efforts.' },
      { word: 'Churn', definition: 'The percentage of users who stop using your product over time.' }
    ],
    mistakes: [
      'Starting a growth team before having product-market fit.',
      'Focusing on new signups while losing existing users.',
      'Using mass generic newsletters that annoy your power users.'
    ],
    simulationIntegration: {
      featureUnlock: 'Growth Audit Mode',
      decision: 'Identify your magic moment and focus 100% of efforts on making it happen faster.',
      logic: 'Growth is about delivering the magic moment to as many people as possible.',
      unlockKey: 'challenge-arena'
    },
    summary: 'Growth is not about hacks. It is about building a product that people keep using and delivering that value as fast as possible.',
    xpReward: 1000
  },
  'week-7': {
    id: 'week-7',
    level: 1,
    week: 7,
    title: 'Building Strong Teams and Culture',
    objective: 'Learn how to create a high-performance startup culture, hire your foundation team, and scale through transparency.',
    theory: `
## Lesson 1: What Is Company Culture and Why It Matters
Company culture is the invisible force that shapes how your team works together every day. Think of it as the "family rules" in a business: it decides if people collaborate happily or compete selfishly. Without a strong culture, even smart people can cause chaos as your startup grows from 2 to 200 employees. The good news? You can build it intentionally from the start.
A solid culture solves the "bandwidth problem"—founders can't oversee every choice forever. Instead, culture becomes a guide that lets teams decide on their own while staying true to your vision.
Four pillars to build your culture:
- Hire for values: Choose people who live honesty and teamwork.
- Daily purpose: Connect tasks to "why we exist."
- Internal sharing: Keep everyone in the loop.
- Celebrate wins: Spotlight positive actions to inspire more.

## Lesson 2: Be Open and Transparent
Transparency means treating every employee like a partner by sharing company details openly—no secrets between bosses and staff. In small startups, this is easy: everyone knows the cash flow or big plans. As you scale, it prevents confusion and boosts productivity, because aligned teams move faster.
However, growth brings challenges like info overload. Early on, you might copy everyone on emails; later, use smart tools to filter noise. The payoff? Trust skyrockets, and people feel ownership.
| Team Size | Best Practices | Tools |
|---|---|---|
| 2-10 | Full email access; daily huddles. | Email, notes app. |
| 10-100 | Themed channels; weekly updates. | Slack, Google Docs. |
| 100+ | Filtered feeds; town halls. | Dashboards, Zoom. |

## Lesson 3: Hiring Your First 10 People—The Foundation
Your first 10 hires set the tone for the next hundred—they're the roots of your company tree. Focus on people you'd enjoy working beside in tough times, not just skilled resumes. Early startups can't poach from giants, so hunt for hidden gems: hardworking folks with potential who are overlooked elsewhere.
Look for intrinsic drive—they join despite low pay because they love building something real.
Key traits explained:
- Integrity: Always truthful, even in fails.
- Low ego: Lifts others up.
- Curiosity: Asks "why?" and experiments.
- Work ethic: Pushes through obstacles.

## Lesson 4: How to Interview and Check Candidates
Interviews should reveal if someone fits your culture and can deliver. Don't rely on fancy talk—test with real work and deep checks. Start by benchmarking: Talk to pros about "world-class" standards for the role.
Tailor questions to traits, then verify with actions. Aggressive references are key—quantify like "top 5%?" This creates accountability.
Step-by-Step Guide:
1. 30-min chat: Values and stories.
2. 2-hour test: Hands-on task (e.g., code a feature).
3. Reference calls: 3+ people, ranked scores.
4. Trial day: Real team work.
Team vote: Hire if strong yes.

## Lesson 5: Onboarding New Hires Quickly
Onboarding turns a new hire from outsider to contributor fast—aim for impact in days, not months. In tiny teams, it's casual: Sit together, share stories. As you grow, structure it to cover tools, goals, and feedback.
Personalize to their style—some love shout-outs, others quiet notes. Push real work early: Learning by doing beats lectures.
| Day | Focus | Example Activities |
|---|---|---|
| 1 | Welcome | Lunch, intros, values tour. |
| 2 | Basics | Tool setup; shadow expert. |
| 3-4 | Hands-On | Small task + feedback loop. |
| 5 | Integrate | Team meeting; aspiration chat. |

## Lesson 6: Scaling Teams as You Grow
Scaling means evolving from founder-led to self-running teams. Create cross-functional squads (tech, design, product) like mini-startups—nimble and independent. Referrals become your main pipeline once you hit momentum.
| Stage | Size | Shifts |
|---|---|---|
| Founding | 1-10 | Personal bonds. |
| Early | 10-100 | Structure. |
| Growth | 100-1,000 | Autonomy. |
| Mature | 1,000+ | Systems. |
| Trait | Why Scales | Spot It |
|---|---|---|
| Integrity | Trust base. | Owns mistakes. |
| Hardworking | Momentum. | Delivers consistently. |

## Lesson 7: Grow Leaders from Inside
Internal growth turns early hires into leaders—startups are perfect training grounds. Spot potential through challenges, then coach. Not everyone wants to manage; respect individual paths.
Experiment: "Lead this project." Provide feedback and resources.

## Lesson 8: Honest Recruiting and Vision
Recruit with truth: Highlight grit needed and growth possible. Top talent seeks hard problems, not cushy jobs.
Authentic Pitch: "This role means long hours and risks—no guarantees. But you'll shape a product millions use, learn fast, and grow personally. If you thrive on uncertainty, join us."
    `,
    examples: [
      'Netflix: Famous for its high-performance culture and "Keeper Test".',
      'Zappos: Paid new hires $2,000 to quit to ensure only those who loved the culture stayed.',
      'Google: Early transparency allowed every engineer to see all the company code.'
    ],
    scenario: {
      title: 'The Transparency Dilemma',
      description: 'Your startup had a bad month and sales are down 30%. Do you tell the team?',
      options: [
        { 
          id: 'share', 
          label: 'Share the truth and the plan to fix it', 
          feedback: 'Correct. Transparency builds trust. Smart people will help you solve the problem if they know about it.',
          impact: { xp: 500, skills: ['leadership', 'negotiation'] }
        },
        { 
          id: 'hide', 
          label: 'Keep it quiet to avoid scaring people', 
          feedback: 'Dangerous. Secrets create anxiety. If people find out later, trust is broken forever.',
          impact: { xp: 100 }
        }
      ]
    },
    vocabulary: [
      { word: 'Cross-functional Squad', definition: 'A small, independent team containing all the skills needed to complete a project.' },
      { word: 'Intrinsic Drive', definition: 'Motivation that comes from inside a person (love for the work) rather than outside rewards.' },
      { word: 'Reference Check', definition: 'Talking to previous bosses to verify a candidate\'s performance and character.' }
    ],
    mistakes: [
      'Hiring for skill but ignoring values and culture fit.',
      'Micromanaging every decision as the team grows past 10 people.',
      'Assuming that a "ping pong table" equals a good company culture.'
    ],
    simulationIntegration: {
      featureUnlock: 'Team Synergy Dashboard',
      decision: 'Run a monthly culture audit to check team alignment.',
      logic: 'Culture is the manual for decentralized decision making.',
      unlockKey: 'company'
    },
    summary: 'A strong culture isn\'t about perks; it\'s about hiring the right people and giving them the transparency and autonomy to lead.',
    xpReward: 1000
  },
  'week-8': {
    id: 'week-8',
    level: 1,
    week: 8,
    title: 'Principled Command: Multi-Perspective Decision-Making',
    objective: 'Learn to make fair, robust decisions by mapping multiple viewpoints—from employees to customers—to build trust and a strong company culture.',
    theory: `
## Lesson 1: Why Multi-Perspective Thinking Wins
Great decisions come from seeing how they affect everyone—not just you. Leaders must think about employees, teams, customers, and even those not in the meeting. This skill is tough for CEOs because pressure pushes quick choices. But skipping it causes big problems like low morale or unfairness.
When you pause and map all views, decisions stick better. Teams trust you more. Culture grows strong. For example, a CEO might cut costs fast. But what about workers' fears? Thinking wider finds win-wins.

## Lesson 2: Case Study - Handling Demotions Smartly
Demotions save talent when someone works hard but misses skills. Firing them loses effort and scares the team. Demote right, and culture stays healthy. But get equity pay wrong, and others feel cheated.
Picture a sales star bad at managing. Move them back to sales: They shine again. Talk honest: "Wrong fit—let's realign." Fix pay first. Watch how teams react—gossip kills respect.
| Option | Upside | Downside |
|---|---|---|
| Fire | Fast | Morale drop |
| Demote | Keeps value | Needs care |

## Lesson 3: Case Study - Smart Raise Requests
A raise ask signals deep thought from the employee. Say yes quietly, and quiet performers quit. It sparks "me too" waves. Fix with formal reviews every 3-6 months. Everyone knows the rules—no favorites.
Transparency cuts envy. Criteria like performance and market rates keep it fair. Aggressive askers can't game it.

## Lesson 4: Case Study - Stock Options Fairness
Stock options give ownership. Old rule: Buy vested shares in 90 days after leaving—or lose them. Too harsh for life events. Extend to 10 years: Fairer, attracts talent.
90 days came from old accounting (APB 25)—longer hurt books. Now possible. Long windows build rep; short refills share pool fast.
| Window | Worker Wins | Company Trade |
|---|---|---|
| 90 Days | Risky loss | Easy refills |
| 10 Years | Secure | Costlier pool |

## Lesson 5: History Lesson - Toussaint Louverture's Genius
Toussaint Louverture rose from slave to leader. He freed Haiti, beat France, Spain, Britain—even Napoleon. Exports topped America's. How? Saw every side.
Soldiers got discipline—no looting—for pride. Enemies joined as generals for skills. Owners kept land, low taxes—for economy. He blended views into culture. Result: Revolution won, nation boomed.

## Lesson 6: Everyday Tools for Better Decisions
Stress tempts snap calls. Pause 5 minutes. Map views. Family helps vent—focus on fixes.
Firing/demotion talk: Honest, kind. "Mismatch—new role fits."
Hiring rivals: Show superior culture.
Daily: Write pros/cons per view.

## Lesson 7: Build Formal Systems for Culture
Systems lock in fairness. No systems? Whiners win, stars leave.
Core systems:
- Raises: Scheduled, open.
- Equity: Clear rules.
- Decisions: Group view-checks.
`,
    examples: [
      "Toussaint Louverture united enemies by understanding their needs, turning rivals into allies.",
      "A smart demotion: moving a great engineer who is a poor manager back to a lead developer role to save their talent.",
      "Replacing informal raises with a scheduled, transparent review system to ensure fairness and prevent team envy."
    ],
    scenario: {
      title: 'The Fairness Test',
      description: 'Your top salesperson asks for a huge, unscheduled raise. They deserve it, but your best engineer is quiet and works just as hard. If you say yes, the engineer might feel undervalued and quit. What do you do?',
      options: [
        { 
          id: 'give-raise', 
          label: 'Give the salesperson the raise quietly', 
          feedback: 'Risky. This creates a culture of favoritism. The quiet engineer will eventually find out and lose trust.',
          impact: { xp: 100 }
        },
        { 
          id: 'systematize', 
          label: 'Deny the request and build a formal review system for everyone', 
          feedback: 'Correct. This is a hard choice, but it builds a fair system where everyone knows the rules. It protects the culture long-term.',
          impact: { xp: 500, skills: ['leadership', 'strategicThinking'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Multi-Perspective', definition: 'Viewing a situation from multiple viewpoints (employee, customer, investor) before acting.' },
      { word: 'Stakeholder', definition: 'Any person or group who is affected by your decisions.' },
      { word: 'Formal System', definition: 'A clear, documented process for company operations, like raises or reviews, to ensure fairness.' }
    ],
    mistakes: [
      "Making quick decisions under pressure without considering all affected parties.",
      "Rewarding the loudest person in the room instead of the most valuable.",
      "Firing talented people who are in the wrong role, instead of finding a better fit for them."
    ],
    simulationIntegration: {
      featureUnlock: 'Ethical Framework Module',
      decision: 'Before any hire or fire decision, you must now map 3 stakeholder viewpoints.',
      logic: 'Principled command requires seeing the full impact of your choices.',
      unlockKey: 'mentor'
    },
    summary: 'Great leadership is not about making fast decisions, but fair ones. By systematically considering every perspective, you build a culture of trust that moves faster and wins long-term.',
    xpReward: 1000
  },
  'week-9': {
    id: 'week-9',
    level: 1,
    week: 9,
    title: 'How to Hire and Execute',
    objective: 'Learn to pick perfect co-founders, hire smart early employees, manage equity, and master startup execution with focus and intensity.',
    theory: `
## Lesson 1: Pick Perfect Co-Founders First
Co-founders make or break startups. Choose wrong, and tension kills the company fast. Pick people you know well—years of trust beats random picks. Data shows startups adding strangers after starting often fail within a year.
Ideal co-founders stay calm in chaos, solve problems creatively, and have key skills like coding for tech firms. Think James Bond: Cool, decisive, ready for anything. Aim for two or three founders—solo or remote pairs struggle with speed and talk.
Top traits:
- Relentlessly resourceful (finds ways when stuck).
- Tough under stress.
- Technical fit for your idea.

## Lesson 2: Hire Early Employees Slow and Smart
Keep teams tiny at first—no big payroll or slow choices. Hire only when you desperately need help. Airbnb took five months for their first hire and added just two in year one. Early picks shape everything—mediocre ones poison culture.
Seek mission believers who match founder drive. Personal referrals beat job boards. Aptitude and fit trump years of experience early on.
Must-have qualities:
- Smart and gets stuff done.
- Fun to work with daily.
- Risk-taker who communicates well.
Test with short projects and deep reference calls. Founders start bad at managing—practice giving clear feedback.
| Quality | Why It Wins |
|---|---|
| Resourceful | Solves startup messes |
| Enjoyable | No drama |
| Determined | Stays through hard times |

## Lesson 3: Give Generous Equity and Credit
Give early employees about 10% total equity, vested over four years. Founders often cheap out on staff but splash cash on investors—flip that. Fair shares keep people motivated and loyal.
Make them feel valued: Credit wins publicly, hand new challenges, skip micromanaging. Feedback stays constructive—not all negative.
Fire fast if toxic or always failing. Distinguish one-off slips from patterns. Protect culture over pity.
Equity Guide:
- First 10 hires: 1-2% each.
- Vest to avoid early quits.

## Lesson 4: Master Startup Execution Basics
Ideas mean nothing without action. Founders model the culture: Work hard, obsess over details, love customers, stay cheap. Execution splits into focus (pick right tasks) and intensity (do them fast).
Bias to action—ship imperfect now, fix later. Outwork rivals with quick replies and travel for deals. Small edges like viral growth over 1% win big.
Execution split:
- Focus: Top 2-3 daily priorities.
- Intensity: Non-stop hustle.
Lost momentum? Ship small wins, check user feedback—not pep talks.

## Lesson 5: Nail Focus in a Noisy World
Distractions kill startups. Say no to side quests. Align whole team on clear, measurable goals—repeat them daily. Same-city co-founders talk faster than remote.
Review metrics weekly for rhythm. Ignore rival hype—build better quietly.
Focus habits:
- List top tasks each morning.
- Communicate goals in every meeting.
- No to 90% of ideas.
| Distraction | Fix |
|---|---|
| Too many tasks | Pick 2-3 |
| Remote founders | Move closer |

## Lesson 6: Build Intensity and Speed
Startups demand all-in effort. Combine speed and quality—move fast but don't break core stuff. Decisiveness beats overthinking. Incremental steps crush perfection waits.
Respond instantly to emails, users, deals. Culture rewards hustlers.
Intensity boosters:
- Work weekends if needed.
- Ship weekly.
- Celebrate quick progress.
Viral coefficient just over 1? Exponential wins. Under? Death spiral.

## Lesson 7: Keep Momentum Alive Long-Term
Momentum fuels startups—lose it, and people quit. Fix stalls with small wins, user love, and steady shipping. Operating rhythm from regular checks keeps energy high.
Founders lead: Show grit daily. Network hard for talent. Fix co-founder fights day one.
| Stage | Do This |
|---|---|
| Founding | Pick co-founders, equity |
| Early Hires | Trials, fit checks |
| Growth | Metrics, small wins |
| Troubles | Fast fires, refocus |
| Trait | Spot It |
|---|---|
| Resourceful | Fixes impossible problems |
| Calm | Stays cool in crisis |
| Gets Done | Ships on time |
`,
    examples: [
      'Airbnb took five months to interview and hire their first employee.',
      'Generous early equity at companies like Google turned employees into owners and fueled growth.'
    ],
    scenario: {
      title: 'The Speed vs. Culture Hire',
      description: 'You desperately need a developer. You find one who is incredibly skilled and can ship code twice as fast as anyone else, but they seem arrogant and dismissive of teamwork. Do you hire them to speed up product development?',
      options: [
        {
          id: 'hire',
          label: 'Hire them. Speed is everything.',
          feedback: 'Dangerous. A toxic high-performer can destroy team morale and slow you down more in the long run than their fast coding helps.',
          impact: { xp: 100 }
        },
        {
          id: 'wait',
          label: 'Wait. Keep searching for a culture fit.',
          feedback: 'Correct. Protecting your culture is the most important job of an early founder. The right person is worth the wait.',
          impact: { xp: 500, skills: ['leadership', 'strategicThinking'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Relentlessly Resourceful', definition: 'The ability to solve any problem and find a way forward, no matter the obstacles.' },
      { word: 'Vesting', definition: 'The process of earning company shares over a set period, protecting the company if someone leaves early.' },
      { word: 'Bias to Action', definition: 'The tendency to act and test things quickly rather than over-analyzing.' }
    ],
    mistakes: [
      'Hiring a co-founder you don\'t know well.',
      'Hiring too quickly before there is a desperate need.',
      'Being stingy with equity for early, critical employees.'
    ],
    simulationIntegration: {
      featureUnlock: 'Advanced HR Module',
      decision: 'Perform a culture audit on your first 3 hires.',
      logic: 'The first hires define the culture for the next 100.',
      unlockKey: 'company'
    },
    summary: 'Building an unstoppable startup comes down to two things: hiring elite, mission-driven people slowly, and executing with relentless focus and intensity every single day.',
    xpReward: 1000
  },
'week-10': {
    id: 'week-10',
    level: 1,
    week: 10,
    title: 'Startup Finance and Legal Mechanics',
    objective: 'Master the essential legal and financial mechanics to build a solid startup foundation, from incorporation to employee management.',
    theory: `## Lesson 1: Form Your Startup Right
A startup needs its own legal identity to shield founders from personal risks like lawsuits or debts. Delaware stands out as the top choice—its laws are clear, and investors love it. One company picked wrong and paid $500,000 to fix it. Keep formation simple: File papers, set bylaws, name a board, and shift all IP like code to the company.
Use tools like Clerky for quick setup. This protects you and builds trust fast.
- Choose Delaware C-Corp.
- Appoint CEO, secretary.
- Assign all inventions to company.
## Lesson 2: Split Equity Fairly
Equity is the company pie—divide it wisely. Equal splits work best for co-founders unless someone skips big effort. Ideas count little; future work matters most. Uneven shares signal trouble like low trust.
Founders buy shares formally with vesting. This keeps everyone committed.
- Near-equal for co-founders.
- Future focus over past.
- Red flag: Big gaps.
## Lesson 3: Use Vesting to Stay Aligned
Vesting lets founders earn shares over time—standard is four years with a one-year cliff. Leave early? Company buys back unvested shares cheap. This stops free rides and shows "skin in the game."
Even solo founders vest to set the example. It protects investors and motivates long hauls.
- Year 1: 25% vests.
- Then monthly.
- Protects from quits.
| Without Vesting | With Vesting |
|---|---|
| Early exit wins big | Earns over time |
## Lesson 4: Raise Money Smartly
Seed rounds use SAFEs or notes—no set price yet. Later rounds like Series A fix a valuation. Caps protect early backers if value jumps. Dilution hits hard—$2M on $6M cap might give away 25%.
Know terms: Skip extra board seats unless strategic. Pro-rata rights let investors keep shares but dilute you more.
| Type | How It Works |
|---|---|
| Unpriced (Seed) | SAFE/Note + cap |
| Priced (A/B) | Set value |
Pick accredited investors. Read every line.
## Lesson 5: Track Expenses Cleanly
Pay all business costs from the company bank only—payroll, rent, ads. Keep receipts for taxes. Personal stuff doesn't count. Investors watch spending; waste kills trust.
Hire a bookkeeper and CPA early. Use payroll like Zenefits for compliance.
- Company account only.
- Detailed records.
- No mixing personal.
## Lesson 6: Pay Founders and Staff Legally
Founders count as employees—pay salaries with taxes. Skip it, and breakups turn messy with wage claims. Classify right: Employees get W2s, company handles taxes; contractors get 1099s, pay own.
Add insurance and work papers. Payroll services fix this easy.
| Type | Taxes | Form |
|---|---|---|
| Employee | Company pays | W2 |
| Contractor | Self | 1099 |
Unpaid founders risk lawsuits.
## Lesson 7: Fire Fast and Fair
Fire underperformers quick to save culture. Be direct—no excuses. Pay owed wages and vacation same day. Cut access instantly. Buy back their shares.
Good firings show strength. Delay poisons teams.
- Clear talk.
- Pay up.
- Lock accounts.
- Repurchase shares.
`,
    examples: [
      'A company chose the wrong state for incorporation and paid $500,000 in legal fees to fix it.',
      'An equal co-founder equity split helped a team survive early struggles and stay motivated.',
      'Clean financial books allowed a startup to close their next funding round in half the time.'
    ],
    scenario: {
      title: 'The Founder Salary Dilemma',
      description: 'You\'ve just raised your first seed round. You and your co-founder haven\'t taken a salary for 6 months. Do you start paying yourselves a market-rate salary or keep the cash in the company to extend runway?',
      options: [
        { 
          id: 'pay', 
          label: 'Pay market-rate salaries', 
          feedback: 'Risky. While founders should be paid, a high salary drains cash quickly. Investors expect founders to be frugal and prioritize company growth over personal wealth.',
          impact: { xp: 100 }
        },
        { 
          id: 'frugal', 
          label: 'Take a small, livable salary', 
          feedback: 'Correct. This shows discipline and commitment to the long-term vision. It maximizes runway and builds investor trust.',
          impact: { xp: 500, skills: ['financialIntelligence'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Delaware C-Corp', definition: 'The standard legal structure for high-growth startups, favored by investors.' },
      { word: 'Vesting Cliff', definition: 'A period (usually one year) before any equity is earned, protecting the company if a founder leaves early.' },
      { word: 'SAFE (Simple Agreement for Future Equity)', definition: 'A fundraising instrument that converts to equity at a future funding round, common for seed-stage startups.' }
    ],
    mistakes: [
      'Mixing personal and business expenses.',
      'Failing to set up a vesting schedule for co-founders.',
      'Misclassifying employees as contractors to avoid taxes.'
    ],
    simulationIntegration: {
      featureUnlock: 'Legal & Compliance Shield',
      decision: 'Automate payroll and tax compliance through a registered service.',
      logic: 'Mistakes in legal and finance are expensive. Automation prevents them.'
    },
    summary: 'Mastering legal and financial basics like proper incorporation, fair equity splits, and clean accounting is not glamorous, but it is the foundation that prevents catastrophic failure and builds a company investors trust.',
    xpReward: 1200
  },
  'week-11': {
    id: 'week-11',
    level: 2,
    week: 11,
    title: 'Early Startup Tactics',
    objective: 'Learn to validate ideas cheaply, find your first users with manual effort, and turn them into loyal champions before scaling.',
    theory: `
## Lesson 1: Validate Ideas with Quick Tests
Test your business idea fast before building anything fancy. DoorDash started with a simple landing page (paltodely.com) listing menus and a phone number. No app, no marketing—first order came in hours. This proved people wanted local delivery.
Interview customers first. DoorDash talked to 150 small businesses and found the same pain: no reliable drivers. Chloe's macaroon shop couldn't deliver—huge gap.
- Build minimal page or PDF.
- Collect emails or orders manually.
- Talk to 50+ potential users.
Why it works: Cheap proof beats months of coding guesses.

## Lesson 2: Do Things That Don't Scale
Manual work gives you edge early. DoorDash founders drove orders themselves, used Google Docs for tracking, Find My Friends for drivers, Square for payments. Scrappy but taught them everything.
Teespring's founder answered every support ticket personally, emailed churned users, watched social media. Hands-on builds champions—users who spread word free.
- Deliver yourself.
- Call every customer.
- Fix bugs live.
Square shut DoorDash down thinking fraud—manual taught them payments fast.

## Lesson 3: Find Your First Users Fast
First users need intense effort—no ads yet. Reach out personally, persist without expecting instant payback. Teespring hustled entrepreneurs and influencers who built apparel brands.
Delight them: Custom fixes, quick replies. Turn users into champions who tell friends.
- Find your exact pain point match.
- Message 100 personally.
- Follow up 3x.
Don't give free product—it fakes engagement. Charge to find real fans.

## Lesson 4: Build Champions from Early Users
Early users become your army if treated right. Email DoorDash customers nightly for feedback. Teespring proactively called active and lost users to learn why.
Personal support turns okay users into evangelists. They post, refer, defend you.
- Nightly feedback emails.
- Personal thank-yous.
- Custom feature promises.
Teespring influencers became biggest customers through this care.

## Lesson 5: Hit Product-Market Fit Through Speed
Iterate fast over perfect code. Teespring CTO copied codebase to build enterprise tools in days, not months. Crashes happened—team fixed live.
Focus next step only. DoorDash manual ops revealed real needs apps later solved.
| Phase | Focus |
|---|---|
| First Users | Personal hustle |
| Champions | Delight + feedback |
| Fit | Rapid builds |

## Lesson 6: Get Press That Matters
Press doesn't find you—hunt smart. Define goals first: users, investors, buzz? Target right writers: local for city services, tech for apps.
Warm intros beat cold emails. Meet reporters, pitch clear bullets, send assets early.
- Pick story type (launch, milestone).
- Get founder intro.
- Call/meet, not email.
- Follow with screenshots.
Twitch rode "Twitch Plays Pokemon" wave—support, don't create virals.

## Lesson 7: Scale the Don't-Scale Advantage
Keep manual as long as it wins. DoorDash used mobile + gig workers—no trucks needed. Teespring shipped thousands daily from scrappy start.
Vision big: DoorDash eyes all local delivery, not just food.
| Stage | Action |
|---|---|
| Week 1 | Landing page test |
| Month 1 | Manual operations |
| Month 3 | First champions |
| Year 1 | Product-market fit |
`,
    examples: [
        'DoorDash validated their entire business with a simple PDF landing page before writing any code.',
        'Teespring\'s founder personally answered every support ticket to build deep user relationships.',
        'Twitch leveraged a viral user-created event ("Twitch Plays Pokemon") by supporting it, not trying to create it.'
    ],
    scenario: {
      title: 'The Automation Temptation',
      description: 'Your manual order process is getting slow. You could spend the next month building a fully automated system, or you could hire one person to help you continue the manual work. What do you do?',
      options: [
        {
          id: 'automate',
          label: 'Build the automated system.',
          feedback: 'Risky. You might build the wrong thing. Manual work is slow, but it forces you to learn from every single user interaction.',
          impact: { xp: 100 }
        },
        {
          id: 'manual',
          label: 'Hire help and continue manual work.',
          feedback: 'Correct. Stay close to the user and the problems for as long as possible. Only automate what you deeply understand.',
          impact: { xp: 500, skills: ['marketAwareness', 'riskAnalysis'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Unscalable', definition: 'Actions that require manual effort and cannot be easily automated to serve millions of users, but are critical for early learning.' },
      { word: 'Evangelist', definition: 'A user who is so passionate about your product that they actively promote it to others for free.' },
      { word: 'Product-Market Fit', definition: 'The point at which your product perfectly serves a strong market demand, indicated by high retention and organic growth.' }
    ],
    mistakes: [
      'Trying to build a perfect, fully-automated product before validating the core idea.',
      'Paying for ads to get first users instead of finding them through manual hustle.',
      'Ignoring early user feedback in a rush to add more features.'
    ],
    simulationIntegration: {
      featureUnlock: 'Manual Hustle Mode',
      decision: 'Approve sales manually to deepen user understanding.',
      logic: 'Direct user interaction is the fastest way to learn.',
      unlockKey: 'manual-hustle'
    },
    summary: 'The goal of an early startup is not to scale, but to learn. Do things that don\'t scale—talk to users, serve them manually, and turn them into champions. This is how you find product-market fit.',
    xpReward: 1000
  },
  'week-12': {
    id: 'week-12',
    level: 2,
    week: 12,
    title: 'From Zero to Many Users',
    objective: 'Learn how to acquire your first users with creative, manual tactics and iterate quickly based on their feedback to achieve growth.',
    theory: `
## Lesson 1: Focus Time and Avoid Common Traps
Startups fail when founders build alone without feedback, then launch big hoping for viral success. This wastes time and money on users who leave fast. Instead, use focused time blocks—no distractions—to dive deep into your idea. Short scattered sessions lose momentum due to mental switching costs.
Pick problems you're passionate about that others share. Define your problem in one clear sentence first.
- Avoid building in secret.
- Avoid big launches without tests.
- Avoid chasing a market you are not passionate about.

## Lesson 2: Immerse in the Industry Deeply
Don't disrupt blind—live the industry 1-2 months. Homejoy founders trained as cleaners and worked jobs. This showed real pains like bad scheduling that outsiders miss.
Research obsessively: List all competitors, read their articles, study earnings. Build expertise fast to earn trust.
- Work the job yourself.
- Call 50 players in the industry.
- Map the full competitor landscape.
Hands-on experience beats outsider "fresh eyes" early on.

## Lesson 3: Target Niche and Storyboard Experience
Start narrow—one customer group like busy parents. Tailor everything to them before going wide.
Storyboard the user journey first: from discovery to final review. Sketch the sign-up process, the core usage, and the moments of delight. This will guide your Minimum Viable Product (MVP).
- Pick a specific niche (e.g., soccer moms or college students).
- Map out a 10-step user flow.
- Build the smallest possible solution.
Clear positioning wins. Homejoy’s "Clean for $20/hour" was simple and effective.

## Lesson 4: Get First Users Creatively
Start close: yourself, family, and friends. Then hit forums and local events. Homejoy gave free water at hot fairs near food vendors to get bookings.
Creative tactics beat boring ads early. Accept low conversion rates—the goal is to learn from each attempt.
- Test the product on yourself as the first user.
- Post in 5 relevant online communities.
- Try one offline stunt weekly.

## Lesson 5: Collect Honest Feedback Right
Talk to users face-to-face over surveys to get real, unfiltered feedback. Paid users give the truest feedback; friends often sugarcoat it to be nice.
Track retention from Day 1. Use Net Promoter Score (NPS) early since full data analysis takes time.
| User | Free Honesty | Paid Honesty |
|---|---|---|
| Mom | High bias | Polite |
| Friend | Medium | Medium |
| Stranger | Low | High |
Use multiple channels: call, email, and meet in person.

## Lesson 6: Iterate Fast with Manual Work
Build for 10-100 users first. Onboard them manually and vet people yourself. Homejoy screened cleaners by hand to find signals of quality.
It's okay to ship a broken product—focus on fixing the most common use cases. Don't build every feature request; solve the root problems instead.
- Use manual processes first.
- Launch early and iterate based on feedback.
- Avoid creating a "Frankenstein" product with too many features.
Launching beats stealth mode—competitors will copy you quickly anyway.

## Lesson 7: Master Growth Types
Growth splits into three main types. Pick one channel and focus on it intensely for a week.
| Type | Metric | Focus |
|---|---|---|
| Sticky | Retention curve | Delight users |
| Viral | Referral rate | Incentives + flow |
| Paid | CAC vs CLV | Payback < 12 mo |
For sticky growth, a flattening retention curve is the goal.

## Lesson 8: Know When to Pivot
Pivot after 3-4 weeks of no growth despite maximum effort. Homejoy tried 13 different versions before finding what worked.
Signals for a pivot: zero retention, bad unit economics, or no engaged users.
| Risk | Payback Months |
|---|---|
| Low | 3 |
| High | 12 |
| Bad | >12 |
Differentiate in a big way. Homejoy’s successful pivot was offering last-minute bookings.
`,
    examples: [
        'Homejoy founders worked as cleaners to understand the industry from the inside.',
        'A startup gave away free water at a fair to attract their first customers for a home service app.',
        'A founder personally called the first 100 users to get brutally honest feedback.'
    ],
    scenario: {
      title: 'The Niche vs. Broad Launch',
      description: 'You have a new app. You could launch it on a big tech blog to reach 100,000 people, or you could go to a small, local meetup for 50 people who are your perfect target users. What do you do?',
      options: [
        {
          id: 'broad',
          label: 'Launch on the tech blog for mass exposure.',
          feedback: 'Risky. A big launch to a general audience often results in low engagement and high churn if your product isn\'t perfect. You only get one first impression.',
          impact: { xp: 100 }
        },
        {
          id: 'niche',
          label: 'Go to the meetup and talk to the 50 perfect users.',
          feedback: 'Correct. Getting deep feedback from a small, passionate group is far more valuable early on than getting shallow feedback from a large, indifferent one.',
          impact: { xp: 500, skills: ['marketAwareness', 'strategicThinking'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Storyboard', definition: 'A sequence of drawings representing the shots planned for a film or television production.' },
      { word: 'Net Promoter Score (NPS)', definition: 'A metric measuring customer loyalty by asking how likely they are to recommend your product.' },
      { word: 'Pivot', definition: 'A fundamental change in a startup\'s strategy when the initial approach is not working.' }
    ],
    mistakes: [
      'Building a product in secret for months without user feedback.',
      'Targeting a broad market from day one instead of a specific niche.',
      'Relying on surveys instead of face-to-face conversations for feedback.'
    ],
    simulationIntegration: {
      featureUnlock: 'Niche Targeting System',
      decision: 'Define and lock your first user niche before scaling.',
      logic: 'Focusing on a small, passionate user base is the foundation for massive growth.',
      unlockKey: 'niche-targeting'
    },
    summary: 'To go from zero to many users, you must immerse yourself in the industry, start with a narrow niche, get your first users with creative and manual effort, and iterate relentlessly based on their feedback.',
    xpReward: 1000
  },
  'week-13': {
    id: 'week-13',
    level: 2,
    week: 13,
    title: 'Mastering Growth: Retention & Virality',
    objective: 'Learn the core principles of sustainable growth, focusing on retention, product-market fit, and viral mechanics.',
    theory: `
## Lesson 1: Retention Beats All Growth Tactics
Growth starts with retention—users coming back. Without it, new users leak away fast. A great product pulls customers who spread the word and stay. Facebook grew because users checked it daily. The retention curve shows the health of your product: it's a graph of the percentage of active users by days since they joined. A flat line above zero means you have product-market fit. If it drops to zero, you must fix the product first before trying to grow.
- E-commerce can succeed with 20-30% monthly retention.
- Social apps often need 80% or higher.
- A test with just 10,000 users can predict your retention for years.

## Lesson 2: Fix Product Before Scaling
Never try to growth hack a product with poor retention. Early buzz can be misleading. Always follow the order: Idea → Product → Team → Execution. A bad product wastes all your acquisition money. When you see a retention curve that doesn't flatten out, your only job is to iterate on the product, not to run more ads. Facebook was able to predict ad revenue with 97% accuracy within 90 days just by looking at retention data.
- Build a viable core product.
- Check the retention curve.
- Only then focus on viral or paid growth.

## Lesson 3: Pick a North Star Metric
The entire company, led by the CEO, must own growth. A "North Star Metric" aligns everyone—it's the one number tied directly to your company's mission.
| Company | North Star Metric | Why It Matters |
|---|---|---|
| Facebook | Monthly Active Users (MAU) | Measures active, engaged users |
| Airbnb | Nights Booked | Measures real usage and transactions |
| eBay | Gross Merchandise Volume (GMV) | Measures the value of goods sold |
| WhatsApp | Messages Sent | Measures core engagement |
When eBay shifted from focusing on raw signups to quality users (measured by GMV), their growth exploded.

## Lesson 4: Nail the Magic Moment
The "magic moment" is the instant a user understands your product's value—the "aha!" that hooks them. Your job is to get users to this moment as fast as possible to boost retention.
- **Facebook**: Seeing the first photo of a friend.
- **Airbnb**: A host's excitement over a booking and payout.
- **eBay**: Finding a rare item and winning the bid.
Optimize your user's journey to this moment. Don't focus on your power users; focus on the "marginal" users who are on the edge of leaving.

## Lesson 5: Break Down Virality Math
Virality can be calculated: **Payload (reach) × Frequency × Conversion Rate**. If your K-factor (the result of this math) is greater than 1, your product will grow on its own.
- **Hotmail**: The email signature "PS: Get your free email at Hotmail" had a low payload but extremely high frequency.
- **PayPal**: Gave cash for referrals, which was integrated directly into the eBay payment flow.
- **Uber**: Used a driver referral funnel: import contacts → invite friends → click link → signup → re-import.
Remember, word-of-mouth only works if the product experience is great first.

## Lesson 6: Conquer International Growth
Focusing only on the US allows clones to win in other countries. Facebook beat its global competition by building a user-powered translation system. The French translation, for example, was completed in just 12 hours. Prioritize major languages first, but be ready to adapt to demographic shifts, like the boom in Hindi speakers. A scalable infrastructure allows you to outrun local competitors.
- Use community-driven translations.
- Target the top 5 languages first.
- Monitor demographic shifts to find new opportunities.

## Lesson 7: The SEO Growth Engine
SEO is built on three pillars: Keywords, Backlinks, and Internal Links. Research high-volume search terms where you have a chance to rank. A simple directory page, for example, increased Facebook's traffic by 100x. Master the basics: have an XML sitemap, correct headers, and a smart internal linking structure to make it easy for search engines to crawl your site.
| Pillar | What to Do |
|---|---|
| Keywords | Find high-volume terms you can compete for. |
| Backlinks | Get links from authoritative and respected sites. |
| Internal Links | Create an easy-to-navigate site structure. |

## Lesson 8: Email, SMS, & Push Done Right
Younger users often skip email; SMS and WhatsApp are more effective for them. For older demographics, email still works if you can beat the spam filters. The key is to send triggered messages based on user actions (like after a purchase or a period of inactivity) rather than generic newsletters. Facebook successfully re-engaged users by only nudging marginal users, avoiding spam.
- Focus on deliverability to avoid spam filters.
- Time your messages correctly, triggered by user actions.
- Segment and target your least engaged users.
`,
    examples: [
      'Facebook grew by obsessing over the "10 friends in 14 days" magic moment.',
      'Hotmail achieved massive virality by adding a simple "PS: Get your free email" link to every user\'s signature.',
      'eBay\'s growth exploded when they switched their North Star Metric from raw signups to Gross Merchandise Volume (GMV).'
    ],
    scenario: {
      title: 'The Leaky Bucket Problem',
      description: 'Your app has a low retention rate (only 10% of users come back after a week). A marketing agency promises to get you 1 million new signups for a low price. What do you do?',
      options: [
        {
          id: 'hire',
          label: 'Hire the agency. We need the growth numbers.',
          feedback: 'Dangerous. Pouring users into a product they don\'t stick with is like filling a leaky bucket. You waste money and burn your reputation with users who will churn and never return.',
          impact: { xp: 50 }
        },
        {
          id: 'fix',
          label: 'Decline. Fix the retention problem first.',
          feedback: 'Correct. A product that people stick with is the foundation of all growth. Fix the leaks before you turn on the firehose.',
          impact: { xp: 500, skills: ['strategicThinking', 'financialIntelligence'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Retention Curve', definition: 'A graph showing the percentage of users who return to your product over time. A flattening curve is a sign of health.' },
      { word: 'North Star Metric', definition: 'The single metric that best captures the core value your product delivers to customers. It guides the whole company.' },
      { word: 'K-Factor', definition: 'A measure of a product\'s virality. A K-factor greater than 1 means each user brings in at least one new user, leading to exponential growth.' }
    ],
    mistakes: [
      'Focusing on paid ads or viral hacks before fixing a poor retention rate.',
      'Letting different teams optimize for different metrics instead of aligning everyone under one North Star.',
      'Spamming all users with notifications instead of strategically targeting marginal users who are about to churn.'
    ],
    simulationIntegration: {
      featureUnlock: 'Viral Mechanics Lab',
      decision: 'Run A/B tests on referral rewards to find the optimal K-Factor for your product.',
      logic: 'Growth is a science, not a guessing game. Test every assumption to find what works.',
      unlockKey: 'viral-lab'
    },
    summary: 'Sustainable growth isn\'t about hacks; it\'s a system. First, build a product people stick with (retention). Then, align your company around a North Star metric and relentlessly optimize the path to the "magic moment" that hooks users.',
    xpReward: 1000
  },
  'week-14': {
    id: 'week-14',
    level: 2,
    week: 14,
    title: 'Mastering Growth Hacking and Retention',
    objective: 'Learn advanced growth strategies focusing on data-driven retention, viral mechanics, and scalable acquisition channels to achieve sustainable, exponential growth.',
    theory: `
## Lesson 1: Retention - The Growth Foundation
Growth fails without users returning regularly. A great product naturally attracts customers, who then tell friends and keep using it - creating a self-sustaining cycle. Facebook's daily habit made growth automatic; users couldn't quit checking. Retention beats acquisition costs 5-to-1 long-term.

Plot your retention curve: % of monthly active users (MAUs) vs. days since they joined. Healthy products flatten above zero - showing steady engagement. Curves crashing to zero scream "fix the product now."

Benchmarks by industry:
- E-commerce: 20-30% monthly return = solid.
- Social networks: 80% Day 30 retention minimum.
- SaaS tools: Week 1 >40%, Month 1 >20%.

Test with just 10,000 users - predicts years ahead. Facebook nailed 97% accurate ad value forecasts from 90-day curves.

## Lesson 2: Product First, Tactics Second
Growth hacking without retention wastes cash. Early viral spikes fool founders - real product-market fit shows in steady curves only. Follow the stack: Idea → Product → Team → Execution. Weak product crumbles under any traffic.

Airbnb iterated product mercilessly before scaling ads. Coursera fixed course completion rates first. No plateau after fixes? Pivot ruthlessly - don't hire growth teams yet.

Red flags before growth:
- D1 retention <30%.
- Week 1 churn >60%.
- No "magic moment" by Day 3.

The growth hacking retention model is a 5-step funnel: Acquisition → Activation → Retention → Revenue → Referral. Physics thinking helps: Break complex retention into testable parts, like modular experiments.

## Lesson 3: North Star Metric Aligns Company
CEO owns growth - every team chases one metric tied to mission. North star eliminates distractions, focuses roadmaps. Share internally/externally for alignment.

| Company | Metric | Why Perfect |
|---|---|---|
| Facebook | MAU | Active beats signups |
| WhatsApp | Messages/day | True usage |
| Airbnb | Nights booked | Revenue proxy |
| eBay | GMV | Economic value |

eBay ditched raw registrations for ACRUs (activated users) - quality growth 3x faster.

## Lesson 4: Magic Moment Hooks Forever
Magic/"Aha!" moment = value realization. Rush every user there - retention skyrockets. Multiple Ahas possible: pain solved, extra value found, intuitive delight.

Iconic moments:
- Facebook: First friend photo appears.
- Airbnb: Host gets first payout.
- eBay: Win rare collectible auction.
- Slack: First team message lands.

Reduce time-to-Aha (3 UX patterns):
1. Tooltips: Guide to key action ("See how this saves 2 hours").
2. Personalization: Segment onboarding by role/goal.
3. Progress bars: Show path to value.

Tailor notifications for marginal users only - power users self-serve.

## Lesson 5: Virality Math - K-Factor Mastery
Virality = Payload (# reached) × Frequency × Conversion. K-factor >1 = exponential growth.

Breakdown models:
- Hotmail: Sig line ("Free email here") - low payload, high frequency/conversion.
- PayPal: $10 referrals - high conversion.
- Uber funnel (multi-step): Contacts imported × invites sent × clicks × signups × re-invites.

Watch creative fatigue - repeat exposure drops conversion. Retention still required. K = (invites/user) × (signup/invite). If > 1, you have a viral win.

## Lesson 6: International Scale - Beat Clones
US-first lets locals dominate abroad. Facebook launched user translations - French live in 12 hours. Scalable infra crushed StudiVZ/Orkut.

Rollout playbook:
- Community translations (fast/cheap).
- Prioritize top languages by users.
- Adapt to shifts (Hindi surge).
- Kill country walls.

## Lesson 7: SEO - 100x Traffic Engine
3 pillars: Keywords, Backlinks, Internal links. Research high-volume terms you can win (avoid giants). Facebook's directory gave 100x organic traffic. Tech basics: XML sitemap, H1 tags right.

## Lesson 8: Notifications - Triggered Not Spam
Youth (<25) ditch email - SMS/WhatsApp/Snapchat rule. Older: Email shines with deliverability.

Golden rules:
- Triggered only: Post-transaction, low-activity.
- Segment marginal users: Facebook boosted clicks 3x this way.
- Spam-proof: Clean lists, handle bounces.

eBay win: First-buy email = massive repeat purchases.

Drip campaigns for retention:
- Welcome series (Days 1,3,7).
- Win-back (30-day churn).
- Upsell post-milestone.

## Bonus Lesson 9: Physics Mindset for Growth
A physics background powers analysis: Break problems modularly, logical cause-effect, clear complex ideas.

Apply to growth:
- Dimensional reasoning: Estimate retention from public data (2B internet → 1.3B FB = high stickiness).
- Experiment design: Testable hypotheses like bomb physics.
- Tech careers: Physics grads crush data science, ML, growth. Python + physics = growth dashboards galore.
    `,
    examples: [
        'Facebook predicting ad revenue with 97% accuracy from 90-day retention curves.',
        'eBay ditched raw registrations for Activated Confirmed Registered Users (ACRUs), tripling quality growth.',
        'Hotmail achieving massive virality with a simple "Get your free email" signature.'
    ],
    scenario: {
        title: 'The Leaky Funnel Dilemma',
        description: "Your app's retention curve drops to almost zero after 7 days. A top marketing agency offers to run a campaign that guarantees 1 million new signups in one week. What is your next move?",
        options: [
            { 
                id: 'scale', 
                label: 'Hire the agency. We need the top-line numbers for investors.', 
                feedback: "Dangerous. Pouring users into a product with a fundamental retention problem (a 'leaky bucket') wastes capital and burns your reputation with users who will churn and never return.",
                impact: { xp: 50 }
            },
            { 
                id: 'fix', 
                label: 'Decline the offer. Focus all resources on fixing the retention curve first.', 
                feedback: 'Correct. A product that people love and stick with is the only foundation for sustainable growth. Fix the leaks before you turn on the acquisition firehose.',
                impact: { xp: 500, skills: ['strategicThinking', 'financialIntelligence'] }
            }
        ]
    },
    vocabulary: [
        { word: 'Retention Curve', definition: 'A graph showing the percentage of users who return to your product over time. A flattening curve is a sign of health.' },
        { word: 'North Star Metric', definition: 'The single metric that best captures the core value your product delivers to customers. It guides the whole company.' },
        { word: 'K-Factor', definition: 'A measure of a product\'s virality. A K-factor greater than 1 means each user brings in at least one new user, leading to exponential growth.' }
    ],
    mistakes: [
        "Focusing on acquisition before having a flat retention curve.",
        "Lacking a single, company-wide North Star Metric for alignment.",
        "Spamming all users with generic notifications instead of targeting marginal users with triggered messages."
    ],
    simulationIntegration: {
        featureUnlock: 'Predictive Growth Engine',
        decision: 'Model long-term user value based on 90-day retention cohorts before scaling paid acquisition.',
        logic: 'Data-driven foresight prevents catastrophic spending on channels with poor ROI.',
        unlockKey: 'predictive-growth'
    },
    summary: 'Sustainable growth is a system: achieve retention plateau, define a North Star, find the magic moment, engineer virality, scale globally, build an SEO engine, and use smart notifications. Execute relentlessly.',
    xpReward: 1000
  },
  'week-15': {
    id: 'week-15',
    level: 2,
    week: 15,
    title: 'Operating a Company: From Chaos to Machine',
    objective: 'Learn to transform a chaotic startup into a high-performance machine by mastering people complexity, delegation, ruthless editing, and data-driven transparency.',
    theory: `## Lesson 1: People Complexity Makes Companies Hard
Building products seems simple on paper, but companies deal with irrational humans packed together 12+ hours daily. Products follow physics; people bring emotions, egos, misfires. Operating means managing this mess while keeping the engine running. Early companies look like duct-taped disasters needing 80-hour hero weeks. Goal: Build a "high-performance machine" so smooth Martians could run it for months unnoticed. Warren Buffett: Make it idiot-proof - eventually idiots will.

## Lesson 2: Leader's Job - Maximize Output
A leader's job is to maximize their organization's output. This means focusing on pure results, not just input hours or busywork. CEOs and VPs must push their teams beyond their individual capacities. Sometimes, this involves doing seemingly mundane tasks to unblock high-value employees.

## Lesson 3: Triage Problems Like a Doctor
Chaos can fuel innovation, so the goal isn't to eliminate it but to manage it. Sort issues into "colds" (minor pains that fade) and "fatal threats" (small problems that can kill the company if ignored). Leaders must be ruthless in triaging—ignore the colds and kill the threats early.

## Lesson 4: Edit Ruthlessly - Simplify Everything
Great leadership is about editing, not just writing. You must slash complexity down to 1-3 clear, repeatable actions. Complexity becomes an excuse for failure. Simplify your message, your product, and your processes. Maintain one clear company voice across all platforms.

## Lesson 5: Delegate Smart - Task Maturity Matrix
Delegate effectively by avoiding the extremes of complete abdication or micromanagement. Use the "task-relevant maturity" model: give experts full autonomy but provide step-by-step guidance to novices. Use a decision matrix based on your conviction and the consequences of the decision to guide your delegation style.
| Conviction | Consequence | Style |
|---|---|---|
| Low | Low | Delegate fully |
| High | High | Lead + explain |

## Lesson 6: Barrels vs Ammunition - Hire Leaders
"Barrels" are independent leaders who can take an idea from birth to shipment. They are rare and culture-specific. "Ammunition" are great supporters who need direction from a barrel. Your company's output scales with the number of barrels you have. Aim for a ratio of 1 barrel for every 10-20 ammunition.

## Lesson 7: One Focus Per Person - A+ Problems
Implement the Peter Thiel rule: everyone owns exactly one problem. This forces the team to work on "A+" problems (hard, high-impact) instead of scattering their efforts on "B+" busywork. This focus accelerates the company and helps retain top talent.

## Lesson 8: Dashboards + Radical Transparency
Build a simple, company-wide dashboard that everyone uses daily. It should measure overall success and the key levers that drive it. Practice radical transparency by sharing board decks (without compensation details) and publishing all meeting notes. This builds trust and alignment. Use paired metrics to prevent gaming the system (e.g., pair "Fraud Rate" with "False Positives").

## Lesson 9: Hunt Data Anomalies + Detail Obsession
Don't just look at averages; hunt for the weird outliers in your data. These anomalies often hide the biggest opportunities. PayPal discovered power sellers this way. Obsess over details. As with Bill Walsh's 49ers, perfecting small things like a receptionist's script or the office layout can transform a company's culture and performance.

## Lesson 10: Management Best Practices
Hold weekly 1:1s where the employee sets the agenda. Limit your direct reports to 5-7 people. Build credibility by excelling at your craft first. Audit all company communications for a consistent voice. Cross-train executives to create a unified culture.
`,
    examples: [
      'A leader playing "$10/hour TaskRabbit" by ordering smoothies to unblock their high-value team.',
      'PayPal spotting power sellers by hunting for data anomalies instead of looking at averages.',
      'Bill Walsh transforming the 49ers by perfecting details like the receptionist\'s script.'
    ],
    scenario: {
      title: 'The Barrel vs. The Sure Bet',
      description: 'A critical new feature needs to be built. You can assign it to your most reliable senior developer (Ammunition) who will get it done perfectly but learn nothing new, or you can give it to a promising but unproven junior developer (potential Barrel) who might fail but will grow immensely if they succeed. What do you do?',
      options: [
        {
          id: 'safe-bet',
          label: 'Give it to the senior developer for a guaranteed win.',
          feedback: 'Safe, but you miss a chance to grow a future leader. This leads to bottlenecks long-term as you rely on a few key people.',
          impact: { xp: 100 }
        },
        {
          id: 'grow-barrel',
          label: 'Risk it on the junior developer and coach them.',
          feedback: 'Correct. Investing in potential "Barrels" is how you scale your company\'s output exponentially. Failure is a part of their training.',
          impact: { xp: 500, skills: ['leadership', 'strategicThinking'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Task-Relevant Maturity', definition: 'A management model where delegation style is adapted based on an employee\'s experience with a specific task.' },
      { word: 'Barrels vs. Ammunition', definition: 'A hiring concept distinguishing independent leaders ("Barrels") who can manage projects end-to-end from skilled supporters ("Ammunition") who need direction.' },
      { word: 'Paired Metrics', definition: 'Tracking two opposing metrics together (e.g., growth vs. quality) to prevent gaming the system and ensure balanced health.' }
    ],
    mistakes: [
      'Treating people management like product management; people are not predictable.',
      'Failing to delegate and instead doing low-value tasks that unblock others, but consume the leader\'s time.',
      'Hiring too much "Ammunition" without enough "Barrels" to lead them, creating bottlenecks.'
    ],
    simulationIntegration: {
      featureUnlock: 'Advanced Operations Dashboard',
      decision: 'Identify and promote your first "Barrel" to a leadership role.',
      logic: 'A company\'s growth is limited by the number of leaders it can create.',
      unlockKey: 'advanced-ops'
    },
    summary: 'Transforming a startup from chaos to a machine requires ruthless editing, smart delegation, a focus on hiring leaders ("Barrels"), and data transparency. The leader\'s job is to maximize team output, not just their own.',
    xpReward: 1000
  },
  'week-16': {
    id: 'week-16',
    level: 2,
    week: 16,
    title: 'Build Winning Enterprise Software Companies',
    objective: 'Learn why enterprise software is a massive opportunity and how to build a winning company by finding a wedge, exploiting incumbent weaknesses, and partnering with early adopters.',
    theory: `## Lesson 1: Enterprise Beats Consumer - Massive Opportunity
Enterprise software crushes consumer in scale. Annual spend: $3.7 trillion vs consumer apps + ads at $170 billion. Box serves 240k businesses, 27M users, 99% Fortune 500 (minus Microsoft). Every industry needs tech now - magical timing.
Consumer fun but hard to monetize. Enterprise "hard" but pays reliably. Box started 2004 solving college file sharing pains - 50MB email limits, barren internet.
| Market truth | |
|---|---|
| Enterprise = 20x consumer size. | |
| Productivity drives buying. | |
| Tech shifts unlock startups. | |

## Lesson 2: Box Journey - Pivot to Enterprise
Box launched 2005 as box.net - free 1GB storage exploded. Gained hundreds of thousands monthly. Founders dropped college, moved Silicon Valley.
Problem: Consumer wanted simpler, enterprise needed security Box lacked. Pivoted 2007 despite investor skepticism - young team vs Oracle/Microsoft giants.
Pivot lessons:
- Match product to real needs.
- Consumer DNA fixes enterprise UX.
- Commit despite doubters.

## Lesson 3: Tech Shifts Making Enterprise Startup-Friendly
5 game-changers now:
- Cloud: No on-prem installs - Salesforce/AWS scale instantly.
- Cheap compute: Trials frictionless.
- Standard platforms: Integrations beat custom builds.
- Mobile BYOD: Users bypass IT gatekeepers.
- Global day one: Deploy worldwide instantly.
2B smartphones, 3B online = user-led IT revolution. Incumbents can't rebuild stacks fast.
| Old Way | New Way |
|---|---|
| On-prem years | Cloud days |
| IT approves | Users adopt |
| Custom per client | Standard APIs |

## Lesson 4: Spot Industry Disruptions Early
Disruptions happen when:
- Raw materials change (storage 1/100th cost).
- Customer models evolve (retail → omni-channel).
Hot sectors:
- Retail: Online + store + delivery sync.
- Healthcare: Wellness + telemedicine + EHR.
- Media: On-demand + targeted.
PlanGrid: iPads kill $4B construction blueprint printing.
Spot signals:
- Cost drops 10x.
- Business models flip.

## Lesson 5: Start Small - Nail the Wedge
Don't boil ocean. Pick narrow wedge, deliver perfection, expand.
Wedge playbook:
- Solve one painful niche.
- Obsess user experience.
- Grow adjacent use cases.
ZenPayroll: Small biz payroll → enterprise HR suite.
Avoid:
- Head-on incumbent fights.
- Feature bloat pleasing all.

## Lesson 6: Exploit Incumbent Asymmetries
Incumbents can't/don't compete everywhere. Find edges:
- Economic: Zenefits earned insurance commissions - incumbents charge software.
- Technical: Platform-agnostic vs locked stacks.
- Speed: Cloud-native vs legacy ports.
Build open APIs - let partners customize vs building all.
Asymmetry hunt:
- What kills their margins?
- Platform vs product?
- Speed they lack?

## Lesson 7: Target Crazy Early Adopters
Partner bleeding-edge customers reshaping industries. Their needs become mainstream tomorrow.
Outlier strategy:
- Find tech-forward pioneers.
- Co-build with their feedback.
- Scale to normal customers.
Skycatch: Drones + early construction adopters → industry standard.
| Customer types | Role |
|---|---|
| Crazy | Co-builders |
| Early | Evangelists |
| Mainstream | Scale |

## Lesson 8: Listen Smart - Don't Build Requests
Customers scream problems - distill to elegant fixes, not wishlists. Feature vomit kills UX.
Smart listening:
- Map pains to root causes.
- Consumer-grade simplicity.
- Viral product sells itself.
Mixpanel: Devs first → enterprise expansion via inside sales.
Rule: Translate requests → best solution.

## Lesson 9: Sales Complements Product
Great product + consultative sales wins enterprise. Domain experts guide complex buys.
Sales evolution:
- Kill "Chuck with briefcase."
- Inside sales for devs.
- Product virality reduces reps needed.
Must-reads:
- Crossing the Chasm
- Innovator's Dilemma
- Behind the Cloud
`,
    examples: [
      'Box pivoted from a consumer tool to an enterprise giant serving 99% of the Fortune 500.',
      'ZenPayroll started with a narrow wedge (small business payroll) and expanded into a full HR suite.',
      'PlanGrid used the iPad to disrupt the $4B construction blueprint printing industry.'
    ],
    scenario: {
      title: 'The Feature Dilemma',
      description: 'Your early enterprise customers love your product\'s simplicity. However, a huge potential client says they will sign a massive contract if you add a complex, custom feature that your other users don\'t need. What do you do?',
      options: [
        {
          id: 'build-feature',
          label: 'Build the custom feature for the big client.',
          feedback: 'Risky. This can lead to feature bloat and a confusing product. You risk losing the simplicity that your core users love.',
          impact: { xp: 100 }
        },
        {
          id: 'stay-focused',
          label: 'Decline and stay focused on your core product.',
          feedback: 'Correct. It\'s painful to turn down a big contract, but protecting your product vision and serving your core market is more important for long-term success.',
          impact: { xp: 500, skills: ['strategicThinking', 'negotiation'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Wedge', definition: 'A narrow, initial entry point into a market that can be expanded over time.' },
      { word: 'Incumbent Asymmetry', definition: 'An advantage a startup has that an established large company (incumbent) cannot easily replicate.' },
      { word: 'BYOD (Bring Your Own Device)', definition: 'The trend of employees using their personal devices for work, allowing them to bypass traditional IT gatekeepers.' }
    ],
    mistakes: [
      'Fighting an incumbent head-on instead of finding an area of asymmetry.',
      'Trying to build every feature a big customer requests, leading to a bloated product.',
      'Ignoring the power of a simple, consumer-grade user experience in enterprise software.'
    ],
    simulationIntegration: {
      featureUnlock: 'Enterprise Sales Module',
      decision: 'Identify one key asymmetry to exploit against a simulated market incumbent.',
      logic: 'Winning in enterprise often means not playing the same game as the giants.',
      unlockKey: 'enterprise-sales'
    },
    summary: 'Enterprise software is a massive opportunity. Win by starting with a narrow wedge, exploiting incumbent weaknesses, and delivering a product so good that it sells itself.',
    xpReward: 1000
  },
  'week-17': {
    id: 'week-17',
    level: 3,
    week: 17,
    title: 'Build Category-Defining IoT Products',
    objective: 'Learn how to build category-defining IoT products by mastering full-stack development, a phased creation process, and deep user behavior research.',
    theory: `
## Lesson 1: Wearables - The IoT Context Brain
IoT today is a fragmented mess of device apps that don't talk to each other. The solution is using wearables as context engines. With their always-on sensors reading heart rate, respiration, and mood, they can tell your thermostat "the user is stressed, cool the room," or instruct your car to "play calming music." This company pioneered this pre-IoT buzz, evolving from headsets to wearable computers, then Bluetooth speakers, and finally to health wearables. A full-stack approach is necessary: hardware, software, and data must work together as one seamless system.
Why wearables rule:
- They are worn 24/7, unlike external devices.
- They provide personal context that other devices lack.
- They serve as a central hub for smart environments.

## Lesson 2: Full-Stack Mastery Required
Most IoT projects fail because hardware teams can't ship software, and software teams can't design wearables. This company blends all three disciplines at an elite level.
The stack breakdown:
- Hardware: Must be comfortable for 24/7 use with precise sensors.
- Software: Needs to be as engaging as Instagram.
- Data: Must process streams of information into actionable insights.
The Up ecosystem is a prime example: wrist sensors, a phone app, a cloud platform, and over 1,000 developer apps create a complete system. The reality is that cultural wars between these disciplines are common. This company solved it by creating cross-functional pods.

## Lesson 3: 6-Phase Product Creation Process
A structured yet flexible process with leadership gates is key.
The phases:
| Phase | Focus | Who Leads |
|---|---|---|
| Exploration | Wild creativity, hackathons | R&D |
| Validation | Science proves it works | Cross-functional |
| Concept | Hero experiences defined | Product Experience team |
| Planning | Trade-offs (battery, cost) | Product managers |
| Development | Build + polish magic | Engineering + design |
| Launch | Iterate from users | All teams |
$50K "angel rounds" are used to fund exploration, with the CTO picking the winning ideas.

## Lesson 4: Exploration - Raw Creativity Unleashed
"Demo Fridays" and hackathons lead to an explosion of ideas. R&D leads the charge, while executives challenge assumptions. Any idea must prove it's worth the $50K potential.
There are no limits—weird ideas can work. Executives act as sounding boards, not dictators, with the CTO having the final say.
Success traits:
- Solves a real user pain.
- Technically feasible.
- Has business potential.
For example, the JamBox was born here, creating a portable audio solution when phones started replacing iPods.

## Lesson 5: WISE Framework - Build Must-Haves
- **W**hat user problem are you solving?
- **I**s it indispensable once experienced?
- Does it have a **S**trategic fit?
The JamBox created the wireless speaker category, capturing 78% of the market in three years. The Up24 wearable established a "Track→Understand→Act" health loop.
Applying WISE:
- Is the problem clear and painful?
- Will users grieve without it?
- Does it fit the company vision?
Focus on hero experiences first, with supporting features coming second.

## Lesson 6: Concept Phase - Bits to Atoms Magic
The Product Experience team (a blend of design and storytelling) turns validated ideas into physical reality. They define the hero features that users will love.
Key work includes:
- Creating a roadmap from today's product to the dream version.
- Developing emotional narratives.
- Prioritizing features.
Fast-track bypasses are used for urgent wins, like the JamBox. Cross-discipline collaboration starts from day one.

## Lesson 7: Trade-Off Hell - System Thinking Wins
The planning and development phases are a brutal war of constraints: battery life vs. features vs. cost vs. comfort. Daily 2.5-hour cross-team calls align everyone.
A system mindset is crucial:
- Hardware can't dictate everything.
- Software can't ignore physics.
- Data needs both to function.
Pods own product themes, and product managers referee the trade-offs. For example, the Up3 wearable required daily balancing of materials, sensors, and manufacturing.

## Lesson 8: Research Right - Behavior Not Questions
Skip "would you buy?" focus groups. Instead, watch real behavior:
- How do people share music socially?
- Daily routines reveal latent needs.
The company decides the product vision, and research refines it. Storyboards are used to map emotional journeys. The truth is that users can't articulate breakthroughs.

## Lesson 9: Global Scale + Culture Fusion
The company has 500 people across 6 countries, 56 markets, and 100,000 retail points. China manufacturing and Apple Store credibility are key.
Distributed challenges:
- Forcing communication with daily calls.
- Shared goals across time zones.
- Global talent adds complexity.
The cultures of hardware, software, and data were blended through a cross-functional obsession.

## Lesson 10: Category Strategy + Experience Continuum
Each product category is unique:
- Phones have an annual replacement cycle.
- Thermostats have a 15-year cycle.
Continuum roadmaps evolve capabilities over time, maintaining brand consistency across all products. For example, the JamBox evolved into a connected home hub. Wearables provide the context that makes environments smart.
`,
    examples: [
      'JamBox created the wireless speaker category and captured 78% market share in 3 years.',
      'The Up wearable ecosystem integrated hardware, software, and a developer platform.',
      'A 6-phase product creation process allowed for both wild creativity and structured execution.'
    ],
    scenario: {
      title: 'The Trade-Off Battle',
      description: 'Your new wearable needs a new, advanced health sensor. Adding it will reduce battery life by 30% and increase the cost by $50. Do you add it?',
      options: [
        {
          id: 'add-sensor',
          label: 'Add the sensor. The feature is a game-changer.',
          feedback: 'Bold, but risky. This could alienate users who value battery life and affordability over cutting-edge features. Monitor churn closely.',
          impact: { xp: 200, skills: ['riskAnalysis'] }
        },
        {
          id: 'skip-sensor',
          label: 'Skip it. Prioritize battery life and a lower price.',
          feedback: 'Safe and user-centric. You protect the core experience. The advanced feature can wait for the next hardware generation when technology improves.',
          impact: { xp: 500, skills: ['strategicThinking'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Full-Stack (IoT)', definition: 'Mastery of hardware, software, and data science as a single, integrated system.' },
      { word: 'Context Engine', definition: 'A system, often a wearable, that uses sensor data to understand a user\'s state and automate their environment.' },
      { word: 'Hero Experience', definition: 'The core, indispensable feature or user journey that defines a product\'s value.' }
    ],
    mistakes: [
      'Having separate hardware and software teams that don\'t communicate daily.',
      'Asking users what they want instead of observing their behavior to find latent needs.',
      'Adding features that compromise the core user experience, like battery life or comfort.'
    ],
    simulationIntegration: {
      featureUnlock: 'IoT Product Lab',
      decision: 'Design a full-stack IoT product, balancing hardware, software, and data trade-offs.',
      logic: 'Category-defining products are integrated systems, not just devices.',
      unlockKey: 'iot-lab'
    },
    summary: 'Category-defining IoT products are not just devices; they are integrated systems built by cross-functional teams who obsess over user behavior and master the art of the trade-off.',
    xpReward: 1000
  },
  'week-18': {
    id: 'week-18',
    level: 3,
    week: 18,
    title: 'Scaling from Chaos to a Machine',
    objective: 'Learn to transition from a chaotic early-stage startup to a scalable, high-performance organization by mastering management, documentation, and founder psychology for the long term.',
    theory: `## Lesson 1: Management Breaks at 25 Employees
Flat structures rule from 0-20 people, where everyone can report directly to the founder. However, once a company hits 25 or more employees, this system shatters, and chaos ensues. To prevent this, every person needs exactly one manager. Avoid matrix management or dual reporting structures, as they kill productivity and create confusion. At this stage, the founder's job must shift from just building the product to building the company itself. Keep innovation in your product and business model, not your org chart.
Signs you need to change:
- Widespread confusion about who to ask for help.
- Managers are overloaded and becoming bottlenecks.
- Decision-making slows to a crawl.
The fix is to implement clear reporting lines and a simple hierarchy.

## Lesson 2: Four Founder Management Traps
1.  **Senior Exec Fear**: Founders who are great generalists early on often fear hiring senior executives. Delaying this past 25 employees is a common mistake that kills a company's ability to scale.
2.  **Hero Mode**: Working 18-hour days to "inspire" the team is not scalable and leads to burnout. The real solution is to hire ahead of your needs and accept that there will always be a backlog.
3.  **Bad Delegation**: Simply dumping tasks on someone without giving them the authority to complete them is not true delegation. Good delegation involves trusting your team with both responsibility and accountability.
4.  **Personal Chaos**: Founders often fail to apply the same system-thinking to their own work. You need personal task management systems to keep track of your team's work and your own priorities.

## Lesson 3: Document "How" and "Why" Early
In a 10-person team, "oral tradition" works for sharing knowledge. At 50 people, it leads to disaster because nobody knows how or why things are done. A company wiki is not just a nice-to-have; it's your company's law. Document your cultural values, core processes (like hiring and firing), and decision-making frameworks. This has high leverage, as it helps new hires onboard faster and ensures your culture scales with you. Start simple with a Google Doc for each process and make reading it mandatory.

## Lesson 4: HR Done Right - A Growth Accelerator
Good HR is not a bureaucratic hurdle; it's a strategic growth accelerator. It involves creating clear career paths, implementing fair feedback cycles, and establishing transparent compensation bands.
Key HR systems for scale:
- **Equity**: Grant 3-5% of total company equity annually in refreshers to prevent top talent from leaving. Use software like Carta instead of messy spreadsheets.
- **Onboarding**: At 50+ people, mandatory training on culture and processes is essential.
- **Talent Management**: Have systems to spot burnout and a dedicated recruiter. Announcing new offers internally before they go out can catch potential issues.

## Lesson 5: The Productivity Killer - Misalignment
As a company grows, communication overhead increases exponentially (n²). Productivity plummets unless everyone is aligned on the top 3 company goals. Test this by asking a random employee what the company's #1 priority is. If they don't know, you have an alignment problem.
Alignment tools:
- **Weekly Manager Syncs**: To cascade information.
- **Monthly All-Hands**: To share progress and answer questions.
- **Quarterly Planning**: To set the next 90-day goals.
Your company values should be the ultimate guide for all decisions. Stay product-driven; process should always serve the product, not the other way around.

## Lesson 6: Financial & Legal Infrastructure
About 18 months into your journey, you need to build robust infrastructure:
| Area | Action | Timeline |
|---|---|---|
| **Accounting** | Outsource your bookkeeping to a professional firm. | 18 months |
| **Legal** | Organize all legal documents (incorporation, contracts). | 18 months |
| **Patents** | File for provisional patents within 12 months of invention. | 12-18 months |
| **Trademarks** | File in the US and other key international markets. | 18 months |
| **FP&A** | Build a detailed 1500-line financial model. | 18+ months |
| **Domains** | Secure all variations of your brand name. | ASAP |
| **Founder Stock** | Consider secondary sales for founder liquidity only after significant traction. | 24+ months |

## Lesson 7: Founder Psychology - The Real Battle
The journey of a founder is one of extreme emotional highs and lows. The lows get deeper and the public criticism (trolls) multiplies with success. To survive, you must adopt a 10-year mindset.
Founder Survival Kit:
- **Take Real Vacations**: Most founders don't. You must.
- **Ignore the Noise**: Don't get distracted by press, conferences, or "advisor" meetings.
- **Handle M&A Wisely**: Only engage in acquisition talks if you are genuinely ready to sell.
The #1 cause of startup death is founders giving up. Your psychological stamina is your most important asset.

## Lesson 8: Marketing & PR - Founders Own It
Before you have product-market fit, ignore PR and marketing entirely. After you have traction, the founders must own the company's messaging. Build direct, personal relationships with journalists who cover your space. Don't outsource your story.
For Business Development (BD), the rules are similar:
- A great product is the prerequisite.
- Deals are built on personal relationships.
- Understand the competitive dynamics.
- Be relentlessly persistent and have clear asks.

## Lesson 9: Growth Realities + Diversity
Understand the "Trough of Sorrow"—the long, grinding period after initial excitement fades where real work happens. Airbnb famously spent 1000 days in this phase. Patience and persistence are non-negotiable.
Build a diverse team with varied backgrounds but an aligned vision. Engineering monocultures often fail because they lack different perspectives to solve complex problems. Finally, while you may need to hire a CEO eventually, founder-CEOs tend to win in the long term.
`,
    examples: [
      "A founder realizing their flat 30-person company is in chaos because everyone reports to them, and then hiring their first VPs.",
      "Airbnb enduring the 'Trough of Sorrow' for 1000 days of slow, grinding progress before hitting their growth stride.",
      "A startup implementing a simple Google Doc as a company 'Wiki' to document core processes, dramatically speeding up new hire onboarding."
    ],
    scenario: {
      title: 'The 25-Employee Wall',
      description: 'Your startup just hired its 25th employee. Communication is breaking down, decisions are slow, and you\'re working 18-hour days trying to keep up. Do you hire a senior executive to manage a team, or do you keep the flat structure and push through in "hero mode"?',
      options: [
        { 
          id: 'hero-mode', 
          label: 'Keep it flat. I need to be involved in everything.', 
          feedback: 'Dangerous. This is "Hero Mode" and leads to founder burnout and company bottlenecks. You need to build the company, not just do all the work.',
          impact: { xp: 100 }
        },
        { 
          id: 'hire-exec', 
          label: 'Hire an experienced executive to lead a team.', 
          feedback: 'Correct. To scale past 25 employees, you must transition from doing all the work to building a team of leaders. This is the right move for long-term growth.',
          impact: { xp: 500, skills: ['leadership', 'strategicThinking'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Matrix Management', definition: 'An organizational structure where an employee reports to multiple managers, which often creates confusion and is advised against in this context.' },
      { word: 'Trough of Sorrow', definition: 'A long period of grinding with little visible progress after a startup\'s initial excitement wears off.' },
      { word: 'Provisional Patent', definition: 'An early-stage patent filing that establishes a priority date but does not require the formal claims of a full patent application.' }
    ],
    mistakes: [
      "Trying to maintain a flat organizational structure past 20-25 employees.",
      "Falling into 'Hero Mode' (working unsustainable hours) instead of hiring ahead of need.",
      "Delegating tasks to employees without giving them the corresponding authority to complete them."
    ],
    simulationIntegration: {
      featureUnlock: 'Organizational Scaling Simulator',
      decision: 'Design your company\'s first formal org chart and define roles for your first executive hire.',
      logic: 'Systems and structure are what turn a chaotic startup into a scalable machine.',
      unlockKey: 'org-chart-sim'
    },
    summary: 'To scale from 25+ employees, you must shift from "doing" to "building the company." This means hiring executives, documenting processes, enforcing alignment, and developing the psychological stamina for a 10-year journey.',
    xpReward: 1000
  },
  'week-19': {
    id: 'week-19',
    level: 3,
    week: 19,
    title: 'Master User Interviews Like Twitch',
    objective: 'Learn how to conduct effective user interviews to uncover deep user needs, validate ideas, and build products customers will pull from you, inspired by the growth of Twitch.',
    theory: `
## Lesson 1: User Interviews Beat Being Your Own User
Kiko failed because of no user talks. Justin.tv grew as founders were users (a cheat code), but stalled. Twitch exploded after broadcaster interviews revealed gold. Analytics miss the root problems that users reveal. The truth is that relying on your own experience limits your ability to scale. Talk to real customers early and often.
Wrong path to take:
- Build only what you want.
- Trust your gut and analytics alone.
- Ignore non-users or those who churn.

## Lesson 2: Pick Right Users - Who Matters Most
Who you interview matters more than what you ask. Twitch prioritized broadcasters because viewers follow them. If you're building a note-taking app, you should interview students, IT buyers, and parents to get a full picture.
| User Type | Why Interview | Example |
|---|---|---|
| Power users | For feature depth | Top streamers |
| Competitor users | To find switch barriers | Casters on other platforms |
| Non-users | To understand market limits | People who want to stream but can't |
| Buyers | For purchase triggers | IT administrators |
Cast a wide net early, then narrow your focus strategically.

## Lesson 3: Interview Like a Detective - Behaviors Only
Conduct live, interactive interviews (Skype is better than email). Always record the session. Focus on the user's current workflow, not on your proposed features.
Example of Stephanie's workflow:
- Notes on laptop speed.
- Diagrams on paper.
- Collaboration in Google Docs.
- Personal thoughts in Evernote.
Detective-style questions:
- "Tell me more about that..."
- "Can you walk me through the last time you did this?"
- "What was the most frustrating part?"
Avoid leading questions like: "Would you like sticky notes?"

## Lesson 4: No Glaring Problems = Dig Deeper
If a user's workflow seems clean, that's a good sign, but you must probe for hidden gaps.
- "Have you ever missed something?"
- "Do you wish anything was faster?"
- "What are your biggest pains when sharing?"
Users often request "faster horses," but it's your job to build the car. Focus on their problems, not their feature requests.
Validation order:
1. Map existing workflows.
2. Find points of friction.
3. Prototype solutions for those friction points.

## Lesson 5: Validate with Prototypes, Not "Sounds Good"
Never trust it when a user says they "love" your idea. Build a simple prototype first, like a browser extension or a landing page. The real test is getting users to pay upfront.
For student apps, you could try:
- Pre-selling semester access.
- Offering a free beta that upgrades to a paid plan.
- Providing incentives for switching from a competitor.
Twitch learned that existing users want polish and advanced features, while non-users need fundamental problems solved first.

## Lesson 6: Three User Types Reveal Full Picture
The Twitch playbook for interviews:
- **Existing broadcasters**: Revealed needs for chat moderation, titles, and interactivity.
- **Competitor streamers**: Uncovered gaps in revenue sharing and video stability.
- **Non-broadcasters**: Highlighted barriers like hardware costs and time conflicts.
This led Twitch to prioritize:
1. Making money for streamers (subscriptions).
2. Improving video reliability.
3. Expanding global access.
Follow-up interviews confirmed this direction was correct.

## Lesson 7: Analytics + Interviews = Unbeatable
Justin.tv's data-only approach led to a local maximum. Twitch's interviews uncovered the problems that data missed.
The power of combining both:
- Interviews find the problems.
- Analytics validate the solutions at scale.
This process helps founders kill their "pet features" that users don't actually want. To get internal buy-in, share interview recordings—it's hard to argue with direct user feedback.

## Lesson 8: Common Interview Killers
Fatal mistakes to avoid:
- Showing your product too early (biases feedback).
- Testing only your pet feature (users will always say "yes").
- Interviewing only easy-to-reach users (leads to skewed insights).
- Using email surveys (no opportunity to probe deeper).
How to recruit correctly:
- Use on-site messaging.
- Attend events and network.
- You don't always need to pay—users often love to help improve products they care about.

## Lesson 9: International Interview Challenges
This is hard mode. Language and cultural gaps are significant barriers. Twitch dominated English-speaking markets first.
Strategy for international interviews:
- Nail your home market first (e.g., US/EU).
- Scale to markets where you can interview effectively.
- Hire local team members for expansion.
A pro tip: Bilingual power users are rare. Pick your international markets wisely.

## Lesson 10: Continuous Research - Targets Evolve
User priorities will shift as your product matures.
- **Early**: Focus on broadcasters.
- **Later**: Shift to game publishers and partners.
Maintain a weekly cadence:
- Conduct 3-5 interviews minimum.
- Rotate between different user types.
- Feed your findings directly into the product roadmap.
Good users will often ramble and provide rich context—this is a goldmine of information.
`,
    examples: [
      "Twitch's growth exploded after they started interviewing broadcasters, which analytics-heavy Justin.tv failed to do.",
      "A note-taking app needs to interview students for daily use cases, but also IT buyers for purchasing decisions.",
      "Instead of asking 'Do you want this feature?', ask 'Walk me through the last time you had this problem.'"
    ],
    scenario: {
      title: 'The "Who to Interview" Dilemma',
      description: "You have time for one user interview this week. Do you talk to a power user who loves your product, or a user who just tried your competitor's product?",
      options: [
        {
          id: 'power-user',
          label: 'Interview the power user.',
          feedback: "Helpful for feature depth, but you risk staying in your own bubble. You learn what you're doing right, but not why others aren't choosing you.",
          impact: { xp: 100 }
        },
        {
          id: 'competitor-user',
          label: "Interview the competitor's user.",
          feedback: "Correct. This reveals crucial insights about switching barriers, competitor strengths, and the real-world problems your product might not be solving.",
          impact: { xp: 500, skills: ['marketAwareness', 'strategicThinking'] }
        }
      ]
    },
    vocabulary: [
      { word: 'Root Problem', definition: 'The underlying cause of a user\'s frustration, often hidden beneath surface-level feature requests.' },
      { word: 'Behavioral Interview', definition: 'A user interview style that focuses on past actions and workflows rather than future desires or opinions.' },
      { word: 'User Persona', definition: 'A fictional character representing a key user segment, used to guide product decisions.' }
    ],
    mistakes: [
      "Only interviewing your own power users and ignoring competitors' users or non-users.",
      "Asking users what features they want instead of observing their behavior.",
      "Showing a prototype too early, which biases the user's feedback."
    ],
    simulationIntegration: {
      featureUnlock: 'User Research Lab',
      decision: 'Conduct 3-5 user interviews before committing to a new feature roadmap.',
      logic: 'Talking to users reveals the problems that data analytics alone cannot see.',
      unlockKey: 'user-research-lab'
    },
    summary: 'Right users + behavior focus + prototypes + continuous cadence = products users pull.',
    xpReward: 1000
  }
};



  
