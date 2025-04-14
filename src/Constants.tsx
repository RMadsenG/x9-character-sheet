export const enum POINT_TYPE {
    FREE = "free",
    VALOR = "valor",
    RENOWN = "renown"
}

export type Character = {
    name: string,
    race: Race
}
export type RaceList = Race[]
export type Race = {
    name: string,
    id: string,
    starting_health: number,
    starting_speed: number,
    starting_mana: number,
};


export const POINT_COLORS = {
    [POINT_TYPE.FREE]: "font-bold text-zinc-500",
    [POINT_TYPE.VALOR]: "font-bold text-amber-500",
    [POINT_TYPE.RENOWN]: "font-bold text-fuchsia-700"
}

export type PointBankObjType = {
    [POINT_TYPE.FREE]: number,
    [POINT_TYPE.VALOR]: number,
    [POINT_TYPE.RENOWN]: number
}

export const ERROR_STRING = "bg-radial from-red-500"
export type PointBankType = Map<string, PointBankObjType>
const a: PointBankType = new Map()
a.set("hi", { [POINT_TYPE.FREE]: 3, [POINT_TYPE.VALOR]: 4, [POINT_TYPE.RENOWN]: 4 })