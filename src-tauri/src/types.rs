use std::collections::HashMap;

use serde::{Serialize, Deserialize};

type PointMap = HashMap<String, i32>;

pub type Races = Vec<Race>;

#[derive(Serialize, Deserialize)]
#[derive(Clone)]
pub struct Character {
    pub name:String,
    pub race: Race,
}


#[derive(Serialize, Deserialize)]
#[derive(Clone)]
pub struct Race {
    pub name: String,
    pub id: String,
    pub starting_health: i32,
    pub starting_speed: i32,
    pub starting_mana: i32,
}



pub struct PointBank {
    pub free_points: PointMap,
    pub valor_points: PointMap,
    pub renown_points: PointMap,
}


impl PointBank {
    pub fn get_point_of_type(&self, name: &str, point_type: &str) -> i32 {
        let point_map: &PointMap = match point_type {
            "free" => &self.free_points,
            "valor" => &self.valor_points,
            "renown" => &self.renown_points,
            &_ => panic!("Bad point type provided"),
        };
        return *point_map.get(name).unwrap_or(&0);
    }

    pub fn insert_of_type(&mut self, name: &str, point_type: &str, points: i32) -> () {
        let point_map: &mut PointMap = match point_type {
            "free" => &mut self.free_points,
            "valor" => &mut self.valor_points,
            "renown" => &mut self.renown_points,
            &_ => panic!("Bad point type provided"),
        };

        point_map.insert(name.to_string(), points);
    }

    pub fn get_free_of_type(&self, point_type: &str, ignore: &str) -> i32 {
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
