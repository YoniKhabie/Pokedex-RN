import { PokemonConfig } from "@/models/modalPokemon";
import { UtilitiesPokemon } from "@/utils/utilsPokemon";

export const getPokemonByName = async (name: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const json = await response.json();
        const pokemonConfig: PokemonConfig = {
            abilities: json.abilities,
            base_experience: json.base_experience,
            id: json.id,
            is_default: json.is_default,
            moves: json.moves,
            name: json.name,
            stats: json.stats,
            types: json.types,
            weight: json.weight,
            img: json.sprites.front_default,
            total_power: UtilitiesPokemon.GetTotalPower(json.stats),
        };

        return pokemonConfig;
    } catch (error) {
        return null;
    }
};
