import "./App.css";
import CombatSkillsTable from "./CombatSkillsTable";
import Nameplate from "./Nameplate";

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
    </main>
  );
}

export default App;
