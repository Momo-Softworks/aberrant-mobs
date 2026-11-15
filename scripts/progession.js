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

export function setPlayerTier(player, tierId) {
    const tier = getFromId(tierId);
    if (!tier) {
        throw new Error(`Invalid tier ID: ${tierId}`);
    }
    player.setDynamicProperty(tierKey, tierId);
}

export function getPlayerTier(player) {
    return getFromId(player.getDynamicProperty(tierKey) ?? 1);
}

export function calculatePlayerAdvantage() {
    world.beforeEvents.entityHurt.subscribe((event) => {
        const attacker = event.damageSource.damagingEntity;
        const target = event.hurtEntity

        if (!attacker) return;

        const attackerIsPlayer = attacker.typeId === "minecraft:player"
        const targetIsPlayer = target.typeId === "minecraft:player"

        if (attackerIsPlayer === targetIsPlayer) return;

        const worldTier = getWorldTier();
        const playerTier = getPlayerTier(attacker);

        if (attackerisPlayer) {
            event.damage *= (1 + (worldTier.healthMult - playerTier.healthMult))
        } else if (targetIsPlayer) {
            event.damage *= (1 - (worldTier.damageMult - playerTier.damageMult))
        }
    });
}