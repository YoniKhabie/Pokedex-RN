import { getPokemonByName } from "@/api/apiPokedex"; // Replace with the actual service or API function
import { PokemonConfig } from "@/models/modelPokemon";
import { useEffect, useState } from "react";

export const usePokemon = (initialName: string) => {
    const [pokemon, setPokemon] = useState<PokemonConfig | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>(initialName);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const data = await getPokemonByName(name);
                setPokemon(data);
            } catch (error) {
                console.error("Failed to fetch Pokémon:", error);
                setPokemon(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [name]);

    return { pokemon, loading, setName };
};
