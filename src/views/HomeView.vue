<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
    Stat,
    Role,
    CyberwareLocation,
    SkillList,
    RequiredSkills,
    SkillCategories,
    WeaponAttachments,
    ClipChart,
    AmmoTypes,
    CyberwareType,
    Cyberware as CyberwareList
} from '@/data';
import { Lifepath, LifepathRow, LifepathTable, Skill, Character, Cyberware } from '@/classes';
import type { WeaponAttachment, AmmoType, Armor } from '@/types'
import TextField from '@/components/TextField.vue';
import TextFieldRow from '@/components/TextFieldRow.vue'
import SkillTable from '@/components/SkillTable.vue'
import SkillRow from '@/components/SkillRow.vue'
import Modal from '@/components/Modal.vue'
import StatsBlock from '@/components/StatsBlock.vue'
import SkillsByGroup from '@/components/SkillsByGroup.vue'
import CPTable from '@/components/CPTable.vue';
import CPCell from '@/components/CPCell.vue';
import CPRow from '@/components/CPRow.vue';
import CPTitle from '@/components/CPTitle.vue';
import CPButton from '@/components/CPButton.vue';

import type { CreationMethod } from '@/classes/Character';

/**
 * Main character generator view.
 *
 * This view wires together the Character model, data catalogs, and UI
 * components to allow users to randomize and edit a complete character sheet.
 */

// const emit = defineEmits(['update:modelValue'])

/**
 * Reactive state for character generation controls and the active Character.
 */
const creation_method = ref<CreationMethod>("street rat");
const role = ref<Role>(Role.Medtech);
const char = ref<Character>(new Character()) // Initializes reactive variable for character.

/**
 * Generate a full character based on the selected role and creation method.
 */
function generateCharacter() {
    char.value.reset({ creation_method: creation_method.value, role: role.value });

    if (creation_method.value === 'complete') {
        char.value.randomizeWeapons();
        char.value.randomizeArmor();
        char.value.randomizeGear();
        char.value.randomizeCyberware();
    }
    else {
        try {
            char.value.getEquipmentFromTable();
        }
        catch (e: any) {
            if (e.message) {
                console.warn(e.message);
            } else {
                console.warn(e);
            }
        }
    }
    char.value.randomizeStats();
    char.value.randomizeSkills();
    walkLifepath();
    walkRoleLifepath();
    randomizeHandle();
}

//  ######  ##    ## #### ##       ##       
// ##    ## ##   ##   ##  ##       ##       
// ##       ##  ##    ##  ##       ##       
//  ######  #####     ##  ##       ##       
//       ## ##  ##    ##  ##       ##       
// ##    ## ##   ##   ##  ##       ##       
//  ######  ##    ## #### ######## ######## 


/**
 * Valid Skill Sort Methods:
 *  level - level of the skill
 *  alphabetical - alphabetical order
 *  group - group by category
 *  base - stat + level
 */
const sort_method = ref('base'); // Initializes reactive variable for sorting method, default 'base'.
/**
 * Divide a skills array into six chunks for multi-column display.
 */
const createSkillsChunks = (skills: Skill[]) => {
    const chunkSize = Math.ceil(skills.length / 6); // Calculates size of each chunk.
    return [0, 1, 2, 3, 4, 5].map(i => skills.slice(i * chunkSize, (i + 1) * chunkSize)); // Creates three chunks.
};
/**
 * Return skill rows sorted and chunked based on the chosen sort mode.
 */
function calculated_skills(sort_method: string) {
    // Sort skills alphabetically as a baseline.
    const alphabetical_skills = Object.values(char.value.skills).sort((a, b) => a.name.localeCompare(b.name))
    if (sort_method === 'base') {
        // Sorts skills by 'base' (stat + level) after initial alphabetical sort, then chunks.
        return createSkillsChunks(Object.values(alphabetical_skills).sort((a, b) => {
            const a_base = a.lvl + char.value.stats[a.stat] // Calculates 'base' for skill a.
            const b_base = b.lvl + char.value.stats[b.stat] // Calculates 'base' for skill b.
            return b_base - a_base // Descending sort.
        }));
    } else if (sort_method === 'level') {
        // Sorts skills by level, then chunks.
        return createSkillsChunks(Object.values(alphabetical_skills).sort((a, b) => b.lvl - a.lvl));
    } else if (sort_method === 'alphabetical') {
        // Uses the initial alphabetical sort, then chunks.
        return createSkillsChunks(alphabetical_skills);
    } else {
        // If no valid sort method is provided, returns an empty array.
        return [];
    }
}
const skillChunks = ref(calculated_skills(sort_method.value));



//  ######  ########    ###    ########  ######  
// ##    ##    ##      ## ##      ##    ##    ## 
// ##          ##     ##   ##     ##    ##       
//  ######     ##    ##     ##    ##     ######  
//       ##    ##    #########    ##          ## 
// ##    ##    ##    ##     ##    ##    ##    ## 
//  ######     ##    ##     ##    ##     ######  

const char_handle = computed({
    get: () => char.value.handle,
    set: (value) => char.value.handle = value
})
// const char_role = computed({
//     get: () => char.value.role,
//     set: (value) => char.value.role = value
// })
const char_rank = computed({
    get: () => char.value.role_ability_rank,
    set: (value) => {
        if (value > 0 && value <= 10)
            char.value.role_ability_rank = value
        else
            char.value.role_ability_rank = char.value.role_ability_rank

    }
})
const char_notes = computed({
    get: () => char.value.notes,
    set: (value) => char.value.notes = value
})

// const char_info = computed(() => {
//     return {
//         "Handle": char.value.handle,
//         "Role": char.value.role,
//         "Rank": char.value.role_ability_rank,
//         "Notes": char.value.notes
//     }
// })


const cash = computed(() => {
    return char.value.cash;
})


/**
 * Derived stats computed from raw stats and installed cyberware.
 */
const derived_stats = computed(() => {
    const humanity = char.value.stats.EMP * 10;
    const hit_points = 10 + (5 * Math.ceil((char.value.stats.BODY + char.value.stats.WILL) / 2));
    const severe_wound_threshold = Math.ceil(hit_points / 2);
    const death_save = char.value.stats.BODY;
    return {
        "Humanity": `${humanity - char.value.getHumanityLoss()} of ${humanity}`,
        "Hit Points": hit_points,
        "Severely Wounded": severe_wound_threshold,
        "Death Save": death_save
    }
})

/**
 * Computed getter/setter for bulk stat editing, including current EMP.
 */
const stats_block = computed({
    get: () => {
        const stats: Record<string, number> = {}
        for (const stat in char.value.stats) {
            stats[stat] = char.value.stats[stat]
        }
        const current_humanity = (char.value.stats['EMP'] * 10) - char.value.getHumanityLoss();
        const emp = Math.floor(current_humanity / 10);
        stats['current_EMP'] = emp

        return stats
    },
    set: (value) => {
        for (const stat in value) {
            char.value.stats[stat] = value[stat]
        }
    }
})
const remaining_stat_points = computed(() => {
    return char.value.getRemainingStatPoints();
})
const can_change_stats = computed(() => {
    return creation_method.value == 'complete'
})


// ##      ## ########    ###    ########   #######  ##    ##  ######  
// ##  ##  ## ##         ## ##   ##     ## ##     ## ###   ## ##    ## 
// ##  ##  ## ##        ##   ##  ##     ## ##     ## ####  ## ##       
// ##  ##  ## ######   ##     ## ########  ##     ## ## ## ##  ######  
// ##  ##  ## ##       ######### ##        ##     ## ##  ####       ## 
// ##  ##  ## ##       ##     ## ##        ##     ## ##   ### ##    ## 
//  ###  ###  ######## ##     ## ##         #######  ##    ##  ######  

const weapon_attachment_modal_visible = ref(false)
const weapon_attachment_modal = ref<WeaponAttachment>({ name: '', description: '', cost: 0, eligible: [], attachment_slots: 0 })
function OpenAttachmentModal(attachment: WeaponAttachment) {
    weapon_attachment_modal.value = attachment;
    weapon_attachment_modal_visible.value = true;
}
const armor_modal_visible = ref(false)
const armor_modal = ref<Armor>({ armor_type: '', sp: 0, penalty: [], cost: 0, description: "" })
function OpenArmorModal(armor: Armor) {
    armor_modal.value = armor;
    armor_modal_visible.value = true;
}

const clip_chart = ref(ClipChart);
const ammo_types = computed(() => {
    let ammo_types: Record<string, AmmoType> = {}
    for (const ammo_type of AmmoTypes) {
        ammo_types[ammo_type.name] = ammo_type
    }
    return ammo_types;
})

const ammo_type_modal_visible = ref(false)
const ammo_type_modal = ref<AmmoType>({
    name: '',
    cost: 0,
    available_for: [],
    description: ''
})
function OpenAmmoTypeModal(ammoType: AmmoType) {
    ammo_type_modal.value = ammoType;
    ammo_type_modal_visible.value = true;
}


//  ######   ########    ###    ########  
// ##    ##  ##         ## ##   ##     ## 
// ##        ##        ##   ##  ##     ## 
// ##   #### ######   ##     ## ########  
// ##    ##  ##       ######### ##   ##   
// ##    ##  ##       ##     ## ##    ##  
//  ######   ######## ##     ## ##     ## 

const gear = computed(() => {
    return char.value.gear;
});
const gear_modal_visible = ref(false)
const gear_modal = ref({ name: '', description: '', cost: 0 })
function OpenGearModal(gear: { name: string, description: string, cost: number }) {
    gear_modal.value = gear;
    gear_modal_visible.value = true;
}


//  ######  ##    ## ########  ######## ########  
// ##    ##  ##  ##  ##     ## ##       ##     ## 
// ##         ####   ##     ## ##       ##     ## 
// ##          ##    ########  ######   ########  
// ##          ##    ##     ## ##       ##   ##   
// ##    ##    ##    ##     ## ##       ##    ##  
//  ######     ##    ########  ######## ##     ## 

const cyberwareCount = computed(() => {
    let count = 0;
    for (const cyberware of Object.values(char.value.cyberware)) {
        if (cyberware === undefined) {
            continue;
        }
        if (cyberware.placeholder && cyberware.slotted_options.length == 0) {
            continue;
        }
        if (cyberware.placeholder === false) {
            count += 1
        }
        if (cyberware.slotted_options && cyberware.slotted_options.length > 0) {
            count += cyberware.slotted_options.length
            for (const option of cyberware.slotted_options) {
                if (option.slotted_options && option.slotted_options.length > 0) {
                    count += option.slotted_options.length
                }
            }
        }
    }

    return count;
})
const cyberware_icons = ref<Record<string, string>>({
    "Brain": "",
    "Ear": "",
    "Left Eye": "",
    "Right Eye": "",
    "Left Arm": "",
    "Right Arm": "",
    "Left Leg": "",
    "Right Leg": "",
    "Borgware": "",
    "Fashionware": "",
})

const cyberware_modal_visible = ref(false)
const cyberware_modal = ref<Cyberware>(new Cyberware({ name: "", type: CyberwareType.Neuralware }))
function OpenCyberwareModal(cyberware: Cyberware) {
    cyberware_modal.value = cyberware;
    cyberware_modal_visible.value = true;
}

function available_cyberware(location?: string) {
    let cyberware = [];
    if (location === undefined) {
        cyberware = Object.values(CyberwareList).filter(cyberware => char.value.canInstallCyberware({ cyberware: cyberware, returning: true }));
    }
    else {
        cyberware = Object.values(CyberwareList).filter(cyberware => cyberware.body_location.includes(location) && char.value.canInstallCyberware({ cyberware: cyberware, returning: true }));
    }
    cyberware = cyberware.sort((a, b) => a.name.localeCompare(b.name));
    return cyberware;
}

const cyberware_to_add = ref<Cyberware | undefined>(undefined)
function addCyberware() {
    if (cyberware_to_add.value === undefined) {
        return;
    }
    char.value.installCyberware({ cyberware: new Cyberware({ ...cyberware_to_add.value }) })
    cyberware_to_add.value = undefined;
}

function uninstallCyberware(id: string) {
    char.value.uninstallCyberwareById(id);
}



// ##       #### ######## ######## ########     ###    ######## ##     ## 
// ##        ##  ##       ##       ##     ##   ## ##      ##    ##     ## 
// ##        ##  ##       ##       ##     ##  ##   ##     ##    ##     ## 
// ##        ##  ######   ######   ########  ##     ##    ##    ######### 
// ##        ##  ##       ##       ##        #########    ##    ##     ## 
// ##        ##  ##       ##       ##        ##     ##    ##    ##     ## 
// ######## #### ##       ######## ##        ##     ##    ##    ##     ## 

const lifepath = computed(() => {
    return char?.value?.lifepath?.path || [];
})
const role_lifepath = computed(() => {
    return char?.value?.role_lifepath?.path || [];
})
type LifepathSelectionEntry = {
    event: LifepathRow;
    key: string;
    options: LifepathRow[];
    selectedIndex: number;
};
const lifepathSelections = ref<Record<string, number>>({});
const roleLifepathSelections = ref<Record<string, number>>({});
function buildLifepathPath(startingTable: LifepathTable | undefined, selections: Record<string, number>) {
    const path: LifepathRow[] = [];
    const tableOccurrences: Record<string, number> = {};

    function walkTable(table: LifepathTable) {
        let repeat = 1;
        if (table.repeat === "1d10-7") {
            repeat = Math.floor(Math.random() * 4);
        } else {
            repeat = table.repeat as number;
        }

        for (let i = 0; i < repeat; i++) {
            const occurrence = (tableOccurrences[table.name] ?? 0) + 1;
            tableOccurrences[table.name] = occurrence;
            const key = `${table.name}#${occurrence}`;
            let selectedIndex = selections[key];
            if (selectedIndex === undefined || selectedIndex < 0 || selectedIndex >= table.rows.length) {
                selectedIndex = Math.floor(Math.random() * table.rows.length);
            }
            selections[key] = selectedIndex;
            const row = table.rows[selectedIndex];
            path.push(new LifepathRow({ ...row }));
            if (row.next_table) {
                walkTable(row.next_table);
                return;
            }
        }
        if (table.next_table) {
            walkTable(table.next_table);
        }
    }

    if (startingTable) {
        walkTable(startingTable);
    }

    return { path, selections };
}
function buildLifepathSelections(path: LifepathRow[], selections: Record<string, number>): LifepathSelectionEntry[] {
    const occurrences: Record<string, number> = {};
    return path.map((event) => {
        const table = event.table;
        const tableName = table?.name ?? "Unknown";
        const occurrence = (occurrences[tableName] ?? 0) + 1;
        occurrences[tableName] = occurrence;
        const key = `${tableName}#${occurrence}`;
        const options = table?.rows ?? [];
        let selectedIndex = selections[key];
        if (selectedIndex === undefined || selectedIndex < 0 || selectedIndex >= options.length) {
            selectedIndex = options.findIndex((row) => row.value === event.value && row.description === event.description);
        }
        if (selectedIndex < 0) {
            selectedIndex = 0;
        }
        return {
            event,
            key,
            options,
            selectedIndex
        };
    });
}
const lifepathSelectionsDisplay = computed(() => {
    return buildLifepathSelections(lifepath.value, lifepathSelections.value);
});
const roleLifepathSelectionsDisplay = computed(() => {
    return buildLifepathSelections(role_lifepath.value, roleLifepathSelections.value);
});
function rebuildLifepathFromSelections() {
    const { path, selections } = buildLifepathPath(char.value.lifepath.starting_table, { ...lifepathSelections.value });
    lifepathSelections.value = selections;
    char.value.lifepath.path = path;
}
function rebuildRoleLifepathFromSelections() {
    const { path, selections } = buildLifepathPath(char.value.role_lifepath?.starting_table, { ...roleLifepathSelections.value });
    roleLifepathSelections.value = selections;
    if (char.value.role_lifepath) {
        char.value.role_lifepath.path = path;
    }
}
function updateLifepathSelection(key: string, table: LifepathTable | undefined, index: number) {
    if (!table) {
        return;
    }
    lifepathSelections.value = { ...lifepathSelections.value, [key]: index };
    rebuildLifepathFromSelections();
}
function updateRoleLifepathSelection(key: string, table: LifepathTable | undefined, index: number) {
    if (!table) {
        return;
    }
    roleLifepathSelections.value = { ...roleLifepathSelections.value, [key]: index };
    rebuildRoleLifepathFromSelections();
}
function parseSelectValue(event: Event) {
    return Number((event.target as HTMLSelectElement).value);
}
function walkLifepath() {
    char.value.resetLifepath();
    lifepathSelections.value = {};
    rebuildLifepathFromSelections();
}
const lifepath_modal_visible = ref(false)
const lifepath_modal_content = ref("")
function openLifepathModal(content: string) {
    lifepath_modal_content.value = content;
    lifepath_modal_visible.value = true;
}



function walkRoleLifepath() {
    char.value.setRole(char.value.role);
    roleLifepathSelections.value = {};
    rebuildRoleLifepathFromSelections();
}
const role_lifepath_modal_visible = ref(false)
const role_lifepath_modal_content = ref("")
function openRoleLifepathModal(content: string) {
    role_lifepath_modal_content.value = content;
    role_lifepath_modal_visible.value = true;
}


// ########     ###    ##    ## ########   #######  ##     ## #### ######## ######## 
// ##     ##   ## ##   ###   ## ##     ## ##     ## ###   ###  ##       ##  ##       
// ##     ##  ##   ##  ####  ## ##     ## ##     ## #### ####  ##      ##   ##       
// ########  ##     ## ## ## ## ##     ## ##     ## ## ### ##  ##     ##    ######   
// ##   ##   ######### ##  #### ##     ## ##     ## ##     ##  ##    ##     ##       
// ##    ##  ##     ## ##   ### ##     ## ##     ## ##     ##  ##   ##      ##       
// ##     ## ##     ## ##    ## ########   #######  ##     ## #### ######## ######## 

function randomizeWeapons() {
    char.value.randomizeWeapons();
}
function randomizeGear() {
    char.value.randomizeGear();
}
function randomizeArmor() {
    char.value.randomizeArmor();
}

function randomizeCyberware() {
    char.value.randomizeCyberware();
}

function randomizeStats() {
    char.value.randomizeStats();
}
function randomizeSkills() { char.value.randomizeSkills() }

function randomizeHandle() { char.value.randomizeName(); }



watch([char.value.skills, char.value.stats, sort_method, stats_block], () => {
    skillChunks.value = [...calculated_skills(sort_method.value)];
}, { deep: true });


generateCharacter(); // Generates a character on page load.
</script>





























<style>
.notch {
    overflow: hidden;
    border: 4px solid red;
    /* padding: 1rem; */
    border-top-width: 8px;
    position: relative;
}

.notch.border-b-0 {
    border-bottom-width: 0;
}

.notch:before {
    content: "";
    position: absolute;
    top: -1em;
    left: -1em;
    width: 2em;
    height: 2em;
    background-color: red;
    transform: rotate(45deg);

}

.skills .columns-1 {
    column-rule: 4px solid white;
}
</style>
<template>
    <main class="container p-4 mx-auto">



        <div class="notch grid grid-cols-4">
            <div :title="char_handle" class="p-4 border-red-500 border-r-4">
                <TextField title="Handle" v-model="char_handle" />
            </div>
            <TextField class="font-bold p-4 border-red-500 border-r-4" title="Role" v-model="role" :options="Object.values(Role).sort((a, b) => a > b ? 1 : -1)"></TextField>
            <TextField class="p-4 border-red-500 border-r-4 text-center" :valueClass="`text-center`" title="Rank" :min="1" v-model="char_rank" />
            <TextField class="p-4" title="Notes" :value-class="`font-normal`" :value="char_notes" />
        </div>

        <hr class="my-2" />
        <CPTitle class="flex justify-between pr-2" :bottom-border="true">
            <div class="mr-4">Character Creation</div>
            <div class="font-normal">
                Creation Method: <select class="px-2 border-solid border-red-500 border-4" v-model="creation_method">
                    <option value="street rat">Streetrat (Template)</option>
                    <option value="edgerunner">Edgerunner (Fast and Dirty)</option>
                    <option value="complete">Complete Package (Calculated)</option>
                </select>
            </div>
            <div>
                <CPButton @click="generateCharacter()">Generate Character</CPButton>
            </div>
        </CPTitle>

        <hr class="my-2" />
        <CPTitle class="flex justify-between pr-2">
            <span>Stats</span>
            <span v-if="can_change_stats">Points remaining: {{ remaining_stat_points }}</span>
            <CPButton @click="randomizeStats()">Randomize</CPButton>
        </CPTitle>
        <StatsBlock v-model="stats_block" :fixed="!can_change_stats" />

        <hr class="my-2" />

        <TextFieldRow :values="derived_stats" />

        <hr class="my-2" />


        <div class="skills">
            <CPTitle class="grid grid-cols-3 pr-2">
                <div class="mr-4">Skills</div>
                <div class="font-normal text-center">
                    <span class="align-top">Sorting by: </span><select v-model="sort_method" class="px-2 py-1 align-text-bottom">
                        <option value="alphabetical">Alphabetical</option>
                        <option value="base">Base</option>
                        <option value="group">Group</option>
                        <option value="level">Level</option>
                    </select>
                </div>
                <div class="text-right">
                    <CPButton v-if="['complete', 'edgerunner'].includes(creation_method)" @click="randomizeSkills()">Randomize</CPButton>
                </div>
            </CPTitle>
            <div class=" sm:columns-2 md:columns-3 columns-1 gap-1 bg-red-500 p-1">
                <template v-if="sort_method === 'group'">
                    <SkillsByGroup :char="char" />
                </template>
                <template v-else>
                    <SkillTable v-for="(chunk, index) in skillChunks" :key="`skill_chunk_${index}`" :chunk :char />
                </template>
            </div>
        </div>
        <hr class="my-2" />

        <CPTable title="Weapons" :headers="['Weapon', 'Description', 'Skill', 'Damage', 'Ammo', 'ROF', 'Notes', 'Cost']" :creation_method :randomize="randomizeWeapons">
            <CPRow v-if="char.weapons.length <= 0">
                <td colspan="7" class="text-center">No Weapons</td>
            </CPRow>
            <CPRow v-for="weapon in char.weapons" :key="`weapon_${weapon.name}`">
                <CPCell>{{ weapon.name }}</CPCell>
                <CPCell>
                    {{ weapon.description }}
                    <span v-if="weapon.quality">({{ weapon.quality.charAt(0).toUpperCase() +
                        weapon.quality.slice(1).toLowerCase() }} quality)</span>
                </CPCell>
                <CPCell>{{ char.skills[weapon.skill].name }}</CPCell>
                <CPCell class="text-center">{{ weapon.damage }}</CPCell>
                <CPCell v-if="weapon.ammo_type.length > 0">
                    <div>{{ weapon.ammo_type.join(', ') }}</div>
                    <ul class="list-disc list-inside">

                        <li v-if="weapon.ammo_type.some(type => ['arrow', 'grenade', 'rocket'].includes(type.toLowerCase()))" v-for="qty, ammo_name in weapon.ammo" :key="`ammo_agr_${ammo_name}`">
                            {{ qty }} <span class="underline decoration-dashed cursor-pointer" @click="OpenAmmoTypeModal(ammo_types[ammo_name])">{{ ammo_name.split(" ")[0] }}</span>
                            {{
                                weapon.ammo_type[0].toLowerCase() }}{{ qty > 1 ? 's' : '' }}
                        </li>
                        <li v-else v-for="qty, ammo_name in weapon.ammo" :key="`ammo_${ammo_name}`">
                            {{ qty }} rounds of <span class="underline decoration-dashed cursor-pointer" @click="OpenAmmoTypeModal(ammo_types[ammo_name])">{{ ammo_name }}</span>
                        </li>
                    </ul>
                </CPCell>
                <CPCell v-else></CPCell>
                <CPCell class="text-center">{{ weapon.rof }}</CPCell>
                <CPCell>
                    <ul>
                        <li v-if="weapon.ammo_type.length > 0 && !weapon.ammo_type.includes('Arrow')">Standard Mag
                            Size: {{ clip_chart[weapon.getKey()].standard }}</li>
                        <li v-if="weapon.alt_fire && weapon.alt_fire.toLowerCase() != 'none'">
                            Alt Fire: {{ weapon.alt_fire }}
                        </li>
                        <li v-if="weapon.special_features && weapon.special_features.toLowerCase() != 'none'">
                            Special Features:
                            {{ weapon.special_features }}
                        </li>
                        <li v-if="weapon.attachments.length > 0">
                            Attachments:
                            <ul class="list-disc list-inside">
                                <li v-for="attachment in weapon.attachments" class="cursor-pointer" @click="OpenAttachmentModal(attachment)" :key="`attachment_${attachment}`">
                                    <span class="underline decoration-dashed">{{ attachment.name }}</span>
                                    <span v-if="['Drum Magazine', 'Extended Magazine'].includes(attachment.name)">
                                        ({{ clip_chart[weapon.getKey()][attachment.name.split(" ")[0].toLowerCase()]
                                        }}
                                        rounds)
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </CPCell>
                <CPCell class="text-right">{{ weapon.cost }}eb</CPCell>
            </CPRow>
        </CPTable>
        <Modal :visible="weapon_attachment_modal_visible" @close="weapon_attachment_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">{{ weapon_attachment_modal.name }}</h2>
                <p>{{ weapon_attachment_modal.description }}</p>
                <CPButton @click="weapon_attachment_modal_visible = false">Close</CPButton>
            </div>
        </Modal>
        <Modal :visible="ammo_type_modal_visible" @close="ammo_type_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">{{ ammo_type_modal.name }}</h2>
                <p>{{ ammo_type_modal.description }}</p>
                <CPButton class="mt-4" @click="ammo_type_modal_visible = false">Close</CPButton>
            </div>
        </Modal>


        <hr class="my-2" />

        <CPTable title="Armor" :headers="['Location', 'Armor', 'SP', 'Penalty', 'Cost']" :creation_method :randomize="randomizeArmor">
            <CPRow v-for="armor, location in char.armor" :key="`armor_${location}`">
                <CPCell>{{ location }}</CPCell>
                <CPCell>
                    <span v-if="armor != 'None'" class="underline decoration-dashed cursor-pointer" @click="OpenArmorModal(armor)">{{ armor.armor_type }}</span>
                    <span v-else>None</span>
                </CPCell>
                <CPCell>{{ armor == "None" ? "" : armor.sp }}</CPCell>
                <CPCell>{{ armor == "None" ? "" : armor.penalty.length <= 0 ? "None" : armor.penalty.map(penalty =>
                    `${penalty.stat}: ${penalty.penalty}`).join(", ") }}</CPCell>
                <CPCell class="text-right">{{ armor == "None" || (location == "body" &&
                    armor.armor_type == "Bodyweight Suit") ?
                    "" : `${armor.cost}eb` }}</CPCell>
            </CPRow>
        </CPTable>
        <Modal :visible="armor_modal_visible" @close="armor_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">{{ armor_modal.armor_type }}</h2>
                <p>{{ armor_modal.description }}</p>
                <CPButton class="mt-4" @click="armor_modal_visible = false">Close</CPButton>
            </div>
        </Modal>
        <hr class="my-2" />

        <CPTable title="Gear" :headers="['Item', 'Description', 'Cost']" :creation_method :randomize="randomizeGear">
            <CPRow v-if="gear.length <= 0">
                <td colspan="3" class="text-center">No Gear</td>
            </CPRow>
            <CPRow v-for="gear_item in gear" :key="`gear_${Math.random()}`">
                <CPCell>{{ gear_item.name }}</CPCell>
                <!-- <CPCell><span class="whitespace-pre-wrap" v-html="gear_item.description"></span></CPCell> -->
                <CPCell><span class="cursor-pointer underline decoration-dashed" @click="OpenGearModal(gear_item)">{{ gear_item.description.slice(0, 25) }}...</span></CPCell>
                <CPCell class="text-right">{{ gear_item.cost }}eb </CPCell>
            </CPRow>
        </CPTable>
        <Modal :visible="gear_modal_visible" @close="gear_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">{{ gear_modal.name }}</h2>
                <p class="whitespace-pre-wrap">{{ gear_modal.description }}</p>
                <CPButton class="mt-4" @click="gear_modal_visible = false">Close</CPButton>
            </div>
        </Modal>

        <hr class="my-2" />
        <!-- 
 ######  ##    ## ########  ######## ########  
##    ##  ##  ##  ##     ## ##       ##     ## 
##         ####   ##     ## ##       ##     ## 
##          ##    ########  ######   ########  
##          ##    ##     ## ##       ##   ##   
##    ##    ##    ##     ## ##       ##    ##  
 ######     ##    ########  ######## ##     ##  -->

        <CPTitle class="flex justify-between pr-2">
            <span>Cyberware</span>
            <div>
                <span class="font-bold">Total Humanity Loss: </span>
                <span>{{ char.getHumanityLoss() }}</span>
            </div>
            <div v-if="creation_method == 'complete'">
                <select v-model="cyberware_to_add" class="px-2 py-1 align-text-bottom">
                    <option :value="undefined" selected disabled>Select Cyberware</option>
                    <option v-for="cyberware in available_cyberware()" :value="cyberware">{{ cyberware.name }} - {{ cyberware.cost }}eb</option>
                </select>
                &nbsp;
                <CPButton @click="addCyberware">Add</CPButton>
            </div>
            <CPButton v-if="creation_method == 'complete'" @click="randomizeCyberware()">Randomize</CPButton>
        </CPTitle>
        <div class="grid grid-cols-2 items-stretch border-solid border-b-4 border-red-500">
            <div class="h-full flex flex-col" v-for="(cyberware, location) in char.cyberware">
                <CPTitle>{{ location }} <span v-html="cyberware_icons[location]"></span></CPTitle>
                <div class="flex-1 border-solid border-4 border-b-0 border-red-500 px-4 py-2">
                    <template v-if="cyberware === undefined || (cyberware.placeholder && cyberware.slotted_options.length == 0)">
                        &nbsp;<!-- <div class="text-center">No Cyberware installed in {{ location }}</div> -->
                    </template>
                    <template v-if="!(cyberware === undefined || (cyberware.placeholder && cyberware.slotted_options.length == 0))">
                        <template v-if="cyberware.placeholder === false">
                            <div class="flex justify-between">
                                <span class="cursor-pointer underline decoration-dashed" @click="OpenCyberwareModal(cyberware)">{{ cyberware.name }}</span>
                                <CPButton v-if="creation_method == 'complete'" @click="uninstallCyberware(cyberware.id)">Uninstall</CPButton>
                            </div>
                        </template>
                        <template v-if="cyberware?.slotted_options && cyberware.slotted_options.length > 0" v-for="(option, index) in cyberware.slotted_options" :key="`cyberware_${location}_${index}`">
                            <div class="flex justify-between">
                                <span class="cursor-pointer underline decoration-dashed" @click="OpenCyberwareModal(option)">{{ option.name }}</span>
                                <CPButton v-if="creation_method == 'complete'" @click="uninstallCyberware(option.id)">Uninstall</CPButton>
                            </div>
                            <template v-if="option?.slotted_options && option.slotted_options.length > 0" v-for="(option2, index2) in option.slotted_options" :key="`cyberware_option_${location}_${index}_${index2}`">
                                <div class="flex justify-between">
                                    <span class="cursor-pointer underline decoration-dashed" @click="OpenCyberwareModal(option2)">{{ option2.name }}</span>
                                    <CPButton v-if="creation_method == 'complete'" @click="uninstallCyberware(option.id)">Uninstall</CPButton>
                                </div>
                            </template>
                        </template>
                    </template>
                    <div>

                    </div>
                </div>
            </div>

        </div>
        <Modal :visible="cyberware_modal_visible" @close="cyberware_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">{{ cyberware_modal.name }}</h2>
                <p class="whitespace-pre-wrap mb-2">{{ cyberware_modal.description }}</p>
                <p>Cost: <span class="font-bold">{{ cyberware_modal.cost }}eb</span></p>
                <p>Humanity Loss: <span class="font-bold">{{ cyberware_modal.humanity_loss }}</span></p>
                <p v-if="cyberware_modal.slots_available > 0">Open Slots: <span class="font-bold">{{ cyberware_modal.getOpenSlots() }}</span></p>
                <CPButton class="mt-4" @click="cyberware_modal_visible = false">Close</CPButton>
            </div>
        </Modal>

        <hr class="my-2" />
        <TextFieldRow :values="{ 'Cash': cash.toString() + 'eb' }" />

        <hr class="my-2" />
        <!-- 


##       #### ######## ######## ########     ###    ######## ##     ## 
##        ##  ##       ##       ##     ##   ## ##      ##    ##     ## 
##        ##  ##       ##       ##     ##  ##   ##     ##    ##     ## 
##        ##  ######   ######   ########  ##     ##    ##    ######### 
##        ##  ##       ##       ##        #########    ##    ##     ## 
##        ##  ##       ##       ##        ##     ##    ##    ##     ## 
######## #### ##       ######## ##        ##     ##    ##    ##     ## 



-->
        <CPTable title="Lifepath" :randomize="walkLifepath" :show_randomize_button="true">
            <CPRow v-if="lifepath.length <= 0">
                <td colspan="2" class="text-center">The general Lifepath has not been walked.</td>
            </CPRow>
            <CPRow v-for="entry in lifepathSelectionsDisplay" :key="`lifepath_${entry.key}`">
                <CPCell class="w-1/3">
                    <span v-if="entry.event.table?.description === undefined || entry.event.table?.description == ''">{{
                        entry.event.table?.name
                        || "---" }}</span>
                    <span v-else class="cursor-pointer underline decoration-dashed" @click="openLifepathModal(entry.event.table?.description || '')">{{ entry.event.table?.name }}</span>
                </CPCell>
                <CPCell class="w-2/3">
                    <select
                        v-if="entry.options.length > 0"
                        class="px-2 py-1 w-full"
                        :value="entry.selectedIndex"
                        @change="updateLifepathSelection(entry.key, entry.event.table, parseSelectValue($event))"
                    >
                        <option v-for="(option, optionIndex) in entry.options" :key="`lifepath_option_${entry.key}_${optionIndex}`" :value="optionIndex">
                            {{ option.value }}
                        </option>
                    </select>
                    <span v-else-if="entry.event.description" class="cursor-pointer underline decoration-dashed" @click="openLifepathModal(entry.event.description || '')">{{ entry.event.value }}</span>
                    <span v-else>{{ entry.event.value }}</span>
                </CPCell>
            </CPRow>
        </CPTable>
        <Modal :visible="lifepath_modal_visible" @close="lifepath_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">Lifepath Event</h2>
                <p>{{ lifepath_modal_content }}</p>
                <CPButton class="mt-4" @click="lifepath_modal_visible = false">Close</CPButton>
            </div>
        </Modal>

        <hr class="my-2" />

        <CPTable :title="`${char.role} Lifepath`" :randomize="walkRoleLifepath" :show_randomize_button="true">
            <CPRow v-if="role_lifepath.length <= 0">
                <td colspan="2" class="text-center">The {{ char.role }} Lifepath has not been walked.</td>
            </CPRow>
            <CPRow v-for="entry in roleLifepathSelectionsDisplay" :key="`role_lifepath_${entry.key}`">
                <CPCell class="w-1/3">
                    <span v-if="entry.event.table?.description === undefined || entry.event.table?.description == ''">{{
                        entry.event.table?.name
                        || "---" }}</span>
                    <span v-else class="cursor-pointer underline decoration-dashed" @click="openRoleLifepathModal(entry.event.table?.description || '')">{{ entry.event.table?.name }}</span>
                </CPCell>
                <CPCell class="w-2/3">
                    <select
                        v-if="entry.options.length > 0"
                        class="px-2 py-1 w-full"
                        :value="entry.selectedIndex"
                        @change="updateRoleLifepathSelection(entry.key, entry.event.table, parseSelectValue($event))"
                    >
                        <option v-for="(option, optionIndex) in entry.options" :key="`role_lifepath_option_${entry.key}_${optionIndex}`" :value="optionIndex">
                            {{ option.value }}
                        </option>
                    </select>
                    <span v-else-if="entry.event.description" class="cursor-pointer underline decoration-dashed" @click="openRoleLifepathModal(entry.event.description || '')">{{ entry.event.value }}</span>
                    <span v-else>{{ entry.event.value }}</span>
                </CPCell>
            </CPRow>
        </CPTable>
        <Modal :visible="role_lifepath_modal_visible" @close="role_lifepath_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">Role Lifepath Event</h2>
                <p>{{ role_lifepath_modal_content }}</p>
                <CPButton class="mt-4" @click="role_lifepath_modal_visible = false">Close</CPButton>
            </div>
        </Modal>

        <br /><br /><br />

    </main>
</template>
