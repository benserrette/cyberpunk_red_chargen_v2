/**
 * Exec equipment roll table.
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
        name: "Radio Communicator"
    }],
    [{
        type: "gear",
        name: "Radio Communicator"
    }],
    [{
        type: "gear",
        name: "Radio Communicator"
    }],
    [{
        type: "gear",
        name: "Radio Communicator"
    }],
    [{
        type: "gear",
        name: "Scrambler / Descrambler"
    }],
    [{
        type: "fashion",
        items: [
            { style: "Businesswear", item_type: "Footwear" },
            { style: "Businesswear", item_type: "Jacket" },
            { style: "Businesswear", item_type: "Bottoms" },
            { style: "Businesswear", item_type: "Mirrorshades" },
            { style: "Businesswear", item_type: "Top" },
            { style: "Businesswear", item_type: "Jewelry", quantity: 2 }
        ]
    }],
    [{
        type: "cyberware",
        name: "Biomonitor"
    },
    {
        type: "cyberware",
        name: "Techhair"
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
        name: "Toxin Binders"
    },
    {
        type: "cyberware",
        name: "Nasal Filters"
    }]


]

export default items;


/*

Biomonitor or Tech Hair
Cyberaudio Suite
Internal Agent
Toxin Binders
or Nasal Filters

Radio Communicator x4
Scrambler/Descrambler
Businesswear: Footwear,
Jacket, Bottoms,
Mirrorshades, Top,
Jewelry x2



Very Heavy Pistol
Basic VH Pistol
Ammunition x50
Light Armorjack
Body Armor (SP11)
Light Armorjack
Head Armor (SP11)

*/
