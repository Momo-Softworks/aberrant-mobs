import { Entity } from "@minecraft/server";
import { registerCombatSubscribers } from "./combat.js";
import { registerProgressionSubscribers } from "./progression.js";

const MobWhiteList = ["minecraft:ender_dragon", "minecraft:hoglin"]

const MobBlackList = ["minecraft:zombie_nautilus"]

export function isHostileMob(entity) {
    
    if (!(entity instanceof Entity) || !entity.isValid) return false;

    if (MobBlackList.includes(entity.typeId)) return false;

    const family = entity.getComponent("minecraft:type_family");

    return family?.hasTypeFamily('monster') || MobWhiteList.includes(entity.typeId)
}

export function isPlayer(entity) {
    
    if (!(entity instanceof Entity) || !entity.isValid) return false;

    return entity.typeId === "minecraft:player";
}

export function registerSubscribers() {
    registerCombatSubscribers();
    registerProgressionSubscribers()
}
