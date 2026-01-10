/**
 * Shared type exports for app data models.
 *
 * This module consolidates low-level data shapes so the domain classes
 * (Character, Weapon, Skill, Lifepath) and UI components can refer to the same
 * types without coupling directly to each individual data file.
 */
import type { WeaponAttachment } from "@/data/weapon_attachments";
import type { AmmoType } from "@/data/ammo_types";
import type { Armor } from "@/data/armor";
import type { Stat } from "@/data/stats";
import type { GearItem } from "@/data/gear";
import type { FoundationalCyberware, Cyberware } from "@/data/cyberware";
export type { WeaponAttachment, AmmoType, Armor, Stat, GearItem, FoundationalCyberware, Cyberware };
