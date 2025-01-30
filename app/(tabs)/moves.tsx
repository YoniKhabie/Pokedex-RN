import { Column, Row } from "@/components/Table";
import { ThemedText } from "@/components/ThemedText";
import { UtilitiesPokemon } from "@/utils/utilsPokemon";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { styles } from ".";
import { usePokemonContext } from "../context/PokemonContext";

const MovesTable: React.FC = () => {
    const { pokemon, loading } = usePokemonContext();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    if (!pokemon) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <ScrollView>
                {/* <ThemedText>{pokemon.name}</ThemedText> */}
                <Column style={styles.column}>
                    <Row style={styles.row}>
                        <ThemedText style={styles.box} numberOfLines={1}>
                            Move Name
                        </ThemedText>
                        <ThemedText style={styles.box} numberOfLines={1}>
                            Move Level
                        </ThemedText>
                    </Row>
                    {UtilitiesPokemon.SortMoves(pokemon.moves).map((move, index) => (
                        <Row key={index} style={styles.row}>
                            <ThemedText style={styles.box} numberOfLines={1}>
                                {UtilitiesPokemon.GetMoveName(move)}
                            </ThemedText>
                            <ThemedText style={styles.box} numberOfLines={1}>
                                {UtilitiesPokemon.GetMoveLv(move)}
                            </ThemedText>
                        </Row>
                    ))}
                </Column>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default MovesTable;
