import { computed, ref } from 'vue';
import {
    ArmorList,
    AmmoTypes,
    Cyberware as CyberwareList,
    Gear,
    MeleeWeapons,
    RangedWeapons,
    WeaponAttachments
} from '@/data';
import type { Weapon } from '@/classes';

type CatalogItem = {
    name: string;
    description: string;
    cost: number;
    category: string;
    skill?: string;
    damage?: string;
    rof?: number;
    ammo?: string;
    alt_fire?: string;
    special_features?: string;
    sp?: number | string;
    penalty?: string;
    location?: string;
    prereqs?: string;
};

type CatalogSortKey = 'name' | 'cost';

export function useCatalog() {
    const catalog_modal_visible = ref(false);
    const catalog_sort_key = ref<CatalogSortKey>('name');
    const catalog_sort_direction = ref<'asc' | 'desc'>('asc');
    const catalog_category = ref<string | null>(null);

    const getWeaponExamples = (weapon: Weapon) => {
        const examples = new Set<string>();
        if (weapon.variants?.length) {
            for (const example of weapon.variants) {
                if (example) {
                    examples.add(example);
                }
            }
        }
        if (weapon.quality_variants) {
            for (const [quality, example] of Object.entries(weapon.quality_variants)) {
                if (example) {
                    const label = quality.charAt(0).toUpperCase() + quality.slice(1).toLowerCase();
                    examples.add(`${example} (${label} quality)`);
                }
            }
        }
        if (examples.size === 0 && weapon.description) {
            examples.add(weapon.description);
        }
        return Array.from(examples).join(', ') || 'No examples available.';
    };

    const catalog_items = computed(() => {
        const items: CatalogItem[] = [];
        const addItem = (
            name: string,
            description: string,
            cost: number,
            category: string,
            details?: Partial<CatalogItem>
        ) => {
            items.push({
                name,
                description: description?.trim() || 'No description available.',
                cost,
                category,
                ...details
            });
        };

        for (const weapon of [...MeleeWeapons, ...RangedWeapons]) {
            const examples = getWeaponExamples(weapon);
            addItem(weapon.name, examples, weapon.cost, 'Weapon', {
                skill: weapon.skill,
                damage: weapon.damage,
                rof: weapon.rof,
                ammo: weapon.ammo_type?.join(', ') || '',
                alt_fire: weapon.alt_fire && weapon.alt_fire.toLowerCase() !== 'none' ? weapon.alt_fire : '',
                special_features: weapon.special_features && weapon.special_features.toLowerCase() !== 'none'
                    ? weapon.special_features
                    : ''
            });
        }
        for (const armor of ArmorList) {
            const penalty = armor.penalty.length <= 0
                ? 'None'
                : armor.penalty.map((entry) => `${entry.stat}: ${entry.penalty}`).join(', ');
            addItem(armor.armor_type, armor.description, armor.cost, 'Armor', {
                sp: armor.sp,
                penalty
            });
        }
        for (const gearItem of Object.values(Gear)) {
            addItem(gearItem.name, gearItem.description, gearItem.cost, 'Gear');
        }
        for (const cyberware of CyberwareList) {
            const location = cyberware.body_location.length > 0 ? cyberware.body_location.join(', ') : '';
            const prereqs = cyberware.required_cyberware || '';
            addItem(cyberware.name, cyberware.description, cyberware.cost, 'Cyberware', {
                location,
                prereqs
            });
        }
        for (const attachment of Object.values(WeaponAttachments)) {
            addItem(attachment.name, attachment.description, attachment.cost, 'Weapon Attachment');
        }
        for (const ammoType of AmmoTypes) {
            addItem(ammoType.name, ammoType.description, ammoType.cost, 'Ammo');
        }

        return items;
    });

    const catalog_filtered_items = computed(() => {
        if (!catalog_category.value) {
            return catalog_items.value;
        }
        return catalog_items.value.filter((item) => item.category === catalog_category.value);
    });

    const catalog_sorted_items = computed(() => {
        const items = [...catalog_filtered_items.value];
        const direction = catalog_sort_direction.value === 'asc' ? 1 : -1;
        return items.sort((a, b) => {
            if (catalog_sort_key.value === 'cost') {
                return (a.cost - b.cost) * direction;
            }
            return a.name.localeCompare(b.name) * direction;
        });
    });

    const catalog_description_label = computed(() => {
        return catalog_category.value === 'Weapon' ? 'Examples' : 'Description';
    });

    const catalog_modal_title = computed(() => {
        if (!catalog_category.value) {
            return 'Item Catalog';
        }
        return `${catalog_category.value} Catalog`;
    });

    const is_weapon_catalog = computed(() => catalog_category.value === 'Weapon');
    const is_armor_catalog = computed(() => catalog_category.value === 'Armor');
    const is_cyberware_catalog = computed(() => catalog_category.value === 'Cyberware');

    const catalogSortIndicator = (key: CatalogSortKey) => {
        if (catalog_sort_key.value !== key) {
            return '';
        }
        return catalog_sort_direction.value === 'asc' ? ' ▲' : ' ▼';
    };

    const toggleCatalogSort = (key: CatalogSortKey) => {
        if (catalog_sort_key.value === key) {
            catalog_sort_direction.value = catalog_sort_direction.value === 'asc' ? 'desc' : 'asc';
            return;
        }
        catalog_sort_key.value = key;
        catalog_sort_direction.value = 'asc';
    };

    const openCatalog = (category: string) => {
        catalog_category.value = category;
        catalog_modal_visible.value = true;
    };

    return {
        catalog_modal_visible,
        catalog_sort_key,
        catalog_sort_direction,
        catalog_category,
        catalog_items,
        catalog_filtered_items,
        catalog_sorted_items,
        catalog_description_label,
        catalog_modal_title,
        is_weapon_catalog,
        is_armor_catalog,
        is_cyberware_catalog,
        getWeaponExamples,
        catalogSortIndicator,
        toggleCatalogSort,
        openCatalog
    };
}
