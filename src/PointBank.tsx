import { useEffect, useState } from "react";
import { ERROR_STRING, POINT_COLORS, POINT_TYPE } from "./Constants";
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';


async function get_free(point_type: POINT_TYPE): Promise<number> {
    const points: number = await invoke('get_free', { pointType: point_type });
    return points
}

async function get_point(name: string, point_type: POINT_TYPE): Promise<number> {
    const points: number = await invoke('get_point', { name: name, pointType: point_type });
    return points
}

function PointBank() {
    const [maxFree, setMaxFree] = useState<number>(0)
    const [maxValor, setMaxValor] = useState<number>(0)
    const [maxRenown, setMaxRenown] = useState<number>(0)
    const [freeFree, setFreeFree] = useState<number>(0)
    const [freeValor, setFreeValor] = useState<number>(0)
    const [freeRenown, setFreeRenown] = useState<number>(0)

    const [errors, setErrors] = useState({ [POINT_TYPE.FREE]: false, [POINT_TYPE.VALOR]: false, [POINT_TYPE.RENOWN]: false })
    useEffect(() => {
        // Initial Point set
        get_point('max', POINT_TYPE.FREE).then(setMaxFree)
        get_point('max', POINT_TYPE.VALOR).then(setMaxValor)
        get_point('max', POINT_TYPE.RENOWN).then(setMaxRenown)
        get_free(POINT_TYPE.FREE).then(setFreeFree)
        get_free(POINT_TYPE.VALOR).then(setFreeValor)
        get_free(POINT_TYPE.RENOWN).then(setFreeRenown)

        // Listen for subsequent updates
        const unlisten_upgrade = listen('update-points', () => {
            get_point('max', POINT_TYPE.FREE).then(setMaxFree)
            get_point('max', POINT_TYPE.VALOR).then(setMaxValor)
            get_point('max', POINT_TYPE.RENOWN).then(setMaxRenown)
            get_free(POINT_TYPE.FREE).then(setFreeFree)
            get_free(POINT_TYPE.VALOR).then(setFreeValor)
            get_free(POINT_TYPE.RENOWN).then(setFreeRenown)
        });

        let timer: number = 0;
        const unlisten_failed = listen<string>('update-failed', (point_type) => {
            // If timer exists, don't retrigger
            if (timer) {
                return
            }
            // Set display to red
            setErrors((old) => {
                return { ...old, [point_type.payload]: true }
            })

            // Wait 1s, clear timer and reset display
            timer = setTimeout(
                () => {
                    timer = 0
                    setErrors((old) => {
                        return { ...old, [point_type.payload]: false }
                    })
                },
                1000
            );
        });

        return () => {
            unlisten_upgrade.then(f => f())
            unlisten_failed.then(f => f())
        };
    }, [])

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
                <td className={POINT_COLORS[POINT_TYPE.FREE]}>
                    {maxFree}
                </td>
                <td className={POINT_COLORS[POINT_TYPE.VALOR]}>
                    {maxValor}
                </td>
                <td className={POINT_COLORS[POINT_TYPE.RENOWN]}>
                    {maxRenown}
                </td>
            </tr>
            <tr>
                <td className={errors[POINT_TYPE.FREE] ? ERROR_STRING + " " : "" + POINT_COLORS[POINT_TYPE.FREE]}>
                    {freeFree}
                </td>
                <td className={errors[POINT_TYPE.VALOR] ? ERROR_STRING + " " : "" + POINT_COLORS[POINT_TYPE.VALOR]}>
                    {freeValor}
                </td>
                <td className={errors[POINT_TYPE.RENOWN] ? ERROR_STRING + " " : "" + POINT_COLORS[POINT_TYPE.RENOWN]}>
                    {freeRenown}
                </td>
            </tr>
        </tbody>
    </table>)
}
export default PointBank;
