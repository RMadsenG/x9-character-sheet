import { useEffect, useState } from "react"
import { STAT_TYPE, Stats } from "./Constants"
import { listen } from "@tauri-apps/api/event"
import { invoke } from "@tauri-apps/api/core"

async function get_stat(): Promise<Stats> {

    const stats: Stats = await invoke<Stats>('get_stats')

    return stats
}

function OneStat(stat_type: STAT_TYPE, maxValue: number) {
    const [x, setX] = useState<number | string>(0)

    return [
        <td key={stat_type}>
            <input name={stat_type} id={stat_type} value={x} onChange={e => { setX(e.target.value) }} size={3} className="text-center" />
        </td>,
        <td key={stat_type}>
            {maxValue}
        </td>
    ]
}

function BasicStats() {
    const [stats, setStats] = useState<Stats>({
        health: 1,
        mana: 1,
        speed: 1,
        fatigue: 1,
        weight: 1,
    })

    useEffect(() => {
        console.log("REgistering listener for stats")
        get_stat().then(setStats)

        let unlisten_update_points = listen('update-points', () => {
            console.log('update-points')
            get_stat().then(setStats)
        });
        let unlisten_reload_char = listen('reload_char', () => {
            console.log('RELOAD')

            get_stat().then((stats)=>{
                console.log(stats)
                setStats(stats);
                

            })
        });
        return () => {
            unlisten_update_points.then(f => f())
            unlisten_reload_char.then(f => f())
        };
    }, [])

    console.log(stats)
    const stat_components = [
        OneStat(STAT_TYPE.HEALTH, stats.health),
        OneStat(STAT_TYPE.SPEED, stats.speed),
        OneStat(STAT_TYPE.MANA, stats.mana),
        OneStat(STAT_TYPE.FATIGUE, stats.fatigue),
        OneStat(STAT_TYPE.WEIGHT, stats.weight),
    ]
    const value_list = stat_components.map(e => e[0])
    const max_list = stat_components.map(e => e[1])


    return (
        <table className="text-center mx-2 mt-2 mb-auto text-sm border-separate border">
            <thead>
                <tr >
                    <th colSpan={6} className="text-xl pb-2">
                        Stats
                    </th>
                </tr>
                <tr>
                    <th />
                    <th className="px-1">
                        Health<br />(HP)
                    </th>
                    <th className="px-1">
                        Speed
                    </th>
                    <th className="px-1">
                        Mana<br />(MP)
                    </th>
                    <th className="px-1">
                        Fatigue<br />(FT)
                    </th>
                    <th className="px-1">
                        Weight
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                        Current
                    </th>
                    {value_list}
                </tr>
                <tr>
                    <th>
                        Max
                    </th>
                    {max_list}
                </tr>
            </tbody>
        </table>
    )
}


export default BasicStats;