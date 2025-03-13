export interface AbilityConfig {
    effect_entries: EffectEntry[];
    id: number;
    pokemon: Pokemon[];
}

export interface EffectEntry {
    effect: string;
    language: Language;
    short_effect: string;
}

export interface Language {
    name: string;
    url: string;
}

export interface Pokemon {
    is_hidden: boolean;
    pokemon: Pokemon2;
    slot: number;
}

export interface Pokemon2 {
    name: string;
    url: string;
}
