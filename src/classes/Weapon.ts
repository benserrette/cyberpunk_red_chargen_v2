/**
 * Weapon domain model with ammo and attachment logic.
 */
import { type WeaponAttachment } from "@/data/weapon_attachments";
import { type AmmoType } from "@/data/ammo_types";

import { WeaponAttachments } from "@/data/weapon_attachments";
import { AmmoTypes } from "@/data/ammo_types";
import { ClipChart } from "@/data/clip_chart";


export class Weapon {
    max_attachments = 3;
    name: string;
    skill: string;
    damage: string;
    rof: number;
    concealed: boolean;
    cost: number;
    num_hands: number = 1;
    description: string = "";
    variants: string[] = [];
    alt_fire: string = "none";
    special_features: string = "none";
    // mag_type: string = "standard";
    // mag_size: number = 0;
    ammo_type: string[];
    quality: string = "standard";
    quality_variants: Record<string, string> = {};
    attachments: WeaponAttachment[] = [];
    // magazines: AmmoType[] = [];
    ammo: Record<string, number> = {};

    constructor({
        name,
        skill,
        damage,
        rof,
        concealed,
        cost,
        variants = [],
        description = "",
        alt_fire = "none",
        special_features = "none",
        num_hands = 1,
        mag_size = 0,
        ammo_type = [],
        quality = "standard",
        quality_variants = {},
        ammo
    }: {
        name: string,
        skill: string,
        damage: string,
        rof: number,
        concealed: boolean,
        cost: number,
        variants?: string[],
        description?: string,
        alt_fire?: string,
        special_features?: string,
        num_hands?: number,
        mag_size?: number,
        ammo_type?: string[],
        quality?: string,
        quality_variants?: Record<string, string>,
        ammo?: Record<string, number>
    }) {
        this.name = name;
        this.skill = skill;
        this.damage = damage;
        this.rof = rof;
        this.concealed = concealed;
        this.cost = cost;
        this.description = description;
        this.variants = variants;
        if (variants.length > 0 && !description) {
            const randomIndex = Math.floor(Math.random() * variants.length);
            this.description = variants[randomIndex];
        }
        this.alt_fire = alt_fire;
        this.special_features = special_features;
        this.num_hands = num_hands;
        // this.mag_size = mag_size;
        this.ammo_type = ammo_type;
        this.quality = quality || ["poor", "standard", "excellent"][Math.floor(Math.random() * 3)];
        this.quality_variants = quality_variants;
        const variantKeys = Object.keys(this.quality_variants);
        if (variantKeys.length > 0 && !description) {
            const qualityKey = this.quality.toLowerCase();
            if (qualityKey in this.quality_variants) {
                this.description = this.quality_variants[qualityKey];
            } else {
                const randomIndex = Math.floor(Math.random() * variantKeys.length);
                this.description = this.quality_variants[variantKeys[randomIndex]];
            }
        }

        if (ammo) {
            for (const ammo_name in ammo) {
                this.addAmmo(ammo_name, ammo[ammo_name]);
            }
        } else if (this.ammo_type.length !== 0) {
            const default_ammo_quantity = ClipChart[this.getKey()]["standard"];
            if (this.ammo_type.includes("Grenade")) {
                this.addAmmo("Basic Grenade", default_ammo_quantity);
            } else if (this.ammo_type.includes("Rocket")) {
                this.addAmmo("Basic Rocket", default_ammo_quantity);
            } else if (this.ammo_type.includes("Arrow")) {
                this.addAmmo("Basic Arrow", default_ammo_quantity);
            } else {
                this.addAmmo("Basic Ammo", default_ammo_quantity);
            }
        }
    }

    getKey(): string {
        return this.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    }
    randomAmmoType(): string {
        const randomIndex = Math.floor(Math.random() * this.ammo_type.length);
        return this.ammo_type[randomIndex];
    }

    addAmmo(ammo_name: string, quantity: number): void {
        const ammo_type = AmmoTypes.find(ammoType => ammoType.name === ammo_name);
        if (!ammo_type) {
            throw new Error(`AmmoType (${ammo_name}) not found`);
        }
        if (!this.supportsAmmoType(ammo_type)) {
            throw new Error(`AmmoType (${ammo_type.name}) not supported by this weapon (${this.name})`);
        }
        let ammo_quantity = this.ammo[ammo_name] || 0;
        this.ammo[ammo_name] = ammo_quantity + quantity;
    }

    addAttachment(attachment: WeaponAttachment): void {
        if (attachment.eligible.includes(this.name) === false) {
            console.error({
                weapon: this.name,
                attachment: attachment.name,
                eligible: attachment.eligible
            })
            throw new Error("Attachment not eligible for this weapon");
        }
        let number_of_attachments = 0
        for (const key in this.attachments) {
            number_of_attachments += attachment.attachment_slots;
        }
        if (this.max_attachments - number_of_attachments < attachment.attachment_slots) {
            throw new Error("Not enough attachment slots");
        }
        this.attachments.push(attachment);
    }
    supportsAmmoType(ammoType: AmmoType | undefined): boolean {
        if (ammoType == undefined) {
            return false;
        }
        return ammoType.available_for.some(type => this.ammo_type.includes(type));
    }
}
