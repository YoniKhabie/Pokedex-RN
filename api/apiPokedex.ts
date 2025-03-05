import { PokemonConfig } from "@/models/modalPokemon";
import { UtilitiesPokemon } from "@/utils/utilsPokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const POKEMON_CACHE_KEY = "pokemon_cache";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getPokemonByName = async (name: string) => {
    const cachedData = await AsyncStorage.getItem(POKEMON_CACHE_KEY);
    const pokemonCache = cachedData ? JSON.parse(cachedData) : {};
    if (pokemonCache[name] && Date.now() - pokemonCache[name].timestamp < CACHE_TTL) {
        return pokemonCache[name].data;
    }

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

        // Save the Pokémon data with a timestamp
        pokemonCache[name] = {
            data: pokemonConfig,
            timestamp: Date.now(),
        };
        await AsyncStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(pokemonCache));

        return pokemonConfig;
    } catch (error) {
        return null;
    }
};
