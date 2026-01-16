/**
 * Barrel exports for data catalogs and enums.
 *
 * Components and domain models import from this module to avoid reaching into
 * individual data files, keeping dependencies centralized.
 */
import { Stat } from './stats'
import { SKILLS_LIST as SkillList, required_skills as RequiredSkills, categories as SkillCategories } from './skills'
import { Role } from './roles'
import { CyberwareLocation } from './cyberware_locations'
import { BodyLocation, CyberwareType, cyberware as Cyberware } from './cyberware'
import { MeleeWeapons, RangedWeapons } from './weapons'
import { WeaponAttachments } from './weapon_attachments'
import { ArmorList } from './armor'
import { ClipChart } from './clip_chart'
import { AmmoTypes } from './ammo_types'
import { Gear } from './gear'
import { RoleAbilities } from './role_abilities'
import { } from './role_lifepath_tables';

export {
    Stat,
    WeaponAttachments,
    SkillList,
    Role,
    CyberwareLocation,
    RequiredSkills,
    SkillCategories,
    MeleeWeapons,
    RangedWeapons,
    ArmorList,
    ClipChart,
    AmmoTypes,
    Gear,
    BodyLocation,
    CyberwareType,
    Cyberware,
    RoleAbilities
}
