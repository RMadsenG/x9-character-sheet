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
use types::{Character, HigherSkill, PointBank, Species, SpeciesV, Stats, Inventory};

// All skills are matched with their parent trait.
// Your skill level cannot exceed the level of the parent trait.
// For example, you cannot have Two Handed Blade (strength) at level 45 if your Strength trait is only level 30.
#[tauri::command]
fn set_point(
    app: AppHandle,
    name: &str,
    point_type: &str,
    points: i32,
    parent_traits: Option<Vec<&str>>,
    state: tauri::State<'_, Mutex<PointBank>>,
) -> Result<i32, String> {
    let mut state = state.lock().unwrap();

    let current_points: i32 = state.get_point_of_type(name, point_type);
    let diff: i32 = points - current_points;

    let free: i32 = state.get_free_of_type(point_type);

    // Some things can only be set if the parent trait is high enough
    // I should have a state that holds trait and skills that references the PointBank.
    // That way i dont have to do that logic here.  It would also automatically add 1 to traits for me
    if let Some(parent_traits) = parent_traits {
        let mut ok: Option<&str> = None;

        let new_points: i32 = state.get_all_points(name) + diff;
        let new_level: i32 = state.points_to_level(new_points);

        for pt in &parent_traits {
            let trait_name = &("trait_".to_owned() + pt);
            let parent_level: i32 = 1 + state.get_level(trait_name);
            if parent_level >= new_level {
                ok = Some(pt);
                break;
            }
        }
        if ok.is_none() {
            app.emit("trait-to-weak", parent_traits).unwrap();
            return Err("Parent trait too low".to_string());
        }
    }

    // Fail if Using more points than free AND if increasing points
    if diff > free && points > current_points {
        app.emit("not-enough-points", point_type).unwrap();
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
    app: AppHandle,
    name: &str,
    species_id: &str,
    character_state: tauri::State<'_, Mutex<Option<Character>>>,
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
    *character_state.lock().unwrap() = Some(new_char.clone());
    let a: InvokeBody = serde_json::to_value(new_char).unwrap().into();
    app.get_webview_window("new_characater")
        .unwrap()
        .close()
        .unwrap();
    Response::new(a)
}

#[tauri::command]
fn get_char(state: tauri::State<'_, Mutex<Option<Character>>>) -> Result<Response, &str> {
    let char_opt: Option<Character> = state.lock().unwrap().clone();

    if let Some(char) = char_opt {
        let species: InvokeBody = serde_json::to_value(char).unwrap().into();
        Ok(Response::new(species))
    } else {
        Err("No Char yet defined")
    }
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

    let free: i32 = state.get_free_of_type(point_type);

    return Ok(free);
}

#[tauri::command]
fn get_stats<'a>(
    character_state: tauri::State<'_, Mutex<Option<Character>>>,
    point_bank_state: tauri::State<'_, Mutex<PointBank>>,
) -> Result<Response, &'a str> {
    let char_opt: Option<Character> = character_state.lock().unwrap().clone();
    let point_bank = point_bank_state.lock().unwrap();
    if char_opt.is_none() {
        return Err("No Char yet defined");
    }

    let character = char_opt.unwrap();
    let species = &character.species;

    let mut health: i32 = species.starting_health;
    let mut mana: i32 = species.starting_mana;
    let mut speed: i32 = species.starting_speed;
    let mut weight: i32 = species.starting_weight;
    let mut fatigue: i32 = species.starting_fatigue;

    // Strength
    let strength: i32 = point_bank.get_level("trait_Strength") + 1;
    // Every 3 points you have in Strength adds 1 to your total HP
    health += strength / 3;
    //Every 5 points you have in strength adds 1 kilo to your weight limit.
    weight += strength / 5;

    //Finesse
    let finesse: i32 = point_bank.get_level("trait_Finesse") + 1;
    //Every 20 points you have in Finesse adds 1 to your Speed stat.
    speed += finesse / 20;

    //Every 10 points you have in Strength or Finesse adds 1 to your fatigue stat. You only receive fatigue from the higher of either Finesse or Strength.
    fatigue += (std::cmp::max(strength, finesse)) / 10;

    //Perception
    //Perception determines turn order for creatures with equal speed.

    //Logic or Character
    let logic: i32 = point_bank.get_level("trait_Logic") + 1;
    let character: i32 = point_bank.get_level("trait_Character") + 1;

    //Every 5 points you have in Logic or Character adds 1 to your MP stat. You only receive mana from the higher of either Logic or Character.
    mana += (std::cmp::max(logic, character)) / 5;


    let stats = Stats {
        health: health,
        mana: mana,
        speed: speed,
        weight: weight,
        fatigue: fatigue,
    };
    let stats_response: InvokeBody = serde_json::to_value(stats).unwrap().into();
    Ok(Response::new(stats_response))
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
fn get_level(name: &str, state: tauri::State<'_, Mutex<PointBank>>) -> Result<i32, String> {
    let state = state.lock().unwrap();

    let level: i32 = state.get_level(name);

    return Ok(level);
}

#[tauri::command]
fn get_skill_table() -> Vec<HigherSkill> {
    return default_species::get_default_skill_table();
}

#[tauri::command]
fn get_inventory() -> Inventory {
    return default_species::get_default_inventory();
}

fn create_new_char_window(app: &AppHandle) {
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
    let config: &WindowConfig = config.get(0).unwrap();

    // Create new Window
    let handle: AppHandle = app.app_handle().clone();

    tauri::WebviewWindowBuilder::from_config(app, config)
        .unwrap()
        .menu(MenuBuilder::new(app).build().unwrap())
        .build()
        .unwrap()
        .on_window_event(move |event| {
            match event {
                WindowEvent::CloseRequested { api, .. } => {
                    let char_exists = handle
                        .state::<Mutex<Option<Character>>>()
                        .lock()
                        .unwrap()
                        .is_some();
                    if !char_exists {
                        api.prevent_close();
                    }
                }

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
    println!("Disabling window");
    app.get_webview_window("main")
        .unwrap()
        .set_enabled(false)
        .unwrap();
    return;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let default_species: SpeciesV = default_species::get_default_species();

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
                    create_new_char_window(app);
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
        .manage(Mutex::new(None::<Character>))
        .setup(|app| {
            // Open New Character Window if a new one doesn't exist yet
            let app = app.app_handle();
            let char_exists: bool = app
                .state::<Mutex<Option<Character>>>()
                .lock()
                .unwrap()
                .is_some();
            if !char_exists {
                create_new_char_window(app);
            }
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_point,
            set_point,
            get_free,
            get_species,
            get_char,
            set_new_char,
            get_level,
            set_max,
            get_skill_table,
            get_stats,
            get_inventory
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
