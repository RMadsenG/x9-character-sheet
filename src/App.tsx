import "./App.css";
import CombatSkillsTable from "./CombatSkillsTable";
import Nameplate from "./Nameplate";
import RPSkillsTable from "./RPSkillsTable";

function App() {

  return (
    <main className="">
      <div className="topnav">
        <a className="active" href="#home">Character</a>
        <a className="" href="#news">Inventory</a>
        <a href="#contact">Action</a>
        <a className="ml-auto" href="#contact">Database</a>
      </div>
      <div className="m-2">
        <Nameplate />
      </div>
      <CombatSkillsTable />
      <RPSkillsTable />
    </main>
  );
}

export default App;
