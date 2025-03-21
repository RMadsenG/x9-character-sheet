import { useState } from "react";
import { POINT_TYPE } from "./Constants";



function validateAndSet(name: string, setFunc: (value: number) => void, setPointFunc: ((key: string, points: number) => boolean)) {


    return (onChangeEvent: React.FormEvent<HTMLInputElement>) => {
        const value = onChangeEvent.currentTarget.value
        if (!value) {
            setPointFunc(name, 0)
            setFunc(0)
            return
        }
        const num = parseInt(value)
        if (isNaN(num)) return

        if (num / 1000 > 1) {
            return
        }
        if (setPointFunc(name, num)) setFunc(num)
    }
}


function OnePoint({ name, setPointFunc }: { name: string, point_type: POINT_TYPE, setPointFunc: (key: string, value: number) => boolean }) {
    const [xPoints, setXPoints] = useState<number>(0)

    return <td className="border p-px"><input name={name} value={xPoints} size={3} onChange={validateAndSet(name, setXPoints, setPointFunc)} /></td>
}

function PointAllocation({ name, point_types, getPointFunc }: { name: string, point_types: POINT_TYPE[], getPointFunc: (pointType: POINT_TYPE) => (key: string, points: number) => boolean }) {
    const input_map = point_types.map(type =>
        <OnePoint name={name} key={name + type} point_type={type} setPointFunc={getPointFunc(type)} />
    )

    return (<>
        {input_map}
        <td className="border p-px">LvL</td>
    </>)
}


export default PointAllocation;

