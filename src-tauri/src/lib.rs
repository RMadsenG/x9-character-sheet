use std::collections::HashMap;
use std::sync::Mutex;
use tauri::{AppHandle, Emitter};

type PointMap = HashMap<String, i32>;
struct PointBank {
    free_points: PointMap,
    valor_points: PointMap,
    renown_points: PointMap,
}

impl PointBank {
    fn get_point_of_type(&self, name: &str, point_type: &str) -> i32 {
        let point_map: &PointMap = match point_type {
            "free" => &self.free_points,
            "valor" => &self.valor_points,
            "renown" => &self.renown_points,
            &_ => panic!("Bad point type provided"),
        };
        return *point_map.get(name).unwrap_or(&0);
    }
    fn insert_of_type(&mut self, name: &str, point_type: &str, points: i32) -> () {
        let point_map: &mut PointMap = match point_type {
            "free" => &mut self.free_points,
            "valor" => &mut self.valor_points,
            "renown" => &mut self.renown_points,
            &_ => panic!("Bad point type provided"),
        };

        point_map.insert(name.to_string(), points);
    }

    fn get_free_of_type(&self, point_type: &str, ignore: &str) -> i32 {
        let point_map: &PointMap = match point_type {
            "free" => &self.free_points,
            "valor" => &self.valor_points,
            "renown" => &self.renown_points,
            &_ => panic!("Bad point type provided"),
        };

        let mut max: i32 = *point_map.get("max").unwrap();
        for (name, points) in point_map {
            if name == "max" || name == ignore {
                continue;
            }
            max -= points;
        }

        if max < 0 {
            panic!("Points in map {} is more than max", point_type);
        }
        return max;
    }
}

#[tauri::command]
fn set_point(
    app: AppHandle,
    name: &str,
    point_type: &str,
    points: i32,
    state: tauri::State<'_, Mutex<PointBank>>,
) -> Result<i32, String> {
    let mut state = state.lock().unwrap();
    let free: i32 = state.get_free_of_type(point_type, name);

    if points > free {
        app.emit("update-failed", point_type).unwrap();
        return Err("No free points".to_string());
    }

    state.insert_of_type(name, point_type, points);
    app.emit("update-points", ()).unwrap();
    return Ok(points);
}

#[tauri::command]
fn get_free(point_type: &str, state: tauri::State<'_, Mutex<PointBank>>) -> Result<i32, String> {
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Mutex::new(PointBank {
            free_points: HashMap::from([("max".to_string(), 100)]),
            renown_points: HashMap::from([("max".to_string(), 100)]),
            valor_points: HashMap::from([("max".to_string(), 100)]),
        }))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_point, set_point, get_free])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
