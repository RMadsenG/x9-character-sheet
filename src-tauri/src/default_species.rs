use crate::types::{
    HigherSkill, Skill, SkillSubtype, Species, SpeciesV, Trait::Character, Trait::Finesse,
    Trait::Logic, Trait::Perception, Trait::Strength,
};

pub fn get_default_species() -> SpeciesV {
    vec![
        Species {
            name: "Imp".to_string(),
            id: "imp".to_string(),
            starting_health: 50,
            starting_mana: 20,
            starting_speed: 100,
        },
        Species {
            name: "Human".to_string(),
            id: "human".to_string(),
            starting_health: 30,
            starting_mana: 10,
            starting_speed: 100,
        },
        Species {
            name: "Frog".to_string(),
            id: "frog".to_string(),
            starting_health: 10,
            starting_mana: 40,
            starting_speed: 140,
        },
        Species {
            name: "Frost Knight".to_string(),
            id: "frost_knight".to_string(),
            starting_health: 80,
            starting_mana: 70,
            starting_speed: 600,
        },
    ]
}

pub fn get_default_skill_table() -> Vec<HigherSkill> {
    vec![
        HigherSkill {
            id: "combat_skills".to_string(),
            title: "Combat Skills".to_string(),
            skill_subtypes: vec![
                SkillSubtype {
                    id: "weapons".to_string(),
                    subtype_name: "Weapons".to_string(),
                    skills: vec![
                        Skill {
                            id: "one_handed_blade".to_string(),
                            name: "One-Handed Blade".to_string(),
                            parent_trait: vec![Finesse, Strength],
                        },
                        Skill {
                            id: "one_handed_blunt".to_string(),
                            name: "One-Handed Blunt".to_string(),
                            parent_trait: vec![Strength],
                        },
                        Skill {
                            id: "one_handed_martial".to_string(),
                            name: "One-Handed Martial".to_string(),
                            parent_trait: vec![Finesse],
                        },
                        Skill {
                            id: "two_handed_blade".to_string(),
                            name: "Two-Handed Blade".to_string(),
                            parent_trait: vec![Strength],
                        },
                        Skill {
                            id: "two_handed_blunt".to_string(),
                            name: "Two-Handed Blunt".to_string(),
                            parent_trait: vec![Strength],
                        },
                        Skill {
                            id: "two_handed_martial".to_string(),
                            name: "Two-Handed Martial".to_string(),
                            parent_trait: vec![Finesse, Strength],
                        },
                        Skill {
                            id: "short_firearm".to_string(),
                            name: "Short Firearm".to_string(),
                            parent_trait: vec![Finesse, Perception],
                        },
                        Skill {
                            id: "long_firearm".to_string(),
                            name: "Long Firearm".to_string(),
                            parent_trait: vec![Strength, Perception],
                        },
                        Skill {
                            id: "archery".to_string(),
                            name: "Archery".to_string(),
                            parent_trait: vec![Strength],
                        },
                        Skill {
                            id: "thrown_weapon".to_string(),
                            name: "Thrown Weapon".to_string(),
                            parent_trait: vec![Finesse],
                        },
                        Skill {
                            id: "heave_weapons".to_string(),
                            name: "Heavy Weapons".to_string(),
                            parent_trait: vec![Logic, Strength],
                        },
                        Skill {
                            id: "unarmed".to_string(),
                            name: "Unarmed".to_string(),
                            parent_trait: vec![Strength],
                        },
                    ],
                },
                SkillSubtype {
                    id: "magic".to_string(),
                    subtype_name: "Magic".to_string(),
                    skills: vec![
                        Skill {
                            id: "chronomancy".to_string(),
                            name: "Chronomancy".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "elemental".to_string(),
                            name: "Elemental".to_string(),
                            parent_trait: vec![Character],
                        },
                        Skill {
                            id: "magicka".to_string(),
                            name: "Magicka".to_string(),
                            parent_trait: vec![Logic, Character],
                        },
                        Skill {
                            id: "protection".to_string(),
                            name: "Protection".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "psychic".to_string(),
                            name: "Psychic".to_string(),
                            parent_trait: vec![Character],
                        },
                        Skill {
                            id: "techno".to_string(),
                            name: "Techno".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "forbidden".to_string(),
                            name: "Forbidden".to_string(),
                            parent_trait: vec![Character],
                        },
                    ],
                },
                SkillSubtype {
                    id: "defense".to_string(),
                    subtype_name: "Defense".to_string(),
                    skills: vec![
                        Skill {
                            id: "light_armor".to_string(),
                            name: "Light Armor".to_string(),
                            parent_trait: vec![Finesse],
                        },
                        Skill {
                            id: "medium_armor".to_string(),
                            name: "Medium Armor".to_string(),
                            parent_trait: vec![Finesse, Strength],
                        },
                        Skill {
                            id: "heavy_armor".to_string(),
                            name: "Heavy Armor".to_string(),
                            parent_trait: vec![Strength],
                        },
                        Skill {
                            id: "shields".to_string(),
                            name: "Shields".to_string(),
                            parent_trait: vec![Strength],
                        },
                        Skill {
                            id: "Dodge".to_string(),
                            name: "dodge".to_string(),
                            parent_trait: vec![Finesse],
                        },
                    ],
                },
            ],
        },
        HigherSkill {
            id: "rp_skills".to_string(),
            title: "RP Skills".to_string(),
            skill_subtypes: vec![
                SkillSubtype {
                    id: "soft_skills".to_string(),
                    subtype_name: "Soft Skills".to_string(),
                    skills: vec![
                        Skill {
                            id: "tinkering".to_string(),
                            name: "Tinkering".to_string(),
                            parent_trait: vec![Finesse, Logic],
                        },
                        Skill {
                            id: "electronics".to_string(),
                            name: "Electronics".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "botony".to_string(),
                            name: "Botany".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "zoology".to_string(),
                            name: "Zoology".to_string(),
                            parent_trait: vec![Character, Finesse],
                        },
                        Skill {
                            id: "first_aid".to_string(),
                            name: "First Aid".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "medicine".to_string(),
                            name: "Medicine".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "arcane_knowledge".to_string(),
                            name: "Arcane Knowledge".to_string(),
                            parent_trait: vec![Logic, Character],
                        },
                        Skill {
                            id: "planetary_piloting".to_string(),
                            name: "Planetary Piloting".to_string(),
                            parent_trait: vec![Finesse, Perception],
                        },
                        Skill {
                            id: "planetary_navigation".to_string(),
                            name: "Planetary Navigation".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "religion".to_string(),
                            name: "Religion".to_string(),
                            parent_trait: vec![Character],
                        },
                    ],
                },
                SkillSubtype {
                    id: "hard_skills".to_string(),
                    subtype_name: "Hard Skills".to_string(),
                    skills: vec![
                        Skill {
                            id: "arts_music".to_string(),
                            name: "Fine Arts and Music".to_string(),
                            parent_trait: vec![Character],
                        },
                        Skill {
                            id: "diplomacy".to_string(),
                            name: "Diplomacy".to_string(),
                            parent_trait: vec![Character],
                        },
                        Skill {
                            id: "History".to_string(),
                            name: "History".to_string(),
                            parent_trait: vec![Logic],
                        },
                        Skill {
                            id: "contrabanding".to_string(),
                            name: "Contrabanding".to_string(),
                            parent_trait: vec![Finesse],
                        },
                        Skill {
                            id: "investigation".to_string(),
                            name: "Investigation".to_string(),
                            parent_trait: vec![Perception, Logic],
                        },
                        Skill {
                            id: "espionage".to_string(),
                            name: "Espionage".to_string(),
                            parent_trait: vec![Character],
                        },
                        Skill {
                            id: "scavenging".to_string(),
                            name: "Scavenging".to_string(),
                            parent_trait: vec![Perception],
                        },
                    ],
                },
            ],
        },
    ]
}
