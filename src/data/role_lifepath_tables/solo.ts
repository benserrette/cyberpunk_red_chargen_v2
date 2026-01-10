/**
 * Solo role lifepath table.
 */
import { LifepathTable } from "@/classes/Lifepath";


const starting_table = new LifepathTable({
    name: "What kind of Solo are you?",
    rows: [
        { value: 'Bodyguard' },
        { value: 'Street Muscle for Hire' },
        { value: 'Corporate Enforcer who takes jobs on the side' },
        { value: 'Corporate or Freelance Black Ops Agent' },
        { value: 'Local Vigilante for Hire' },
        { value: 'Assassin/Hitman for Hire' },
    ],
});

const moral_compass = new LifepathTable({
    name: "What's your moral compass look like?",
    rows: [
        { value: `Always working for good, trying to take out the "bad guys."` },
        { value: `Always spare the innocent (elderly, women, children, pets).` },
        { value: `Will occasionally slip and do unethical or bad things, but it's rare.` },
        { value: `Ruthless and profit centered; you will work for anyone, take any job for the money.` },
        { value: `Willing to bend the rules (and the law) to get the job done.` },
        { value: `Totally evil. You engage in illegal, unethical work all the time; in fact, you enjoy it.` },
    ]
});
starting_table.setNextTable(moral_compass);

const operational_territory = new LifepathTable({
    name: "Where do you operate?",
    rows: [
        { value: `A Corporate Zone` },
        { value: `Combat Zones` },
        { value: `The whole City` },
        { value: `The territory of a single Corporation` },
        { value: `The territory of a particular Fixer or contact` },
        { value: `Wherever the money takes you` },
    ]
});
moral_compass.setNextTable(operational_territory);

const gunning_for = new LifepathTable({
    name: "Who's gunning for you?",
    rows: [
        { value: `A Corporation you may have angered.` },
        { value: `A boostergang you may have tackled earlier.` },
        { value: `Corrupt Lawmen or Lawmen who mistakenly think you're guilty of something.` },
        { value: `A rival Solo from another Corp.` },
        { value: `A Fixer who sees you as a threat.` },
        { value: `A rival Solo who sees you as their nemesis.` },
    ]
});
operational_territory.setNextTable(gunning_for);

export default starting_table;
