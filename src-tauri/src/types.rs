use std::collections::HashMap;

use serde::{Deserialize, Serialize};

type PointMap = HashMap<String, i32>;

pub type SpeciesV = Vec<Species>;

#[derive(Serialize, Deserialize, Clone)]
pub enum Trait {
    Strength,
    Finesse,
    Perception,
    Logic,
    Character,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Character {
    pub name: String,
    pub species: Species,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Species {
    pub name: String,
    pub id: String,
    pub starting_health: i32,
    pub starting_speed: i32,
    pub starting_mana: i32,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct HigherSkill {
    pub id: String,
    pub title: String,
    pub skill_subtypes: Vec<SkillSubtype>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct SkillSubtype {
    pub id: String,
    pub subtype_name: String,
    pub skills: Vec<Skill>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Skill {
    pub id: String,
    pub name: String,
    pub parent_trait: Vec<Trait>,
}

pub struct PointBank {
    pub free_points: PointMap,
    pub valor_points: PointMap,
    pub renown_points: PointMap,
}

// Point bank does not have knowledge of rules regarding inserting of points
// IE using more points than max / higher skill level than trait
// Point bank is only responsible for handling currently allocated points for any thing that consumes points
// and a theoretical maximum for a given point
impl PointBank {
    pub fn get_all_points(&self, name: &str) -> i32 {
        let mut points: i32 = 0;
        // No need to avoid bad point type, just add 0
        points += self.free_points.get(name).unwrap_or(&0);
        points += self.valor_points.get(name).unwrap_or(&0);
        points += self.renown_points.get(name).unwrap_or(&0);
        return points;
    }
    pub fn get_point_of_type(&self, name: &str, point_type: &str) -> i32 {
        let point_map: &PointMap = match point_type {
            "free" => &self.free_points,
            "valor" => &self.valor_points,
            "renown" => &self.renown_points,
            &_ => panic!("Bad point type provided"),
        };
        return *point_map.get(name).unwrap_or(&0);
    }

    pub fn points_to_level(&self, points: i32) -> i32 {
        let level: i32;
        if points >= 420 {
            level = 100;
        } else if points >= 260 {
            level = (points - 260) / 8 + 80;
        } else if points >= 140 {
            level = (points - 140) / 6 + 60;
        } else if points >= 60 {
            level = (points - 60) / 4 + 40;
        } else if points >= 20 {
            level = (points - 20) / 2 + 20;
        } else {
            level = (points - 0) / 1 + 0;
        }
        return level;
    }

    pub fn get_level(&self, name: &str) -> i32 {
        return self.points_to_level(self.get_all_points(name));
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

    pub fn set_max(&mut self, point_type: &str, points: i32) -> () {
        let point_map: &mut PointMap = match point_type {
            "free" => &mut self.free_points,
            "valor" => &mut self.valor_points,
            "renown" => &mut self.renown_points,
            &_ => panic!("Bad point type provided"),
        };
        point_map.insert("max".to_string(), points);
    }

    pub fn get_free_of_type(&self, point_type: &str) -> i32 {
        let point_map: &PointMap = match point_type {
            "free" => &self.free_points,
            "valor" => &self.valor_points,
            "renown" => &self.renown_points,
            &_ => panic!("Bad point type provided"),
        };

        let mut max: i32 = *point_map.get("max").unwrap();
        for (name, points) in point_map {
            if name == "max" {
                continue;
            }
            max -= points;
        }

        // This is ok now
        // if max < 0 {
        //     panic!("Points in map {} is more than max", point_type);
        // }

        return max;
    }
}
