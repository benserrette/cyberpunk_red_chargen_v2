/**
 * Media equipment roll table.
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
        name: "Audio Recorder"
    }],
    [{
        type: "gear",
        name: "Binoculars"
    }],
    [{
        type: "gear",
        name: "Disposable Cellphone",
        quantity: 2
    },
    {
        type: "gear",
        name: "Grapple Gun"
    }],
    [{
        type: "gear",
        name: "Flashlight"
    }],
    [{
        type: "gear",
        name: "Computer"
    }],
    [{
        type: "gear",
        name: "Radio Scanner / Music Player"
    }],
    [{
        type: "gear",
        name: "Scrambler / Descrambler"
    }],
    [{
        type: "gear",
        name: "Video Camera"
    }],
    [{
        type: "fashion",
        items: [
            { style: "Generic Chic", item_type: "Footwear" },
            { style: "Generic Chic", item_type: "Bottoms" },
            { style: "Generic Chic", item_type: "Top" }
        ]
    }],
    [{
        type: "fashion",
        items: [
            { style: "Leisurewear", item_type: "Jacket" }
        ]
    }],
    [{
        type: "fashion",
        items: [
            { style: "Urbanflash", item_type: "Mirrorshades" }
        ]
    }],
    [{
        type: "cyberware",
        name: "Cyberaudio Suite"
    }],
    [{
        type: "cyberware",
        name: "Amplified Hearing"
    },
    {
        type: "cyberware",
        name: "Voice Stress Analyzer"
    }],
    [{
        type: "cyberware",
        name: "Light Tattoo"

    }]
]

export default items;

// Amplified Hearing
// or Voice Stress Analyzer
// Cyberaudio Suite
// Light Tattoo

// Agent
// Audio Recorder
// Binoculars
// Disposable Cellphone x2 or
// Grapple Gun
// Flashlight
// Computer
// Radio Scanner/Music Player
// Scrambler/Descrambler
// Video Camera
// Generic Chic: Footwear,
// Bottoms, Top
// Leisurewear: Jacket
// Urbanflash: Mirrorshades

// Heavy Pistol or Very Heavy
// Pistol
// Basic H Pistol
// Ammunition x50 or
// Basic VH Pistol
// Ammunition x50
// Light Armorjack
// Body Armor (SP11)
// Light Armorjack
// Head Armor (SP11)
