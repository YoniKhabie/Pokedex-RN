import { Pokemon } from "./modelAbility";

export interface PokemonConfig {
    abilities: Ability[];
    base_experience: number;
    id: number;
    is_default: boolean;
    moves: Mfe[];
    name: string;
    stats: Stat[];
    types: Type[];
    weight: number;
    img: string;
    total_power: number;
    abilityInfo?: Map<string, AbilityInfo>;
}

export interface AbilityInfo {
    ability_name: string;
    description: string;
    pokemons: Pokemon[];
    id: number;
}

export interface Ability {
    ability: Ability2;
    is_hidden: boolean;
    slot: number;
}

export interface Ability2 {
    name: string;
    url: string;
}

export interface Index {
    game_index: number;
    version: Version;
}

export interface Version {
    name: string;
    url: string;
}

export interface VersionDetail {
    rarity: number;
    version: Version2;
}

export interface Version2 {
    name: string;
    url: string;
}

export interface Mfe {
    move: Move;
    version_group_details: VersionGroupDetail[];
}

export interface Move {
    name: string;
    url: string;
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: MoveLearnMethod;
    version_group: VersionGroup;
}

export interface MoveLearnMethod {
    name: string;
    url: string;
}

export interface VersionGroup {
    name: string;
    url: string;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: Stat2;
}

export interface Stat2 {
    name: string;
    url: string;
}

export interface Type {
    slot: number;
    type: Type2;
}

export interface Type2 {
    name: string;
    url: string;
}
