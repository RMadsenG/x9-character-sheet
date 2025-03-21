export enum POINT_TYPE {
    FREE,
    VALOR,
    RENOWN
}

export type PointBankObjType = {
    [POINT_TYPE.FREE]: number,
    [POINT_TYPE.VALOR]: number,
    [POINT_TYPE.RENOWN]: number
}
export type PointBankType = Map<string, PointBankObjType>
const a: PointBankType = new Map()
a.set("hi", { [POINT_TYPE.FREE]: 3, [POINT_TYPE.VALOR]: 4, [POINT_TYPE.RENOWN]: 4 })