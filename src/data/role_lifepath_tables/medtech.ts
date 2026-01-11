/**
 * Medtech role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build medtech-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What Kind of Medtech are You?",
    rows: [
        { value: "Surgeon" },
        { value: "General Practitioner" },
        { value: "Trauma Medic" },
        { value: "Psychiatrist" },
        { value: "Cyberpsycho Therapist" },
        { value: "Ripperdoc" },
        { value: "Cryosystems Operator" },
        { value: "Pharmacist" },
        { value: "Bodysculptor" },
        { value: "Forensic Pathologist" },
    ],
});

const partner = new LifepathTable({
    name: "Got a Partner, or Do You Work Alone?",
    rows: [
        { value: "Got a partner" },
        { value: "Work alone" },
    ],
});
starting_table.setNextTable(partner);

const partner_details = new LifepathTable({
    name: "Tell Us About Your Partner(s).",
    rows: [
        { value: "Trauma Team group" },
        { value: "Old friend" },
        { value: "Possible romantic partner as well" },
        { value: "Family member" },
        { value: "Secret partner with mob/gang connections" },
        { value: "Secret partner with Corporate connections" },
    ],
});

const workspace = new LifepathTable({
    name: "What's Your Workspace Like?",
    rows: [
        { value: "Sterilized daily in the morning like clockwork." },
        { value: "It's not state-of-the-art anymore, but it's comfortable to you." },
        { value: "Your cryo equipment is also used to cool drinks." },
        { value: "Everything possible is single-use and stored compacted until needed." },
        { value: "Not as clean as many of your patients may have hoped." },
        { value: "Meticulously organized, sharpened, and sterilized." },
    ],
});
partner.rows[0].setNextTable(partner_details);
partner.rows[1].setNextTable(workspace);

const main_clients = new LifepathTable({
    name: "Who are Your Main Clients?",
    rows: [
        { value: "Local Fixers who send you clients." },
        { value: "Local gangers who also protect your work area or home in exchange for medical help." },
        { value: "Corporate Execs who use you for \"black project\" medical work." },
        { value: "Local Solos or other combat types who use you for medical help." },
        { value: "Local Nomads and Fixers who bring you wounded clients." },
        { value: "Trauma Team paramedical work." },
    ],
});
partner_details.setNextTable(main_clients);
workspace.setNextTable(main_clients);

const supplies = new LifepathTable({
    name: "Where Do You Get Your Supplies?",
    rows: [
        { value: "Scavenge stashes of medical supplies you find in abandoned City Zones." },
        { value: "Strip parts from bodies after firefights." },
        { value: "Have a local Fixer bring you supplies in exchange for medical work." },
        { value: "Corporate Execs or Trauma Team supply you with stuff in exchange for your services." },
        { value: "You have a backdoor into a few Corporate or Hospital warehouses." },
        { value: "You hit the Night Markets and score deals whenever you can." },
    ],
});
main_clients.setNextTable(supplies);

export default starting_table;
