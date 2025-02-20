


const W_COMBAT_SKILL_LIST = [
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

const M_COMBAT_SKILL_LIST = [
    ["Chronomancy", "Logic"],
    ["Elemental", "Character"],
    ["Magicka", "Logic or Character"],
    ["Protection", "Logic"],
    ["Psychic", "Character"],
    ["Techno", "Logic"],
    ["Forbidden", "Character"]
]

const D_COMBAT_SKILL_LIST = [
    ["Light Armor", "Finesse"],
    ["Medium Armor", "Finesse or Strength"],
    ["Heavy Armor", "Strength"],
    ["Shields", "Strength"],
    ["Dodge", "Finesse"]
]


function CombatSkillsTable() {
    let w_skills = W_COMBAT_SKILL_LIST.map(e =>
        <tr>
            <td className="border">{e[0]}</td>
            <td className="border">{e[1]}</td>
            <td className="border">Points</td>
            <td className="border">LvL</td>
        </tr>
    )
    let m_skills = M_COMBAT_SKILL_LIST.map(e =>
        <tr>
            <td className="border">{e[0]}</td>
            <td className="border">{e[1]}</td>
            <td className="border">Points</td>
            <td className="border">LvL</td>
        </tr>
    )
    let d_skills = D_COMBAT_SKILL_LIST.map(e =>
        <tr>
            <td className="border">{e[0]}</td>
            <td className="border">{e[1]}</td>
            <td className="border">Points</td>
            <td className="border">LvL</td>
        </tr>
    )
    return (
        <table className="text-center border-separate border">
            <thead>
                <tr>
                    <th colSpan={3} className="text-xl p-5">Combat Skills</th>
                </tr>
            </thead>
            <tbody>
                <tr className="">
                    <td valign="top" className="">
                        <table className="">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Weapons</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="p-2">Skill</th>
                                    <th className="p-2">Trait</th>
                                    <th className="p-2">Points</th>
                                    <th className="p-2">LvL</th>
                                </tr>
                                {w_skills}
                            </tbody>
                        </table>
                    </td>
                    <td valign="top" className="">
                        <table className="">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Magic</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="p-2">Skill</th>
                                    <th className="p-2">Trait</th>
                                    <th className="p-2">Points</th>
                                    <th className="p-2">LvL</th>
                                </tr>
                                {m_skills}
                            </tbody>
                        </table>
                    </td>
                    <td valign="top" className="">
                        <table className="">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Defense</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="p-2">Skill</th>
                                    <th className="p-2">Trait</th>
                                    <th className="p-2">Points</th>
                                    <th className="p-2">LvL</th>
                                </tr>
                                {d_skills}
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default CombatSkillsTable;
