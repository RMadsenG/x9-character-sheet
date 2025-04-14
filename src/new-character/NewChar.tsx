import { ChangeEvent, useEffect, useState } from "react";
import "../App.css";
import { invoke } from '@tauri-apps/api/core';
import { Race, RaceList } from "../Constants";
import { getCurrentWindow } from '@tauri-apps/api/window';


export default function NewChar() {
    const [name, setName] = useState<string>("")
    const [raceList, setRaceList] = useState<RaceList>([])
    const [selectedRace, setSelectedRace] = useState<Race>()
    useEffect(() => {
        invoke<RaceList>('get_races').then((raceList: RaceList) => {
            console.log(raceList)
            setRaceList(raceList)
            setSelectedRace(raceList[0])
        });
    }, [])

    useEffect(() => {
        invoke('get_current_race').then((race: any) => {
            console.log(race)
        });
    }, [selectedRace])


    function select(onChangeEvent: ChangeEvent<HTMLSelectElement>) {
        const val = onChangeEvent.currentTarget.value
        setSelectedRace(raceList.filter(e => e.id == val)[0])
    }

    function go() {
        if (!name) return;
        invoke('set_new_char', { name: name, raceId: selectedRace?.id }).then((race: any) => {
            
            getCurrentWindow().close();
        });
    }

    const options = raceList.map((e) => <option value={e.id}>{e.name}</option>)
    return <>
        <main className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-5xl p-3 text-center">
                    New Chraracter
                </h1>
                <div className="flex py-5 justify-center">
                    <label htmlFor="name" className="text-xl ">Name:</label>
                    <input value={name} onChange={(e) => setName(e.currentTarget.value)} className="border-2 border-solid  mx-2" size={25} id="name" name="hi" />
                    <label htmlFor="race" className="text-xl pr-2">Race:</label>

                    <select value={selectedRace?.id} onChange={select} name="race" className="bg-transparent" id="race">
                        {options}
                    </select>
                </div>
                <div className="flex py-5 justify-center">
                    <div className="px-5">
                        HP: {selectedRace?.starting_health}
                    </div>
                    <div className="px-5">
                        Speed: {selectedRace?.starting_speed}
                    </div>
                    <div className="px-5">
                        Mana: {selectedRace?.starting_mana}
                    </div>
                </div>
                <div className="m-auto flex py-5 justify-center">
                    <button className="border-2 border-solid rounded-xl p-1 " type="button" onClick={go}>Create Character</button>
                </div>
            </div>
        </main>
    </>
}