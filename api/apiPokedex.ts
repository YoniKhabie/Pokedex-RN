import { PokemonConfig } from "@/models/modalPokemon";

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
        };
        // console.log(pokemonConfig.stats);

        return pokemonConfig;
    } catch (error) {
        // console.error(error);
        return null;
    }
};

// getPokemonByName("mew")
