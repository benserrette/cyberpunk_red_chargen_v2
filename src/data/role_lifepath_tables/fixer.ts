/**
 * Fixer role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build fixer-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What Kind of Fixer are You?",
    rows: [
        { value: "Broker deals between rival gangs." },
        { value: "Procure rare or atypical resources for exclusive clientele." },
        { value: "Specialize in brokering Solo or Tech services as an agent." },
        { value: "Supply a regular resource for the Night Markets, like food, medicines, or drugs." },
        { value: "Procure highly illegal resources, like street drugs or milspec weapons." },
        { value: "Supply resources for Techs and Medtechs, like parts and medical supplies." },
        { value: "Operate several successful Night Markets, although not as owner." },
        { value: "Broker use contracts for heavy machinery, military vehicles, and aircraft." },
        { value: "Broker deals as a fence for scavengers raiding Corps or Combat Zones." },
        { value: "Act as an exclusive agent for a Media, Rockerboy, or a Nomad Pack." },
    ],
});

const partner = new LifepathTable({
    name: "Got a Partner or Work Alone?",
    rows: [
        { value: "Got a partner" },
        { value: "Work alone" },
    ],
});
starting_table.setNextTable(partner);

const partner_details = new LifepathTable({
    name: "Got a Partner? Who?",
    rows: [
        { value: "Family member" },
        { value: "Old friend" },
        { value: "Possible romantic partner as well" },
        { value: "Mentor" },
        { value: "Secret partner with mob/gang connections" },
        { value: "Secret partner with Corporate connections" },
    ],
});

const office = new LifepathTable({
    name: "What's Your \"Office\" Like?",
    rows: [
        { value: "You don't have one. You like to keep it mobile." },
        { value: "A booth in a local bar." },
        { value: "All Data Pool messages and anonymous dead drops." },
        { value: "Spare room in a warehouse, shop, or clinic." },
        { value: "An otherwise abandoned building." },
        { value: "The lobby of a cube hotel." },
    ],
});
partner.rows[0].setNextTable(partner_details);
partner.rows[1].setNextTable(office);

const side_clients = new LifepathTable({
    name: "Who are Your Side Clients?",
    rows: [
        { value: "Local Rockerboys or Medias who use you to get them gigs or contacts." },
        { value: "Local gangers who also protect your work area or home." },
        { value: "Corporate Execs who use you for \"black project\" procurement work." },
        { value: "Local Solos or other combat types who use you to get them jobs or contacts." },
        { value: "Local Nomads and Fixers who use you to set up transactions or deals." },
        { value: "Local politicos or Execs who depend on you for finding out information." },
    ],
});
partner_details.setNextTable(side_clients);
office.setNextTable(side_clients);

const gunning = new LifepathTable({
    name: "Who's Gunning for You?",
    rows: [
        { value: "Combat Zone gangers who want you to work for them exclusively." },
        { value: "Rival Fixers trying to steal your clients." },
        { value: "Execs who want you to work for them exclusively." },
        { value: "Enemy of a former client who wants to clean up \"loose ends\"—like you." },
        { value: "Old client who thinks you screwed them over." },
        { value: "Rival Fixer trying to beat you out for resources and parts." },
    ],
});
side_clients.setNextTable(gunning);

export default starting_table;
