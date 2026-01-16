/**
 * Character domain model with randomization and equipment logic.
 *
 * The Character class orchestrates data from the static catalogs (`src/data`)
 * and the supporting models (Skill, Weapon, Lifepath, Cyberware) to build a
 * complete character that can be rendered and edited by Vue components.
 */
import {
    Role,
    Stat,
    // CyberwareLocation,
    SkillList,
    RequiredSkills,
    SkillCategories,
    MeleeWeapons,
    RangedWeapons,
    WeaponAttachments,
    ArmorList,
    Gear,
    CyberwareType,
    BodyLocation,
    Cyberware as CyberwareList
} from "@/data";
import { Skill, Weapon, Lifepath, Cyberware } from ".";
import type { Armor, GearItem, WeaponAttachment, AmmoType } from "@/types";
import { random_key } from "@/utilities";
import { CulturalOriginTable } from "@/data/lifepath_tables";
import type { setOriginalNode } from "typescript";
import type { LifepathTable } from "./Lifepath";
import {
    Exec as ExecLifepath,
    Fixer as FixerLifepath,
    Lawman as LawmanLifepath,
    Media as MediaLifepath,
    Medtech as MedtechLifepath,
    Nomad as NomadLifepath,
    Netrunner as NetrunnerLifepath,
    Rockerboy as RockerboyLifepath,
    Solo as SoloLifepath,
    Tech as TechLifepath,
} from "@/data/role_lifepath_tables";


import { faker } from '@faker-js/faker';

import StatTables from "@/data/edge_runnner_stat_tables";
import SkillTables from "@/data/edge_runner_skill_tables";

import EquipmentTables from "@/data/role_equipment";


const role_lifepath_table: Record<Role, LifepathTable | undefined> = {
    Solo: SoloLifepath,
    Fixer: FixerLifepath,
    Netrunner: NetrunnerLifepath,
    Civilian: undefined,
    Rockerboy: RockerboyLifepath,
    Tech: TechLifepath,
    Medtech: MedtechLifepath,
    Media: MediaLifepath,
    Exec: ExecLifepath,
    Lawman: LawmanLifepath,
    Nomad: NomadLifepath,

}

const Stat_Points: Record<string, number> = {
    "minor supporting": 50,
    "starting": 62,
    "major supporting": 70,
    "minor hero": 75,
    "major hero": 80
}
const Starting_Cash: Record<CreationMethod, number> = {
    "edgerunner": 500,
    "street rat": 500,
    "complete": 2550
}

type WeaponType = "melee" | "ranged" | "exotic";
type ArmorLocation = "head" | "body" | "shield";
type EquipmentRequirements = {
    roles?: Role[];
    cyberware?: string[];
    stats?: Record<string, number>;
};
export type CreationMethod = "complete" | "edgerunner" | "street rat";
type MiscItem = {
    name: string;
    quantity?: number;
};
type FashionItem = {
    style: string;
    item_type: string;
    quantity?: number;
};
type OwnedGear = {
    item: GearItem;
    quantity: number;
};

/**
 * Represents a full character sheet, including stats, gear, lifepath, and cash.
 *
 * Most UI actions mutate a Character instance directly, while generators call
 * the randomize/reset helpers to seed the model from data tables.
 */
export class Character {
    skill_points = 86
    character_rank = "starting"
    cash = 0;

    handle: string = "Unknown";
    first_name: string = "";
    last_name: string = "";
    role: Role = Role.Civilian;
    role_ability_rank: number = 4;
    notes: string = ""
    humanity: number = 0
    stats: Record<string, number> = {}
    skills: Record<string, Skill> = {}
    critical_injuries: string[] = []
    addictions: string[] = []
    armor: { head: Armor | "None", body: Armor | "None", shield: Armor | "None" } = {
        head: "None",
        body: "None",
        shield: "None"
    }
    weapons: Weapon[] = []
    gear: OwnedGear[] = []
    programs: MiscItem[] = []
    fashion_items: FashionItem[] = []
    housing: string = ""
    rent: number = 0
    lifestyle: string = ""
    fashion: string = ""
    other_notes: string = ""

    reputation: number = 0
    reputation_events: string[] = []

    cyberware: Record<string, Cyberware | undefined> = {}

    creation_method: CreationMethod = "street rat"

    lifepath: Lifepath = new Lifepath();
    role_lifepath: Lifepath | undefined = undefined;

    /**
     * Create a Character with a creation method and role, then reset state.
     */
    constructor({ creation_method = "street rat", role = Role.Civilian }: { creation_method?: CreationMethod, role?: Role } = {}) {
        this.reset({ creation_method, role })
    }

    /**
     * Reset all mutable state to defaults for the given creation method/role.
     */
    reset({ creation_method, role }: { creation_method: CreationMethod, role: Role }) {
        this.creation_method = creation_method || "street rat";
        this.setRole(role);

        for (const stat of Object.values(Stat)) {
            this.stats[stat] = 0;
        }
        for (const skill of SkillList) {
            this.skills[skill.getKey()] = skill;
        }
        this.lifepath.setStartingTable(CulturalOriginTable);

        this.resetArmor();
        this.resetWeapons();
        this.resetGear();
        this.resetCyberware();
        this.resetLifepath();
        this.resetCyberware();

        this.cash = Starting_Cash[this.creation_method];
        this.programs = [];
        this.fashion_items = [];
        this.other_notes = "";
    }

    /**
     * Generate a random handle and civilian name using Faker.
     */
    randomizeName() {
        // let a = faker.word.adjective();
        let n = faker.word.noun();
        this.handle = n[0].toUpperCase() + n.slice(1);
        this.first_name = faker.person.firstName();
        this.last_name = faker.person.lastName();
        this.notes = `${this.first_name} "${this.handle}" ${this.last_name}`;
    }

    /**
     * Load role-based equipment from static tables into weapons/armor/gear.
     */
    getEquipmentFromTable() {
        if (Object.keys(EquipmentTables).includes(this.role)) {
            const table = EquipmentTables[this.role];
            const weapons = [...RangedWeapons, ...MeleeWeapons];
            for (let options of table) {
                options.sort(() => Math.random() - 0.5);
                const item = options[0];
                let loop = 1;
                if (item.quantity && item.quantity > 1) {
                    loop = item.quantity;
                }
                for (let i = 0; i < loop; i++) {
                    if (item.type === "weapon") {
                        const weapon = weapons.find(weapon => weapon.name === item.name);
                        if (weapon) {
                            let settings = { ...weapon }
                            if (item.ammo) {
                                for (let i = 0; i < item.ammo.length; i += 2) {
                                    settings["ammo"][item.ammo[i]] = item.ammo[i + 1]
                                }
                            };
                            this.weapons.push(new Weapon(settings));
                        }
                    }
                    else if (item.type === "armor") {
                        const armor = ArmorList.find(armor => armor.armor_type === item.name);
                        if (armor) {
                            if (item.location === "body") {
                                this.armor.body = armor;
                            }
                            else if (item.location === "head") {
                                this.armor.head = armor;
                            }
                            else if (item.location === "shield") {
                                this.armor.shield = armor;
                            }
                        }
                    }
                    else if (item.type === "gear") {
                        const gear = Object.values(Gear).find((gearItem) => gearItem.name === item.name);
                        if (gear) {
                            this.addGearEntry(gear, item.quantity ?? 1, true);
                        }
                    }
                    else if (item.type == "cyberware") {
                        const cyberware = CyberwareList.find(cyberware => cyberware.name === item.name);
                        if (cyberware) {
                            this.installCyberware({ cyberware: new Cyberware({ ...cyberware }), free: true });
                        }
                    }
                    else if (item.type === "fashion" || item.type === "program") {
                        if (item.quantity && item.quantity > 1 && i > 0) {
                            continue;
                        }
                        if (item.type === "fashion") {
                            const fashionItems = Array.isArray(item.items)
                                ? item.items
                                : (item.style && item.item_type ? [{ style: item.style, item_type: item.item_type, quantity: item.quantity }] : []);
                            for (const fashionItem of fashionItems) {
                                this.addFashionItem(this.fashion_items, fashionItem);
                            }
                        } else if (item.type === "program") {
                            const miscItem = { name: item.name, quantity: item.quantity };
                            this.addMiscItem(this.programs, miscItem);
                        }
                    }
                }

            }
            // else if (item.type === "armor") {
            //     if (item.armor_type === "Bodyweight Suit") {
            //         this.armor.body = item;
            //     }
            //     else {
            //         this.armor.head = item;
            //     }
            // }
            // else if (item.type === "gear") {
            //     this.gear.push(item);
            // }
            // else if (item.type === "cyberware") {
            //     this.installCyberware({ cyberware: new Cyberware({ ...item }) });
            // }

        }
        else {
            throw new Error(`Could not find equipment table for role: ${this.role}`);
        }
    }
    /**
     * Merge a misc item into a list, consolidating quantities by name.
     */
    addMiscItem(list: MiscItem[], item: MiscItem) {
        const quantity = item.quantity && item.quantity > 1 ? item.quantity : 1;
        const existing = list.find((entry) => entry.name === item.name);
        if (existing) {
            existing.quantity = (existing.quantity ?? 1) + quantity;
            return;
        }
        list.push({ name: item.name, quantity: quantity > 1 ? quantity : undefined });
    }

    /**
     * Merge a fashion item into a list, consolidating quantities by style and type.
     */
    addFashionItem(list: FashionItem[], item: FashionItem) {
        const style = item.style?.trim();
        const item_type = item.item_type?.trim();
        if (!style || !item_type) {
            return;
        }
        const quantity = item.quantity && item.quantity > 1 ? item.quantity : 1;
        const existing = list.find((entry) => entry.style === style && entry.item_type === item_type);
        if (existing) {
            existing.quantity = (existing.quantity ?? 1) + quantity;
            return;
        }
        list.push({ style, item_type, quantity: quantity > 1 ? quantity : undefined });
    }

    /**
     * Return total stat points available for the current character rank.
     */
    getStatPoints(): number {
        return Stat_Points[this.character_rank];
    }

    /**
     * Read optional requirements metadata from catalog entries.
     */
    getEquipmentRequirements(item: unknown): EquipmentRequirements | undefined {
        return (item as { requirements?: EquipmentRequirements }).requirements;
    }
    /**
     * Validate shared requirements for gear, armor, or weapons.
     */
    meetsEquipmentRequirements(requirements?: EquipmentRequirements): boolean {
        if (!requirements) {
            return true;
        }
        if (requirements.roles && !requirements.roles.includes(this.role)) {
            return false;
        }
        if (requirements.stats) {
            for (const [stat, minValue] of Object.entries(requirements.stats)) {
                if ((this.stats[stat] ?? 0) < minValue) {
                    return false;
                }
            }
        }
        if (requirements.cyberware) {
            for (const cyberwareName of requirements.cyberware) {
                if (this.findCyberware(cyberwareName).length === 0) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Calculate remaining stat points after current assignments.
     */
    getRemainingStatPoints(): number {
        let remaining_points = this.getStatPoints();
        for (const stat of Object.keys(this.stats)) {
            if (!(['INT', 'REF', 'DEX', 'TECH', 'COOL', 'WILL', 'LUCK', 'MOVE', 'BODY', 'EMP'].includes(stat))) {
                continue;
            }

            remaining_points -= this.stats[stat];
        }
        return remaining_points;
    }

    //  ######  ##    ## ########  ######## ########  ##      ##    ###    ########  ######## 
    // ##    ##  ##  ##  ##     ## ##       ##     ## ##  ##  ##   ## ##   ##     ## ##       
    // ##         ####   ##     ## ##       ##     ## ##  ##  ##  ##   ##  ##     ## ##       
    // ##          ##    ########  ######   ########  ##  ##  ## ##     ## ########  ######   
    // ##          ##    ##     ## ##       ##   ##   ##  ##  ## ######### ##   ##   ##       
    // ##    ##    ##    ##     ## ##       ##    ##  ##  ##  ## ##     ## ##    ##  ##       
    //  ######     ##    ########  ######## ##     ##  ###  ###  ##     ## ##     ## ######## 

    /**
     * Remove cyberware, refunding its value and restoring placeholder slots.
     */
    resetCyberware() {
        let total_value_of_cyberware = 0;
        for (const cyberware of Object.values(this.cyberware)) {
            total_value_of_cyberware += cyberware?.totalCost() || 0;
        }
        this.cash += total_value_of_cyberware;
        for (const location of Object.values(BodyLocation)) {
            this.cyberware[location] = undefined;
        }
        // these are basic placeholders locations that don't have foundational cyberware
        this.cyberware["Internal"] = new Cyberware({
            name: "Internal Body Cyberware",
            type: CyberwareType.InternalBodyCyberware,
            body_location: [BodyLocation.Internal],
            slots_available: 7,
            placeholder: true
        });
        this.cyberware["External"] = new Cyberware({
            name: "External Body Cyberware",
            type: CyberwareType.ExternalBodyCyberware,
            body_location: [BodyLocation.External],
            slots_available: 7,
            placeholder: true
        });
        this.cyberware["Fashionware"] = new Cyberware({
            name: "Fashionware",
            type: CyberwareType.Fashionware,
            body_location: [BodyLocation.Fashionware],
            slots_available: 7,
            placeholder: true
        });
        this.cyberware["Borgware"] = new Cyberware({
            name: "Borgware",
            type: CyberwareType.Borgware,
            body_location: [BodyLocation.Borgware],
            slots_available: 7,
            placeholder: true
        });

    }

    //TODO: Doesn't handle cyberware with requirements that aren't slotted directly into the requirement (e.g. Sensor Array)
    /**
     * Install cyberware, enforcing slot requirements and cost rules.
     */
    installCyberware({ cyberware, free = false, location }: { cyberware: Cyberware, free?: boolean, location?: string }) {
        // this.cyberware[location] = cyberware;
        cyberware = new Cyberware({ ...cyberware });
        this.canInstallCyberware({ cyberware, free, returning: false, location })

        const max_installs = cyberware.max_installs;
        const current_installs = this.findCyberware(cyberware.name).length;
        const possible_locations = cyberware.body_location;
        const required_cyberware_names = cyberware.required_cyberware.split("/");
        const required_slots = cyberware.slots_required;

        let required_cyberware: Cyberware[] = [];
        let required_cyberware_name = ""

        while (required_cyberware_names.length > 0 && required_cyberware.length <= 0) {
            required_cyberware_name = required_cyberware_names.shift() || "";
            if (required_cyberware_name == "Meat") {
                required_cyberware_name = "";
            }
            required_cyberware = this.findCyberware(required_cyberware_name);
        }

        required_cyberware = this.findCyberware(required_cyberware_name);
        const location_cyberware = location ? this.cyberware[location] : undefined;
        const allows_meat_install = cyberware.required_cyberware.split("/").includes("Meat") && cyberware.can_install_in_meat;
        if (location && required_cyberware_name !== "" && location_cyberware?.name !== required_cyberware_name && allows_meat_install && location_cyberware === undefined) {
            required_cyberware_name = "";
            required_cyberware = [];
        }

        //if there are requirements and they've been installed
        if (required_cyberware_name != "" && required_cyberware.length > 0) {
            const available_foundational_cyberware = required_cyberware.filter(cyberware => {
                const available_slot_count = cyberware.getOpenSlots();
                return available_slot_count >= required_slots
            });
            if (location_cyberware && location_cyberware.name === required_cyberware_name) {
                location_cyberware.pushOption(cyberware);
                if (!free) {
                    this.cash -= cyberware.cost;
                }
                if (cyberware.must_be_paired) {
                    const secondary = available_foundational_cyberware.find(item => item !== location_cyberware);
                    if (secondary) {
                        secondary.pushOption(cyberware);
                        if (!free) {
                            this.cash -= cyberware.cost;
                        }
                    }
                }
                return;
            }
            available_foundational_cyberware.sort(() => Math.random() - 0.5);
            available_foundational_cyberware[0].pushOption(cyberware);
            if (!free) {
                this.cash -= cyberware.cost;
            }
            if (cyberware.must_be_paired) {
                available_foundational_cyberware[1].pushOption(cyberware);
                if (!free) {
                    this.cash -= cyberware.cost;
                }
            }
            return;
        }

        //if there's no requirements, try to install it as a foundational cyberware
        const locations_to_check = location ? [location] : possible_locations.sort(() => Math.random() - 0.5);
        for (let target_location of locations_to_check) {
            let current_cyberware_in_location = this.cyberware[target_location];
            if (current_cyberware_in_location !== undefined) {
                continue;
            }
            this.cyberware[target_location] = cyberware;
            if (!free) {
                this.cash -= cyberware.cost;
            }
            if (cyberware.name == "Cyberarm") {
                const standard_hand = CyberwareList.find(cyberware => cyberware.name === "Standard Hand") as Cyberware;
                //this.installCyberware({ cyberware: new Cyberware({...standard_hand}), free: true });
                cyberware.pushOption(new Cyberware({ ...standard_hand }))
            }
            if (cyberware.name == "Cyberleg") {
                const standard_foot = CyberwareList.find(cyberware => cyberware.name === "Standard Foot") as Cyberware;
                // this.installCyberware({ cyberware: new Cyberware({...standard_foot}), free: true });
                cyberware.pushOption(new Cyberware({ ...standard_foot }))

            }
            return;

        }

    }
    /**
     * Check whether any installed cyberware grants Speedware.
     */
    hasSpeedware(): boolean {
        const neural_link = this.findCyberware("Neural Link");
        for (const cyberware of neural_link) {
            if (cyberware.slotted_options) {
                for (const option of cyberware.slotted_options) {
                    if (option.type === CyberwareType.Speedware) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    /**
     * Validate if a cyberware item can be installed with current constraints.
     */
    canInstallCyberware({ cyberware, free = false, returning = false, location }: { cyberware: Cyberware, free?: boolean, returning?: boolean, location?: string }): boolean {
        // this.cyberware[location] = cyberware;

        if (cyberware.type === CyberwareType.Speedware && this.hasSpeedware()) {
            if (returning) {
                return false;
            }
            throw new Error(`Cannot install ${cyberware.name}.  Only one piece of speedware is allowed.`);
        }
        const humanityLoss = cyberware.getHumanityLoss();
        const pairedMultiplier = cyberware.must_be_paired ? 2 : 1;
        const projectedLoss = this.getHumanityLoss() + humanityLoss * pairedMultiplier;
        const maxHumanity = this.stats.EMP * 10;
        if (projectedLoss > maxHumanity) {
            if (returning) {
                return false;
            }
            throw new Error(`Cannot install ${cyberware.name}.  Humanity cannot drop below 0.`);
        }
        const max_installs = cyberware.max_installs;
        const current_installs = this.findCyberware(cyberware.name).length;
        if (max_installs > 0 && current_installs >= max_installs) {
            if (returning) {
                return false;
            }
            throw new Error(`Cannot install ${cyberware.name}.  Can install a maximum of ${max_installs}.`);
        }

        const possible_locations = cyberware.body_location;
        const required_cyberware_names = cyberware.required_cyberware.split("/");
        const required_slots = cyberware.slots_required;

        let required_cyberware: Cyberware[] = [];
        let required_cyberware_name = ""

        while (required_cyberware_names.length > 0 && required_cyberware.length <= 0) {
            required_cyberware_name = required_cyberware_names.shift() || "";
            if (required_cyberware_name == "Meat") {
                required_cyberware_name = "";
            }
            required_cyberware = this.findCyberware(required_cyberware_name);
        }

        required_cyberware = this.findCyberware(required_cyberware_name);
        const location_cyberware = location ? this.cyberware[location] : undefined;
        const allows_meat_install = cyberware.required_cyberware.split("/").includes("Meat") && cyberware.can_install_in_meat;
        if (location && required_cyberware_name !== "" && location_cyberware?.name !== required_cyberware_name && allows_meat_install && location_cyberware === undefined) {
            required_cyberware_name = "";
            required_cyberware = [];
        }

        if (required_cyberware_name != "" && required_cyberware.length <= 0) {
            if (returning) {
                return false;
            }
            throw new Error(`Cannot install ${cyberware.name} without ${required_cyberware_name}`);
        }
        if (cyberware.must_be_paired && required_cyberware.length < 2) {
            if (returning) {
                return false;
            }
            throw new Error(`Cannot install ${cyberware.name} without 2x ${required_cyberware_name}`);
        }

        //if there are requirements and they've been installed
        if (required_cyberware_name != "" && required_cyberware.length > 0) {
            const available_foundational_cyberware = required_cyberware.filter(cyberware => {
                const available_slot_count = cyberware.getOpenSlots();
                return available_slot_count >= required_slots
            });
            if (location && location_cyberware?.name !== required_cyberware_name) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name} without ${required_cyberware_name}`);
            }
            if (location && location_cyberware) {
                const location_has_slots = location_cyberware.getOpenSlots() >= required_slots;
                const other_available = available_foundational_cyberware.some(item => item !== location_cyberware);
                if (!location_has_slots || (cyberware.must_be_paired && !other_available)) {
                    if (returning) {
                        return false;
                    }
                    throw new Error(`Cannot install ${cyberware.name}.  Foundational cyberware doesn't have enough open slots.`);
                }
                if (!free && this.cash < cyberware.cost) {
                    if (returning) {
                        return false;
                    }
                    throw new Error(`Cannot install ${cyberware.name}.  Not enough cash.`);
                }
                return true;
            }
            if (available_foundational_cyberware.length <= 0 || (cyberware.must_be_paired && available_foundational_cyberware.length <= 1)) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name}.  Foundational cyberware doesn't have enough open slots.`);
            }
            if (!free && this.cash < cyberware.cost) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name}.  Not enough cash.`);
            }

            return true;
        }

        //if there's no requirements, try to install it as a foundational cyberware
        const locations_to_check = location ? [location] : possible_locations.sort(() => Math.random() - 0.5);
        for (let random_location of locations_to_check) {
            if (location && !possible_locations.includes(random_location)) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name} in ${random_location}`);
            }
            let current_cyberware_in_location = this.cyberware[random_location];
            if (current_cyberware_in_location === undefined && cyberware.can_install_in_meat) {
                if (this.cash < cyberware.cost) {
                    if (returning) {
                        return false;
                    }
                    throw new Error(`Cannot install ${cyberware.name}.  Not enough cash.`);
                }
                // this.cyberware[random_location] = cyberware;
                // if (!free) {
                //     this.cash -= cyberware.cost;
                // }
                // if (cyberware.name == "Cyberarm") {
                //     const standard_hand = CyberwareList.find(cyberware => cyberware.name === "Standard Hand") as Cyberware;
                //     this.installCyberware({ cyberware: standard_hand, free: true });
                // }
                // if (cyberware.name == "Cyberleg") {
                //     const standard_foot = CyberwareList.find(cyberware => cyberware.name === "Standard Foot") as Cyberware;
                //     this.installCyberware({ cyberware: standard_foot, free: true });
                // }
                return true;
            } else if (current_cyberware_in_location === undefined && !cyberware.can_install_in_meat) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name} in meat`);
            } else if (current_cyberware_in_location !== undefined && location) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name}.  No locations available.`);
            }
        }
        if (returning) {
            return false;
        }
        throw new Error(`Cannot install ${cyberware.name}.  No locations available.`);

    }

    /**
     * Find all cyberware instances by name, including slotted options.
     */
    findCyberware(cyberware_name: string): Cyberware[] {
        let cyberware_list: Cyberware[] = [];
        for (const location of Object.keys(this.cyberware)) {
            const cyberware = this.cyberware[location];
            if (cyberware === undefined) {
                continue;
            } else if (cyberware.name === cyberware_name) {
                cyberware_list.push(cyberware);
            }
            cyberware_list = cyberware_list.concat(cyberware.findCyberwareInSlots(cyberware_name));
        }
        return cyberware_list;
    }
    // findCyberwareById(cyberware_id: string): Cyberware | undefined {
    //     for (const location of Object.keys(this.cyberware)) {
    //         const cyberware = this.cyberware[location];
    //         if (cyberware === undefined) {
    //             continue;
    //         } else if (cyberware.id === cyberware_id) {
    //             return cyberware;
    //         }
    //         const found_cyberware = cyberware.findCyberwareInSlotsById(cyberware_id);
    //         if (found_cyberware !== undefined) {
    //             return found_cyberware;
    //         }
    //     }
    //     return undefined;
    // }
    /**
     * Remove a cyberware item by id and refund its cost.
     */
    uninstallCyberwareById(cyberware_id: string) {
        for (const location of Object.keys(this.cyberware)) {
            const cyberware = this.cyberware[location];
            if (cyberware === undefined) {
                continue;
            } else if (cyberware.id === cyberware_id) {
                this.cash += cyberware.cost;
                this.cash += cyberware.uninstallAllOptions()
                this.cyberware[location] = undefined;
                return;
            }
            else {
                this.cash += cyberware.uninstallOptionById(cyberware_id);
            }
        }
    }
    /**
     * Populate cyberware randomly when the creation method allows it.
     */
    randomizeCyberware() {
        this.resetCyberware();
        if (this.creation_method == "complete") {
            const loops = 50;
            for (let i = 0; i < loops; i++) {
                try {
                    const random_cyberware = CyberwareList[Math.floor(Math.random() * CyberwareList.length)];
                    this.installCyberware({ cyberware: new Cyberware({ ...random_cyberware }) });
                } catch (e) {
                    console.warn(`Could not add cyberware: ${e}`)
                }
            }
        }
    }


    /**
     * Calculate total humanity loss across all installed cyberware.
     */
    getHumanityLoss(): number {
        let humanity_loss = 0;

        for (const location of Object.keys(this.cyberware)) {
            const cyberware = this.cyberware[location];
            if (cyberware === undefined) {
                continue;
            } else if (Array.isArray(cyberware)) {
                for (const item of cyberware) {
                    humanity_loss += item.getHumanityLoss();
                }
            } else {
                humanity_loss += cyberware.getHumanityLoss();
            }
        }

        return humanity_loss;
    }
    /**
     * Pick a random gear item within a cost ceiling.
     */
    getRandomGearItem({ max_cost = this.cash }: { max_cost?: number } = {}) {
        const gear = Object.values(Gear).filter(gear => gear.cost <= max_cost);
        const randomIndex = Math.floor(Math.random() * gear.length);
        return gear[randomIndex];
    }
    /**
     * Pick a random armor item (optionally shield-only) within a budget.
     */
    getRandomArmor({ armorType = "all", max_cost = this.cash }: { armorType?: "all" | "include shield" | "shield only"; max_cost?: number } = {}): Armor | "None" {
        let availableArmor: (Armor | "None")[] = ["None"];
        if (armorType === "all" || armorType === "include shield") {
            availableArmor.push(...ArmorList.filter(armor => armor.armor_type !== "Bulletproof Shield"));
        }
        if (armorType === "shield only" || armorType === "include shield") {
            availableArmor.push(...ArmorList.filter(armor => armor.armor_type === "Bulletproof Shield"));
        }
        availableArmor = availableArmor.filter(armor => armor == "None" || armor.cost <= max_cost);
        const randomIndex = Math.floor(Math.random() * availableArmor.length);
        return availableArmor[randomIndex];
    }
    /**
     * Pick a random weapon by type with optional exclusions and budget limits.
     */
    getRandomWeapon({ weaponTypes, excluded_weapons, max_cost }: { weaponTypes?: WeaponType[] | undefined; excluded_weapons?: string[]; max_cost?: number } = {}): Weapon {
        if (weaponTypes === undefined) {
            weaponTypes = ["melee", "ranged"];
        }
        let allWeapons: Weapon[] = [];
        for (const weaponType of weaponTypes) {
            if (weaponType === "melee") {
                allWeapons.push(...Object.values(MeleeWeapons));
            } else if (weaponType === "ranged") {
                allWeapons.push(...Object.values(RangedWeapons));
            } else if (weaponType === "exotic") {
                // Add your exotic weapons here
            }
        }
        if (excluded_weapons !== undefined && excluded_weapons.length > 0) {
            allWeapons = allWeapons.filter(weapon => !excluded_weapons.includes(weapon.name));
        }
        if (max_cost !== undefined) {
            allWeapons = allWeapons.filter(weapon => weapon.cost <= max_cost);
        }
        if (allWeapons.length === 0) {
            throw new Error("No weapons available");
        }
        const randomIndex = Math.floor(Math.random() * allWeapons.length);
        return allWeapons[randomIndex];
    };
    /**
     * Check whether a weapon can be added based on cost and requirements.
     */
    canAddWeapon(weapon: Weapon): boolean {
        const requirements = this.getEquipmentRequirements(weapon);
        return this.meetsEquipmentRequirements(requirements) && this.cash >= weapon.cost;
    }
    /**
     * Add a weapon while enforcing cost and requirements.
     */
    addWeapon(weapon: Weapon): boolean {
        if (!this.canAddWeapon(weapon)) {
            return false;
        }
        const weaponCopy = new Weapon({ ...weapon });
        this.weapons.push(weaponCopy);
        this.cash -= weaponCopy.cost;
        return true;
    }
    /**
     * Remove a weapon by index and refund its cost.
     */
    removeWeapon(index: number) {
        const weapon = this.weapons[index];
        if (!weapon) {
            return;
        }
        this.cash += weapon.cost;
        this.weapons.splice(index, 1);
    }
    /**
     * Check whether a weapon attachment can be added, including cost and slot usage.
     */
    canAddWeaponAttachment(weapon: Weapon, attachment: WeaponAttachment): boolean {
        if (!attachment.eligible.includes(weapon.name)) {
            return false;
        }
        const usedSlots = weapon.attachments.reduce((sum, item) => sum + item.attachment_slots, 0);
        if (weapon.max_attachments - usedSlots < attachment.attachment_slots) {
            return false;
        }
        return this.cash >= attachment.cost;
    }
    /**
     * Add a weapon attachment and deduct its cost.
     */
    addWeaponAttachment(weaponIndex: number, attachment: WeaponAttachment): boolean {
        const weapon = this.weapons[weaponIndex];
        if (!weapon || !this.canAddWeaponAttachment(weapon, attachment)) {
            return false;
        }
        weapon.addAttachment(attachment);
        this.cash -= attachment.cost;
        return true;
    }
    /**
     * Remove an attachment and refund its cost.
     */
    removeWeaponAttachment(weaponIndex: number, attachmentIndex: number) {
        const weapon = this.weapons[weaponIndex];
        if (!weapon) {
            return;
        }
        const attachment = weapon.attachments[attachmentIndex];
        if (!attachment) {
            return;
        }
        weapon.attachments.splice(attachmentIndex, 1);
        this.cash += attachment.cost;
    }
    /**
     * Check whether ammo can be added to a weapon.
     */
    canAddAmmo(weapon: Weapon, ammoType: AmmoType, quantity: number): boolean {
        if (!weapon.supportsAmmoType(ammoType)) {
            return false;
        }
        if (!Number.isFinite(quantity) || quantity <= 0) {
            return false;
        }
        const totalCost = ammoType.cost * quantity;
        return this.cash >= totalCost;
    }
    /**
     * Add ammo to a weapon and deduct its cost.
     */
    addAmmo(weaponIndex: number, ammoType: AmmoType, quantity: number): boolean {
        const weapon = this.weapons[weaponIndex];
        if (!weapon || !this.canAddAmmo(weapon, ammoType, quantity)) {
            return false;
        }
        weapon.addAmmo(ammoType.name, quantity);
        this.cash -= ammoType.cost * quantity;
        return true;
    }
    /**
     * Clear armor slots and refund any spent armor costs.
     */
    resetArmor() {
        this.cash += this.armor.body == "None" ? 0 : this.armor.body.cost;
        if (this.armor.body == "None" || this.armor.body.armor_type != "Bodyweight Suit") {
            this.cash += this.armor.head == "None" ? 0 : this.armor.head.cost;
        }
        // this.cash += this.armor.shield == "None" ? 0 : this.armor.shield.cost;
        this.armor.body = "None";
        this.armor.head = "None";
        this.armor.shield = "None";
    }
    /**
     * Find the currently equipped Bodyweight Suit, if any.
     */
    getBodyweightSuit(): Armor | undefined {
        if (this.armor.body != "None" && this.armor.body.armor_type === "Bodyweight Suit") {
            return this.armor.body;
        }
        if (this.armor.head != "None" && this.armor.head.armor_type === "Bodyweight Suit") {
            return this.armor.head;
        }
        return undefined;
    }
    /**
     * Evaluate armor swaps to enforce affordability and requirements.
     */
    calculateArmorSwap({ location, armor }: { location: ArmorLocation; armor: Armor | "None" }) {
        if (armor !== "None" && armor.armor_type === "Bulletproof Shield" && location !== "shield") {
            return undefined;
        }
        if (armor !== "None" && armor.armor_type !== "Bulletproof Shield" && location === "shield") {
            return undefined;
        }
        if (armor !== "None") {
            const requirements = this.getEquipmentRequirements(armor);
            if (!this.meetsEquipmentRequirements(requirements)) {
                return undefined;
            }
        }

        const bodyweightSuit = this.getBodyweightSuit();
        const isBodyweightSuit = armor !== "None" && armor.armor_type === "Bodyweight Suit";
        const currentArmor = { ...this.armor };
        let refund = 0;
        let cost = armor === "None" ? 0 : armor.cost;

        if (location === "shield") {
            refund = currentArmor.shield === "None" ? 0 : currentArmor.shield.cost;
            currentArmor.shield = armor === "None" ? "None" : armor;
            return { refund, cost, next: currentArmor };
        }

        if (isBodyweightSuit) {
            if (bodyweightSuit) {
                refund = bodyweightSuit.cost;
            } else {
                refund += currentArmor.body === "None" ? 0 : currentArmor.body.cost;
                refund += currentArmor.head === "None" ? 0 : currentArmor.head.cost;
            }
            currentArmor.body = armor;
            currentArmor.head = armor;
            return { refund, cost, next: currentArmor };
        }

        if (bodyweightSuit) {
            refund = bodyweightSuit.cost;
            currentArmor.body = "None";
            currentArmor.head = "None";
        } else {
            refund = currentArmor[location] === "None" ? 0 : currentArmor[location].cost;
        }

        if (armor === "None") {
            currentArmor[location] = "None";
            return { refund, cost, next: currentArmor };
        }

        currentArmor[location] = armor;
        return { refund, cost, next: currentArmor };
    }
    /**
     * Check whether armor can be equipped based on cost and requirements.
     */
    canSetArmor({ location, armor }: { location: ArmorLocation; armor: Armor | "None" }): boolean {
        const result = this.calculateArmorSwap({ location, armor });
        if (!result) {
            return false;
        }
        return this.cash + result.refund >= result.cost;
    }
    /**
     * Set armor for a location while enforcing cost and requirements.
     */
    setArmor({ location, armor }: { location: ArmorLocation; armor: Armor | "None" }): boolean {
        const result = this.calculateArmorSwap({ location, armor });
        if (!result) {
            return false;
        }
        if (this.cash + result.refund < result.cost) {
            return false;
        }
        this.cash += result.refund - result.cost;
        this.armor = result.next;
        return true;
    }
    /**
     * Randomize armor purchases within the character's available cash.
     */
    randomizeArmor() {
        this.resetArmor();
        let cash = this.cash;
        let body_armor: Armor | "None" = "None";
        let head_armor: Armor | "None" = "None";
        // let shield: Armor | "None" = "None";

        if (this.creation_method == "complete") {
            let armor_cost = 0;
            do {
                armor_cost = 0;
                body_armor = this.getRandomArmor({ max_cost: cash - armor_cost });
                armor_cost += body_armor == "None" ? 0 : body_armor.cost;
                if (body_armor != "None" && body_armor.armor_type === "Bodyweight Suit") {
                    head_armor = body_armor
                }
                else {
                    do {
                        head_armor = this.getRandomArmor({ max_cost: cash - armor_cost });
                    } while (head_armor != "None" && head_armor.armor_type === "Bodyweight Suit")
                    armor_cost += head_armor == "None" ? 0 : head_armor.cost;
                    // if (head_armor != "None" && head_armor.armor_type === "Bodyweight Suit") {
                    //     body_armor = head_armor
                    // }
                }
                // this.armor.shield = this.getRandomArmor("shield only");
                // cash -= shield == "None" ? 0 : shield.cost;
            } while (armor_cost > cash)

            this.armor.body = body_armor
            this.armor.head = head_armor
            // this.armor.shield = shield
            this.cash -= armor_cost
        }
    }
    /**
     * Remove all weapons and refund their costs.
     */
    resetWeapons() {
        for (const weapon of this.weapons) {
            this.cash += weapon.cost;
        }
        this.weapons = [];
    }
    /**
     * Randomize weapons for complete characters within budget.
     */
    randomizeWeapons() {
        this.resetWeapons();
        if (this.creation_method == "complete") {
            for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
                try {
                    const weapon: Weapon = this.getRandomWeapon({ max_cost: this.cash });
                    this.weapons.push(weapon);
                    this.cash -= weapon.cost;
                    console.log("weapon cost", weapon.cost, weapon.name)
                } catch (e) {
                    console.log(`Could not add any weapons: ${e}`)
                }
            }
        }
    }
    /**
     * Remove all gear items and refund their costs.
     */
    resetGear() {
        for (const entry of this.gear) {
            this.cash += entry.item.cost * entry.quantity;
        }
        this.gear = [];
    }
    /**
     * Check whether a gear item can be added based on cost and requirements.
     */
    canAddGear(gearItem: GearItem): boolean {
        const requirements = this.getEquipmentRequirements(gearItem);
        return this.meetsEquipmentRequirements(requirements) && this.cash >= gearItem.cost;
    }
    /**
     * Add gear with optional quantity and free flag.
     */
    addGearEntry(gearItem: GearItem, quantity = 1, free = false): boolean {
        const clampedQty = Math.max(1, Math.floor(quantity));
        if (!free && !this.canAddGear(gearItem)) {
            return false;
        }
        const existing = this.gear.find((entry) => entry.item.name === gearItem.name);
        if (existing) {
            existing.quantity += clampedQty;
        } else {
            this.gear.push({ item: gearItem, quantity: clampedQty });
        }
        if (!free) {
            this.cash -= gearItem.cost * clampedQty;
        }
        return true;
    }
    /**
     * Add a gear item while enforcing cost and requirements.
     */
    addGear(gearItem: GearItem): boolean {
        return this.addGearEntry(gearItem, 1, false);
    }
    /**
     * Remove a gear item by index and refund its cost.
     */
    removeGear(index: number) {
        const entry = this.gear[index];
        if (!entry) {
            return;
        }
        entry.quantity -= 1;
        this.cash += entry.item.cost;
        if (entry.quantity <= 0) {
            this.gear.splice(index, 1);
        }
    }
    /**
     * Randomize gear purchases until cash runs out or a stop condition hits.
     */
    randomizeGear() {
        this.resetGear();
        if (this.creation_method == "complete") {
            while (this.cash > 0) {
                const rand = Math.random();
                if (rand < 0.25) {
                    break;
                }
                try {
                    const gearItem: GearItem = this.getRandomGearItem({ max_cost: this.cash });
                    this.addGearEntry(gearItem, 1, false);
                    console.log("gear cost", gearItem.cost, gearItem.name)
                } catch (e) {
                    console.log(`Could not add any gear: ${e}`)
                    break;
                }
            }
        }
    }

    //  ######  ##    ## #### ##       ##        ######  
    // ##    ## ##   ##   ##  ##       ##       ##    ## 
    // ##       ##  ##    ##  ##       ##       ##       
    //  ######  #####     ##  ##       ##        ######  
    //       ## ##  ##    ##  ##       ##             ## 
    // ##    ## ##   ##   ##  ##       ##       ##    ## 
    //  ######  ##    ## #### ######## ########  ######  

    /**
     * Reset all skill levels back to zero.
     */
    resetSkills() {
        for (const skill of Object.values(this.skills)) {
            skill.lvl = 0;
        }
    }
    /**
     * Return the minimum level required for a skill under Complete Package rules.
     */
    getMinimumSkillLevel(skill: Skill): number {
        if (RequiredSkills.includes(skill.name)) {
            return 2;
        }
        return 0;
    }
    /**
     * Calculate the total skill points spent for the current skill levels.
     */
    getSkillPointsSpent(): number {
        let spent = 0;
        for (const skill of Object.values(this.skills)) {
            spent += skill.lvl * (skill.x2 ? 2 : 1);
        }
        return spent;
    }
    /**
     * Calculate remaining skill points based on current allocations.
     */
    getRemainingSkillPoints(): number {
        return this.skill_points - this.getSkillPointsSpent();
    }
    /**
     * Update a skill level while enforcing limits and available points.
     */
    setSkillLevel(skillKey: string, level: number): number {
        const skill = this.skills[skillKey];
        if (!skill) {
            return 0;
        }
        const minLevel = this.getMinimumSkillLevel(skill);
        const normalized = Math.max(minLevel, Math.min(6, Math.floor(level)));
        const currentCost = skill.lvl * (skill.x2 ? 2 : 1);
        const spentWithoutSkill = this.getSkillPointsSpent() - currentCost;
        const newCost = normalized * (skill.x2 ? 2 : 1);
        if (spentWithoutSkill + newCost > this.skill_points) {
            const remaining = this.skill_points - spentWithoutSkill;
            const maxLevel = Math.floor(remaining / (skill.x2 ? 2 : 1));
            const clamped = Math.max(minLevel, Math.min(6, maxLevel));
            skill.lvl = clamped;
            return clamped;
        }
        skill.lvl = normalized;
        return normalized;
    }
    /**
     * Allocate skill points based on creation method and role tables.
     */
    randomizeSkills() {
        this.resetSkills();

        const role_skill_table = SkillTables[this.role as Role];
        let skill_points = this.skill_points
        // console.debug(this.creation_method);

        if (this.creation_method == "complete" || this.creation_method == "edgerunner") {
            let allowable_skills: string[] = [];

            let required_skills = [...RequiredSkills]
            for (const weapon of this.weapons) {
                const skill_name = this.skills[weapon.skill].name;
                required_skills.push(skill_name)
            }
            for (const key in this.skills) {
                if (required_skills.includes(this.skills[key].name)) {
                    const skill = this.skills[key];
                    const cost = (skill.x2 ? 2 : 1) * 2;
                    skill.lvl += 2;
                    skill_points -= cost;
                }
            }

            if (this.creation_method == "complete") {
                for (const skill_name in role_skill_table) {
                    allowable_skills.push(Skill.genKey(skill_name))
                }
            }
            else {
                for (const skill_name in role_skill_table) {
                    allowable_skills.push(Skill.genKey(skill_name))
                }

            }

            while (skill_points > 0) {
                const key = allowable_skills[Math.floor(Math.random() * allowable_skills.length)];
                try {
                    const skill = this.skills[key];
                    if (skill.lvl >= 6) {
                        continue;
                    }
                    if (skill.x2) {
                        if (skill_points < 2) {
                            continue;
                        }
                        skill_points -= 2;
                    }
                    else {
                        skill_points -= 1;
                    }
                    skill.lvl += 1;
                }
                catch (e) {
                    console.error(`Could not find skill: ${key}`);
                    console.error(allowable_skills)
                    break;
                }
            }
            return
        }
        else {


            if (this.creation_method == "street rat") {
                for (const skill in role_skill_table) {
                    const key = Skill.genKey(skill);
                    try {
                        // console.debug(key, role_skill_table[skill], role_skill_table);
                        this.skills[key].lvl = role_skill_table[skill];
                    }
                    catch (e) {
                        console.error(`Could not find skill: ${skill} with key ${key}`);
                    }
                }
                return
            }
        }

        throw new Error("Could not randomize skills");
    }
    /**
     * Assign stats using either point-buy or table-driven generation.
     */
    randomizeStats() {
        if (this.creation_method == "complete") {
            let stat_points = Stat_Points[this.character_rank]
            for (const stat in this.stats) {
                this.stats[stat] = 2;
                stat_points -= 2;
            }

            while (stat_points > 0) {
                const stat = random_key(this.stats);
                if (this.stats[stat] >= 8) {
                    continue;
                }
                this.stats[stat] += 1;
                stat_points -= 1;
            }

            return
        }
        else {
            const stats = ['INT', 'REF', 'DEX', 'TECH', 'COOL', 'WILL', 'LUCK', 'MOVE', 'BODY', 'EMP'];
            const table = StatTables[this.role as Role];
            if (this.creation_method == "street rat") {
                const random_row = table[Math.floor(Math.random() * table.length)];
                for (let index in stats) {
                    this.stats[stats[index]] = random_row[index];
                }
                return
            }
            else if (this.creation_method == "edgerunner") {
                for (let index in stats) {
                    const random_row = table[Math.floor(Math.random() * table.length)];
                    this.stats[stats[index]] = random_row[index];
                }
                return;
            }
        }
        throw new Error("Could not randomize stats")
    }
    /**
     * Run the core stat and skill randomization pipeline.
     */
    randomize() {
        this.randomizeStats();
        this.randomizeSkills();
    }
    /**
     * Reset the lifepath to the starting cultural origin table.
     */
    resetLifepath() {
        this.lifepath = new Lifepath();
        this.lifepath.setStartingTable(CulturalOriginTable);
    }
    /**
     * Walk the base lifepath tables and populate `lifepath.path`.
     */
    walkLifepath() {
        this.lifepath.walkPath();
    }
    /**
     * Update the character's role and seed role-specific lifepath tables.
     */
    setRole(role: Role) {
        this.role = role;
        this.role_lifepath = undefined;
        const role_start_table = role_lifepath_table[role];
        if (role_start_table != undefined) {
            this.role_lifepath = new Lifepath();
            this.role_lifepath.setStartingTable(role_start_table);
        }
    }
    /**
     * Walk the role-specific lifepath, if configured.
     */
    walkRoleLifepath() {
        if (this.role_lifepath === undefined) {
            return;
        }
        this.role_lifepath.walkPath();
    }
}
