/**
 * Tech role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build tech-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What Kind of Tech are You?",
    rows: [
        { value: "Cyberware Technician" },
        { value: "Vehicle Mechanic" },
        { value: "Jack of All Trades" },
        { value: "Small Electronics Technician" },
        { value: "Weaponsmith" },
        { value: "Crazy Inventor" },
        { value: "Robot and Drone Mechanic" },
        { value: "Heavy Machinery Mechanic" },
        { value: "Scavenger" },
        { value: "Nautical Mechanic" },
    ],
});

const partner = new LifepathTable({
    name: "Got a Partner, or Do You Work Alone?",
    rows: [
        { value: "Work alone" },
        { value: "Got a partner" },
    ],
});
starting_table.setNextTable(partner);

const workspace = new LifepathTable({
    name: "What's Your Workspace Like?",
    rows: [
        { value: "A mess strewn with blueprint paper." },
        { value: "Everything is color coded, but it's still a nightmare." },
        { value: "Totally digital and obsessively backed up every day." },
        { value: "You design everything on your Agent." },
        { value: "You keep everything just in case you need it later." },
        { value: "Only you understand your filing system." },
    ],
});

const partner_details = new LifepathTable({
    name: "If You Have a Partner, Who are They?",
    rows: [
        { value: "Family member" },
        { value: "Old friend" },
        { value: "Possible romantic partner as well" },
        { value: "Mentor" },
        { value: "Secret partner with mob/gang connections" },
        { value: "Secret partner with Corporate connections" },
    ],
});
partner.rows[0].setNextTable(workspace);
partner.rows[1].setNextTable(partner_details);

const main_clients = new LifepathTable({
    name: "Who are Your Main Clients?",
    rows: [
        { value: "Local Fixers who send you clients." },
        { value: "Local gangers who also protect your work area or home." },
        { value: "Corporate Execs who use you for \"black project\" work." },
        { value: "Local Solos or other combat types who use you for weapon upkeep." },
        { value: "Local Nomads and Fixers who bring you \"found\" tech to repair." },
        { value: "You work for yourself and sell what you invent/repair." },
    ],
});
workspace.setNextTable(main_clients);
partner_details.setNextTable(main_clients);

const supplies = new LifepathTable({
    name: "Where Do You Get Your Supplies?",
    rows: [
        { value: "Scavenge the wreckage you find in abandoned City Zones." },
        { value: "Strip gear from bodies after firefights." },
        { value: "Have a local Fixer bring you supplies in exchange for repair work." },
        { value: "Corporate Execs supply you with stuff in exchange for your services." },
        { value: "You have backdoor into a few Corporate warehouses." },
        { value: "You hit the Night Markets and score deals whenever you can." },
    ],
});
main_clients.setNextTable(supplies);

const gunning = new LifepathTable({
    name: "Who's Gunning For You?",
    rows: [
        { value: "Combat Zone gangers who want you to work for them exclusively." },
        { value: "Rival Tech trying to steal your customers." },
        { value: "Corporates who want you to work for them exclusively." },
        { value: "Larger manufacturer trying to bring you down because your mods are a threat." },
        { value: "Old client who thinks you screwed them over." },
        { value: "Rival Tech trying to beat you out for resources and parts." },
    ],
});
supplies.setNextTable(gunning);

export default starting_table;
