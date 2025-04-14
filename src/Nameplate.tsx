import { useEffect, useState } from "react";
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { invoke } from '@tauri-apps/api/core';
import { Character } from "./Constants";

function Nameplate() {
    const [name, setName] = useState<string>("Horatio Cornbad all  Mc'goon Fart Fartmc")
    const [race, setRace] = useState<string>("Frog")

    function get_char() {
        console.log("hi")
        invoke<Character>('get_char').then((character: Character) => { 
            console.log(character)
            setName(character.name)
            setRace(character.race.name)
        });

    }

    useEffect(() => {
        get_char()

        let unlisten_get_char = getCurrentWebviewWindow().listen('reload_char', get_char);

        return () => {
            unlisten_get_char.then(f => f())
        };
    }, [])

    console.log("name " +name)
    let class_string = "text-5xl"
    let split_names = name.split(" ")
    let len = split_names.length
    let longest = split_names.sort((a: string, b: string) => { return b.length - a.length })[0]
    let longest_length = longest.length

    
    if (len > 12) {
        class_string = "text-l"
    } else if (len > 10) {
        class_string = "text-xl"
    } else if (len > 8 || longest_length > 15) {
        class_string = "text-2xl"
    } else if (len > 6 || longest_length > 10) {
        class_string = "text-3xl"
    } else if (len > 2) {
        class_string = "text-4xl"
    }
    return (
        <div className="p-2">
            <div className="flex">
                <h1 className={class_string + " w-fit mr-3"}>{name}</h1>
                <button className="rounded-xl px-2 py-1 my-auto outline-2" type="button" value="hi" >Info</button>
            </div>
            <p>{race}</p>
        </div>
    );
}

export default Nameplate