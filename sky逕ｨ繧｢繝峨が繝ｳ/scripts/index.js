import {world,system,ItemStack,Player,EntityInventoryComponent,EquipmentSlot,BlockInventoryComponent} from "@minecraft/server"
import {ActionFormData,ModalFormData,FormCancelationReason} from "@minecraft/server-ui"
let c = 0
let l = -1
system.runInterval(() =>{
    if (c == 4) c = 0
    c++
    if (world.scoreboard.getObjective("game"))
    world.scoreboard.removeObjective("game")
    world.scoreboard.addObjective("game",`${"-".repeat(c)}情報 ${world.getAllPlayers().length}/8${"-".repeat(c)}`)
    const score = world.scoreboard.getObjective("game")
    world.scoreboard.setObjectiveAtDisplaySlot("Sidebar",{objective:score})
    score.setScore("---ようこそスカイウォーズへ---",1000)
    score.setScore("開始まで",world.scoreboard.getObjective("system").getScore("カウント"))
},10)
world.afterEvents.entityDie.subscribe((ev) =>{
    if (ev.deadEntity.typeId == "minecraft:player"){
        /** @type {EntityInventoryComponent} */
        const inventory = ev.deadEntity.getComponent(EntityInventoryComponent.componentId)
        const vec31 = ev.deadEntity.location
        const vec32 = {x:ev.deadEntity.location.x-1,y:ev.deadEntity.location.y,z:ev.deadEntity.location.z}
        /** @type {BlockInventoryComponent} */
        ev.deadEntity.dimension.fillBlocks(vec31,vec31,"minecraft:chest")
        ev.deadEntity.dimension.fillBlocks(vec32,vec32,"minecraft:chest")
        const chest = ev.deadEntity.dimension.getBlock(vec31).getComponent("inventory")
        const chest2 = ev.deadEntity.dimension.getBlock(vec32).getComponent("inventory")

        for (let index = 0; index < 8; index++) {
            const i = inventory.container?.getItem(index)
            chest2.container.setItem(index,i)
        }
        for (let index = 0; index <inventory.container.size -8 ; index++) {
            const i = inventory.container?.getItem(index)
            chest.container.setItem(index,i)
        }
        const i = [
            ev.deadEntity.getComponent('minecraft:equippable').getEquipment(EquipmentSlot.Head),
            ev.deadEntity.getComponent('minecraft:equippable').getEquipment(EquipmentSlot.Chest),
            ev.deadEntity.getComponent('minecraft:equippable').getEquipment(EquipmentSlot.Legs),
            ev.deadEntity.getComponent('minecraft:equippable').getEquipment(EquipmentSlot.Feet),
            ev.deadEntity.getComponent('minecraft:equippable').getEquipment(EquipmentSlot.Offhand)
        ]
    
    for (let index = 9; index <i.length+9 ; index++) {
        const item = i[index-9]
        chest2.container.setItem(index,item)
    }
    ev.deadEntity.runCommandAsync("clear @s")
    ev.deadEntity.runCommandAsync("xp -167L @s")
    system.runTimeout(() =>{
        ev.deadEntity.dimension.fillBlocks(vec31,vec31,"minecraft:air")
        ev.deadEntity.dimension.fillBlocks(vec32,vec32,"minecraft:air")
    },1200)
    }
})
world.beforeEvents.chatSend.subscribe((ev) =>{
    if (ev.message == "!id"){
        ev.cancel = true
        system.runTimeout(() =>{
            const show = () =>{
                if (!ev.sender.getComponent('minecraft:equippable').getEquipment(EquipmentSlot.Mainhand)) return
                new ModalFormData()
                .textField("id",ev.sender.getComponent('minecraft:equippable').getEquipment(EquipmentSlot.Mainhand).typeId,ev.sender.getComponent('minecraft:equippable').getEquipment(EquipmentSlot.Mainhand).typeId)
                .show(ev.sender).then(res =>{
                    if (res.cancelationReason == FormCancelationReason.UserBusy) show()
                    if (res.canceled ) return
                })
            }
            show()
        })
    } 
})
world.afterEvents.itemUse.subscribe((ev) =>{
})
system.runInterval(() =>{
    const mozi = {
        0:"SkyWars     ",
        1:" SkyWars     ",
        2:"    SkyWar    ",
        3:"    SkyWa     ",
        4:"s    SkyW    ",
        5:"rs   Sky    ",
        6:"ars   Sk    ",
        7:"Wars        ",
        8:"yWars       ",
        9:"kyWars      ",
    }
    if (l==9) l = -1
    const score = world.scoreboard.getObjective("game")
    if (l == -1) score.removeParticipant(mozi[9])
    else
    score.removeParticipant(mozi[l])
    l ++
    const hyouzimozi = mozi[l]
    score.setScore(hyouzimozi,999)
},5)
system.afterEvents.scriptEventReceive.subscribe((ev) =>{
    if (ev.id == "sky:chest"){
        world.getDimension("overworld").runCommand(`setblock ${ev.message} chest`)
        for (let index = -1; index < 27; index++) {
            /** @type {{item:string,amount:number,kakuritu:number}[]} */
            const items = [
                {item:"diamond",amount:Math.floor(Math.random()*4),kakuritu:0.2},
                {item:"diamond_sword",amount:1,kakuritu:0.5},
                {item:"wooden_sword",amount:1,kakuritu:2},
                {item:"diamond_pickaxe",amount:1,kakuritu:0.2},
                {item:"log",amount:Math.floor(Math.random()*16),kakuritu:5},
                {item:"enchanted_golden_apple",amount:1,kakuritu:0.1},
                {item:"golden_apple",amount:1,kakuritu:0.2},
                {item:"diamond_axe",amount:1,kakuritu:0.3},
                {item:"wooden_pickaxe",amount:1,kakuritu:0.6},
                {item:"apple",amount:Math.floor(Math.random()*5),kakuritu:3},
                {item:"iron_pickaxe",amount:1,kakuritu:0.4},
                {item:"iron_sword",amount:1,kakuritu:1.5},
                {item:"iron_axe",amount:1,kakuritu:0.5},
                {item:"experience_bottle",amount:Math.floor(Math.random()*6),kakuritu:1},
                {item:"stone_pickaxe",amount:1,kakuritu:0.5},
                {item:"stone_axe",amount:1,kakuritu:0.6},
                {item:"stone",amount:Math.floor(Math.random()*32),kakuritu:3},
                {item:"wooden_axe",amount:1,kakuritu:0.7},
                {item:"lapis_lazuli",amount:Math.floor(Math.random()*10),kakuritu:2},
                {item:"iron_ingot",amount:Math.floor(Math.random()*4),kakuritu:1},
                {item:"wind_charge",amount:Math.floor(Math.random()*7),kakuritu:0.5},
                {item:"mace",amount:1,kakuritu:0.09},
                {item:"tnt",amount:Math.floor(Math.random()*5),kakuritu:1},
                {item:"redstone",amount:Math.floor(Math.random()*30),kakuritu:1},
                {item:"water_bucket",amount:1,kakuritu:0.5},
                {item:"bow",amount:1,kakuritu:0.8},
                {item:"arrow",amount:Math.floor(Math.random()*64),kakuritu:1},
                {item:"dispenser",amount:Math.floor(Math.random()*6),kakuritu:1},
                {item:"repeater",amount:Math.floor(Math.random()*7),kakuritu:1},
                {item:"book",amount:Math.floor(Math.random()*10),kakuritu:0.5},
                {item:"fire_charge",amount:Math.floor(Math.random()*5),kakuritu:1},
                {item:"minecraft:diamond_boots",amount:1,kakuritu:0.2},
                {item:"minecraft:diamond_leggings",amount:1,kakuritu:0.3},
                {item:"minecraft:diamond_helmet",amount:1,kakuritu:0.2},
                {item:"minecraft:diamond_chestplate",amount:1,kakuritu:0.1},
                {item:"minecraft:iron_boots",amount:1,kakuritu:0.5},
                {item:"minecraft:iron_leggings",amount:1,kakuritu:0.5},
                {item:"minecraft:iron_helmet",amount:1,kakuritu:0.5},
                {item:"minecraft:iron_chestplate",amount:1,kakuritu:0.5},
                {item:"minecraft:leather_boots",amount:1,kakuritu:0.8},
                {item:"minecraft:leather_leggings",amount:1,kakuritu:0.8},
                {item:"minecraft:leather_helmet",amount:1,kakuritu:0.8},
                {item:"minecraft:leather_chestplate",amount:1,kakuritu:0.8},
               ]
            items.some((i) =>{
                if (kakuritu(i.kakuritu)){
                    world.getDimension("overworld").runCommand(`replaceitem block ${ev.message} slot.container ${index} ${i.item} ${i.amount}`)
                    return true
                    
                }
            })
        }
    }
})
/**
 * @param {Number} num 確率を数値で表す (0～100)
 * @returns {boolean} 指定された確率で真偽値を返す
 */
function kakuritu(num) {
    return Math.random() * 100000 < num * 1000;
}
world.afterEvents.entityHurt.subscribe((ev) => {
    const { hurtEntity } = ev;
    if (hurtEntity.typeId == "minecraft:player")
    hurtEntity.applyKnockback(0, 0, 0, 0.3);
});
world.afterEvents.entityHitEntity.subscribe((ev) =>{
    if (ev.damagingEntity.typeId == "minecraft:player"&&ev.hitEntity.nameTag == "参加設定"){
        from(ev.damagingEntity)
    }
})
/** @param {Player} player  */
function from(player){
    new ActionFormData()
    .title("参加設定")
    .button("参加する","textures/ui/check")
    .button("参加しない","textures/ui/cancel")
    .show(player)
    .then((res) =>{
        if (res.canceled) return　
        if (res.selection == 0){
            player.removeTag("不参加")
            player.sendMessage("参加するに設定しました")
        }
        if (res.selection == 1){
            player.addTag("不参加")
            player.sendMessage("参加しないに設定しました")
        }
    })
}