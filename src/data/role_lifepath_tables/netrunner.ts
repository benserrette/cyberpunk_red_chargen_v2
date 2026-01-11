/**
 * Netrunner role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build netrunner-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What Kind of Runner are You?",
    rows: [
        { value: "Freelancer who will hack for hire." },
        { value: "Corporate \"drone runner\" who hacks for the Man." },
        { value: "Hacktivist interested in cracking systems and exposing bad guys." },
        { value: "Just like to crack systems for the fun of it." },
        { value: "Part of a regular team of freelancers." },
        { value: "Hack for a Media, politico, or Lawman who hires you as needed." },
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
        { value: "There are screens everywhere." },
        { value: "It looks better in Virtuality, you swear." },
        { value: "It's a filthy bed covered in wires." },
        { value: "Corporate, modular, and utilitarian." },
        { value: "Minimalist, clean, and organized." },
        { value: "It's taken over your entire living space." },
    ],
});

const partner_details = new LifepathTable({
    name: "If You Have a Partner, Who are They?",
    rows: [
        { value: "Family member" },
        { value: "Old friend" },
        { value: "Possible romantic partner as well" },
        { value: "Secret partner who might be a rogue AI. Might." },
        { value: "Secret partner with mob/gang connections" },
        { value: "Secret partner with Corporate connections" },
    ],
});
partner.rows[0].setNextTable(workspace);
partner.rows[1].setNextTable(partner_details);

const other_clients = new LifepathTable({
    name: "Who are Some of Your Other Clients?",
    rows: [
        { value: "Local Fixers who send you clients." },
        { value: "Local gangers who also protect your work area while you sweep for NET threats." },
        { value: "Corporate Execs who use you for \"black project\" work." },
        { value: "Local Solos or other combat types who use you to keep their personal systems secure." },
        { value: "Local Nomads and Fixers who use you to keep their family systems secure." },
        { value: "You work for yourself and sell whatever data you can find on the NET." },
    ],
});
workspace.setNextTable(other_clients);
partner_details.setNextTable(other_clients);

const programs = new LifepathTable({
    name: "Where Do You Get Your Programs?",
    rows: [
        { value: "Dig around in old abandoned City Zones." },
        { value: "Steal them from other Netrunners you brain-burn." },
        { value: "Have a local Fixer supply programs in exchange for hack work." },
        { value: "Corporate Execs supply you with programs in exchange for your services." },
        { value: "You have backdoors into a few Corporate warehouses." },
        { value: "You hit the Night Markets and score programs whenever you can." },
    ],
});
other_clients.setNextTable(programs);

const gunning = new LifepathTable({
    name: "Who's Gunning for You?",
    rows: [
        { value: "You think it might be a rogue AI or a NET Ghost. Either way, it's bad news." },
        { value: "Rival Netrunners who just don't like you." },
        { value: "Corporates who want you to work for them exclusively." },
        { value: "Lawmen who consider you an illegal \"black hat\" and want to bust you." },
        { value: "Old clients who think you screwed them over." },
        { value: "Fixer or another client who wants your services exclusively." },
    ],
});
programs.setNextTable(gunning);

export default starting_table;
