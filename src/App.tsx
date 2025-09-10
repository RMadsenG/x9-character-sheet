import { useState } from "react";
import "./App.css";
import BasicStats from "./BasicStats";
import BasicTraits from "./BasicTraits";
import CombatSkillsTable from "./CombatSkillsTable";
import Nameplate from "./Nameplate";
import PointBank from "./PointBank";
import { Separator, Tab } from "./Tab";
import Inventory from "./Inventory";

const TAB_DATA = [
  {
    component: <CombatSkillsTable />,
    name: "Character"
  },
  {
    component: <Inventory />,
    name: "Inventory"
  },
  {
    component: <CombatSkillsTable />,
    name: "Action"
  },
  {
    component: undefined,
    name: "separator"
  },
  {
    component: <CombatSkillsTable />,
    name: "Database"
  }
]

function App() {
  const [activeName, setActiveName] = useState(TAB_DATA[0]['name'])

  function onTabClick(name: string) {
    setActiveName(name)
  }

  const tabs = TAB_DATA.map((t, index) => {
    if (t.name == 'separator') {
      return <Separator key={index}/>
    }
    else {
      return <Tab key={index} active={activeName == t.name} title={t.name} onClick={onTabClick} />
    }
  })
  const active_tab = TAB_DATA.filter((t) => t.name == activeName)[0]['component']

  return (
    <main className="">
      <div className="topnav">

        {tabs}

      </div>
      <div className="flex m-2">
        <Nameplate />
        <BasicStats />
        <BasicTraits />
        <PointBank />
      </div>
      {active_tab}
    </main>
  );
}

export default App;
