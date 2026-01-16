/**
 * Rockerboy equipment roll table.
 *
 * Each nested array represents a pick list consumed by Character.getEquipmentFromTable.
 */
const items = [
    [{
        type: "weapon",
        name: "Very Heavy Pistol",
        ammo: ["Basic Ammo", 50]
    }],
    [{
        type: "weapon",
        name: "Heavy Melee Weapon"
    }, {
        type: "weapon",
        name: "Grenade",
        ammo: ["Flashbang", 1]
    }],
    [{
        type: "weapon",
        name: "Grenade",
        ammo: ["Teargas", 2]
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
        name: "Computer"
    }],
    [{
        type: "gear",
        name: "Electric Guitar or another Instrument"
    },
    {
        type: "gear",
        name: "Bug Detector"
    }],
    [{
        type: "gear",
        name: "Glow Paint"
    }],
    [{
        type: "gear",
        name: "Glow Paint"
    }],
    [{
        type: "gear",
        name: "Glow Paint"
    }],
    [{
        type: "gear",
        name: "Glow Paint"
    }],
    [{
        type: "gear",
        name: "Glow Paint"
    }],
    [{
        type: "gear",
        name: "Pocket Amp"
    }],
    [{
        type: "gear",
        name: "Radio Scanner / Music Player"
    }],
    [{
        type: "gear",
        name: "Video Camera"
    }],
    [{
        type: "fashion",
        items: [
            { style: "Generic Chic", item_type: "Jacket" },
            { style: "Generic Chic", item_type: "Jewelry", quantity: 3 },
            { style: "Generic Chic", item_type: "Top", quantity: 4 }
        ]
    }],
    [{
        type: "fashion",
        items: [
            { style: "Leisurewear", item_type: "Jewelry" },
            { style: "Leisurewear", item_type: "Mirrorshades" },
            { style: "Leisurewear", item_type: "Footwear" }
        ]
    }],
    [{
        type: "fashion",
        items: [
            { style: "Urbanflash", item_type: "Bottoms" },
            { style: "Urbanflash", item_type: "Top" }
        ]
    }],
    [{
        type: "cyberware",
        name: "Cyberaudio Suite"
    }],
    [{
        type: "cyberware",
        name: "Audio Recorder"
    }],
    [{
        type: "cyberware",
        name: "Chemskin"
    }],
    [{
        type: "cyberware",
        name: "Techhair"
    }]
]

export default items;

// Audio Recorder
// Chemskin
// Cyberaudio Suite
// Tech Hair

// Agent
// Computer
// Electric Guitar or Bug Detector
// Glow Paint x5
// Pocket Amp
// Radio Scanner / Music Player
// Video Camera
// Generic Chic: Jacket, Jewelry
// x3, Top x4
// Leisurewear: Jewelry,
//     Mirrorshades, Footwear
// Urbanflash: Bottoms, Top


// Very Heavy Pistol
// Basic VH Pistol
// Ammunition x50
// Heavy Melee Weapon or
// Flashbang Grenade
// Teargas Grenade x2
// Light Armorjack
// Body Armor (SP11)
// Light Armorjack
// Head Armor (SP11)
