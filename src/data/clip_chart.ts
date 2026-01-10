/**
 * Clip size chart keyed by weapon.
 *
 * Used by the Weapon constructor to seed default ammo quantities and by the
 * UI to display magazine capacities.
 */
/**
 * Maps normalized weapon keys to standard/extended/drum clip sizes.
 */
const clip_chart: Record<string, Record<string, number>> = {
    medium_pistol: {
        standard: 12,
        extended: 18,
        drum: 36
    },
    heavy_pistol: {
        standard: 8,
        extended: 14,
        drum: 28
    },
    very_heavy_pistol: {
        standard: 8,
        extended: 14,
        drum: 28
    },
    smg: {
        standard: 30,
        extended: 40,
        drum: 50
    },
    heavy_smg: {
        standard: 40,
        extended: 50,
        drum: 60
    },
    shotgun: {
        standard: 4,
        extended: 8,
        drum: 16
    },
    assault_rifle: {
        standard: 25,
        extended: 35,
        drum: 45
    },
    sniper_rifle: {
        standard: 4,
        extended: 8,
        drum: 12
    },
    grenade_launcher: {
        standard: 2,
        extended: 4,
        drum: 6
    },
    rocket_launcher: {
        standard: 1,
        extended: 2,
        drum: 3
    },
    bow: {
        standard: 1,
        extended: 1,
        drum: 1
    },
    crossbow: {
        standard: 1,
        extended: 1,
        drum: 1
    },
    grenade: {
        standard: 1,
        extended: 1,
        drum: 1
    }
};

export { clip_chart as ClipChart }
