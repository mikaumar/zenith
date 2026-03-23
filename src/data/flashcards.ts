export interface Flashcard {
  id: string
  category: Category
  front: string
  back: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export type Category =
  | 'frameworks'
  | 'voice'
  | 'body-language'
  | 'anxiety'
  | 'impromptu'
  | 'storytelling'
  | 'articulation'
  | 'advanced'

export const CATEGORY_LABELS: Record<Category, string> = {
  frameworks: 'Frameworks',
  voice: 'Voice & Delivery',
  'body-language': 'Body Language',
  anxiety: 'Handling Anxiety',
  impromptu: 'Impromptu Speaking',
  storytelling: 'Storytelling',
  articulation: 'Articulation',
  advanced: 'Advanced Techniques',
}

export const CATEGORY_COLORS: Record<Category, string> = {
  frameworks: '#ed8936',
  voice: '#48bb78',
  'body-language': '#4299e1',
  anxiety: '#9f7aea',
  impromptu: '#f56565',
  storytelling: '#ed64a6',
  articulation: '#38b2ac',
  advanced: '#ecc94b',
}

export const flashcards: Flashcard[] = [
  // Frameworks
  {
    id: 'f1',
    category: 'frameworks',
    front: 'What is the PREP framework?',
    back: 'Point → Reason → Example → Point. State your position, explain why, give evidence, restate. Best for opinions and recommendations.',
    difficulty: 'beginner',
  },
  {
    id: 'f2',
    category: 'frameworks',
    front: 'What is the Rule of Three?',
    back: 'Structure any talk around exactly 3 main points. Three is the smallest number that creates a pattern. Two feels incomplete, four feels like a list.',
    difficulty: 'beginner',
  },
  {
    id: 'f3',
    category: 'frameworks',
    front: 'What is SCR (Situation-Complication-Resolution)?',
    back: 'Used by McKinsey for executive communication. Situation (context) → Complication (the challenge) → Resolution (the path forward).',
    difficulty: 'intermediate',
  },
  {
    id: 'f4',
    category: 'frameworks',
    front: 'What is the BLUF method?',
    back: 'Bottom Line Up Front. State your conclusion first, then explain. "We have a churn problem. Q3 retention dropped 12%..." instead of burying the lead.',
    difficulty: 'intermediate',
  },
  {
    id: 'f5',
    category: 'frameworks',
    front: 'What is Problem-Solution-Benefit?',
    back: 'Problem (what\'s wrong) → Solution (what to do) → Benefit (why it matters). Best for persuasive talks and pitches.',
    difficulty: 'beginner',
  },
  {
    id: 'f6',
    category: 'frameworks',
    front: 'What is Past-Present-Future?',
    back: '"Previously, we..." → "Currently, we\'re..." → "Going forward, we should..." Best for status updates and strategy discussions.',
    difficulty: 'beginner',
  },
  // Voice & Delivery
  {
    id: 'v1',
    category: 'voice',
    front: 'What are the four dimensions of voice control?',
    back: 'Pace (speed), Volume (projection), Tone (pitch variation), and Pauses (deliberate silence). Mastering all four dramatically increases speaking impact.',
    difficulty: 'beginner',
  },
  {
    id: 'v2',
    category: 'voice',
    front: 'How do you eliminate filler words?',
    back: '1. Record yourself and count fillers. 2. Replace each filler with a 1-second pause. 3. Practice transitions (most fillers occur between thoughts). 4. Focus on the first 30 seconds.',
    difficulty: 'intermediate',
  },
  {
    id: 'v3',
    category: 'voice',
    front: 'What are the four types of pauses?',
    back: 'Emphasis pause (1-2s, before/after key points), Transition pause (2-3s, between sections), Dramatic pause (2-4s, before a reveal), Thinking pause (1-2s, gathering thoughts).',
    difficulty: 'intermediate',
  },
  {
    id: 'v4',
    category: 'voice',
    front: 'What is the ideal presentation pace?',
    back: '100-130 words per minute (slightly slower than conversational 120-150 wpm). Key: vary your pace — slow for emphasis, faster for energy.',
    difficulty: 'beginner',
  },
  {
    id: 'v5',
    category: 'voice',
    front: 'What\'s a good vocal warm-up routine?',
    back: 'Lip trills (30s) → Tongue twisters (1min) → Diaphragm breathing 4-4-4 (1min) → Pitch slides low to high (30s) → Power phrase at full volume (30s).',
    difficulty: 'intermediate',
  },
  // Body Language
  {
    id: 'b1',
    category: 'body-language',
    front: 'What is the Power Position?',
    back: 'Feet shoulder-width apart, weight evenly distributed, shoulders back and relaxed, chin parallel to floor, arms at sides or gesturing. Never crossed arms or hands in pockets.',
    difficulty: 'beginner',
  },
  {
    id: 'b2',
    category: 'body-language',
    front: 'What is the Gesture Box?',
    back: 'An imaginary box from your shoulders to your hips, extending about 12 inches in front of you. Keep all gestures within this zone for maximum impact and natural appearance.',
    difficulty: 'beginner',
  },
  {
    id: 'b3',
    category: 'body-language',
    front: 'What is the Triangle Method for eye contact?',
    back: 'Look at one person for 3-5 seconds, then move to another person in a different section. Cover the entire room over time. In large audiences, look at sections.',
    difficulty: 'intermediate',
  },
  {
    id: 'b4',
    category: 'body-language',
    front: 'When should you move vs. stand still?',
    back: 'Move: to transition between topics, engage a different section, create energy during stories. Stand still: making a critical point, during a dramatic pause, answering a question.',
    difficulty: 'intermediate',
  },
  // Anxiety
  {
    id: 'a1',
    category: 'anxiety',
    front: 'What is Box Breathing?',
    back: 'Inhale 4 seconds → Hold 4 seconds → Exhale 4 seconds → Hold 4 seconds → Repeat 4 cycles. Used by Navy SEALs for stress management.',
    difficulty: 'beginner',
  },
  {
    id: 'a2',
    category: 'anxiety',
    front: 'What is the Physiological Sigh?',
    back: 'The fastest calm-down technique: double inhale through the nose (one long, one short) → long slow exhale through the mouth. Repeat 2-3 times.',
    difficulty: 'beginner',
  },
  {
    id: 'a3',
    category: 'anxiety',
    front: 'What should you do if anxiety spikes mid-talk?',
    back: '1. Pause and breathe (3s feels natural to audience). 2. Ground yourself (feel feet on floor). 3. Find a friendly face. 4. Sip water. 5. Consciously slow down.',
    difficulty: 'intermediate',
  },
  {
    id: 'a4',
    category: 'anxiety',
    front: 'What is Systematic Desensitization?',
    back: 'Gradually increase exposure: alone (record) → 1 friend → 3-5 friends → team meeting → department → conference. Don\'t skip levels. Build comfort at each stage.',
    difficulty: 'advanced',
  },
  // Impromptu
  {
    id: 'i1',
    category: 'impromptu',
    front: 'What is the 3-Second Rule for impromptu speaking?',
    back: '1. Pause (1-3 seconds). 2. Choose a framework. 3. Start talking and commit. The biggest mistake is starting before you\'ve decided where you\'re going.',
    difficulty: 'beginner',
  },
  {
    id: 'i2',
    category: 'impromptu',
    front: 'What is the "Three Things" fallback framework?',
    back: '"There are three things I\'d highlight: First... Second... Third... If I had to pick one, it\'s [most important]." Works for literally any topic.',
    difficulty: 'beginner',
  },
  {
    id: 'i3',
    category: 'impromptu',
    front: 'How do you buy time legitimately when put on the spot?',
    back: '"That\'s a great question, let me think..." / Rephrase the question / Ask a clarifying question / Take a sip of water. Never ramble while figuring out your answer.',
    difficulty: 'intermediate',
  },
  {
    id: 'i4',
    category: 'impromptu',
    front: 'What is the What-So What-Now What framework?',
    back: 'What (here\'s what happened) → So What (here\'s why it matters) → Now What (here\'s what we should do). Best for incident response and updates.',
    difficulty: 'intermediate',
  },
  // Storytelling
  {
    id: 's1',
    category: 'storytelling',
    front: 'What are the 3 C\'s every story needs?',
    back: 'Character (someone we care about), Conflict (tension/challenge), Change (what was different after). Without conflict, there is no story — just an anecdote.',
    difficulty: 'beginner',
  },
  {
    id: 's2',
    category: 'storytelling',
    front: 'What does "Show, Don\'t Tell" mean in speaking?',
    back: 'Instead of "I was nervous," say "My hands were shaking so badly I had to grip the podium." Use sensory details and dialogue instead of abstract descriptions.',
    difficulty: 'intermediate',
  },
  {
    id: 's3',
    category: 'storytelling',
    front: 'How many stories should a 20-minute talk have?',
    back: '2-3 stories is ideal. More than that dilutes impact. Use stories to: hook the opening, illustrate data points, bridge sections, and reinforce the closing.',
    difficulty: 'intermediate',
  },
  // Articulation
  {
    id: 'ar1',
    category: 'articulation',
    front: 'What are the two dimensions of articulation?',
    back: 'Physical: clear pronunciation, enunciation, mouth/tongue control. Mental: choosing right words, structuring thoughts logically, saying exactly what you mean.',
    difficulty: 'beginner',
  },
  {
    id: 'ar2',
    category: 'articulation',
    front: 'What are common hedge words to eliminate?',
    back: '"I think maybe..." → "We should..." / "I feel like it might..." → "It is..." / "I just wanted to say..." → just say it. Hedge only when you genuinely don\'t know.',
    difficulty: 'intermediate',
  },
  {
    id: 'ar3',
    category: 'articulation',
    front: 'What is the One Idea Per Sentence rule?',
    back: 'The most common cause of unclear speech is stacking too many ideas in one sentence. If a sentence has more than one comma, split it into two. Short sentences = clear speech.',
    difficulty: 'beginner',
  },
  {
    id: 'ar4',
    category: 'articulation',
    front: 'How do you stay articulate under pressure?',
    back: '1. Slow down by 20%. 2. Use shorter sentences. 3. Breathe at every period. 4. Pick ONE anchor word for your response. 5. If you can\'t explain it in 1 minute, simplify.',
    difficulty: 'advanced',
  },
  // Advanced
  {
    id: 'ad1',
    category: 'advanced',
    front: 'What is Anaphora?',
    back: 'Repeating a phrase at the beginning of successive sentences for rhythm and power. "We will fight on the beaches. We will fight on the landing grounds. We will fight in the fields."',
    difficulty: 'advanced',
  },
  {
    id: 'ad2',
    category: 'advanced',
    front: 'What is the AREA method for Q&A?',
    back: 'Answer (give a direct answer first) → Reason (explain briefly) → Example (provide evidence) → Ask ("Does that address your question?").',
    difficulty: 'intermediate',
  },
  {
    id: 'ad3',
    category: 'advanced',
    front: 'What\'s the safest type of humor in speaking?',
    back: 'Self-deprecating humor (laugh at yourself lightly) and observational humor (shared experiences). Never punch down. If a joke doesn\'t land, move on — don\'t explain.',
    difficulty: 'advanced',
  },
  {
    id: 'ad4',
    category: 'advanced',
    front: 'How do you adapt for executive audiences?',
    back: 'Lead with conclusions (BLUF), be concise, focus on impact and numbers. Executives don\'t want the journey — they want the destination and the cost.',
    difficulty: 'advanced',
  },
  // ── NEW: More Frameworks ──
  {
    id: 'f7',
    category: 'frameworks',
    front: 'What is the STAR method?',
    back: 'Situation → Task → Action → Result. The gold standard for behavioral interview answers. Always end with a measurable result.',
    difficulty: 'beginner',
  },
  {
    id: 'f8',
    category: 'frameworks',
    front: 'What is the Pyramid Principle?',
    back: 'Start with your answer/recommendation, then support it with key arguments, then support those with data. Think inverted pyramid — top-down, not bottom-up.',
    difficulty: 'advanced',
  },
  {
    id: 'f9',
    category: 'frameworks',
    front: 'What is the 4MAT framework?',
    back: 'Why (motivate) → What (inform) → How (apply) → What If (explore). Addresses all learning styles in order. Best for teaching and training.',
    difficulty: 'advanced',
  },
  {
    id: 'f10',
    category: 'frameworks',
    front: 'What is the Monroe Motivated Sequence?',
    back: 'Attention → Need → Satisfaction → Visualization → Action. A 5-step persuasion structure. Used by top TED speakers and sales professionals.',
    difficulty: 'advanced',
  },
  {
    id: 'f11',
    category: 'frameworks',
    front: 'What is the Advantage-Disadvantage-Recommendation framework?',
    back: '"Here are the pros... Here are the cons... My recommendation is..." Best for presenting options to decision-makers. Shows balanced thinking.',
    difficulty: 'intermediate',
  },
  // ── NEW: More Voice & Delivery ──
  {
    id: 'v6',
    category: 'voice',
    front: 'How do you project your voice without shouting?',
    back: 'Breathe from your diaphragm (belly, not chest), open your mouth wider, aim your voice at the back wall, and support each word with breath. Volume comes from air, not throat strain.',
    difficulty: 'beginner',
  },
  {
    id: 'v7',
    category: 'voice',
    front: 'What is vocal variety and why does it matter?',
    back: 'Varying pitch, pace, volume, and tone throughout your talk. Monotone is the #1 reason audiences disengage. Even great content fails with flat delivery.',
    difficulty: 'beginner',
  },
  {
    id: 'v8',
    category: 'voice',
    front: 'What is upspeak and how do you fix it?',
    back: 'Upspeak: ending statements with a rising pitch (sounds like a question). Fix: consciously drop your pitch at the end of declarative sentences. Record yourself to hear it.',
    difficulty: 'intermediate',
  },
  {
    id: 'v9',
    category: 'voice',
    front: 'What is the "Power Start" technique?',
    back: 'Begin your first sentence at a slightly louder volume with strong, clear articulation. This signals confidence and commands attention. Never mumble your opening.',
    difficulty: 'intermediate',
  },
  {
    id: 'v10',
    category: 'voice',
    front: 'How does hydration affect your voice?',
    back: 'Dehydration thickens vocal cord mucus, causing cracking and strain. Drink room-temperature water (not ice cold) throughout the day. Avoid caffeine and dairy before speaking.',
    difficulty: 'beginner',
  },
  // ── NEW: More Body Language ──
  {
    id: 'b5',
    category: 'body-language',
    front: 'What is mirroring?',
    back: 'Subtly matching the body language, pace, and energy of your audience or conversation partner. Builds rapport unconsciously. Don\'t mimic — mirror naturally.',
    difficulty: 'intermediate',
  },
  {
    id: 'b6',
    category: 'body-language',
    front: 'What are nervous body language tells to eliminate?',
    back: 'Fidgeting, touching face/hair, swaying, pacing, gripping the podium, fig-leaf hands, crossed arms, looking at the floor. Replace with purposeful stillness and open gestures.',
    difficulty: 'beginner',
  },
  {
    id: 'b7',
    category: 'body-language',
    front: 'How do you use hand gestures effectively?',
    back: 'Match gesture to content: palms up = openness, palms down = certainty, counting on fingers = listing, spreading hands = scale. Every gesture should reinforce your words.',
    difficulty: 'intermediate',
  },
  {
    id: 'b8',
    category: 'body-language',
    front: 'What is the "Open vs. Closed" body language spectrum?',
    back: 'Open: arms uncrossed, palms visible, leaning forward, making eye contact. Closed: crossed arms, turned away, hands hidden, looking down. Always aim for open.',
    difficulty: 'beginner',
  },
  // ── NEW: More Anxiety ──
  {
    id: 'a5',
    category: 'anxiety',
    front: 'What is Cognitive Reframing for speaking anxiety?',
    back: 'Replace "I\'m terrified" with "I\'m excited." The physiological response (elevated heart rate, adrenaline) is identical. Your brain believes the label you give it.',
    difficulty: 'intermediate',
  },
  {
    id: 'a6',
    category: 'anxiety',
    front: 'What is the 5-4-3-2-1 Grounding Technique?',
    back: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Anchors you in the present and short-circuits anxious spiraling.',
    difficulty: 'beginner',
  },
  {
    id: 'a7',
    category: 'anxiety',
    front: 'Why does preparation reduce anxiety?',
    back: 'Anxiety feeds on uncertainty. Knowing your first 30 seconds cold, rehearsing transitions, and anticipating questions eliminates 80% of fear. Prepare the structure, not a script.',
    difficulty: 'beginner',
  },
  {
    id: 'a8',
    category: 'anxiety',
    front: 'What is the "Worst Case" exercise?',
    back: 'Ask: "What\'s the absolute worst that can happen?" Then: "How likely is that?" Then: "Could I survive it?" The answer is almost always yes. This deflates catastrophizing.',
    difficulty: 'intermediate',
  },
  {
    id: 'a9',
    category: 'anxiety',
    front: 'How do you handle a shaky voice?',
    back: '1. Slow down (shaking increases with speed). 2. Drop your pitch slightly. 3. Breathe from the diaphragm. 4. Focus on one friendly face. Usually stabilizes within 30-60 seconds.',
    difficulty: 'intermediate',
  },
  // ── NEW: More Impromptu ──
  {
    id: 'i5',
    category: 'impromptu',
    front: 'What is the "Bridge" technique?',
    back: 'Acknowledge the question, then bridge to what you want to talk about. "That\'s important, and what I\'d add is..." Politicians use this constantly. Useful when you don\'t know the answer.',
    difficulty: 'intermediate',
  },
  {
    id: 'i6',
    category: 'impromptu',
    front: 'How do you handle a question you don\'t know the answer to?',
    back: '"I don\'t have that data in front of me, but here\'s what I do know..." or "Let me get back to you on the specifics by end of day." Never bluff — credibility is everything.',
    difficulty: 'beginner',
  },
  {
    id: 'i7',
    category: 'impromptu',
    front: 'What is the "Yes, And" technique from improv?',
    back: 'Accept what was said ("Yes") and build on it ("And"). Never block or negate. "Yes, that\'s a valid concern, and one way to address it is..." Keeps conversations collaborative.',
    difficulty: 'intermediate',
  },
  {
    id: 'i8',
    category: 'impromptu',
    front: 'How do you give a toast or speech with zero preparation?',
    back: 'Use: Gratitude → Story → Wish. "I\'m grateful for [person/occasion]... I remember when [short story]... Here\'s to [wish for the future]." Works for weddings, dinners, any event.',
    difficulty: 'beginner',
  },
  // ── NEW: More Storytelling ──
  {
    id: 's4',
    category: 'storytelling',
    front: 'What is the "In Media Res" opening?',
    back: 'Start in the middle of the action. "I was standing at the podium when the screen went black." Then rewind to explain how you got there. Creates instant engagement.',
    difficulty: 'intermediate',
  },
  {
    id: 's5',
    category: 'storytelling',
    front: 'What makes a story relatable?',
    back: 'Universal emotions: fear, embarrassment, triumph, loss, surprise. Your audience doesn\'t need the same experience — they need to recognize the same feeling.',
    difficulty: 'beginner',
  },
  {
    id: 's6',
    category: 'storytelling',
    front: 'What is the "Lesson Sandwich"?',
    back: 'Point → Story → Point. State what you want them to learn, tell a story that illustrates it, then restate the lesson. The story makes the lesson stick.',
    difficulty: 'beginner',
  },
  {
    id: 's7',
    category: 'storytelling',
    front: 'How long should a story be in a business context?',
    back: '60-90 seconds maximum. Set the scene in 1 sentence, get to the conflict in 2 sentences, resolve it in 2 sentences. Business audiences want efficiency, not epic sagas.',
    difficulty: 'intermediate',
  },
  {
    id: 's8',
    category: 'storytelling',
    front: 'What is the "Vulnerability Paradox"?',
    back: 'Sharing a genuine struggle or mistake makes you MORE credible, not less. Audiences trust speakers who show they\'re human. But only share resolved vulnerabilities — not active crises.',
    difficulty: 'advanced',
  },
  // ── NEW: More Articulation ──
  {
    id: 'ar5',
    category: 'articulation',
    front: 'What is the "Clarity Test" for your message?',
    back: 'Can a 12-year-old understand your main point? If not, simplify. Jargon doesn\'t make you sound smart — it makes you sound unclear. Use plain language, then add precision.',
    difficulty: 'beginner',
  },
  {
    id: 'ar6',
    category: 'articulation',
    front: 'What is the difference between concise and vague?',
    back: 'Concise: "Revenue dropped 15% because of churn." Vague: "Things have been challenging lately." Be brief AND specific. Cut words, not information.',
    difficulty: 'intermediate',
  },
  {
    id: 'ar7',
    category: 'articulation',
    front: 'What is "Labeling" in articulation?',
    back: 'Announcing what you\'re about to do. "I want to make two points." "Let me give you an example." "Here\'s the bottom line." Labels give your audience a map to follow.',
    difficulty: 'beginner',
  },
  {
    id: 'ar8',
    category: 'articulation',
    front: 'How do you simplify a complex idea?',
    back: '1. Find the ONE core point. 2. Use an analogy ("It\'s like..."). 3. Give a concrete example. 4. Remove all jargon. If you can\'t explain it simply, you don\'t understand it well enough.',
    difficulty: 'intermediate',
  },
  {
    id: 'ar9',
    category: 'articulation',
    front: 'What are "Weasel Words" to avoid?',
    back: '"Basically," "essentially," "sort of," "kind of," "literally" (used figuratively), "honestly." These weaken your message and signal uncertainty. Delete them all.',
    difficulty: 'intermediate',
  },
  // ── NEW: More Advanced ──
  {
    id: 'ad5',
    category: 'advanced',
    front: 'What is the "Callback" technique?',
    back: 'Reference something from earlier in your talk (or someone else\'s talk) later on. Creates cohesion, rewards attention, and makes you seem more polished. Comedians use this constantly.',
    difficulty: 'advanced',
  },
  {
    id: 'ad6',
    category: 'advanced',
    front: 'What is "Chunking" in communication?',
    back: 'Breaking complex information into digestible groups of 3-4 items. Phone numbers are chunked (555-867-5309). Do the same with your ideas: "Three things to know..."',
    difficulty: 'intermediate',
  },
  {
    id: 'ad7',
    category: 'advanced',
    front: 'What is the "Emotional Arc" of a great talk?',
    back: 'Curiosity (hook) → Understanding (context) → Tension (problem/conflict) → Relief (solution) → Inspiration (call to action). Map your audience\'s emotional journey, not just your content.',
    difficulty: 'advanced',
  },
  {
    id: 'ad8',
    category: 'advanced',
    front: 'How do you handle a hostile audience?',
    back: '1. Acknowledge their frustration ("I understand this is difficult"). 2. Find common ground. 3. Stay calm — anger is contagious, but so is composure. 4. Focus on facts, not feelings.',
    difficulty: 'advanced',
  },
  {
    id: 'ad9',
    category: 'advanced',
    front: 'What is "Strategic Silence"?',
    back: 'Using silence as a tool: after asking a question (let them think), after a key point (let it land), when someone interrupts (pause and let them finish). Silence is power, not weakness.',
    difficulty: 'advanced',
  },
  {
    id: 'ad10',
    category: 'advanced',
    front: 'How do you read the room?',
    back: 'Watch for: crossed arms (resistance), phone checking (disengagement), nodding (agreement), leaning forward (interest). Adjust in real-time: speed up if bored, slow down if confused, engage if distracted.',
    difficulty: 'advanced',
  },
]
