
function BasicStats() {
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
                        Health<br/>(HP)
                    </th>
                    <th className="px-1">
                        Speed
                    </th>
                    <th className="px-1">
                        Mana<br/>(MP)
                    </th>
                    <th className="px-1">
                        Fatigue<br/>(FT)
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
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                </tr>
                <tr>
                    <th>
                        Max
                    </th>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                </tr>
            </tbody>
        </table>
    )
}


export default BasicStats;