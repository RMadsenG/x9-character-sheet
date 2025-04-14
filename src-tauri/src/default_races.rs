use types::Race;

use crate::types;

pub fn get_default_races() -> Vec<Race> {
    vec![
        Race {
            name: "Imp".to_string(),
            id: "imp".to_string(),
            starting_health: 50,
            starting_mana: 20,
            starting_speed: 100,
        },
        Race {
            name: "Human".to_string(),
            id: "human".to_string(),
            starting_health: 30,
            starting_mana: 10,
            starting_speed: 100,
        },
        Race {
            name: "Frog".to_string(),
            id: "frog".to_string(),
            starting_health: 10,
            starting_mana: 40,
            starting_speed: 140,
        },
        Race {
            name: "Frost Knight".to_string(),
            id: "frost_knight".to_string(),
            starting_health: 80,
            starting_mana: 70,
            starting_speed: 600,
        },
    ]
}
