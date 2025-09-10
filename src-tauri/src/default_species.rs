use crate::types::{
    Armor, HigherSkill, InnateAttack, Inventory, Item, Skill, SkillSubtype, Species, SpeciesV, Spell, Trait::{Character, Finesse, Logic, Perception, Strength}, Weapon, WeaponAttack
};

pub fn get_default_species() -> SpeciesV {
    vec![
        Species {
            name: "Dweller".to_string(),
            id: "dweller".to_string(),
            starting_health: 50,
            starting_mana: 0,
            starting_speed: 3,
            starting_fatigue: 0,
            starting_weight: 25,
            abilities: vec![
                "You may distribute 6 points between mana and fatigue. You may only do this once when you create your character.".to_string(),
                "You may convert up to 50 unused VP or RP into FP. This can only be done once in your lifespan, preferably when your character is created.".to_string(),
                "Diplomatic - Once per day, you can make a diplomacy into a hard roll.".to_string(),
            ]
        },
        Species {
            name: "Sorler".to_string(),
            id: "sorler".to_string(),
            starting_health: 45,
            starting_mana: 1,
            starting_speed: 3,
            starting_fatigue: 4,
            starting_weight:20,
            abilities: vec![
                "You may distribute 6 points between mana and fatigue. You may only do this once when you create your character.".to_string()
            ],
        },
        Species {
            name: "Cragg".to_string(),
            id: "cragg".to_string(),
            starting_health: 40,
            starting_mana: 0,
            starting_speed: 4,
            starting_fatigue: 4,
            starting_weight:20,
            abilities: vec![
                "You may traverse your full movement across difficult terrain, and up any climbable surface, including the ceiling, with full speed. Any finesse checks for climbing you roll with advantage.".to_string(),
                "Chameleon - You may spend 1FT to change the color and pattern of your skin. This effect lasts one hour. It may give you an advantage while hiding or sneaking.".to_string(),
                "You have natural armor to heat attacks with a DR of 5.".to_string()
            ]
        },
        Species {
            name: "Knaverian".to_string(),
            id: "knaverian".to_string(),
            starting_health: 30,
            starting_mana: 0,
            starting_speed: 4,
            starting_fatigue:4,
            starting_weight: 20,
            abilities: vec![
                "You are small and can pass through tiles with allies on them.".to_string(),
                "Scurry - You can convert FT into speed. You cannot go into negative FT doing this.".to_string(),
                "Can see in the dark up to 10 hexes.".to_string()
            ]
        },
        Species {
            name: "Aari".to_string(),
            id: "aari".to_string(),
            starting_health: 40,
            starting_mana: 0,
            starting_speed: 4,
            starting_fatigue: 6,
            starting_weight: 15,
            abilities: vec![
                "Glide - If jumping from a height equal to your movement speed, you can glide your movement speed. You do not take fall damage.".to_string(),
                "You require specialty armor".to_string(),
            ]
        },
        Species {
            name: "Guppler".to_string(),
            id: "guppler".to_string(),
            starting_health: 55,
            starting_mana: 0,
            starting_speed: 2,
            starting_fatigue:5,
            starting_weight: 25,
            abilities: vec![
                "Swimmers - You have full movement speed while swimming, and +1 speed.".to_string(),
                "Semi-Aquatic - You can breathe underwater.".to_string(),
                "Smelly - You smell awful, and this can harm social interactions. You can try to buy items to offset your stench.".to_string(),
                "Guplon's Guppie - You hail to a deity known as Guplon. If you worship another deity, other Gupplers will know, and they won't like it.".to_string(),
                "Guplon's Gift - If you chose to worship Guplon, you can communicate telepathically with other Gupplers who worship, up to 30 hexes.".to_string(),
            ]
        },
        Species {
            name: "Lithia".to_string(),
            id: "lithia".to_string(),
            starting_health: 70,
            starting_mana: 0,
            starting_speed: 2,
            starting_fatigue: 6,
            starting_weight: 30,
            abilities: vec![
                "All stealth rolls are made with a +10 penalty.".to_string(),
                "You have natural armor to slashing damage with a DR of 10".to_string(),
                "You require specialty armor".to_string()
            ]
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

pub fn get_default_inventory() -> Inventory {
    Inventory {
        weapons: vec![Weapon {
            name: "Hand Cannon".to_string(),
            requisite: "Short Firearm 1".to_string(),
            attacks: vec![
                WeaponAttack {
                    name: "Shoot".to_string(),
                    damage: "4d10 blunt, piercing, highvel".to_string(),
                    range: 5,
                    fire_rate: 1,
                    mag: 1,
                },
                WeaponAttack {
                    name: "Shoot Twice".to_string(),
                    damage: "4d10 blunt, piercing, highvel".to_string(),
                    range: 5,
                    fire_rate: 1,
                    mag: 1,
                },
            ],

            additional_behavior: Some(
                "Must be readied after reloading.\nCannot be aimed.".to_string(),
            ),
            weight: 1f32,
            ammo_type: "1 large caliber".to_string(),
            value: 1f32,
            description: None,
        }],
        armor: vec![Armor {
            name: "Vitals Plate".to_string(),
            requisite: "Light Armor 1 or Heavy Armor 1".to_string(),
            protects_against: "Unarmed, Slashing, Blunt, Piercing, Low Velocity, Medium Velocity".to_string(),
            damage_reduction: 50,
            durability: 50,
            additional_behavior: "Durability immediately falls to 0 after one use.".to_string(),
            value: 1f32,
            weight: 2.0,
            description: "A large case of medical items and supplies.".to_string(),
        }],
        items: vec![Item {
            name: "Large First Aid Kit".to_string(),
            requisite: "First Aid 50".to_string(),
            effects: "Heals 1d8 per 10 pts in First Aid.\nEvery point healed reduces the uses of this item by 1.\nAt 0, this item is destroyed.".to_string(),
            range: None,
            uses: 100,
            value: 1.0,
            weight: 5.0,
            description: "A large case of medical items and supplies.".to_string(),
        }],
        spells: vec![Spell { 
            name: "Tricks".to_string(),
            skills: "Character 1".to_string(),
            requisite: None,
            spell_type: "Ranged, Inevitable".to_string(),
            damage_type: None,
            effect: "Can create minor magic tricks such as lights from fingertips\nlittle illusions that have no real consequence outside of social interactions.".to_string(),
            additional_behavior: None,
            duration: 1,
            range: Some(2),
            mana_cost: 0,
            components_ritual: None,
            point_cost: 1,
            flavor_text: None,
        }],
        innate_attacks: vec![InnateAttack {
            name: "Jab Punch".to_string(),
            requisite: "Unarmed 1".to_string(),
            attacks: "Jab".to_string(),
            damage: "1d4 unarmed".to_string(),
            range: 1,
            fire_rate: 2,
            additional_behavior: None,
            physical_requirements: "One Hand".to_string(),
            ft_cost: None,
            point_cost: None,
        }],
    }
}
