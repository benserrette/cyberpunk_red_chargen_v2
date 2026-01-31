import { computed, ref, type Ref } from 'vue';
import { Role } from '@/data';
import SkillTables from '@/data/edge_runner_skill_tables';
import { LifepathRow } from '@/classes';
import type { Character, Cyberware, LifepathTable } from '@/classes';

type LifepathSelectionEntry = {
    event: LifepathRow;
    key: string;
    options: LifepathRow[];
    selectedIndex: number;
    label: string;
};

type UseLifepathOptions = {
    char: Ref<Character>;
    role: Ref<Role>;
};

const noneThreadReplacements: Record<string, string> = {
    'How many friends do you have?': 'no friends',
    'How many enemies do you have?': 'no enemies',
    'How many tragic love affairs do you have?': 'no tragic love affairs'
};

export function useLifepath({ char, role }: UseLifepathOptions) {
    const lifepath = computed(() => {
        return char.value.lifepath?.path || [];
    });
    const role_lifepath = computed(() => {
        return char.value.role_lifepath?.path || [];
    });

    const lifepathSelections = ref<Record<string, number>>({});
    const roleLifepathSelections = ref<Record<string, number>>({});

    const buildLifepathPath = (
        startingTable: LifepathTable | undefined,
        selections: Record<string, number>
    ) => {
        const path: LifepathRow[] = [];
        const tableOccurrences: Record<string, number> = {};
        const repeatOverrides: Record<string, number[]> = {};

        const walkTable = (table: LifepathTable) => {
            let repeat = 1;
            const overrideQueue = repeatOverrides[table.name];
            if (overrideQueue && overrideQueue.length > 0) {
                repeat = overrideQueue.shift() ?? 1;
            } else if (table.repeat === '1d10-7') {
                repeat = Math.floor(Math.random() * 4);
            } else {
                repeat = table.repeat as number;
            }

            for (let i = 0; i < repeat; i += 1) {
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
                    if (row.next_table_repeat !== undefined) {
                        repeatOverrides[row.next_table.name] ??= [];
                        repeatOverrides[row.next_table.name].push(row.next_table_repeat);
                    }
                    walkTable(row.next_table);
                }
            }
            if (table.next_table) {
                walkTable(table.next_table);
            }
        };

        if (startingTable) {
            walkTable(startingTable);
        }

        return { path, selections };
    };

    const buildLifepathSelections = (
        path: LifepathRow[],
        selections: Record<string, number>
    ): LifepathSelectionEntry[] => {
        const occurrences: Record<string, number> = {};
        const indexedTables = new Set(['Enemy', 'Friends', 'Tragic Love Affair']);
        return path.map((event) => {
            const table = event.table;
            const tableName = table?.name ?? 'Unknown';
            const occurrence = (occurrences[tableName] ?? 0) + 1;
            occurrences[tableName] = occurrence;
            const key = `${tableName}#${occurrence}`;
            const options = table?.rows ?? [];
            const label = indexedTables.has(tableName) ? `${tableName} ${occurrence}` : tableName;
            let selectedIndex = selections[key];
            if (selectedIndex === undefined || selectedIndex < 0 || selectedIndex >= options.length) {
                selectedIndex = options.findIndex(
                    (row) => row.value === event.value && row.description === event.description
                );
            }
            if (selectedIndex < 0) {
                selectedIndex = 0;
            }
            return {
                event,
                key,
                options,
                selectedIndex,
                label
            };
        });
    };

    const lifepathSelectionsDisplay = computed(() => {
        return buildLifepathSelections(lifepath.value, lifepathSelections.value);
    });

    const roleLifepathSelectionsDisplay = computed(() => {
        return buildLifepathSelections(role_lifepath.value, roleLifepathSelections.value);
    });

    const rebuildLifepathFromSelections = () => {
        const { path, selections } = buildLifepathPath(
            char.value.lifepath.starting_table,
            { ...lifepathSelections.value }
        );
        lifepathSelections.value = selections;
        char.value.lifepath.path = path;
    };

    const rebuildRoleLifepathFromSelections = () => {
        const { path, selections } = buildLifepathPath(
            char.value.role_lifepath?.starting_table,
            { ...roleLifepathSelections.value }
        );
        roleLifepathSelections.value = selections;
        if (char.value.role_lifepath) {
            char.value.role_lifepath.path = path;
        }
    };

    const updateLifepathSelection = (key: string, table: LifepathTable | undefined, index: number) => {
        if (!table) {
            return;
        }
        lifepathSelections.value = { ...lifepathSelections.value, [key]: index };
        rebuildLifepathFromSelections();
    };

    const updateRoleLifepathSelection = (key: string, table: LifepathTable | undefined, index: number) => {
        if (!table) {
            return;
        }
        roleLifepathSelections.value = { ...roleLifepathSelections.value, [key]: index };
        rebuildRoleLifepathFromSelections();
    };

    const walkLifepath = () => {
        char.value.resetLifepath();
        lifepathSelections.value = {};
        rebuildLifepathFromSelections();
    };

    const walkRoleLifepath = () => {
        char.value.setRole(char.value.role);
        roleLifepathSelections.value = {};
        rebuildRoleLifepathFromSelections();
    };

    const getLifepathSelections = () => {
        return { ...lifepathSelections.value };
    };

    const getRoleLifepathSelections = () => {
        return { ...roleLifepathSelections.value };
    };

    const setLifepathSelections = (selections: Record<string, number>) => {
        lifepathSelections.value = { ...selections };
        rebuildLifepathFromSelections();
    };

    const setRoleLifepathSelections = (selections: Record<string, number>) => {
        roleLifepathSelections.value = { ...selections };
        rebuildRoleLifepathFromSelections();
    };

    const toThirdPerson = (value: string) => {
        let text = value;
        const replaceToken = (pattern: RegExp, replacement: string, replacementCapitalized: string) => {
            text = text.replace(pattern, (match) => {
                const isCapitalized = match[0] === match[0].toUpperCase();
                return isCapitalized ? replacementCapitalized : replacement;
            });
        };
        const replaceObjectPronoun = (pattern: RegExp, replacement: string, replacementCapitalized: string) => {
            text = text.replace(pattern, (_match, prefix: string, token: string) => {
                const isCapitalized = token[0] === token[0].toUpperCase();
                return `${prefix}${isCapitalized ? replacementCapitalized : replacement}`;
            });
        };
        replaceToken(/\byou're\b/gi, "they're", "They're");
        replaceToken(/\byou've\b/gi, "they've", "They've");
        replaceToken(/\byou'll\b/gi, "they'll", "They'll");
        replaceToken(/\byou'd\b/gi, "they'd", "They'd");
        replaceToken(/\byourself\b/gi, "themselves", "Themselves");
        replaceToken(/\byours\b/gi, "theirs", "Theirs");
        replaceToken(/\byour\b/gi, "their", "Their");
        replaceObjectPronoun(
            /\b(to|for|with|at|from|about|against|on|in|into|through|over|under|around|before|after|watching|tracking|following|hunting|protecting|helping|hurting|guarding|shadowing|seeking)\s+(you)\b/gi,
            'them',
            'Them'
        );
        replaceToken(/\byou\b/gi, 'they', 'They');
        return text;
    };

    const normalizeSentenceFragment = (
        value: string,
        { lowerCaseStart = false, thirdPerson = false }: { lowerCaseStart?: boolean; thirdPerson?: boolean } = {}
    ) => {
        let text = value.trim();
        if (thirdPerson) {
            text = toThirdPerson(text);
        }
        text = text.replace(/[.]+$/g, '');
        if (lowerCaseStart && text.length > 0) {
            text = text[0].toLowerCase() + text.slice(1);
        }
        return text;
    };

    const formatOtherThread = (entry: LifepathSelectionEntry) => {
        const tableName = entry.event.table?.name ?? entry.label;
        const normalized = normalizeSentenceFragment(entry.event.value, { thirdPerson: true });
        if (!normalized) {
            return '';
        }
        if (normalized.toLowerCase() === 'none' && tableName in noneThreadReplacements) {
            return noneThreadReplacements[tableName];
        }
        if (tableName === 'Where is Your Corp Based?') {
            return `Their corp is ${normalized}`;
        }
        const separator = entry.label.trim().endsWith('?') ? ' ' : ': ';
        return `${entry.label}${separator}${normalized}`;
    };

    const hashSeed = (value: string) => {
        let hash = 0;
        for (let i = 0; i < value.length; i += 1) {
            hash = Math.imul(31, hash) + value.charCodeAt(i);
            hash |= 0;
        }
        return hash >>> 0;
    };

    const makeRng = (seed: number) => {
        let state = seed >>> 0;
        return () => {
            state = (Math.imul(1664525, state) + 1013904223) >>> 0;
            return state / 0x100000000;
        };
    };

    const pickRandomEntries = (entries: LifepathSelectionEntry[], count: number, seed: number) => {
        const copy = [...entries];
        const rng = makeRng(seed);
        for (let i = copy.length - 1; i > 0; i -= 1) {
            const j = Math.floor(rng() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy.slice(0, Math.min(count, copy.length));
    };

    const findEntryByTable = (entries: LifepathSelectionEntry[], tableName: string) => {
        return entries.find((entry) => entry.event?.table?.name === tableName);
    };

    const getInstalledCyberware = (cyberware: Record<string, Cyberware | undefined>) => {
        const items: Cyberware[] = [];
        const pushItem = (item: Cyberware) => {
            if (item.placeholder) {
                return;
            }
            items.push(item);
            if (item.slotted_options?.length) {
                for (const option of item.slotted_options) {
                    pushItem(option);
                }
            }
        };
        for (const entry of Object.values(cyberware)) {
            if (!entry) {
                continue;
            }
            pushItem(entry);
        }
        return items;
    };

    const character_summary = computed(() => {
        const skills = Object.values(char.value.skills);
        if (skills.length === 0) {
            return 'Generate a character to see a summary.';
        }
        const baseSkills = skills.map((skill) => ({
            skill,
            base: (char.value.stats[skill.stat] ?? 0) + (skill.lvl ?? 0)
        }));
        baseSkills.sort((a, b) => b.base - a.base || a.skill.name.localeCompare(b.skill.name));
        const top = baseSkills[0];
        const roleSkillTable = SkillTables[role.value as Role] ?? {};
        const roleSkillNames = new Set(Object.keys(roleSkillTable));
        const lowCandidates = roleSkillNames.size > 0
            ? baseSkills.filter((entry) => roleSkillNames.has(entry.skill.name))
            : baseSkills;
        const lowSorted = [...lowCandidates].sort((a, b) => a.base - b.base || a.skill.name.localeCompare(b.skill.name));
        const low = lowSorted[0] ?? baseSkills[baseSkills.length - 1];
        const handle = char.value.handle?.trim();
        const article = /^[aeiou]/i.test(role.value) ? 'an' : 'a';
        const nameLead = handle && handle !== 'Unknown' ? `${handle} is ${article}` : `This character is ${article}`;
        let summary = `${nameLead} ${role.value} who shines in ${top.skill.name} (Base ${top.base})`;
        if (low) {
            summary += ` but struggles with ${low.skill.name} (Base ${low.base})`;
        }
        summary += '.';
        const baseEntries = lifepathSelectionsDisplay.value;
        const roleEntries = roleLifepathSelectionsDisplay.value;
        const personalityEntry = findEntryByTable(baseEntries, 'What are you like?');
        const goalEntry = findEntryByTable(baseEntries, 'Your Life Goals');
        const originEntry = findEntryByTable(baseEntries, 'Cultural Origin');
        const valueEntries = [
            findEntryByTable(baseEntries, 'Most valued person in your life?'),
            findEntryByTable(baseEntries, 'What do you value most?'),
            findEntryByTable(baseEntries, 'Most valued possession you own?')
        ].filter((entry): entry is LifepathSelectionEntry => Boolean(entry));
        const seed = hashSeed(`${char.value.handle}|${role.value}|${baseEntries.length}|${roleEntries.length}`);
        const excludedExtraTables = new Set([
            'What are you like?',
            'Your Life Goals',
            'Friends',
            'How many friends do you have?',
            'Enemy',
            'How many enemies do you have?',
            'Who was wronged?',
            'What caused it?',
            'What can they throw at you?',
            'What are you/they gonna do about it?',
            'Tragic Love Affair',
            'How many tragic love affairs do you have?'
        ]);
        const baseExtras = baseEntries.filter((entry) => !excludedExtraTables.has(entry.event?.table?.name ?? ''));
        let extras: LifepathSelectionEntry[] = [];
        if (roleEntries.length > 0) {
            const rolePick = pickRandomEntries(roleEntries, 1, seed);
            const remainingPool = baseExtras.filter((entry) => !rolePick.includes(entry));
            extras = [...rolePick, ...pickRandomEntries(remainingPool, 1, seed + 2)];
        } else {
            extras = pickRandomEntries(baseExtras, 2, seed);
        }
        const sentences: string[] = [];
        if (originEntry || personalityEntry || valueEntries.length > 0) {
            const fragments: string[] = [];
            if (originEntry) {
                fragments.push(normalizeSentenceFragment(originEntry.event.value, { lowerCaseStart: true, thirdPerson: true }));
            }
            if (personalityEntry) {
                fragments.push(normalizeSentenceFragment(personalityEntry.event.value, {
                    lowerCaseStart: originEntry !== undefined,
                    thirdPerson: true
                }));
            }
            const valueEntry = valueEntries.length > 0 ? pickRandomEntries(valueEntries, 1, seed + 1)[0] : undefined;
            if (valueEntry) {
                fragments.push(`value ${normalizeSentenceFragment(valueEntry.event.value, { lowerCaseStart: true, thirdPerson: true })}`);
            }
            if (fragments.length === 1 && fragments[0].startsWith('value ')) {
                sentences.push(`They ${fragments[0]}.`);
            } else if (fragments.length > 0) {
                const combined = fragments.join(', ').replace(', value ', ', and value ');
                sentences.push(`They're ${combined}.`);
            }
        }
        if (goalEntry) {
            const goalText = normalizeSentenceFragment(goalEntry.event.value, { lowerCaseStart: true, thirdPerson: true });
            sentences.push(`Their goal is to ${goalText}.`);
        }
        if (extras.length > 0) {
            const extraText = extras
                .map((entry) => formatOtherThread(entry))
                .filter((text) => text.length > 0);
            if (extraText.length > 0) {
                sentences.push(`Other threads: ${extraText.join(', ')}.`);
            }
        }
        const cyberwareItems = getInstalledCyberware(char.value.cyberware);
        if (cyberwareItems.length > 0) {
            const names = Array.from(new Set(cyberwareItems.map((item) => item.name)));
            const list = names.slice(0, 2).join(', ');
            const suffix = names.length > 2 ? ` and ${names.length - 2} more` : '';
            sentences.push(`Cyberware includes ${list}${suffix}.`);
        } else {
            sentences.push('No cyberware installed.');
        }
        if (sentences.length > 0) {
            summary += ` ${sentences.join(' ')}`;
        }
        return summary;
    });

    return {
        lifepath,
        role_lifepath,
        lifepathSelectionsDisplay,
        roleLifepathSelectionsDisplay,
        getLifepathSelections,
        getRoleLifepathSelections,
        setLifepathSelections,
        setRoleLifepathSelections,
        updateLifepathSelection,
        updateRoleLifepathSelection,
        walkLifepath,
        walkRoleLifepath,
        character_summary
    };
}
