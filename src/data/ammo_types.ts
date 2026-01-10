/**
 * Ammo type catalog data.
 */
export interface AmmoType {
    name: string;
    cost: number;
    available_for: string[];
    description: string;
}

const ammo_types: AmmoType[] = [
    {
        name: "Basic Ammo",
        cost: 10,
        available_for: ["M Pistol", "H Pistol", "VH Pistol", "Slug", "Rifle", "Shotgun Shell"],
        description: `This is the standard ammunition for the weapon. It has no special features.`
    },
    {
        name: "Basic Arrow",
        cost: 10,
        available_for: ["Arrow"],
        description: `Bows and Crossbows fire Arrows. Because
        loading an Arrow is part of attacking with a Bow
        or Crossbow, you never need to Reload a
        Bow or Crossbow using the Reload Action.
        Additionally, Basic Arrows can always be retrieved
        after they are fired, making buying basic ammunition
        for these weapons almost a one-time investment.`
    },
    {
        name: "Basic Grenade",
        cost: 100,
        available_for: ["Grenade"],
        description: `All explosives weapons deal their damage to all
        targets (including the terrain) in a 10m/yd
        by 10m/yd area (5 Square by 5 Square), the
        center of which is your intended target (which is a 2m/
        yd by 2m/yd square, not an individual). You only
        roll damage once for all targets.`
    },
    {
        name: "Basic Rocket",
        cost: 100,
        available_for: ["Rocket"],
        description: `All explosives weapons deal their damage to all
        targets (including the terrain) in a 10m/yd
        by 10m/yd area (5 Square by 5 Square), the
        center of which is your intended target (which is a 2m/
        yd by 2m/yd square, not an individual). You only
        roll damage once for all targets.`
    },
    {
        name: "Armor-Piercing Ammo",
        cost: 100,
        available_for: ["M Pistol", "H Pistol", "VH Pistol", "Slug", "Rifle", "Arrow", "Grenade", "Rocket"],
        description: `When using this ammunition, you ablate armor by 2 instead of 1 whenever you would ablate armor.`
    },
    {
        name: "Biotoxin Ammo",
        cost: 500,
        available_for: ["Arrow", "Grenade"],
        description: `When using this ammunition, you deal no damage with your attack. Anyone meat hit by your attack must
        instead attempt to beat a DV15 Resist Torture/Drugs Check. Anyone who fails is dealt 3d6 damage directly
        to their HP. Their armor isn't ablated because it wasn't interacted with.`
    },
    {
        name: "EMP Ammo",
        cost: 500,
        available_for: ["Grenade"],
        description: `When using this ammunition, you deal no damage with your attack. Anyone hit by your attack must instead
        attempt to beat a DV15 Cybertech Check. If they fail, the GM chooses 2 pieces of their Cyberware or carried
        electronics to become inoperable for 1 minute. Cyberlimbs that are rendered inoperable act as their meat
        counterparts do when they have been dismembered, but they still hang loosely. See Critical Injuries on pg. 187 .`
    },
    {
        name: "Expansive Ammo",
        cost: 100,
        available_for: ["M Pistol", "H Pistol", "VH Pistol", "Slug", "Rifle", "Arrow"],
        description: `When using this ammunition, whenever you cause the Foreign Object Critical Injury, the victim rolls again on
        the Critical Injury table (see pg. 187) until they roll a Critical Injury that isn't Foreign Object. The victim then
        suffers that Critical Injury as well. This second injury deals no Bonus Damage.`
    },
    {
        name: "Flashbang",
        cost: 100,
        available_for: ["Grenade"],
        description: `When using this ammunition, you deal no damage with your attack. Anyone hit by your attack must instead
        attempt to beat a DV15 Resist Torture/Drugs Check. Anyone who fails suffers the Damaged Eye and
        Damaged Ear Critical Injuries (see pg. 188) for the next minute. You do not take the Bonus Damage from
        the Critical Injuries.`
    },
    {
        name: "Incendiary Ammo",
        cost: 100,
        available_for: ["Arrow", "M Pistol", "H Pistol", "VH Pistol", "Slug", "Rifle", "Grenade", "Shotgun Shells"],
        description: `When using this ammunition, whenever you deal damage to a target through their armor, you ignite the target.
        Until your target spends an Action to put themselves out, they take 2 damage directly to their HP whenever
        they end their Turn. Multiple instances of this effect cannot stack.`
    },
    {
        name: "Poison",
        cost: 100,
        available_for: ["Arrow", "Grenade"],
        description: `When using this ammunition, you deal no damage with your attack. Anyone meat hit by your attack must
        instead attempt to beat a DV13 Resist Torture/Drugs Check. Anyone who fails is dealt 2d6 damage directly
        to their HP. Their armor isn't ablated because it wasn't interacted with.`
    },
    {
        name: "Rubber Bullets",
        cost: 10,
        available_for: ["Arrow", "M Pistol", "H Pistol", "VH Pistol", "Slug", "Rifle", "Slugs"],
        description: `Damage dealt using this ammunition cannot cause a Critical Injury. Additionally, attacks made with this
        ammunition cannot ablate armor. If damage dealt by this ammunition would reduce a target with more than
        1 HP to less than 0 HP, they are instead left at 1 HP.`
    },
    {
        name: "Sleep Ammo",
        cost: 500,
        available_for: ["Arrow", "Grenade"],
        description: `When using this ammunition, you deal no damage with your attack. Anyone meat hit by your attack must
        instead attempt to beat a DV13 Resist Torture/Drugs Check. Anyone who fails is now Prone (see pg. 169)
        and Unconscious for 1 minute or until they are woken by taking damage, or by someone else using an Action
        that touches them.`
    },
    {
        name: "Smart Ammo",
        cost: 500,
        available_for: ["Arrow", "M Pistol", "H Pistol", "VH Pistol", "Slug", "Rifle", "Rocket"],
        description: `Targeting Scope Cyberware is required in order to make use of Smart Ammunition. When fired by a User
        without Targeting Scope Cyberware, Smart Ammunition won't fire even when the trigger is pulled, as a safety
        feature. When using this ammunition, whenever you miss a shot by 4 or less when using a weapon's single
        shot firing mode, your missed shot immediately has a second chance to hit your target. This second chance
        to hit is made by rolling again to hit the exact same shot DV on the range table which you missed, except that
        you add 10 to the d10 instead of anything you would typically add to the Check, with the only exception
        being LUCK. A target that can dodge bullets can choose to dodge this ranged attack as normal.`
    },
    {
        name: "Smoke Grenades",
        cost: 50,
        available_for: ["Grenade"],
        description: `Obscures a 10m/yd by 10m/yd area with smoke for a minute on impact. The typical penalty for trying to
        perform a task obscured by smoke is -4.`
    },
    {
        name: "Teargas",
        cost: 50,
        available_for: ["Grenade"],
        description: `When using this ammunition, you deal no damage with your attack. Anyone with meat eyes hit by your attack
        must instead attempt to beat a DV13 Resist Torture/Drugs Check. Anyone who fails suffers the Damaged Eye
        Critical injury (see pg. 188) for the next minute. You do not take the Bonus Damage from the Critical Injury.`
    }
];

export { ammo_types as AmmoTypes };