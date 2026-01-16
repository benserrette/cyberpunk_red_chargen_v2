/**
 * Solo equipment roll table.
 *
 * Each nested array represents a pick list consumed by Character.getEquipmentFromTable.
 */
const items = [
    [{
        type: "weapon",
        name: "Assault Rifle",
        ammo: ["Basic Ammo", 70]
    }],
    [{
        type: "weapon",
        name: "Very Heavy Pistol",
        ammo: ["Basic Ammo", 30]
    }],
    [{
        type: "weapon",
        name: "Heavy Melee Weapon",
    }, {
        type: "armor",
        location: "shield",
        name: "Bulletproof Shield",
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
        type: "fashion",
        items: [
            { style: "Leisurewear", item_type: "Footwear", quantity: 2 },
            { style: "Leisurewear", item_type: "Jacket", quantity: 3 },
            { style: "Leisurewear", item_type: "Mirrorshades" },
            { style: "Leisurewear", item_type: "Bottoms", quantity: 2 },
            { style: "Leisurewear", item_type: "Top", quantity: 2 }
        ]
    }],
    [{
        type: "cyberware",
        name: "Biomonitor",
    }],
    [{
        type: "cyberware",
        name: "Neural Link",
    }],
    [{
        type: "cyberware",
        name: "Sandevistan",
    }, {
        type: "cyberware",
        name: "Wolvers"
    }]

]

export default items;
