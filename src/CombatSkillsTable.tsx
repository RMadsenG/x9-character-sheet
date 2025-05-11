import { useEffect, useState } from "react";
import PointAllocation from "./PointAllocation";
import { HigherSkill, POINT_TYPE } from "./Constants";
import { invoke } from "@tauri-apps/api/core";



function CombatSkillsTable() {
    const [index, setIndex] = useState(0)
    const [skillMenu, setSkillMenu] = useState<HigherSkill[] | undefined>()
    useEffect(() => { invoke<[]>('get_skill_table').then(setSkillMenu).catch(console.log); }, [])

    // Guard initial skill menu
    if (!skillMenu) {
        return <></>
    }

    const MAX_INDEX = skillMenu.length

    let one = skillMenu[index]
    const point_type = index == 0 ? POINT_TYPE.VALOR : POINT_TYPE.RENOWN

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


    let type_table = one['skill_subtypes'].map((subtype) =>
        // For each skill type (hard, soft)
        <td key={subtype.id} valign="top" className="">
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
                        // For each skill
                        subtype['skills'].map(e =>
                            <tr key={subtype.id + e.id}>
                                <td className="border p-px">{e.name}</td>
                                <td className="border p-px">{e.parent_trait.join(' or ')}</td>
                                <PointAllocation name={subtype.id + '_' + e.id} point_types={[point_type, POINT_TYPE.FREE]} parent_trait={e.parent_trait} />
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
