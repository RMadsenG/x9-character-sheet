import { useState } from "react";
import "./App.css";
import BasicStats from "./BasicStats";
import BasicTraits from "./BasicTraits";
import CombatSkillsTable from "./CombatSkillsTable";
import Nameplate from "./Nameplate";
import { POINT_TYPE, PointBankObjType, PointBankType } from "./Constants";
import PointBank from "./PointBank";




function sumPointBank(bank: PointBankType, pointType: POINT_TYPE, ignore: string = "") {
  let sum: number = 0
  for (const [key, value] of bank) {
    if (key == ignore || key == "max") continue
    sum += value[pointType]
  }
  return sum
}


function App() {
  const [pointBank, setPointBank] = useState<PointBankType>(new Map<string, PointBankObjType>([[
    "max", {
      [POINT_TYPE.FREE]: 30,
      [POINT_TYPE.VALOR]: 30,
      [POINT_TYPE.RENOWN]: 30
    }]]))

  function getTypedValidateSetPointBank(pointType: POINT_TYPE): (key: string, points: number) => boolean {

    return (key: string, points: number) => {

      const max: number = pointBank.get("max")![pointType] ?? 0
      // Get used points, ignore key to find max available for key
      const usedPoints = sumPointBank(pointBank, pointType, key)
      const freePoints = max - usedPoints
      if (freePoints < points) {
        return false
      }

      const newObj: PointBankObjType = {
        ...(pointBank.get(key) ?? { [POINT_TYPE.FREE]: 0, [POINT_TYPE.VALOR]: 0, [POINT_TYPE.RENOWN]: 0 }), // Create new entry if not yet created
        ...{ [pointType]: points } // And update with new points
      }
      setPointBank(last_map => new Map(last_map.set(key, newObj)))
      return true
    }
  }
  console.log(pointBank)

  return (
    <main className="">
      <div className="topnav">
        <a className="active" href="#home">Character</a>
        <a className="" href="#news">Inventory</a>
        <a href="#contact">Action</a>
        <a className="ml-auto" href="#contact">Database</a>
      </div>
      <div className="flex m-2">
        <Nameplate />
        <BasicStats />
        <BasicTraits />
        <PointBank pointBank={pointBank} />

      </div>
      <CombatSkillsTable getPointFunc={getTypedValidateSetPointBank} />
    </main>
  );
}

export default App;
