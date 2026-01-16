/**
 * Nomad equipment roll table.
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
        name: "Heavy Melee Weapon",
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
        name: "Duct Tape"
    }],
    [{
        type: "gear",
        name: "Flashlight"
    }],
    [{
        type: "gear",
        name: "Grapple Gun"
    }],
    [{
        type: "gear",
        name: "Inflatable Bed & Sleep-Bag"
    }],
    [{
        type: "gear",
        name: "Medtech Bag"
    }],
    [{
        type: "gear",
        name: "Radio Communicator",
        quantity: 2
    }],
    [{
        type: "gear",
        name: "Rope (60m/yds)"
    }],
    [{
        type: "gear",
        name: "Techtool"
    }],
    [{
        type: "gear",
        name: "Tent & Camping Equipment"
    }],
    [{
        type: "fashion",
        items: [
            { style: "Bohemian", item_type: "Jewelry" }
        ]
    }],
    [{
        type: "fashion",
        items: [
            { style: "Nomad Leathers", item_type: "Top", quantity: 4 },
            { style: "Nomad Leathers", item_type: "Bottoms", quantity: 2 },
            { style: "Nomad Leathers", item_type: "Footwear", quantity: 2 },
            { style: "Nomad Leathers", item_type: "Jacket" },
            { style: "Nomad Leathers", item_type: "Hat" }
        ]
    }],
    [{
        type: "cyberware",
        name: "Neural Link"
    }],
    [{
        type: "cyberware",
        name: "Interface Plugs"
    }, {
        type: "cyberware",
        name: "Wolvers"
    }]

]

export default items;


// Agent
// Anti-Smog Breathing Mask
// Duct Tape
// Flashlight
// Grapple Gun
// Inflatable Bed & Sleep-Bag
// Medtech Bag
// Radio Communicator x2
// Rope
// Techtool
// Tent and Camping Equipment
// Bohemian: Jewelry
// Nomad Leathers: Top x4,
// Bottom x2, Footwear x2,
// Jacket, Hat

// Heavy Pistol or Very Heavy
// Pistol
// Basic H Pistol Ammunition
// x100 or Basic VH Pistol
// Ammunition x100
// Heavy Melee
// Weapon or Heavy Pistol
// Light Armorjack
// Body Armor (SP11)
// Light Armorjack
// Head Armor (SP11)
