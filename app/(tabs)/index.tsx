import { Column, Row } from "@/components/Table";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StatColor, TotalPowerColor } from "@/constants/Colors";
import { Link } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { usePokemonContext } from "../context/PokemonContext";
function capitalizeFirstLetter(str: string) {
    if (str.length === 0) return str; // Handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
const PokemonScreen: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const { pokemon, loading, setName } = usePokemonContext();

    const showtoast = (message: string) => {
        Toast.show({
            type: "error",
            text1: "Oops...",
            text2: message,
        });
    };
    const handleSumbit = () => {
        if (input.length === 0) {
            showtoast("Please enter a pokemon");
            return;
        }
        setName(input.toLowerCase().replace(/\s/g, ""));
    };

    if (loading) {
        return (
            <ThemedView style={{ marginLeft: "auto", marginRight: "auto" }}>
                <ThemedText>No Pokemon Found</ThemedText>
                <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </ThemedView>
            </ThemedView>
        );
    }
    if (!pokemon) {
        return (
            <>
                <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ThemedText style={{ padding: 30 }}>No Pokemon Found</ThemedText>
                    <ThemedView>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for a pokemon"
                            defaultValue={input}
                            onChangeText={(newInput) => setInput(newInput)}
                        />
                    </ThemedView>
                    <Link href={{ pathname: "/", params: { name: input } }} style={{ padding: 30 }}>
                        <TouchableOpacity style={styles.button} onPress={() => handleSumbit()}>
                            <ThemedText style={styles.buttonText}>Submit</ThemedText>
                        </TouchableOpacity>
                    </Link>
                </ThemedView>
            </>
        );
    }
    return (
        <GestureHandlerRootView>
            <ScrollView>
                <ThemedView style={styles.container}>
                    <ThemedText style={styles.title}>{capitalizeFirstLetter(pokemon.name)}</ThemedText>
                    <Image source={{ uri: pokemon.img }} style={{ width: 400, height: 400 }} />
                    <ThemedText>ID: {pokemon.id}</ThemedText>
                    <ThemedText>Weight: {pokemon.weight}</ThemedText>
                    <Row>
                        <ThemedText>Total Power: </ThemedText>
                        <ThemedText style={{ color: TotalPowerColor(pokemon.total_power) }}>
                            {pokemon.total_power}
                        </ThemedText>
                    </Row>
                    {pokemon.types.map((typeObj, index) => (
                        <ThemedText key={index}>
                            Type #{index + 1}: {capitalizeFirstLetter(typeObj.type.name)}
                        </ThemedText>
                    ))}

                    <ThemedView style={{ padding: 20 }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for a pokemon"
                            defaultValue={input}
                            onChangeText={(newInput) => setInput(newInput)}
                        />
                    </ThemedView>
                    <Link href={{ pathname: "/", params: { name: input } }} style={{ padding: 20 }}>
                        <TouchableOpacity style={styles.button} onPress={() => handleSumbit()}>
                            <ThemedText style={styles.buttonText}>Submit</ThemedText>
                        </TouchableOpacity>
                    </Link>
                    <ThemedView style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <Column style={styles.column}>
                            {pokemon.stats.map((stat, index) => (
                                <Row key={index} style={styles.row}>
                                    <ThemedText style={styles.box} numberOfLines={1} adjustsFontSizeToFit>
                                        {capitalizeFirstLetter(stat.stat.name)}
                                    </ThemedText>
                                    <ThemedText
                                        style={[styles.box, { color: StatColor(stat.base_stat) }]}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                    >
                                        {stat.base_stat}
                                    </ThemedText>
                                </Row>
                            ))}
                        </Column>
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default PokemonScreen;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#aaa",
    },
    box: {
        flex: 1,
        textAlign: "center",
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        flexShrink: 1,
        fontSize: 18,
    },
    column: {
        width: "100%",
        paddingHorizontal: 1,
    },
});
