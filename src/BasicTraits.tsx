import { useEffect, useState } from "react";
import { POINT_COLORS, POINT_TYPE } from "./Constants";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

async function get_level(name: string): Promise<number> {
    name = "trait_" + name
    const points: number = 1 + await invoke<number>('get_level', { name: name, pointType: ["free"] })
    return points;
}

function BasicTraits() {
    const [strength, setStrength] = useState<number | string>(0)
    const [finesse, setFinesse] = useState<number | string>(0)
    const [perception, setPerception] = useState<number | string>(0)
    const [logic, setLogic] = useState<number | string>(0)
    const [character, setCharacter] = useState<number | string>(0)

    const [strengthLevel, setStrengthLevel] = useState<number>(1)
    const [finesseLevel, setFinesseLevel] = useState<number>(1)
    const [perceptionLevel, setPerceptionLevel] = useState<number>(1)
    const [logicLevel, setLogicLevel] = useState<number>(1)
    const [characterLevel, setCharacterLevel] = useState<number>(1)



    function validateAndSet(name: string, setXPoints: (points: number | string) => void) {
        name = "trait_" + name
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            let value: number | string = onChangeEvent.currentTarget.value;
            if (value) {
                value = parseInt(value)
            } else {
                value = 0
            }
            invoke('set_point', { name: name, pointType: "free", points: value }).then(() => setXPoints(value)).catch(console.log);
        }
    }

    function onSelect(setXPoints: (points: number | string) => void) {
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            const value = parseInt(onChangeEvent.currentTarget.value)
            if (value == 0) setXPoints('');
        }
    }

    // If its blank when clicked off, set to 0
    function onBlur(name: string, setXPoints: (points: number | string) => void) {
        name = "trait_" + name
        return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
            const value = parseInt(onChangeEvent.currentTarget.value)
            if (!value)
                invoke('set_point', { name: name, pointType: "free", points: 0 }).then(() => setXPoints(0)).catch(console.log);;
        }
    }

    useEffect(() => {
        get_level("strength").then(setStrengthLevel)
        get_level("finesse").then(setFinesseLevel)
        get_level("perception").then(setPerceptionLevel)
        get_level("logic").then(setLogicLevel)
        get_level("character").then(setCharacterLevel)

        let unlisten_update_points = listen('update-points', () => {
            get_level("strength").then(setStrengthLevel)
            get_level("finesse").then(setFinesseLevel)
            get_level("perception").then(setPerceptionLevel)
            get_level("logic").then(setLogicLevel)
            get_level("character").then(setCharacterLevel)
        });

        return () => {
            unlisten_update_points.then(f => f())
        };
    }, [])


    return (
        <table className="text-center m-2 text-sm border-separate border">
            <thead>
                <tr >
                    <th colSpan={6} className="text-xl pb-2">
                        Traits
                    </th>
                </tr>
                <tr>
                    <th />
                    <th className="px-1">
                        Strength<br />(STR)
                    </th>
                    <th className="px-1">
                        Finesse<br />(FIN)
                    </th>
                    <th className="px-1">
                        Perception<br />(PER)
                    </th>
                    <th className="px-1">
                        Logic<br />(LOG)
                    </th>
                    <th className="px-1">
                        Character<br />(CHA)
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                        Level
                    </th>
                    <td>
                        {strengthLevel}
                    </td>
                    <td>
                        {finesseLevel}
                    </td>
                    <td>
                        {perceptionLevel}
                    </td>
                    <td>
                        {logicLevel}
                    </td>
                    <td>
                        {characterLevel}
                    </td>
                </tr>
                <tr>
                    <th>
                        Point Allotment
                    </th>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={strength} size={3} onBlur={onBlur("strength", setStrength)} onFocus={onSelect(setStrength)} onChange={validateAndSet("strength", setStrength)} />
                    </td>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={finesse} size={3} onBlur={onBlur("finesse", setFinesse)} onFocus={onSelect(setFinesse)} onChange={validateAndSet("finesse", setFinesse)} />
                    </td>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={perception} size={3} onBlur={onBlur("perception", setPerception)} onFocus={onSelect(setPerception)} onChange={validateAndSet("perception", setPerception)} />
                    </td>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={logic} size={3} onBlur={onBlur("logic", setLogic)} onFocus={onSelect(setLogic)} onChange={validateAndSet("logic", setLogic)} />
                    </td>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={character} size={3} onBlur={onBlur("character", setCharacter)} onFocus={onSelect(setCharacter)} onChange={validateAndSet("character", setCharacter)} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}


export default BasicTraits;