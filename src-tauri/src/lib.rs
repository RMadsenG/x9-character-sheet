mod default_species;
mod types;

use std::collections::HashMap;
use std::sync::Mutex;
use tauri::ipc::{InvokeBody, Response};
use tauri::{
    menu::{MenuBuilder, SubmenuBuilder},
    utils::config::WindowConfig,
    AppHandle, Emitter, Manager, WindowEvent,
};
use types::{Character, PointBank, Species, SpeciesV};

// All skills are matched with their parent trait. 
// Your skill level cannot exceed the level of the parent trait. 
// For example, you cannot have Two Handed Blade (strength) at level 45 if your Strength trait is only level 30.
#[tauri::command]
fn set_point(
    app: AppHandle,
    name: &str,
    point_type: &str,
    points: i32,
    state: tauri::State<'_, Mutex<PointBank>>,
) -> Result<i32, String> {
    let mut state = state.lock().unwrap();

    let current_points = state.get_point_of_type(name, point_type);
    let free: i32 = state.get_free_of_type(point_type, name);

    // Fail if Using more points than free AND if increasing points
    if points > free && points > current_points {
        app.emit("update-failed", point_type).unwrap();
        return Err("No free points".to_string());
    }

    state.insert_of_type(name, point_type, points);
    app.emit("update-points", ()).unwrap();
    return Ok(points);
}

#[tauri::command]
fn set_max(
    point_type: &str,
    points: i32,
    state: tauri::State<'_, Mutex<PointBank>>,
) -> Result<(), String> {
    let mut state = state.lock().unwrap();
    state.set_max(point_type, points);
    return Ok(());
}

#[tauri::command]
fn set_new_char(
    name: &str,
    species_id: &str,
    character_state: tauri::State<'_, Mutex<Character>>,
    species_list: tauri::State<'_, SpeciesV>,
) -> Response {
    let species: SpeciesV = species_list
        .inner()
        .clone()
        .into_iter()
        .filter(|x| x.id == species_id)
        .collect::<SpeciesV>();
    let species: Species = species.get(0).unwrap().to_owned();
    println!("set name: {}", name);
    let new_char = Character {
        name: name.to_string(),
        species: species,
    };
    *character_state.lock().unwrap() = new_char.clone();
    let a: InvokeBody = serde_json::to_value(new_char).unwrap().into();
    Response::new(a)
}

#[tauri::command]
fn get_char(state: tauri::State<'_, Mutex<Character>>) -> Response {
    println!("get name: {}", state.lock().unwrap().name);
    let species: InvokeBody = serde_json::to_value(state.inner()).unwrap().into();
    Response::new(species)
}

#[tauri::command]
fn get_species(state: tauri::State<'_, SpeciesV>) -> Response {
    let species: InvokeBody = serde_json::to_value(state.inner()).unwrap().into();
    Response::new(species)
}

#[tauri::command]
fn get_free(
    point_type: &str,
    state: tauri::State<'_, Mutex<types::PointBank>>,
) -> Result<i32, String> {
    let state = state.lock().unwrap();

    let free: i32 = state.get_free_of_type(point_type, "");

    return Ok(free);
}

#[tauri::command]
fn get_point(
    name: &str,
    point_type: &str,
    state: tauri::State<'_, Mutex<PointBank>>,
) -> Result<i32, String> {
    let state = state.lock().unwrap();

    let points: i32 = state.get_point_of_type(name, point_type);

    return Ok(points);
}

#[tauri::command]
fn get_level(
    name: &str,
    point_type: Vec<&str>,
    state: tauri::State<'_, Mutex<PointBank>>,
) -> Result<i32, String> {
    let state = state.lock().unwrap();
    let level: i32 = state.points_to_level(name, point_type);
    return Ok(level);
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let default_species: SpeciesV = default_species::get_default_species();
    let current_char = Character {
        name: "Horatio Cornball".to_string(),
        species: Species {
            name: "Human".to_string(),
            id: "human".to_string(),
            starting_health: 10,
            starting_mana: 20,
            starting_speed: 100,
        },
    };

    tauri::Builder::default()
        .menu(|app| {
            let text_menu = SubmenuBuilder::new(app, "File")
                .text("new_character", "New Character")
                .build()?;
            MenuBuilder::new(app).items(&[&text_menu]).build()
        })
        .on_menu_event(|app: &tauri::AppHandle, event| {
            println!("menu event: {:?}", event.id());

            match event.id().0.as_str() {
                "new_character" => {
                    let config: Vec<WindowConfig> = app
                        .config()
                        .app
                        .windows // Get Struct Vector
                        .clone() // Clone So into_iter can use it?
                        .into_iter() // So we can filter it
                        .filter(|x| x.label == "new_characater") // Filter it
                        .collect::<Vec<WindowConfig>>(); // De iterator it.

                    // I dont understand why I need to split this in two?
                    // Collect deletes the value or smth if this is all one line?
                    let config = config.get(0).unwrap();

                    // Create new Window
                    let handle: AppHandle = app.app_handle().clone();

                    tauri::WebviewWindowBuilder::from_config(app, config)
                        .unwrap()
                        .menu(MenuBuilder::new(app).build().unwrap())
                        .build()
                        .unwrap()
                        .on_window_event(move |event| {
                            match event {
                                // Re enable main window and reload character after destroyed
                                WindowEvent::Destroyed => {
                                    handle
                                        .get_webview_window("main")
                                        .unwrap()
                                        .set_enabled(true)
                                        .unwrap();
                                    handle.emit_to("main", "reload_char", ()).unwrap();
                                }
                                _ => {}
                            }
                        });
                    // disable main window
                    app.get_webview_window("main")
                        .unwrap()
                        .set_enabled(false)
                        .unwrap();
                }
                _ => {
                    println!("unexpected menu event");
                }
            }
        })
        .manage(Mutex::new(PointBank {
            free_points: HashMap::from([("max".to_string(), 100)]),
            renown_points: HashMap::from([("max".to_string(), 100)]),
            valor_points: HashMap::from([("max".to_string(), 100)]),
        }))
        .manage(default_species)
        .manage(Mutex::new(current_char))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_point,
            set_point,
            get_free,
            get_species,
            get_char,
            set_new_char,
            get_level,
            set_max
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
