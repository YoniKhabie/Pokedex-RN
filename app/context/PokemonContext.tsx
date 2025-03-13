import { usePokemon } from "@/hooks/usePokemon";
import { PokemonConfig } from "@/models/modelPokemon";
import React, { createContext, ReactNode, useContext } from "react";

interface PokemonContextProps {
    pokemon: PokemonConfig | null;
    loading: boolean;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { pokemon, loading, setName } = usePokemon("mew");

    return <PokemonContext.Provider value={{ pokemon, loading, setName }}>{children}</PokemonContext.Provider>;
};

export const usePokemonContext = (): PokemonContextProps => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error("usePokemonContext must be used within a PokemonProvider");
    }
    return context;
};

export default PokemonProvider;
