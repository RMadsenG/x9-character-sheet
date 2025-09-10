import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { Item, Armor, Weapon, Spell, InnateAttack, InventoryType } from "./Constants"

const skillMenu = [
    {
        title: "Items",
        id: "items",
        columns: 8
    },
    {
        title: "Weapons",
        id: "weapons",
        columns: 12
    },
    {
        title: "Armor",
        id: "armor",
        columns: 9
    },
    {
        title: "Spells",
        id: "spells",
        columns: 13
    },
    {
        title: "Innate Attacks",
        id: "innate_attacks",
        columns: 10
    }
]


function Inventory() {
    const [inventory, setInventory] = useState<InventoryType>({ "items": [], "armor": [], "weapons": [], "spells": [], "innate_attacks": [] })

    const [index, setIndex] = useState(0)
    const MAX_INDEX = skillMenu.length - 1
    const one = skillMenu[index]
    useEffect(() => { invoke<InventoryType>('get_inventory').then(setInventory) }, [])

    function up() {
        if (index < MAX_INDEX) {
            setIndex(index + 1)
        }
    }
    function down() {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    return (
        <table className="text-center border-solid border">
            <thead>
                <tr>
                    <th colSpan={one['columns']} className="text-xl">
                        <div className="flex p-5">
                            <button className="rounded-xl mx-4 px-2 py-1 my-auto outline-2" type="button" value="hi" onClick={down} >⬅️</button>
                            <div className="flex-grow">
                                {one['title']}
                            </div>
                            <button className="rounded-xl mx-4 px-2 py-1 my-auto outline-2" type="button" value="hi" onClick={up} >➡️</button>
                        </div>
                    </th>
                </tr>
            </thead>
            <ItemList list={inventory['items']} selected={one['id'] == 'items'} />
            <ArmorList list={inventory['armor']} selected={one['id'] == 'armor'} />
            <WeaponList list={inventory['weapons']} selected={one['id'] == 'weapons'} />
            <SpellList list={inventory['spells']} selected={one['id'] == 'spells'} />
            <InnateAttackList list={inventory['innate_attacks']} selected={one['id'] == 'innate_attacks'} />

        </table>
    )
}
function ItemList({ list, selected }: { list: Item[], selected: boolean }) {
    if (!selected) return <></>
    return <tbody className="">
        <tr className="">
            <th className="p-2">Name</th>
            <th className="p-2">Requisite</th>
            <th className="p-2">Effects</th>
            <th className="p-2">Range</th>
            <th className="p-2">Uses</th>
            <th className="p-2">Value</th>
            <th className="p-2">Weight</th>
            <th className="p-2">Description</th>
        </tr>
        {
            list.map((e) => <tr>
                <td className="border">{e['name']}</td>
                <td className="border">{e['requisite']}</td>
                <td className="border whitespace-pre-wrap">{e['effects']}</td>
                <td className="border">{e['range']}</td>
                <td className="border">{e['uses']}</td>
                <td className="border">{e['value']}</td>
                <td className="border">{e['weight']}</td>
                <td className="border">{e['description']}</td>
            </tr>
            )
        }

    </tbody>
}

function WeaponList({ list, selected }: { list: Weapon[], selected: boolean }) {
    if (!selected) return <></>

    return <tbody>
        <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Requisite</th>
            <th className="p-2">Attacks</th>
            <th className="p-2">Damage</th>
            <th className="p-2">Range</th>
            <th className="p-2">Fire Rate</th>
            <th className="p-2">Mag</th>
            <th className="p-2">Additional Behavior</th>
            <th className="p-2">Weight</th>
            <th className="p-2">Ammo Type</th>
            <th className="p-2">Value</th>
            <th className="p-2">Description</th>
        </tr>
        {
            list.map((e) => {
                const rowspan = e['attacks'].length
                const first_attack = e['attacks'][0]
                const attacks = e['attacks'].slice(1)
                return <>
                    <tr className="border-t-3 ">
                        <td rowSpan={rowspan} className="p-px border border-b-3">{e['name']}</td>
                        <td rowSpan={rowspan} className="p-px border border-b-3">{e['requisite']}</td>
                        <td className="p-px border">{first_attack['name']}</td>
                        <td className="p-px border">{first_attack['damage']}</td>
                        <td className="p-px border">{first_attack['range']}</td>
                        <td className="p-px border">{first_attack['fire_rate']}</td>
                        <td className="p-px border">{first_attack['mag']}</td>
                        <td rowSpan={rowspan} className="p-px border border-b-3 whitespace-pre-wrap">{e['additional_behavior']}</td>
                        <td rowSpan={rowspan} className="p-px border border-b-3">{e['weight']}</td>
                        <td rowSpan={rowspan} className="p-px border border-b-3">{e['ammo_type']}</td>
                        <td rowSpan={rowspan} className="p-px border border-b-3">{e['value']}</td>
                        <td rowSpan={rowspan} className="p-px border border-b-3 whitespace-pre-wrap">{e['description']}</td>
                    </tr>
                    {
                        attacks.map((e: any) => <tr className="border-b-3">
                            <td className="p-px border">{e['name']}</td>
                            <td className="p-px border">{e['damage']}</td>
                            <td className="p-px border">{e['range']}</td>
                            <td className="p-px border">{e['fire_rate']}</td>
                            <td className="p-px border">{e['mag']}</td>
                        </tr>
                        )
                    }
                </>
            }
            )
        }
    </tbody>
}
function ArmorList({ list, selected }: { list: Armor[], selected: boolean }) {
    if (!selected) return <></>
    return <tbody>
        <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Requisite</th>
            <th className="p-2">Protects Against</th>
            <th className="p-2">Damage Reduction</th>
            <th className="p-2">Durability</th>
            <th className="p-2">Additional Behavior</th>
            <th className="p-2">Value</th>
            <th className="p-2">Weight</th>
            <th className="p-2">Description</th>
        </tr>
        {
            list.map((e) =>
                <tr>
                    <td className="border">{e['name']}</td>
                    <td className="border">{e['requisite']}</td>
                    <td className="border">{e['protects_against']}</td>
                    <td className="border">{e['damage_reduction']}</td>
                    <td className="border">{e['durability']}</td>
                    <td className="border whitespace-pre-wrap">{e['additional_behavior']}</td>
                    <td className="border">{e['value']}</td>
                    <td className="border">{e['weight']}</td>
                    <td className="border">{e['description']}</td>
                </tr>
            )
        }

    </tbody>
}
function SpellList({ list, selected }: { list: Spell[], selected: boolean }) {
    if (!selected) return <></>
    return <tbody>
        <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Skills</th>
            <th className="p-2">Requisite</th>
            <th className="p-2">Type</th>
            <th className="p-2">Damage Type</th>
            <th className="p-2">Effect</th>
            <th className="p-2">Additional Behavior</th>
            <th className="p-2">Duration</th>
            <th className="p-2">Range</th>
            <th className="p-2">Mana Cost</th>
            <th className="p-2">Components / Ritual</th>
            <th className="p-2">Point Cost</th>
            <th className="p-2">Flavor Text</th>
        </tr>
        {
            list.map((e) =>
                <tr>
                    <td className="border">{e['name']}</td>
                    <td className="border">{e['skills']}</td>
                    <td className="border">{e['requisite']}</td>
                    <td className="border">{e['spell_type']}</td>
                    <td className="border">{e['damage_type']}</td>
                    <td className="border">{e['effect']}</td>
                    <td className="border whitespace-pre-wrap">{e['additional_behavior']}</td>
                    <td className="border">{e['duration']}</td>
                    <td className="border">{e['range']}</td>
                    <td className="border">{e['mana_cost']}</td>
                    <td className="border">{e['components_ritual']}</td>
                    <td className="border">{e['point_cost']}</td>
                    <td className="border">{e['flavor_text']}</td>
                </tr>
            )
        }
    </tbody>
}
function InnateAttackList({ list, selected }: { list: InnateAttack[], selected: boolean }) {
    if (!selected) return <></>
    return <tbody>
        <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Requisite</th>
            <th className="p-2">Attacks</th>
            <th className="p-2">Damage</th>
            <th className="p-2">Range</th>
            <th className="p-2">Fire Rate</th>
            <th className="p-2">Additional Behavior</th>
            <th className="p-2">Physical Requirements</th>
            <th className="p-2">FT Cost</th>
            <th className="p-2">Point Cost (FP, VP)</th>
        </tr>
        {
            list.map((e) =>
                <tr>
                    <td className="border">{e['name']}</td>
                    <td className="border">{e['requisite']}</td>
                    <td className="border">{e['attacks']}</td>
                    <td className="border">{e['damage']}</td>
                    <td className="border">{e['range']}</td>
                    <td className="border">{e['fire_rate']}</td>
                    <td className="border">{e['additional_behavior']}</td>
                    <td className="border">{e['physical_requirements']}</td>
                    <td className="border">{e['ft_cost']}</td>
                    <td className="border">{e['point_cost']}</td>
                </tr>
            )
        }

    </tbody>
}
export default Inventory;