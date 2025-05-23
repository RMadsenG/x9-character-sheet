import { ChangeEvent, useEffect, useState } from "react";
import "../App.css";
import { invoke } from '@tauri-apps/api/core';
import { Species, SpeciesList } from "../Constants";


export default function NewChar() {
    const [name, setName] = useState<string>("")
    const [speciesList, setSpeciesList] = useState<SpeciesList>([])
    const [selectedSpecies, setSelectedSpecies] = useState<Species>()
    useEffect(() => {
        invoke<SpeciesList>('get_species').then((speciesList: SpeciesList) => {
            console.log(speciesList)
            setSpeciesList(speciesList)
            setSelectedSpecies(speciesList[0])
        });
    }, [])

    useEffect(() => {
        invoke('get_current_species').then((species: any) => {
            console.log(species)
        });
    }, [selectedSpecies])


    function select(onChangeEvent: ChangeEvent<HTMLSelectElement>) {
        const val = onChangeEvent.currentTarget.value
        setSelectedSpecies(speciesList.filter(e => e.id == val)[0])
    }

    function go() {
        if (!name) return;
        invoke('set_new_char', { name: name, speciesId: selectedSpecies?.id });
    }

    const options = speciesList.map((e) => <option value={e.id}>{e.name}</option>)
    return <>
        <main className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-5xl p-3 text-center">
                    New Chraracter
                </h1>
                <div className="flex py-5 justify-center">
                    <label htmlFor="name" className="text-xl ">Name:</label>
                    <input value={name} onChange={(e) => setName(e.currentTarget.value)} className="border-2 border-solid  mx-2" size={25} id="name" name="hi" />
                    <label htmlFor="species" className="text-xl pr-2">Species:</label>

                    <select value={selectedSpecies?.id} onChange={select} name="species" className="bg-transparent" id="species">
                        {options}
                    </select>
                </div>
                <div className="flex py-5 justify-center">
                    <div className="px-5">
                        HP: {selectedSpecies?.starting_health}
                    </div>
                    <div className="px-5">
                        Speed: {selectedSpecies?.starting_speed}
                    </div>
                    <div className="px-5">
                        Mana: {selectedSpecies?.starting_mana}
                    </div>
                </div>
                <div className="m-auto flex py-5 justify-center">
                    <button className="border-2 border-solid rounded-xl p-1 " type="button" onClick={go}>Create Character</button>
                </div>
            </div>
        </main>
    </>
}