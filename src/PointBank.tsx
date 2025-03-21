import { POINT_TYPE, PointBankType } from "./Constants";


function getFreePoints(bank: PointBankType, type: POINT_TYPE) {
    let max = bank.get('max')![type] ?? 0
    for (const [key, value] of bank) {
        if (key == "max") continue
        max -= value[type]
    }
    return max
}

function PointBank({ pointBank }: { pointBank: PointBankType }) {

    return (<table className="text-center m-2 text-sm border-separate border">
        <thead>
            <tr >
                <th colSpan={3} className="text-xl pb-2">
                    Point Bank
                </th>
            </tr>
            <tr>
                <th className="px-1">
                    Free<br />(FP)
                </th>
                <th className="px-1">
                    Valor<br />(VP)
                </th>
                <th className="px-1">
                    Renown<br />(RP)
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    {pointBank.get('max')![POINT_TYPE.FREE]}
                </td>
                <td>
                    {pointBank.get('max')![POINT_TYPE.VALOR]}
                </td>
                <td>
                    {pointBank.get('max')![POINT_TYPE.RENOWN]}
                </td>
            </tr>
            <tr>
                <td>
                    {getFreePoints(pointBank, POINT_TYPE.FREE)}
                </td>
                <td>
                    {getFreePoints(pointBank, POINT_TYPE.VALOR)}
                </td>
                <td>
                    {getFreePoints(pointBank, POINT_TYPE.RENOWN)}
                </td>
            </tr>
        </tbody>
    </table>)
}
export default PointBank;
