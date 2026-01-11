/**
 * Lawman role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build lawman-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What is Your Position on the Force?",
    rows: [
        { value: "Guard" },
        { value: "Standard Beat or Patrol" },
        { value: "Criminal Investigation" },
        { value: "Special Weapons and Tactics" },
        { value: "Motor Patrol" },
        { value: "Internal Affairs" },
    ],
});

const jurisdiction = new LifepathTable({
    name: "How Wide is Your Group's Jurisdiction?",
    rows: [
        { value: "Corporate Zones" },
        { value: "Standard City Patrol Zone" },
        { value: "Combat Zones" },
        { value: "Outer City" },
        { value: "Recovery Zones" },
        { value: "Open Highways" },
    ],
});
starting_table.setNextTable(jurisdiction);

const corruption = new LifepathTable({
    name: "How Corrupt is Your Group?",
    rows: [
        { value: "Fair, honest policing, strong ethical practices." },
        { value: "Fair and honest policing, but hard on lawbreakers." },
        { value: "Will occasionally slip and do unethical things, but it's rare." },
        { value: "Willing to bend any rules to get the bad guys." },
        { value: "Ruthless and determined to control the Street, even if it means breaking the law." },
        { value: "Totally corrupt. You take bribes, engage in illegal, unethical business all the time." },
    ],
});
jurisdiction.setNextTable(corruption);

const gunning = new LifepathTable({
    name: "Who's Gunning for Your Group?",
    rows: [
        { value: "Organized crime" },
        { value: "Boostergangs" },
        { value: "Police accountability group" },
        { value: "Dirty politicians" },
        { value: "Smugglers" },
        { value: "Street criminals" },
    ],
});
corruption.setNextTable(gunning);

const major_target = new LifepathTable({
    name: "Who is Your Group's Major Target?",
    rows: [
        { value: "Organized crime" },
        { value: "Boostergangs" },
        { value: "Drug runners" },
        { value: "Dirty politicians" },
        { value: "Smugglers" },
        { value: "Street crime" },
    ],
});
gunning.setNextTable(major_target);

export default starting_table;
