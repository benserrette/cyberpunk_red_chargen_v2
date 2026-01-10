/**
 * Weapon attachment catalog data.
 *
 * Attachments are consumed by the Weapon model to validate slots and by UI
 * components to describe modifiers for players.
 */
/**
 * Shape of an attachment entry in the static catalog.
 */
export interface WeaponAttachment {
    name: string;
    cost: number;
    eligible: string[];
    description: string;
    attachment_slots: number;
}
/**
 * Lookup table of weapon attachments keyed by slug.
 */
const weapon_attachments: { [key: string]: WeaponAttachment; } = {
    bayonet: {
        name: "Bayonet",
        cost: 100,
        eligible: ["Shotgun", "Assault Rifle", "Sniper Rifle"],
        description: "When wielded, this weapon can also be used as a Light Melee Weapon. While this is attached to a weapon, it cannot be concealed under clothing.",
        attachment_slots: 1
    },
    drum_magazine: {
        name: "Drum Magazine",
        cost: 500,
        eligible: ["Medium Pistol", "Heavy Pistol", "Very Heavy Pistol", "SMG", "Heavy SMG", "Shotgun", "Assault Rifle", "Sniper Rifle", "Grenade Launcher", "Rocket Launcher"],
        description: "The weapon holds a maximum number of shots equal to its Drum entry on the Clip Chart below. Only one clip can be attached to a weapon at a time. While this is attached to a weapon, it cannot be concealed under clothing.",
        attachment_slots: 1
    },
    extended_magazine: {
        name: "Extended Magazine",
        cost: 100,
        eligible: ["Medium Pistol", "Heavy Pistol", "Very Heavy Pistol", "SMG", "Heavy SMG", "Shotgun", "Assault Rifle", "Sniper Rifle", "Grenade Launcher", "Rocket Launcher"],
        description: "The weapon holds a maximum number of shots equal to its Extended entry on the Clip Chart chart below. Only one clip can be attached to a weapon at a time. While this is attached to a weapon, it cannot be concealed under clothing.",
        attachment_slots: 1
    },
    grenade_launcher_underbarrel: {
        name: "Grenade Launcher Underbarrel",
        cost: 500,
        eligible: ["Assault Rifle", "Sniper Rifle", "Shotgun"],
        description: "When wielded in two hands, the weapon can also be used as a Grenade Launcher, with only 1 grenade in its magazine. While this is attached to a weapon, it cannot be concealed under clothing. Requires 2 Attachment Slots.",
        attachment_slots: 2
    },
    infrared_nightvision_scope: {
        name: "Infrared Nightvision Scope",
        cost: 500,
        eligible: ["Medium Pistol", "Heavy Pistol", "Very Heavy Pistol", "SMG", "Heavy SMG", "Shotgun", "Assault Rifle", "Sniper Rifle", "Grenade Launcher", "Rocket Launcher", "Bows & Crossbows"],
        description: "Reduces penalties imposed on your firing at a target obscured to you by darkness, smoke, fog, etc. to 0. Looking through the scope, you can distinguish hot meat from cold metal, but not more specifically than that. You can’t tell the brand of their Cyberarm from a distance, or see any of its internal surprises, for example.",
        attachment_slots: 1
    },
    shotgun_underbarrel: {
        name: "Shotgun Underbarrel",
        cost: 500,
        eligible: ["Assault Rifle, Sniper Rifle, Shotgun"],
        description: "When wielded in two hands, the weapon can also be used as a Shotgun, with only 2 shots in its magazine. While this is attached to a weapon, it cannot be concealed under clothing. Requires 2 Attachment Slots.",
        attachment_slots: 2
    },
    smartgun_link: {
        name: "Smartgun Link",
        cost: 500,
        eligible: ["Medium Pistol", "Heavy Pistol", "Very Heavy Pistol", "SMG", "Heavy SMG", "Shotgun", "Assault Rifle", "Sniper Rifle", "Grenade Launcher", "Rocket Launcher", "Bows & Crossbows"],
        description: "Installing or uninstalling a Smartgun Link takes an hour. A weapon is a Smartgun only when it has a Smartgun Link attached to it. Special Cyberware is required to take advantage of a Smartgun. A Smartgun Link must be connected to you with Interface Plugs or a Subdermal Grip in order to operate, both of which require you to have a Neural Link. A Subdermal Grip connects a Smartgun held in it automatically. You can plug in Interface Plugs as part of drawing a Smartgun into a free hand, as long as your Interface Plugs aren't already plugged into something else. Being disarmed of your Smartgun doesn't snap your cables, it just unplugs them from the Smartgun. Plugging them back in isn't an Action should you have the Smartgun in your hand, as their ports are designed for ease-of-use. Why go through all this trouble? Because when making Ranged Attacks with one, you add a +1 to your Check. Requires 2 Attachment Slots.",
        attachment_slots: 2
    },
    sniping_scope: {
        name: "Sniping Scope",
        cost: 100,
        eligible: ["Medium Pistol", "Heavy Pistol", "Very Heavy Pistol", "SMG", "Heavy SMG", "Shotgun", "Assault Rifle", "Sniper Rifle", "Grenade Launcher", "Rocket Launcher", "Bows & Crossbows"],
        description: "Looking through the scope, user can see detail up to 800m/yds away. When attacking a target 51m/yards or further away with either a weapon's single shot firing mode or an Aimed Shot, you can add a +1 to your Check. Does not stack with TeleOptics Cyberware.",
        attachment_slots: 1
    }
};

export { weapon_attachments as WeaponAttachments }
