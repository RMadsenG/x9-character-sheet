

const HARD_SKILL = [
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
const SOFT_SKILL = [
    ["Fine Arts and Music", "Character"],
    ["Diplomacy", "Character"],
    ["History", "Logic"],
    ["Contrabanding", "Finesse"],
    ["Investigation", "Perception or Logic"],
    ["Espionage", "Character"],
    ["Scavenging", "Perception"]
]


function RPSkillsTable() {
    let hard_skills = HARD_SKILL.map(e =>
        <tr>
            <td className="border">{e[0]}</td>
            <td className="border">{e[1]}</td>
            <td className="border">Points</td>
            <td className="border">LvL</td>
        </tr>
    )
    let soft_skills = SOFT_SKILL.map(e =>
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
                    <th colSpan={3} className="text-xl pt-5">RP Skills</th>
                </tr>
            </thead>
            <tbody>
                <tr className="">
                    <td valign="top" className="">
                        <table className="">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Hard Skills</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="p-2">Skill</th>
                                    <th className="p-2">Trait</th>
                                    <th className="p-2">Points</th>
                                    <th className="p-2">LvL</th>
                                </tr>
                                {soft_skills}
                            </tbody>
                        </table>
                    </td>
                    <td valign="top" className="">
                        <table className="">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Soft Skills</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="p-2">Skill</th>
                                    <th className="p-2">Trait</th>
                                    <th className="p-2">Points</th>
                                    <th className="p-2">LvL</th>
                                </tr>
                                {hard_skills}
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default RPSkillsTable;
