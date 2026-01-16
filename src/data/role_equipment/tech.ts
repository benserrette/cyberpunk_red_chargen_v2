/**
 * Tech equipment roll table.
 *
 * Each nested array represents a pick list consumed by Character.getEquipmentFromTable.
 */
const items = [
    [{
        type: "weapon",
        name: "Shotgun",
        ammo: ["Basic Ammo", 100]
    },
    {
        type: "weapon",
        name: "Assault Rifle",
        ammo: ["Basic Ammo", 100]
    }],
    [{
        type: "weapon",
        name: "Grenade",
        ammo: ["Flashbang", 1]
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
        name: "Anti-Smog Breathing Mask"
    }],
    [{
        type: "gear",
        name: "Disposable Cell Phone"
    }],
    [{
        type: "gear",
        name: "Duct Tape"
    }],
    [{
        type: "gear",
        name: "Duct Tape"
    }],
    [{
        type: "gear",
        name: "Duct Tape"
    }],
    [{
        type: "gear",
        name: "Duct Tape"
    }],
    [{
        type: "gear",
        name: "Duct Tape"
    }],
    [{
        type: "gear",
        name: "Flashlight"
    }],
    [{
        type: "gear",
        name: "Road Flare"
    }],
    [{
        type: "gear",
        name: "Road Flare"
    }],
    [{
        type: "gear",
        name: "Road Flare"
    }],
    [{
        type: "gear",
        name: "Road Flare"
    }],
    [{
        type: "gear",
        name: "Road Flare"
    }],
    [{
        type: "gear",
        name: "Road Flare"
    }],
    [{
        type: "gear",
        name: "Tech Bag"
    }],
    [{
        type: "fashion",
        items: [
            { style: "Generic Chic", item_type: "Bottoms", quantity: 8 },
            { style: "Generic Chic", item_type: "Top", quantity: 10 }
        ]
    }],
    [{
        type: "fashion",
        items: [
            { style: "Leisurewear", item_type: "Footwear", quantity: 2 }
        ]
    }],
    [{
        type: "cyberware",
        name: "Cybereye"
    }],
    [{
        type: "cyberware",
        name: "MicroOptics"
    }],
    [{
        type: "cyberware",
        name: "Skinwatch"
    }],
    [{
        type: "cyberware",
        name: "Tool Hand"
    }]
]

export default items;

// Cybereye
// MicroOptics
// Skinwatch
// Tool Hand

// Agent
// Anti-Smog Breathing Mask
// Disposable Cell Phone
// Duct Tape x5
// Flashlight
// Road Flare x6
// Tech Bag
// Generic Chic: Bottoms x8,
// Tops x10
// Leisurewear: Footwear x2



// Shotgun or Assault Rifle
// Basic Shotgun Shell
// Ammunition x100 or Basic
// Rifle Ammunition x100
// Flashbang Grenade
// Light Armorjack
// Body Armor (SP11)
// Light Armorjack
// Head Armor (SP11)

