import { world } from "@minecraft/server";
import { getFromId } from "./tiers.js";

const tierKey = "abberant_mobs:difficulty_tier";

export function getWorldTier() {
    return getFromId(world.getDynamicProperty(tierKey) ?? 1);
}

export function setWorldTier(tierId) {
    const tier = getFromId(tierId);
    if (!tier) {
        throw new Error(`Invalid tier ID: ${tierId}`);
    }
    world.setDynamicProperty(tierKey, tierId);
}

export function getPlayerTier(player) {
    return getFromId(player.getDynamicProperty(tierKey) ?? 1);
}

export function setPlayerTier(player, tierId) {
    const tier = getFromId(tierId);
    if (!tier) {
        throw new Error(`Invalid tier ID: ${tierId}`);
    }
    player.setDynamicProperty(tierKey, tierId);
}