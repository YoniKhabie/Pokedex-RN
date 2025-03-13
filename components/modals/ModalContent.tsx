import { useThemeColor } from "@/hooks/useThemeColor";
import { PokemonConfig } from "@/models/modelPokemon";
import { capitalizeFirstLetter, eplaceHyphenWithSpace } from "@/utils/helpers";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface ModalContentprops {
    pokemon: PokemonConfig;
    ability: string;
}

const ModalContent: React.FC<ModalContentprops> = ({ pokemon, ability }) => {
    const backgroundColor = useThemeColor({ light: "white", dark: "black" }, "background");
    const _ability = eplaceHyphenWithSpace(capitalizeFirstLetter(ability));

    // Check if abilityInfo is a Map and it has the ability
    const abilityInfo = pokemon?.abilityInfo;
    const hasAbilityInfo = abilityInfo instanceof Map && abilityInfo.has(ability);
    const defaultMargin = 5;
    return (
        <ThemedView style={{ marginHorizontal: 18, backgroundColor: backgroundColor }}>
            <ThemedText style={{ marginVertical: defaultMargin, fontSize: 16, fontWeight: "bold" }}>
                {_ability}
            </ThemedText>
            <ThemedText style={{ marginVertical: defaultMargin, fontSize: 16 }}>
                {hasAbilityInfo ? abilityInfo.get(ability)?.description : "No description available"}
            </ThemedText>
            <ThemedText style={{ marginVertical: defaultMargin, fontSize: 16, fontWeight: "bold" }}>
                Pokemons with {_ability} ability:{" "}
            </ThemedText>
            <ThemedText>
                {hasAbilityInfo
                    ? abilityInfo
                          .get(ability)
                          ?.pokemons.map(
                              (p, i) =>
                                  eplaceHyphenWithSpace(capitalizeFirstLetter(p.pokemon.name)) +
                                  `${abilityInfo.get(ability)?.pokemons.length !== i + 1 ? ", " : "."}`
                          )
                    : "No info available"}
            </ThemedText>
        </ThemedView>
    );
};

export default ModalContent;

const styles = StyleSheet.create({});
