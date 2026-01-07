// data.js
const initialMemetics = {
    groupMeta: {
        "g_survival": { title: "Survival & Gathering", color: "text-blue-400" },
        "g_production": { title: "Production & Crafting", color: "text-amber-500" },
        "g_combat": { title: "Combat & Buffs", color: "text-red-500" }
    },
    groups: {
        "g_survival": [
            {
                id: "wow_1",
                name: "Mining Drill: Efficiency",
                desc: "Mining speed <span class=\"text-amber-500 font-bold\">+25%</span>. Automatic collection range <span class=\"text-amber-500 font-bold\">+1m</span>.",
                levels: "20, 30",
                image: "" 
            },
            {
                id: "wow_2",
                name: "Logging Chainsaw: Speed",
                desc: "Wood logging speed <span class=\"text-amber-500 font-bold\">+30%</span>.",
                levels: "25",
                image: ""
            }
        ],
        "g_production": [
            {
                id: "wow_3",
                name: "Electronic Recycling",
                desc: "Yields <span class=\"text-amber-500 font-bold\">+50%</span> electronic parts when dismantling.",
                levels: "40, 50",
                image: ""
            }
        ],
        "g_combat": [
            {
                id: "wow_4",
                name: "Portable Turret: Damage",
                desc: "Turret damage <span class=\"text-amber-500 font-bold\">+15%</span> against elites.",
                levels: "35",
                image: ""
            }
        ]
    }
};