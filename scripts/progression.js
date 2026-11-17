import { world } from "@minecraft/server";
import { getFromId, Tiers } from "./tiers.js";
import { isPlayer } from "./helper.js";

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

export function setTierIron() {
    world.afterEvents.entityItemPickup.subscribe((event) =>
    {
        if (!isPlayer(event.entity)) return;

        const pickedUpItem = event.items.some((item) => item.typeId === "minecraft:raw_iron" 
        || item.typeId === "minecraft:iron_ingot");

        if (!pickedUpItem) return;

        const player = event.entity;
        const playerTier = getPlayerTier(player);
        const worldTier = getWorldTier();

        if (playerTier.id < Tiers.Iron.id) {
            setPlayerTier(player, Tiers.Iron.id);
        }
        if (worldTier.id < Tiers.Iron.id) {
            setWorldTier(Tiers.Iron.id);
        }
    });
}

export function setTierDiamond() {
    world.afterEvents.entityItemPickup.subscribe((event) =>
    {
        if (!isPlayer(event.entity)) return;

        const pickedUpItem = event.items.some((item) => item.typeId === "minecraft:diamond");

        if (!pickedUpItem) return;

        const player = event.entity;
        const playerTier = getPlayerTier(player);
        const worldTier = getWorldTier();

        if (playerTier.id < Tiers.Diamond.id) {
            setPlayerTier(player, Tiers.Diamond.id);
        }
        if (worldTier.id < Tiers.Diamond.id) {
            setWorldTier(Tiers.Diamond.id);
        }
    });
}

export function setTierNether() {
    world.afterEvents.playerDimensionChange.subscribe((event) => {
        const destination = event.toDimension.id;
        const player = event.player;
        const playerTier = getPlayerTier(player);
        const worldTier = getWorldTier();

        if ( destination !== "minecraft:nether" ) return;

        if (playerTier.id < Tiers.Nether.id) {
            setPlayerTier(player, Tiers.Nether.id);
        }
        if (worldTier.id < Tiers.Nether.id) {
            setWorldTier(Tiers.Nether.id);
        }
    });
}

export function setTierEnd() {
    world.afterEvents.playerDimensionChange.subscribe((event) => {
        const destination = event.toDimension.id;
        const player = event.player;
        const playerTier = getPlayerTier(player);
        const worldTier = getWorldTier();

        if ( destination !== "minecraft:the_end" ) return;

        if (playerTier.id < Tiers.End.id) {
            setPlayerTier(player, Tiers.End.id);
        }
        if (worldTier.id < Tiers.End.id) {
            setWorldTier(Tiers.End.id);
        }
    });
}


export function setTierNetherite() {
    world.afterEvents.entityItemPickup.subscribe((event) =>
    {
        if (!isPlayer(event.entity)) return;

        const pickedUpItem = event.items.some((item) => item.typeId === "minecraft:netherite_ingot" 
        || item.typeId === "minecraft:ancient_debris");

        if (!pickedUpItem) return;

        const player = event.entity;
        const playerTier = getPlayerTier(player);
        const worldTier = getWorldTier();

        if (playerTier.id < Tiers.Netherite.id) {
            setPlayerTier(player, Tiers.Netherite.id);
        }
        if (worldTier.id < Tiers.Netherite.id) {
            setWorldTier(Tiers.Netherite.id);
        }
    });
}


export function registerProgressionSubscribers() {
    setTierIron();
    setTierDiamond();
    setTierNether();
    setTierEnd();
    setTierNetherite();
}