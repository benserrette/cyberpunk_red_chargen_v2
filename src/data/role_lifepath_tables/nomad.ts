/**
 * Nomad role lifepath table.
 *
 * Linked table chain that the Character role lifepath walks to build nomad-
 * specific narrative rows.
 */
import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What Do You Do for Your Pack?",
    rows: [
        { value: "Scout (negotiator)" },
        { value: "Outrider (protection, weapons)" },
        { value: "Transport pilot/driver" },
        { value: "Loadmaster (large cargo mover, trucker)" },
        { value: "Solo smuggler" },
        { value: "Procurement (fuel, vehicles, etc.)" },
    ],
});

const philosophy = new LifepathTable({
    name: "What's Your Pack's Overall Philosophy?",
    rows: [
        { value: "Always working for good; your Pack accepts others, just wants to get along." },
        { value: "It's more like a family business. Operates as a fair and honest concern." },
        { value: "Will occasionally slip and do unethical things, but it's rare." },
        { value: "Willing to bend the rules whenever they get in the way to get what the Pack needs." },
        { value: "Ruthless and self-centered, willing to do some bad things if it will get the Pack ahead." },
        { value: "Totally evil. You rage up and down the highways, killing, looting, and just terrorizing everyone." },
    ],
});
starting_table.setNextTable(philosophy);

const gunning = new LifepathTable({
    name: "Who's Gunning for Your Pack?",
    rows: [
        { value: "Organized Crime" },
        { value: "Boostergangs" },
        { value: "Drug Runners" },
        { value: "Dirty Politicians" },
        { value: "Rival Packs in the same businesses" },
        { value: "Dirty Cops" },
    ],
});
philosophy.setNextTable(gunning);

const pack_size = new LifepathTable({
    name: "How Big is Your Pack?",
    rows: [
        { value: "A single extended tribe or family" },
        { value: "A couple dozen members" },
        { value: "Forty or fifty members" },
        { value: "A hundred or more members" },
        { value: "A Blood Family (hundreds of members)" },
        { value: "An Affiliated Family (made of several Blood Families)" },
    ],
});
gunning.setNextTable(pack_size);

const base = new LifepathTable({
    name: "Is Your Pack Based on Land, Air, or Sea?",
    rows: [
        { value: "Land" },
        { value: "Air" },
        { value: "Sea" },
    ],
});
pack_size.setNextTable(base);

const land = new LifepathTable({
    name: "If on Land, What Do They Do?",
    rows: [
        { value: "Gogang" },
        { value: "Passenger transport" },
        { value: "Chautauqua/school" },
        { value: "Traveling show/carnival" },
        { value: "Migrant farmers" },
        { value: "Cargo transport" },
        { value: "Shipment protection" },
        { value: "Smuggling" },
        { value: "Mercenary army" },
        { value: "Construction work gang" },
    ],
});

const air = new LifepathTable({
    name: "If in Air, What Do They Do?",
    rows: [
        { value: "Air piracy" },
        { value: "Cargo transport" },
        { value: "Passenger transport" },
        { value: "Aircraft protection" },
        { value: "Smuggling" },
        { value: "Combat support" },
    ],
});

const sea = new LifepathTable({
    name: "If at Sea, What Do They Do?",
    rows: [
        { value: "Piracy" },
        { value: "Cargo transport" },
        { value: "Passenger transport" },
        { value: "Smuggling" },
        { value: "Combat support" },
        { value: "Submarine warfare" },
    ],
});
base.rows[0].setNextTable(land);
base.rows[1].setNextTable(air);
base.rows[2].setNextTable(sea);

export default starting_table;
