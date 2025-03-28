import { useEffect, useState } from "react";
import { POINT_COLORS, POINT_TYPE } from "./Constants";
import { invoke } from '@tauri-apps/api/core';


async function get_point(name: string, point_type: POINT_TYPE): Promise<number> {
    const points: number = await invoke('get_point', { name: name, pointType: point_type })
    return points;
}

function OnePoint({ name, point_type }: { name: string, point_type: POINT_TYPE }) {
    const [xPoints, setXPoints] = useState<number | string>(0)

    useEffect(() => {
        get_point(name, point_type).then(setXPoints);
    }, []);

    function validateAndSet() {
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            const value = parseInt(onChangeEvent.currentTarget.value)
            invoke('set_point', { name: name, pointType: point_type, points: value }).then(() => setXPoints(value)).catch(console.log);
        }
    }
    function onSelect() {
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            const value = parseInt(onChangeEvent.currentTarget.value)
            if (value == 0) setXPoints('');
        }
    }
    function onBlur() {
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            const value = parseInt(onChangeEvent.currentTarget.value)
            if (!value)
                invoke('set_point', { name: name, pointType: point_type, points: 0 }).then(() => setXPoints(0)).catch(console.log);;
        }
    }
    return <td className="border p-px"><input className={POINT_COLORS[point_type]} name={name} value={xPoints} size={3} onBlur={onBlur()} onFocus={onSelect()} onChange={validateAndSet()} /></td>
}

function PointAllocation({ name, point_types }: { name: string, point_types: POINT_TYPE[] }) {
    const input_map = point_types.map(type =>
        <OnePoint name={name} key={name + type} point_type={type} />
    )

    return (<>
        {input_map}
        <td className="border p-px">LvL</td>
    </>)
}


export default PointAllocation;

