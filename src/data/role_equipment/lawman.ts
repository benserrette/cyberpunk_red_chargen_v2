/**
 * Lawman equipment roll table.
 */
const items = [
    [{
        type: "weapon",
        name: "Assault Rifle",
        ammo: ["Basic Ammo", 100]
    }, {
        type: "weapon",
        name: "Shotgun",
        ammo: ["Basic Ammo", 100]
    }],
    [{
        type: "weapon",
        name: "Heavy Pistol",
        ammo: ["Basic Ammo", 30]
    }],
    [{
        type: "armor",
        name: "Bulletproof Shield"
    }, {
        type: "weapon",
        name: "Grenade",
        ammo: ["Smoke Grenades", 2]
    }],
    [{
        type: "armor",
        location: "body",
        name: "Light Armorjack"
    }],
    [{
        type: "armor",
        location: "head",
        name: "Light Armorjack"
    }],

    [{
        type: "gear",
        name: "Agent"
    }],
    [{
        type: "gear",
        name: "Flashlight"
    }],
    [{
        type: "gear",
        name: "Handcuffs",
        quantity: 2
    }],
    [{
        type: "gear",
        name: "Radio Communicator"
    }],
    [{
        type: "gear",
        name: "Road Flare",
        quantity: 10
    }],
    [{
        type: "fashion",
        name: "Generic Chic: Jacket, Bottoms x2, Top x3"
    }],
    [{
        type: "fashion",
        name: "Leisurewear: Footwear x2, Jacket x2, Bottoms x2, Mirrorshades, Top x2"
    }],
    [{
        type: "cyberware",
        name: "Hidden Holster"
    }],
    [{
        type: "cyberware",
        name: "Subdermal Pocket"
    }]
]

export default items;

// Agent
// Flashlight
// Handcuffs x2
// Radio Communicator
// Road Flare x10
// Generic Chic: Jacket, Bottoms
// x2, Top x3
// Leisurewear: Footwear x2,
// Jacket x2, Bottoms x2,
// Mirrorshades, Top x2

// Assault Rifle or Shotgun
// Heavy Pistol
// Basic Rifle Ammunition
// x100 or Basic Shotgun Shell
// Ammunition x100 or Basic
// Slug Ammunition x100
// Basic H Pistol
// Ammunition x30
// Bulletproof Shield or Smoke
// Grenade x2
// Light Armorjack
// Body Armor (SP11)
// Light Armorjack
// Head Armor (SP11)