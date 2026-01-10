/**
 * Skill catalog, categories, and required skill list.
 */
import { Stat } from './stats';
import { Skill } from '@/classes/Skill';

const required_skills: string[] = [
  "Athletics",
  "Brawling",
  "Concentration",
  "Conversation",
  "Education",
  "Evasion",
  "First Aid",
  "Human Perception",
  "Language - Streetslang",
  "Local Expert - Home",
  "Perception",
  "Persuasion",
  "Stealth",
]

const categories: Record<string, string[]> = {
  "Awareness": [
    "Concentration",
    "Conceal / Reveal Object",
    "Lip Reading",
    "Perception",
    "Tracking"
  ],
  "Body": [
    "Athletics",
    "Contortionist",
    "Dance",
    "Endurance",
    "Resist Torture / Drugs",
    "Stealth"
  ],
  "Control": [
    "Drive Land Vehicle",
    "Pilot Air Vehicle",
    "Pilot Sea Vehicle",
    "Riding"
  ],
  "Ranged Weapon": [
    "Archery",
    "Autofire",
    "Handgun",
    "Heavy Weapons",
    "Shoulder Arms"
  ],
  "Education": [
    "Accounting",
    "Animal Handling",
    "Bureaucracy",
    "Business",
    "Composition",
    "Criminology",
    "Cryptography",
    "Deduction",
    "Education",
    "Gamble",
    "Language - Streetslang",
    "Library Search",
    "Local Expert - Home",
    "Science",
    "Tactics",
    "Wilderness Survival"
  ],
  "Fighting": [
    "Brawling",
    "Evasion",
    "Martial Arts",
    "Melee Weapon"
  ],
  "Performance": [
    "Acting",
    "Play Instrument"
  ],
  "Social": [
    "Bribery",
    "Conversation",
    "Human Perception",
    "Interrogation",
    "Persuasion",
    "Personal Grooming",
    "Streetwise",
    "Trading",
    "Wardrobe & Style"
  ],
  "Technique": [
    "Air Vehicle Tech",
    "Basic Tech",
    "Cybertech",
    "Demolitions",
    "Electronics / Security Tech",
    "First Aid",
    "Forgery",
    "Land Vehicle Tech",
    "Paint / Draw / Sculpt",
    "Paramedic",
    "Photography / Film",
    "Pick Lock",
    "Pick Pocket",
    "Sea Vehicle Tech",
    "Weaponstech"
  ]
}

const skill_info: { name: string, stat: Stat, x2?: boolean }[] = [
  { name: "Acting", stat: Stat.COOL },
  { name: "Accounting", stat: Stat.INT },
  { name: "Air Vehicle Tech", stat: Stat.TECH },
  { name: "Animal Handling", stat: Stat.INT },
  { name: "Archery", stat: Stat.REF },
  { name: "Athletics", stat: Stat.DEX },
  { name: "Autofire", stat: Stat.REF, x2: true },
  { name: "Basic Tech", stat: Stat.TECH },
  { name: "Brawling", stat: Stat.DEX },
  { name: "Bribery", stat: Stat.COOL },
  { name: "Business", stat: Stat.INT },
  { name: "Bureaucracy", stat: Stat.INT },
  { name: "Composition", stat: Stat.INT },
  { name: "Concentration", stat: Stat.WILL },
  { name: "Conceal / Reveal Object", stat: Stat.INT },
  { name: "Conversation", stat: Stat.EMP },
  { name: "Contortionist", stat: Stat.DEX },
  { name: "Criminology", stat: Stat.INT },
  { name: "Cryptography", stat: Stat.INT },
  { name: "Cybertech", stat: Stat.TECH },
  { name: "Dance", stat: Stat.DEX },
  { name: "Deduction", stat: Stat.INT },
  { name: "Demolitions", stat: Stat.TECH, x2: true },
  { name: "Drive Land Vehicle", stat: Stat.REF },
  { name: "Education", stat: Stat.INT },
  { name: "Electronics / Security Tech", stat: Stat.TECH, x2: true },
  { name: "Endurance", stat: Stat.WILL },
  { name: "Evasion", stat: Stat.DEX },
  { name: "First Aid", stat: Stat.TECH },
  { name: "Forgery", stat: Stat.TECH },
  { name: "Gamble", stat: Stat.INT },
  { name: "Handgun", stat: Stat.REF },
  { name: "Heavy Weapons", stat: Stat.REF, x2: true },
  { name: "Human Perception", stat: Stat.EMP },
  { name: "Interrogation", stat: Stat.COOL },
  { name: "Language - Streetslang", stat: Stat.INT },
  { name: "Land Vehicle Tech", stat: Stat.TECH },
  { name: "Library Search", stat: Stat.INT },
  { name: "Lip Reading", stat: Stat.INT },
  { name: "Local Expert - Home", stat: Stat.INT },
  { name: "Martial Arts", stat: Stat.DEX, x2: true },
  { name: "Melee Weapon", stat: Stat.DEX },
  { name: "Paint / Draw / Sculpt", stat: Stat.TECH },
  { name: "Paramedic", stat: Stat.TECH, x2: true },
  { name: "Perception", stat: Stat.INT },
  { name: "Personal Grooming", stat: Stat.COOL },
  { name: "Persuasion", stat: Stat.COOL },
  { name: "Photography / Film", stat: Stat.TECH },
  { name: "Pick Lock", stat: Stat.TECH },
  { name: "Pick Pocket", stat: Stat.TECH },
  { name: "Pilot Air Vehicle", stat: Stat.REF, x2: true },
  { name: "Pilot Sea Vehicle", stat: Stat.REF },
  { name: "Play Instrument", stat: Stat.TECH },
  { name: "Resist Torture / Drugs", stat: Stat.WILL },
  { name: "Riding", stat: Stat.REF },
  { name: "Science", stat: Stat.INT },
  { name: "Sea Vehicle Tech", stat: Stat.TECH },
  { name: "Shoulder Arms", stat: Stat.REF },
  { name: "Stealth", stat: Stat.DEX },
  { name: "Streetwise", stat: Stat.COOL },
  { name: "Tactics", stat: Stat.INT },
  { name: "Tracking", stat: Stat.INT },
  { name: "Trading", stat: Stat.COOL },
  { name: "Wardrobe & Style", stat: Stat.COOL },
  { name: "Weaponstech", stat: Stat.TECH },
  { name: "Wilderness Survival", stat: Stat.INT },
];

const SKILLS_LIST: Skill[] = []
for (const skill of skill_info) {
  SKILLS_LIST.push(new Skill(skill))
}
export { SKILLS_LIST, required_skills, categories }