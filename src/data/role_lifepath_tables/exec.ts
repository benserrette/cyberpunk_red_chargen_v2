/**
 * Exec role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build exec-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What kind of corp do you work for?",
    rows: [
        { value: 'Financial' },
        { value: 'Media and Communications' },
        { value: 'Cybertech and Medical Technologies' },
        { value: 'Pharmaceuticals and Biotech' },
        { value: 'Food, Clothing, or other General Consumables' },
        { value: 'Energy Production' },
        { value: 'Personal Electronics and Robotics' },
        { value: 'Corporate Services' },
        { value: 'Consumer Services' },
        { value: 'Real Estate and Construction' },
    ]
});

const division = new LifepathTable({
    name: "What division do you work in?",
    rows: [
        { value: 'Procurement' },
        { value: 'Manufacturing' },
        { value: 'Research and Development' },
        { value: 'Human Resources' },
        { value: 'Public Affairs/Publicity/Advertising' },
        { value: 'Mergers and Acquisitions' },
    ]
});
starting_table.setNextTable(division);

const goodbad = new LifepathTable({
    name: "How Good or Bad is Your Corp?",
    rows: [
        { value: `Always working for good, fully supporting ethical practices.` },
        { value: `Operates as a fair and honest business all the time.` },
        { value: `Will occasionally slip and do unethical things, but it's rare.` },
        { value: `Willing to bend the rules to get what it needs.` },
        { value: `Ruthless and profit-centered, willing to do some bad things.` },
        { value: `Totally evil. Will engage in illegal, unethical business all the time.` },
    ]
});
division.setNextTable(goodbad);

const wherebased = new LifepathTable({
    name: "Where is Your Corp Based?",
    rows: [
        { value: `One city` },
        { value: `Several cities` },
        { value: `Statewide` },
        { value: `National` },
        { value: `International, offices in a few major cities` },
        { value: `International, offices everywhere` },
    ]
});
goodbad.setNextTable(wherebased);

const gunning = new LifepathTable({
    name: "Who's Gunning for Your Group?",
    rows: [
        { value: `Rival Corp in the same industry.` },
        { value: `Law enforcement is watching you.` },
        { value: `Local Media wants to bring you down.` },
        { value: `Different divisions in your own company are feuding with each other.` },
        { value: `Local government doesn't like your Corp.` },
        { value: `International Corporations are eyeing you for a hostile takeover.` },
    ]
});
wherebased.setNextTable(gunning);

const boss = new LifepathTable({
    name: "Current State with Your Boss",
    rows: [
        { value: "Your Boss mentors you but watch out for their enemies." },
        { value: "Your Boss gives you a free hand and doesn't want to know what you're up to." },
        { value: "Your Boss is a micromanager who tries to meddle in your work." },
        { value: "Your Boss is a psycho whose unpredictable outbursts are offset by quiet paranoia." },
        { value: "Your Boss is cool and watches your back against rivals." },
        { value: "Your Boss is threatened by your meteoric rise and is planning to knife you." },
    ]
});
gunning.setNextTable(boss);

export default starting_table;
