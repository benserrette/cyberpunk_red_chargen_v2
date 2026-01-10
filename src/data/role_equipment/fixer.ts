/**
 * Fixer equipment roll table.
 *
 * Each nested array represents a pick list consumed by Character.getEquipmentFromTable.
 */
const items = [
    [{
        type: "weapon",
        name: "Heavy Pistol",
        ammo: ["Basic Ammo", 50]
    }, {
        type: "weapon",
        name: "Very Heavy Pistol",
        ammo: ["Basic Ammo", 50]
    }],
    [{
        type: "weapon",
        name: "Heavy Pistol",
        ammo: ["Basic Ammo", 50]
    }, {
        type: "weapon",
        name: "Very Heavy Pistol",
        ammo: ["Basic Ammo", 50]
    }],
    [{
        type: "weapon",
        name: "Light Melee Weapon"
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
        name: "Bug Detector"
    }],
    [{
        type: "gear",
        name: "Computer"
    }],
    [{
        type: "gear",
        name: "Disposable Phone",
        quantity: 2
    }],
    [{
        type: "fashion",
        name: "Generic Chic: Contacts, Jewelry"
    }],
    [{
        type: "fashion",
        name: "Leisurewear: Mirrorshades"
    }],
    [{
        type: "fashion",
        name: "Urbanflash: Footwear, Jacket, Bottoms, Top"
    }],
    [{
        type: "cyberware",
        name: "Cyberaudio Suite"
    }],
    [{
        type: "cyberware",
        name: "Internal Agent"
    }],
    [{
        type: "cyberware",
        name: "Subdermal Pocket"
    }],
    [{
        type: "cyberware",
        name: "Voice Stress Analyzer"
    }, {
        type: "cyberware",
        name: "Amplified Hearing"
    }]
]

export default items;


// Cyberaudio Suite
// Internal Agent
// Subdermal Pocket
// Voice Stress Analyzer
// or Amplified Hearing

// Agent
// Bug Detector
// Computer
// Disposable Phone x2
// Generic Chic: Contacts, Jewelry
// Leisurewear: Mirrorshades
// Urbanflash: Footwear, Jacket,
// Bottoms, Top

// Heavy Pistol or Very Heavy
// Pistol
// Heavy Pistol or Very Heavy
// Pistol
// Light Melee Weapon
// Basic H Pistol Ammunition
// x100 or Basic VH Pistol
// Ammunition x100
// Light Armorjack
// Body Armor (SP11)
// Light Armorjack
// Head Armor (SP11)
