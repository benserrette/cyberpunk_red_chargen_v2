/**
 * Weapon catalog data.
 */
import { Weapon } from "../classes/Weapon";

const melee_weapons = [
    new Weapon({
        name: "Light Melee Weapon",
        skill: "melee_weapon",
        damage: "1d6",
        rof: 2,
        concealed: true,
        cost: 50,
        variants: ["Combat Knife", "Tomahawk"]
    }),
    new Weapon({
        name: "Medium Melee Weapon",
        skill: "melee_weapon",
        damage: "2d6",
        rof: 2,
        concealed: false,
        cost: 50,
        variants: ["Baseball Bat", "Crowbar", "Machete"]
    }),
    new Weapon({
        name: "Heavy Melee Weapon",
        skill: "melee_weapon",
        damage: "3d6",
        rof: 2,
        concealed: false,
        cost: 100,
        variants: ["Lead Pipe", "Sword", "Spiked Bat"]
    }),
    new Weapon({
        name: "Very Heavy Melee Weapon",
        skill: "melee_weapon",
        damage: "4d6",
        rof: 1,
        concealed: false,
        cost: 500,
        variants: ["Chainsaw", "Sledgehammer", "Helicopter Blades", "Naginata"]
    })
];

const ranged_weapons = [
    new Weapon({
        name: "Medium Pistol",
        skill: "handgun",
        damage: "2d6",
        mag_size: 12,
        ammo_type: ["M Pistol"],
        rof: 2,
        num_hands: 1,
        concealed: true,
        cost: 50,
        alt_fire: "None",
        special_features: "None",
        quality_variants: {
            "poor": "Dai Lung Streetmaster",
            "standard": "Federated Arms X-9mm",
            "excellent": "Militech Avenger"
        }
    }),
    new Weapon({
        name: "Heavy Pistol",
        skill: "handgun",
        damage: "3d6",
        mag_size: 8,
        ammo_type: ["H Pistol"],
        rof: 2,
        num_hands: 1,
        concealed: true,
        cost: 100,
        alt_fire: "None",
        special_features: "None",
        quality_variants: {
            "poor": "Dai Lung Magnum",
            "standard": "Mustang Arms Mark III",
            "excellent": "Nova Cityhunter"
        }
    }),
    new Weapon({
        name: "Very Heavy Pistol",
        skill: "handgun",
        damage: "4d6",
        mag_size: 8,
        ammo_type: ["VH Pistol"],
        rof: 1,
        num_hands: 1,
        concealed: false,
        cost: 100,
        alt_fire: "None",
        special_features: "None",
        quality_variants: {
            "poor": "Federated Arms Super Chief",
            "standard": "Sternmeyer P-35",
            "excellent": "Militech Boomer Buster"
        }
    }),
    new Weapon({
        name: "SMG",
        skill: "handgun",
        damage: "2d6",
        mag_size: 30,
        ammo_type: ["M Pistol"],
        rof: 1,
        num_hands: 1,
        concealed: true,
        cost: 100,
        alt_fire: ["Autofire (3)", "Suppressive Fire"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "Federated Arms Tech-Assault III",
            "standard": "Militech Mini-Gat",
            "excellent": "Arasaka Minami 10"
        }
    }),
    new Weapon({
        name: "Heavy SMG",
        skill: "handgun",
        damage: "3d6",
        mag_size: 40,
        ammo_type: ["H Pistol"],
        rof: 1,
        num_hands: 1,
        concealed: false,
        cost: 100,
        alt_fire: ["Autofire (3)", "Suppressive Fire"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "Chadran Arms City Reaper",
            "standard": "Sternmeyer SMG-21",
            "excellent": "Militech Viper"
        }
    }),
    new Weapon({
        name: "Shotgun",
        skill: "shoulder_arms",
        damage: "5d6",
        mag_size: 4,
        ammo_type: ["Slug", "Shotgun Shell"],
        rof: 1,
        num_hands: 2,
        concealed: false,
        cost: 500,
        alt_fire: ["Shotgun Shell"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "GunMart Home Defender",
            "standard": "Arasaka Rapid Assault",
            "excellent": "Militech Bulldog"
        }
    }),
    new Weapon({
        name: "Assault Rifle",
        skill: "shoulder_arms",
        damage: "5d6",
        mag_size: 25,
        ammo_type: ["Rifle"],
        rof: 1,
        num_hands: 2,
        concealed: false,
        cost: 500,
        alt_fire: ["Autofire (4)", "Suppressive Fire"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "Chadran Arms Jungle Reaper",
            "standard": "Militech Ronin",
            "excellent": "Militech Dragon"
        }
    }),
    new Weapon({
        name: "Sniper Rifle",
        skill: "shoulder_arms",
        damage: "5d6",
        mag_size: 4,
        ammo_type: ["Rifle"],
        rof: 1,
        num_hands: 2,
        concealed: false,
        cost: 500,
        alt_fire: [].join(", "),
        special_features: "None",
        quality_variants: {
            "poor": "GunMart Snipe-Star",
            "standard": "Nomad Long Rifle",
            "excellent": "Arasaka WSSA Sniper System"
        }
    }),
    new Weapon({
        name: "Bow",
        skill: "archery",
        damage: "4d6",
        mag_size: 2,
        ammo_type: ["Arrow"],
        rof: 1,
        num_hands: 2,
        concealed: false,
        cost: 100,
        alt_fire: ["Arrow"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "GunMart Sherwood",
            "standard": "Eagletech Tomcat",
            "excellent": "Eagletech Bearcat"
        }
    }),
    new Weapon({
        name: "Crossbow",
        skill: "archery",
        damage: "4d6",
        mag_size: 3,
        ammo_type: ["Arrow"],
        rof: 1,
        num_hands: 2,
        concealed: false,
        cost: 100,
        alt_fire: ["Arrow"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "GunMart Hunter",
            "standard": "Eagletech Striker",
            "excellent": "Eagletech Scorpion"
        }
    }),
    new Weapon({
        name: "Grenade Launcher",
        skill: "heavy_weapons",
        damage: "6d6",
        mag_size: 2,
        ammo_type: ["Grenade"],
        rof: 1,
        num_hands: 2,
        concealed: false,
        cost: 500,
        alt_fire: ["Explosive"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "Towa Manufacturing Type-G",
            "standard": "Militech Mini-Grenade",
            "excellent": "Tsunami Arms Type-18"
        }
    }),
    new Weapon({
        name: "Rocket Launcher",
        skill: "heavy_weapons",
        damage: "8d6",
        mag_size: 1,
        ammo_type: ["Rocket"],
        rof: 1,
        num_hands: 2,
        concealed: false,
        cost: 500,
        alt_fire: ["Explosive"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "Towa Manufacturing Type-R",
            "standard": "Militech Urban",
            "excellent": "Militech Hotshot"
        }
    }),
    new Weapon({
        name: "Grenade",
        skill: "athletics",
        damage: "6d6",
        mag_size: 1,
        ammo_type: ["Grenade"],
        rof: 1,
        num_hands: 1,
        concealed: true,
        cost: 0,
        alt_fire: ["Explosive"].join(", "),
        special_features: "",
        quality_variants: {
            "poor": "",
            "standard": "",
            "excellent": ""
        }
    })
];

export { melee_weapons as MeleeWeapons, ranged_weapons as RangedWeapons };


