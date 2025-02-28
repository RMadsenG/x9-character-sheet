import { useState } from "react";
import PointAllocation from "./PointAllocation";

const SKILL_MENUS = [
    {
        "title": "Combat Skills",
        "skill_subtypes": [
            {
                "subtype_name": "Weapons",
                "list": [
                    ["One-Handed Blade", "Finesse or Strength"],
                    ["One-Handed Blunt", "Strength"],
                    ["One-Handed Martial", "Finesse"],
                    ["Two-Handed Blade", "Strength"],
                    ["Two-Handed Blunt", "Strength"],
                    ["Two-Handed Martial", "Finesse or Strength"],
                    ["Short Firearm", "Finesse or Perception"],
                    ["Long Firearm", "Strength or Perception"],
                    ["Archery", "Strength"],
                    ["Thrown Weapon", "Finesse"],
                    ["Heavy Weapons", "Logic or Strength"],
                    ["Unarmed", "Strength"]
                ]
            },
            {
                "subtype_name": "Magic",
                "list": [
                    ["Chronomancy", "Logic"],
                    ["Elemental", "Character"],
                    ["Magicka", "Logic or Character"],
                    ["Protection", "Logic"],
                    ["Psychic", "Character"],
                    ["Techno", "Logic"],
                    ["Forbidden", "Character"]
                ]
            },
            {
                "subtype_name": "Defense",
                "list": [
                    ["Light Armor", "Finesse"],
                    ["Medium Armor", "Finesse or Strength"],
                    ["Heavy Armor", "Strength"],
                    ["Shields", "Strength"],
                    ["Dodge", "Finesse"]
                ]
            }
        ]
    },
    {
        "title": "RP Skills",
        "skill_subtypes": [
            {
                "subtype_name": "Soft Skills",
                "list": [
                    ["Tinkering", "Finesse or Logic"],
                    ["Electronics", "Logic"],
                    ["Botany", "Logic"],
                    ["Zoology", "Character or Finesse"],
                    ["First Aid", "Logic"],
                    ["Medicine", "Logic"],
                    ["Arcane Knowledge", "Logic or Character"],
                    ["Planetary Piloting", "Finesse or Perception"],
                    ["Planetary Navigation", "Logic"],
                    ["Religion", "Character"]
                ]
            },
            {
                "subtype_name": "Hard Skills",
                "list": [
                    ["Fine Arts and Music", "Character"],
                    ["Diplomacy", "Character"],
                    ["History", "Logic"],
                    ["Contrabanding", "Finesse"],
                    ["Investigation", "Perception or Logic"],
                    ["Espionage", "Character"],
                    ["Scavenging", "Perception"]
                ]
            }
        ]
    }
]
const MAX_INDEX = SKILL_MENUS.length - 1

function CombatSkillsTable() {
    let [index, setIndex] = useState(0)

    let one = SKILL_MENUS[index]

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

    let type_table = one['skill_subtypes'].map((subtype, index) =>
        <td key={index} valign="top" className="">
            <table className="">
                <thead>
                    <tr>
                        <th colSpan={4}>{subtype['subtype_name']}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="p-2">Skill</th>
                        <th className="p-2">Trait</th>
                        <th className="p-2" colSpan={2}>Points</th>
                        <th className="p-2">LvL</th>
                    </tr>
                    {
                        subtype['list'].map(e =>
                            <tr key={e[0] + index}>
                                <td className="border p-px">{e[0]}</td>
                                <td className="border p-px">{e[1]}</td>
                                <td className="border p-px"><PointAllocation/></td>
                                <td className="border p-px"><PointAllocation/></td>

                                <td className="border p-px">LvL</td>

                            </tr>
                        )
                    }
                </tbody>
            </table>
        </td>
    )



    return (
        <table className="text-center border-separate border">
            <thead>
                <tr>

                    <th colSpan={one['skill_subtypes'].length} className="text-xl">
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
            <tbody>
                <tr className="">
                    {type_table}
                </tr>
            </tbody>
        </table>
    );
}

export default CombatSkillsTable;
