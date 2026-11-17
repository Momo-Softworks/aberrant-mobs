export const Tiers = {
    Overworld: {
        id: 1,
        healthMult: 0,
        damageMult: 0,
        aberrantChance: 0.003,
        abberantModsCount: 1
        // Eventually add a multiplier that affects loot drops
    },
    Iron: {
        id: 2,
        healthMult: 0.15,
        damageMult: 0.15,
        aberrantChance: 0.004,
        abberantModsCount: 1
        // Eventually add a multiplier that affects loot drops
    },
    Diamond: {
        id: 3,
        healthMult: 0.25,
        damageMult: 0.25,
        aberrantChance: 0.005,
        abberantModsCount: 2
        // Eventually add a multiplier that affects loot drops
    },
    Nether: {
        id: 4,
        healthMult: 0.35,
        damageMult: 0.35,
        aberrantChance: 0.0075,
        abberantModsCount: 2
        // Eventually add a multiplier that affects loot drops}
    },
    End: {
        id: 5,
        healthMult: 0.5,
        damageMult: 0.5,
        aberrantChance: 0.01,
        abberantModsCount: 3
        // Eventually add a multiplier that affects loot drops
    },
    Netherite: {
        id: 6,
        healthMult: 0.75,
        damageMult: 0.75,
        aberrantChance: 0.015,
        abberantModsCount: 4
        // Eventually add a multiplier that affects loot drops
    }
}

/** @param {unknown} id */
export function getFromId(id) {
    return Object.values(Tiers).find(tier => tier.id === id);
}