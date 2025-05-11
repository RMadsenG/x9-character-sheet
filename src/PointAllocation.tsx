import { useEffect, useState } from "react";
import { POINT_COLORS, POINT_TYPE, TRAIT_TYPE } from "./Constants";
import { invoke } from '@tauri-apps/api/core';
import { listen } from "@tauri-apps/api/event";

async function get_point(name: string, point_type: POINT_TYPE): Promise<number> {
    const points: number = await invoke('get_point', { name: name, pointType: point_type })
    return points;
}

async function get_level(name: string): Promise<number> {
    const points: number = await invoke('get_level', { name: name })
    return points;
}

function OnePoint({ name, point_type, parent_trait }: { name: string, point_type: POINT_TYPE, parent_trait: TRAIT_TYPE[] }) {
    const [xPoints, setXPoints] = useState<number | string>(0)
    useEffect(() => {
        get_point(name, point_type).then(setXPoints);
    }, []);

    function validateAndSet() {
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            let value: number | string = onChangeEvent.currentTarget.value;
            if (value) {
                value = parseInt(value)
            } else {
                value = 0
            }
            invoke('set_point', { name: name, pointType: point_type, points: value, parentTraits: parent_trait }).then(() => setXPoints(value)).catch(console.log);
        }
    }
    function onSelect() {
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            const value = parseInt(onChangeEvent.currentTarget.value)
            if (value == 0) setXPoints('');
        }
    }

    // If its blank when clicked off, set to 0
    function onBlur() {
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            const value = parseInt(onChangeEvent.currentTarget.value)
            if (!value)
                invoke('set_point', { name: name, pointType: point_type, points: 0, parentTraits: parent_trait }).then(() => setXPoints(0)).catch(console.log);;
        }
    }
    return <td className="border p-px"><input className={POINT_COLORS[point_type]} name={name} value={xPoints} size={3} onBlur={onBlur()} onFocus={onSelect()} onChange={validateAndSet()} /></td>
}

function PointAllocation({ name, point_types, parent_trait }: { name: string, point_types: POINT_TYPE[], parent_trait: TRAIT_TYPE[] }) {
    const [level, setLevel] = useState<number>(0)

    const input_map = point_types.map(type =>
        <OnePoint name={name} key={name + type} point_type={type} parent_trait={parent_trait} />
    )

    useEffect(() => {
        get_level(name).then(setLevel)

        let unlisten_update_points = listen('update-points', () => { get_level(name).then(setLevel) });

        return () => {
            unlisten_update_points.then(f => f())
        };
    }, [])

    useEffect(() => { get_level(name).then(setLevel) }, [input_map])
    return (<>
        {input_map}
        <td className="border p-px">{level}</td>
    </>)
}


export default PointAllocation;

