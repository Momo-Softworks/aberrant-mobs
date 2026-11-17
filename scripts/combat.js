import { world } from "@minecraft/server";
import { isHostileMob, isPlayer } from "./helper.js";
import { getPlayerTier, getWorldTier } from "./progression.js";

function calculatePlayerAdvantage() {
    world.beforeEvents.entityHurt.subscribe((event) => {
        const attacker = event.damageSource.damagingEntity;
        const target = event.hurtEntity;

        if (!attacker) return;

        const attackerIsPlayer = isPlayer(attacker)
        const targetIsPlayer = isPlayer(target)

        if (attackerIsPlayer === targetIsPlayer) return;

        const worldTier = getWorldTier();
        const player = attackerIsPlayer ? attacker : target;
        const playerTier = getPlayerTier(player);

        if (attackerIsPlayer && isHostileMob(target)) {
            event.damage *= (1 + (worldTier.healthMult - playerTier.healthMult))
        } else if (targetIsPlayer && isHostileMob(attacker)) {
            event.damage *= (1 - (worldTier.damageMult - playerTier.damageMult))
        }
    });
}

function calculateMobAdvantage() {
    world.beforeEvents.entityHurt.subscribe((event) => {
        const attacker = event.damageSource.damagingEntity;
        const target = event.hurtEntity;

        if (!attacker || (isPlayer(attacker) && isPlayer(target))) return;

        const attackerIsMob = isHostileMob(attacker);
        const targetIsMob = isHostileMob(target);

        const worldTier = getWorldTier();

        if (attackerIsMob) {
            event.damage *= (1 + worldTier.damageMult)
        } else if (targetIsMob) {
            event.damage *= (1 - worldTier.healthMult)
        }

    });
}

export function registerCombatSubscribers() {
    calculateMobAdvantage();
    calculatePlayerAdvantage();
}