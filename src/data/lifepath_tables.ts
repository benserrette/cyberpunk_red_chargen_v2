/**
 * Base lifepath table data.
 */
import { LifepathTable, LifepathRow } from "@/classes/Lifepath";

export { cultural_origin as CulturalOriginTable }

const cultural_origin = new LifepathTable({
    name: "Cultural Origin", rows: [
        { value: "North American" },
        { value: "South/Central American" },
        { value: "Western European" },
        { value: "Eastern European" },
        { value: "Middle Eastern/North African" },
        { value: "Sub-Saharan African" },
        { value: "South Asian" },
        { value: "South East Asian" },
        { value: "East Asian" },
        { value: "Oceania/Pacific Islander" },
    ]
});

const north_american_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Chinese" },
        { value: "Cree" },
        { value: "Creole" },
        { value: "English" },
        { value: "French" },
        { value: "Navajo" },
        { value: "Spanish" },
    ]
});
const south_central_american_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Creole" },
        { value: "English" },
        { value: "German" },
        { value: "Guarani" },
        { value: "Mayan" },
        { value: "Portuguese" },
        { value: "Quechua" },
        { value: "Spanish" },
    ]
});
const western_european_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Dutch" },
        { value: "English" },
        { value: "French" },
        { value: "German" },
        { value: "Italian" },
        { value: "Norwegian" },
        { value: "Portuguese" },
        { value: "Spanish" },
    ]
});
const eastern_european_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "English" },
        { value: "Finnish" },
        { value: "Polish" },
        { value: "Romanian" },
        { value: "Russian" },
        { value: "Ukrainian" },
    ]
});
const middle_eastern_north_african_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Arabic" },
        { value: "Berber" },
        { value: "English" },
        { value: "Farsi" },
        { value: "French" },
        { value: "Hebrew" },
        { value: "Turkish" },
    ]
});
const sub_saharan_african_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Arabic" },
        { value: "English" },
        { value: "French" },
        { value: "Hausa" },
        { value: "Lingala" },
        { value: "Oromo" },
        { value: "Portuguese" },
        { value: "Swahili" },
        { value: "Twi" },
        { value: "Yoruba" },
    ]
});
const south_asian_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Bengali" },
        { value: "Dari" },
        { value: "English" },
        { value: "Hindi" },
        { value: "Nepali" },
        { value: "Sinhalese" },
        { value: "Tamil" },
        { value: "Urdu" },
    ]
});
const south_east_asian_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Arabic" },
        { value: "Burmese" },
        { value: "English" },
        { value: "Filipino" },
        { value: "Hindi" },
        { value: "Indonesian" },
        { value: "Khmer" },
        { value: "Malayan" },
        { value: "Vietnamese" },
    ]
});
const east_asian_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Cantonese Chinese" },
        { value: "English" },
        { value: "Japanese" },
        { value: "Korean" },
        { value: "Mandarin Chinese" },
        { value: "Mongolian" },
    ]
});
const oceania_pacific_islander_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "English" },
        { value: "French" },
        { value: "Hawaiian" },
        { value: "Maori" },
        { value: "Pama-Nyungan" },
        { value: "Tahitian" },
    ]
});
cultural_origin.rows[0].next_table = north_american_languages;
cultural_origin.rows[1].next_table = south_central_american_languages;
cultural_origin.rows[2].next_table = western_european_languages;
cultural_origin.rows[3].next_table = eastern_european_languages;
cultural_origin.rows[4].next_table = middle_eastern_north_african_languages;
cultural_origin.rows[5].next_table = sub_saharan_african_languages;
cultural_origin.rows[6].next_table = south_asian_languages;
cultural_origin.rows[7].next_table = south_east_asian_languages;
cultural_origin.rows[8].next_table = east_asian_languages;
cultural_origin.rows[9].next_table = oceania_pacific_islander_languages;


const personality = new LifepathTable({
    name: "What are you like?",
    description: `This is what you're like as a person. Are you the kind of Character that stands away from the pack, aloof and calculating? A party animal who loves to get messed up? The stable and competent professional who always has a plan?`,
    rows: [
        { value: "Shy and secretive" },
        { value: "Rebellious, antisocial, and violent" },
        { value: "Arrogant, proud, and aloof" },
        { value: "Moody, rash, and headstrong" },
        { value: "Picky, fussy, and nervous" },
        { value: "Stable and serious" },
        { value: "Silly and fluff-headed" },
        { value: "Sneaky and deceptive" },
        { value: "Intellectual and detached" },
        { value: "Friendly and outgoing" },
    ]
});
cultural_origin.setNextTable(personality);


const clothing_style = new LifepathTable({
    name: "Clothing Style",
    description: `In Cyberpunk, what you look like is (to The Street) a snapshot of who you are. Your clothes, hairstyles and even personal touches can determine how people will relate to you, for good or for bad. Remember: an Exec wearing Street Casual, a rainbow mohawk, and ritual scars is probably not going to get that promotion they wanted. 
    Note that your clothing style is more about the style of clothes you favor, not the individual items. You could wear a tailored business suit jacket, a rawhide fringed Nomad jacket, a high-tech light collared urban flash jacket, or even a torn and ripped leather jacket with gang colors all over the back. Each one is the same item of clothing (jacket), but defined by the style of jacket your Character favors.`,
    rows: [
        { value: "Generic Chic (Standard, Colorful, Modular)" },
        { value: "Leisurewear (Comfort, Agility, Athleticism)" },
        { value: "Urban Flash (Flashy, Technological, Streetwear)" },
        { value: "Businesswear (Leadership, Presence, Authority)" },
        { value: "High Fashion (Exclusive, Designer, Couture)" },
        { value: "Bohemian (Folksy, Retro, Free-spirited)" },
        { value: "Bag Lady Chic (Homeless, Ragged, Vagrant)" },
        { value: "Gang Colors (Dangerous, Violent, Rebellious)" },
        { value: "Nomad Leathers (Western, Rugged, Tribal)" },
        { value: "Asia Pop (Bright, Costume-like, Youthful)" },
    ]
});
personality.setNextTable(clothing_style);

const hairstyle = new LifepathTable({
    name: "Hairstyle",
    description: `Your hairstyle can be a defining characteristic of your character. It can reflect your personality, cultural background, or simply be a fashion statement. Choose the hairstyle that best suits your character.`,
    rows: [
        { value: "Mohawk" },
        { value: "Long and ratty" },
        { value: "Short and spiked" },
        { value: "Wild and all over" },
        { value: "Bald" },
        { value: "Striped" },
        { value: "Wild colors" },
        { value: "Neat and short" },
        { value: "Short and curly" },
        { value: "Long and straight" },
    ]
});
clothing_style.setNextTable(hairstyle);


const affectation = new LifepathTable({
    name: "Affectation you are never without",
    description: `An affectation is a personal touch that you add to your appearance. It can be a piece of jewelry, a tattoo, a piercing, or even a cybernetic implant. Choose an affectation that best suits your character.`,
    rows: [
        { value: "Tattoos" },
        { value: "Mirrorshades" },
        { value: "Ritual scars" },
        { value: "Spiked gloves" },
        { value: "Nose rings" },
        { value: "Tongue or other piercings" },
        { value: "Strange fingernail implants" },
        { value: "Spiked boots or heels" },
        { value: "Fingerless gloves" },
        { value: "Strange contacts" },
    ]
});
hairstyle.setNextTable(affectation);

const motivation = new LifepathTable({
    name: "What do you value most?",
    description: `What drives you? What is it that you want more than anything else in the world? This is your motivation.`,
    rows: [
        { value: "Money" },
        { value: "Honor" },
        { value: "Your word" },
        { value: "Honesty" },
        { value: "Knowledge" },
        { value: "Vengeance" },
        { value: "Love" },
        { value: "Power" },
        { value: "Family" },
        { value: "Friendship" },
    ]
});
affectation.setNextTable(motivation);

const feelings_about_people = new LifepathTable({
    name: "How do you feel about most people?",
    description: `Are you a people person, or do you hate everyone?`,
    rows: [
        { value: "I stay neutral." },
        { value: "I stay neutral." },
        { value: "I like almost everyone." },
        { value: "I hate almost everyone." },
        { value: "People are tools. Use them for your own goals then discard them." },
        { value: "Every person is a valuable individual." },
        { value: "People are obstacles to be destroyed if they cross me." },
        { value: "People are untrustworthy. Don't depend on anyone." },
        { value: "Wipe 'em all out and let the cockroaches take over." },
        { value: "People are wonderful!" },
    ]
});
motivation.setNextTable(feelings_about_people);

const most_valued_person = new LifepathTable({
    name: "Most valued person in your life?",
    description: ``,
    rows: [
        { value: "A parent" },
        { value: "A brother or sister" },
        { value: "A lover" },
        { value: "A friend" },
        { value: "Yourself" },
        { value: "A pet" },
        { value: "A teacher or mentor" },
        { value: "A Public figure" },
        { value: "A personal hero" },
        { value: "No one" },
    ]
});
feelings_about_people.setNextTable(most_valued_person);

const most_valued_possession = new LifepathTable({
    name: "Most valued possession you own?",
    description: ``,
    rows: [
        { value: "A weapon" },
        { value: "A tool" },
        { value: "A piece of clothing" },
        { value: "A photograph" },
        { value: "A book or diary" },
        { value: "A recording" },
        { value: "A musical instrument" },
        { value: "A piece of jewelry" },
        { value: "A toy" },
        { value: "A letter" },
    ]
});
most_valued_person.setNextTable(most_valued_possession);

const original_family_background = new LifepathTable({
    name: "Original Background",
    description: `Who are you and where did you originally come from? Were you born with a silver spoon in your mouth or were you using it to stab your brother so you could steal that extra bite of dead rat you both found?`,
    rows: [
        { value: "Corporate Execs", description: `Wealthy, powerful, with servants, luxury homes, and the best of everything. Private security made sure you were always safe. You definitely went to a big-name private school.` },
        { value: "Corporate Managers", description: `Well to do, with large homes, safe neighborhoods, nice cars, etc. Sometimes your parent(s) would hire servants, although this was rare. You had a mix of private and corporate education.` },
        { value: "Corporate Technicians", description: `Middle-middle class, with comfortable conapts or Beaverville suburban homes, minivans and corporate-run technical schools. Kind of like living 1950s America crossed with 1984.` },
        { value: "Nomad Pack", description: `You had a mix of rugged trailers, vehicles, and huge road kombis for your home. You learned to drive and fight at an early age, but the family was always there to care for you. Food was actually fresh and abundant. Mostly home schooled.` },
        { value: "Ganger 'Family'", description: `A savage, violent home in any place the gang could take over. You were usually hungry, cold, and scared. You probably didn't know who your actual parents were. Education? The Gang taught you how to fight, kill, and steal—what else did you need to know?` },
        { value: "Combat Zoners", description: `A step up from a gang "family," your home was a decaying building somewhere in the ‘Zone', heavily fortified. You were hungry at times, but regularly could score a bed and a meal. Home schooled.` },
        { value: "Urban Homeless", description: `You lived in cars, dumpsters, or abandoned shipping modules. If you were lucky. You were usually hungry, cold, and scared, unless you were tough enough to fight for the scraps. Education? School of Hard Knocks.` },
        { value: "Megastructure Warren Rats", description: `You grew up in one of the huge new megastructures that went up after the War. A tiny conapt, kibble and scop for food, a mostly warm bed. Some better educated adult warren dwellers or a local Corporation may have set up a school.` },
        { value: "Reclaimers", description: `You started out on the road, but then moved into one of the deserted ghost towns or cities to rebuild it. A pioneer life: dangerous, but with plenty of simple food and a safe place to sleep. You were home schooled if there was anyone who had the time.` },
        { value: "Edgerunners", description: `Your home was always changing based on your parents' current "job." Could be a luxury apartment, an urban conapt, or a dumpster if you were on the run. Food and shelter ran the gamut from gourmet to kibble.` },
    ]
});
most_valued_possession.setNextTable(original_family_background);

const childhood_environment = new LifepathTable({
    name: "Childhood Environment",
    description: `How did you grow up? What kind of places did you and your sibs hang out in? Safe and calm? Crazy dangerous? Massively oppressive? It's possible that something happened in your background and your environment turns out drastically different from your original family background.`,
    rows: [
        { value: "Ran on The Street, with no adult supervision." },
        { value: "Spent in a safe Corp Zone walled off from the rest of the City." },
        { value: "In a Nomad pack moving from place to place." },
        { value: "In a Nomad pack with roots in transport (ships, planes, caravans)." },
        { value: "In a decaying, once upscale neighborhood, now holding off the boosters to survive." },
        { value: "In the heart of the Combat Zone, living in a wrecked building or other squat." },
        { value: "In a huge 'megastructure' building controlled by a Corp or the City." },
        { value: "In the ruins of a deserted town or city taken over by Reclaimers." },
        { value: "In a Drift Nation (a floating offshore city) that is a meeting place for all kinds of people." },
        { value: "In a Corporate luxury 'starscraper,' high above." },
    ]
});
original_family_background.setNextTable(childhood_environment);


const family_crisis = new LifepathTable({
    name: "Family Crisis",
    description: `SIn the Time of the Red, the world is still recovering from a world war and other disasters. Chances are, something happened to you and your family along the way. What's the story there?`,
    rows: [
        { value: "Your family lost everything through betrayal." },
        { value: "Your family lost everything through bad management." },
        { value: "Your family was exiled or otherwise driven from their original home/nation/Corporation." },
        { value: "Your family is imprisoned, and you alone escaped." },
        { value: "Your family vanished. You are the only remaining member." },
        { value: "Your family was killed, and you were the only survivor." },
        { value: "Your family is involved in a long-term conspiracy, organization, or association, such as a crime family or revolutionary group." },
        { value: "Your family was scattered to the winds due to misfortune." },
        { value: "Your family is cursed with a hereditary feud that has lasted for generations." },
        { value: "You are the inheritor of a family debt; you must honor this debt before moving on with your life." },
    ]
});
childhood_environment.setNextTable(family_crisis);

const friends = new LifepathTable({
    name: "Friends",
    description: `It's not all grim. Sometimes you link up with people who have your back.`,
    repeat: "1d10-7",
    rows: [
        { value: "Like an older sibling to you." },
        { value: "Like a younger sibling to you." },
        { value: "A teacher or mentor." },
        { value: "A partner or coworker." },
        { value: "A former lover." },
        { value: "An old enemy." },
        { value: "Like a parent to you." },
        { value: "An old childhood friend." },
        { value: "Someone you know from The Street." },
        { value: "Someone with a common interest or goal." },
    ]
});
family_crisis.setNextTable(friends);


const enemies = new LifepathTable({
    name: "Enemy",
    description: `Enemies are a big part of life in the Cyberpunk world. You're going in get in someone's face sooner or later, so
    you might as well find out who they are, why there's a beef, and what they can do to you to even a score.`,
    repeat: "1d10-7",
    rows: [
        { value: "Ex-friend" },
        { value: "Ex-lover" },
        { value: "Estranged relative" },
        { value: "Childhood enemy" },
        { value: "Person working for you" },
        { value: "Person you work for" },
        { value: "Partner or coworker" },
        { value: "Corporate exec" },
        { value: "Government official" },
        { value: "Boosterganger" },
    ]
});
friends.setNextTable(enemies);

const enemy_who_was_wronged = new LifepathTable({
    name: "Who was wronged?",
    rows: [
        { value: "You" },
        { value: "Them" }
    ]
});
enemies.rows.map((row) => { row.next_table = enemy_who_was_wronged });

const enemy_cause = new LifepathTable({
    name: "What caused it?",
    rows: [
        { value: "Caused the other to lose face or status." },
        { value: "Caused the loss of lover, friend, or relative." },
        { value: "Caused a major public humiliation." },
        { value: "Accused the other of cowardice or some other major personal flaw." },
        { value: "Deserted or betrayed the other." },
        { value: "Turned down the other's offer of a job or romantic involvement." },
        { value: "You just don't like each other." },
        { value: "One of you was a romantic rival." },
        { value: "One of you was a business rival." },
        { value: "One of you set the other up for a crime they didn't commit." },
    ]
});
enemy_who_was_wronged.rows.map((row) => { row.next_table = enemy_cause });

const enemy_throw = new LifepathTable({
    name: "What can they throw at you?",
    rows: [
        { value: "Just themselves and even they won't go out of their way." },
        { value: "Just themselves." },
        { value: "Just themselves and a close friend." },
        { value: "Themselves and a few (1d6/2) friends." },
        { value: "Themselves and a few (1d10/2) friends." },
        { value: "An entire gang (at least 1d10 + 5 people)." },
        { value: "The local cops or other Lawmen." },
        { value: "A powerful gang lord or small Corporation." },
        { value: "A powerful Corporation." },
        { value: "An entire city or government or agency." },
    ]
});
enemy_cause.rows.map((row) => { row.next_table = enemy_throw });



const do_about_it = new LifepathTable({
    name: "What are you/they gonna do about it?",
    description: `It's not really ugly until the bad blood between you and your enemies finally comes to the surface. When you meet, the metal is going to shred. So what's gonna go down when they get back in your face?`,
    rows: [
        { value: "Avoid the scum." },
        { value: "Avoid the scum." },
        { value: "Go into a murderous rage and try to physically rip their face off." },
        { value: "Go into a murderous rage and try to physically rip their face off." },
        { value: "Backstab them indirectly." },
        { value: "Backstab them indirectly." },
        { value: "Verbally attack them." },
        { value: "Verbally attack them." },
        { value: "Set them up for a crime or other transgression they didn't commit." },
        { value: "Set out to murder or maim them." },
    ]
});
enemy_throw.rows.map((row) => { row.next_table = do_about_it });


const tragic_love_affairs = new LifepathTable({
    name: "Tragic Love Affair",
    description: `It wouldn't be Cyberpunk if there was a happily ever-after, now would it? You've probably been involved with someone by now but that may not be the case. We don't care about the one's that worked, we want to know about the ugly ones that ripped out your heart. We also don't care who they were, what their gender was, or any other details, but feel free to use the Personals sections above to get your own ideas about what they looked like, acted like, and maybe even had in common with you. Not that it mattered in the end, right?`,
    repeat: '1d10-7',
    rows: [
        { value: "Your lover died in an accident." },
        { value: "Your lover mysteriously vanished." },
        { value: "It just didn't work out." },
        { value: "A personal goal or vendetta came between you and your lover." },
        { value: "Your lover was kidnapped." },
        { value: "Your lover went insane or cyberpsycho." },
        { value: "Your lover committed suicide." },
        { value: "Your lover was killed in a fight." },
        { value: "A rival cut you out of the action." },
        { value: "Your lover is imprisoned or exiled." },
    ]
})
enemies.setNextTable(tragic_love_affairs);


const life_goals = new LifepathTable({
    name: "Your Life Goals",
    rows: [
        { value: "Get rid of a bad reputation." },
        { value: "Gain power and control." },
        { value: "Get off The Street no matter what it takes." },
        { value: "Cause pain and suffering to anyone who crosses you." },
        { value: "Live down your past life and try to forget it." },
        { value: "Hunt down those responsible for your miserable life and make them pay." },
        { value: "Get what's rightfully yours." },
        { value: "Save, if possible, anyone else involved in your background, like a lover, or family member." },
        { value: "Gain fame and recognition." },
        { value: "Become feared and respected." },
    ]
})
tragic_love_affairs.setNextTable(life_goals);

