import { PokemonConfig } from "@/models/modelPokemon";
import { UtilitiesPokemon } from "@/utils/utilsPokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAbilityInfo } from "./apiAbility";

export const POKEMON_CACHE_KEY = "pokemon_cache";
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
        const pokemonAbility: string[] = [];
        pokemonConfig.abilities.map((ability) => {
            pokemonAbility.push(ability.ability.name);
        });
        const abilityMap = await getAbilityInfo(pokemonAbility);
        pokemonConfig.abilityInfo = new Map(abilityMap);
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

export async function deleteAllPokemonsFromCache() {
    try {
        // Remove the entire cache from AsyncStorage
        await AsyncStorage.removeItem(POKEMON_CACHE_KEY);

        return true;
    } catch (error) {
        return false;
    }
}
