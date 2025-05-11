import { useEffect, useState } from "react";
import { ERROR_STRING, POINT_COLORS, POINT_TYPE, TRAIT_TYPE } from "./Constants";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

async function get_level(name: string): Promise<number> {
    name = "trait_" + name
    const level: number = 1 + await invoke<number>('get_level', { name: name })
    return level;
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

    const [errors, setErrors] = useState({
        [TRAIT_TYPE.STRENGTH]: false,
        [TRAIT_TYPE.FINESSE]: false,
        [TRAIT_TYPE.PERCEPTION]: false,
        [TRAIT_TYPE.LOGIC]: false,
        [TRAIT_TYPE.CHARACTER]: false
    })


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
        get_level(TRAIT_TYPE.STRENGTH).then(setStrengthLevel)
        get_level(TRAIT_TYPE.FINESSE).then(setFinesseLevel)
        get_level(TRAIT_TYPE.PERCEPTION).then(setPerceptionLevel)
        get_level(TRAIT_TYPE.LOGIC).then(setLogicLevel)
        get_level(TRAIT_TYPE.CHARACTER).then(setCharacterLevel)

        let unlisten_update_points = listen('update-points', () => {
            get_level(TRAIT_TYPE.STRENGTH).then(setStrengthLevel)
            get_level(TRAIT_TYPE.FINESSE).then(setFinesseLevel)
            get_level(TRAIT_TYPE.PERCEPTION).then(setPerceptionLevel)
            get_level(TRAIT_TYPE.LOGIC).then(setLogicLevel)
            get_level(TRAIT_TYPE.CHARACTER).then(setCharacterLevel)
        });

        let timer: number = 0;
        let unlisten_bad_trait = listen<string[]>('trait-to-weak', (payload) => {
            const traits: string[] = payload.payload

            if (timer) {
                return
            }
            // Set display to red
            setErrors((old) => {
                const true_traits = traits.reduce((o, key) => ({ ...o, [key]: true }), {})
                return { ...old, ...true_traits }
            })

            // Wait 1s, clear timer and reset display
            timer = setTimeout(
                () => {
                    timer = 0
                    setErrors((old) => {
                        const false_traits = traits.reduce((o, key) => ({ ...o, [key]: false }), {})
                        return { ...old, ...false_traits }
                    })
                },
                1000
            );
        });

        return () => {
            unlisten_update_points.then(f => f())
            unlisten_bad_trait.then(f => f())
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
                    <td className={errors[TRAIT_TYPE.STRENGTH] || strengthLevel < 0 ? ERROR_STRING + " " : ""}>
                        {strengthLevel}
                    </td>
                    <td className={errors[TRAIT_TYPE.FINESSE] || finesseLevel < 0 ? ERROR_STRING + " " : ""}>
                        {finesseLevel}
                    </td>
                    <td className={errors[TRAIT_TYPE.PERCEPTION] || perceptionLevel < 0 ? ERROR_STRING + " " : ""}>
                        {perceptionLevel}
                    </td>
                    <td className={errors[TRAIT_TYPE.LOGIC] || logicLevel < 0 ? ERROR_STRING + " " : ""}>
                        {logicLevel}
                    </td>
                    <td className={errors[TRAIT_TYPE.CHARACTER] || characterLevel < 0 ? ERROR_STRING + " " : ""}>
                        {characterLevel}
                    </td>
                </tr>
                <tr>
                    <th>
                        Point Allotment
                    </th>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={strength} size={3} onBlur={onBlur(TRAIT_TYPE.STRENGTH, setStrength)} onFocus={onSelect(setStrength)} onChange={validateAndSet(TRAIT_TYPE.STRENGTH, setStrength)} />
                    </td>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={finesse} size={3} onBlur={onBlur(TRAIT_TYPE.FINESSE, setFinesse)} onFocus={onSelect(setFinesse)} onChange={validateAndSet(TRAIT_TYPE.FINESSE, setFinesse)} />
                    </td>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={perception} size={3} onBlur={onBlur(TRAIT_TYPE.PERCEPTION, setPerception)} onFocus={onSelect(setPerception)} onChange={validateAndSet(TRAIT_TYPE.PERCEPTION, setPerception)} />
                    </td>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={logic} size={3} onBlur={onBlur(TRAIT_TYPE.LOGIC, setLogic)} onFocus={onSelect(setLogic)} onChange={validateAndSet(TRAIT_TYPE.LOGIC, setLogic)} />
                    </td>
                    <td>
                        <input className={POINT_COLORS[POINT_TYPE.FREE] + " text-center"} value={character} size={3} onBlur={onBlur(TRAIT_TYPE.CHARACTER, setCharacter)} onFocus={onSelect(setCharacter)} onChange={validateAndSet(TRAIT_TYPE.CHARACTER, setCharacter)} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}


export default BasicTraits;