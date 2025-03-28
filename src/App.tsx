import "./App.css";
import BasicStats from "./BasicStats";
import BasicTraits from "./BasicTraits";
import CombatSkillsTable from "./CombatSkillsTable";
import Nameplate from "./Nameplate";
import PointBank from "./PointBank";

function App() {
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
        <PointBank />
      </div>
      <CombatSkillsTable />
    </main>
  );
}

export default App;
