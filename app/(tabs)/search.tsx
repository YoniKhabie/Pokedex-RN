import { getPokemonByName } from "@/api/apiPokedex";
import Camera from "@/components/Camera";
import { Row } from "@/components/Table";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CameraCapturedPicture } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { useCallback, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { usePokemonContext } from "../context/PokemonContext";

// Initialize Google AI model once (avoids re-creating on every render)
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fileToGenerativePart = (base64Image: string, mimeType = "image/jpg") => ({
    inlineData: { data: base64Image, mimeType },
});

const PokemonSearch = () => {
    const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
    const [loading, setLoading] = useState(false);
    const { setName } = usePokemonContext();

    const handleSetPhoto = useCallback((capturedPhoto: CameraCapturedPicture) => {
        setPhoto(capturedPhoto);
    }, []);

    const fetchPokemonName = async (base64Image: string) => {
        try {
            console.log("Sending request to Gemini AI...");
            const prompt = "In one word who is that pokemon?";
            const imagePart = fileToGenerativePart(base64Image);
            const result = await model.generateContent([prompt, imagePart]);
            // const chosenLogProb = result.response.candidates?.[0]?.avgLogprobs;

            // console.log("@@@@ => ", chosenLogProb);
            const pokemonName = result.response.text();
            const pokemon = await getPokemonByName(pokemonName);
            console.log("pokemon", pokemon?.name);
            if (!pokemon) return null;
            return pokemonName;
        } catch (error) {
            console.error("Error fetching Pokemon name:", error);
            return null;
        }
    };

    const handleSearch = useCallback(async () => {
        if (!photo) return;

        setLoading(true);
        try {
            const base64Image = await FileSystem.readAsStringAsync(photo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const pokemonName = await fetchPokemonName(base64Image);
            console.log("pokemonName ", pokemonName);
            if (pokemonName) {
                setName(pokemonName);
                Toast.show({ type: "success", text1: "Pokemon Identified!", text2: pokemonName });
            } else {
                Toast.show({ type: "error", text1: "Oops...", text2: "Could not identify the Pokémon." });
            }
        } finally {
            setLoading(false);
        }
    }, [photo, setName]);

    return (
        <View style={styles.container}>
            {!photo ? (
                <Camera _handleSetPhoto={handleSetPhoto} />
            ) : (
                <View style={styles.container}>
                    <Image source={{ uri: photo.uri }} style={styles.preview} />
                    <Row style={styles.row}>
                        <TouchableOpacity style={styles.box} onPress={() => setPhoto(null)} disabled={loading}>
                            <Text style={styles.text}>{loading ? "Loading..." : "Retake"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box} onPress={handleSearch} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.text}>Search Pokémon</Text>
                            )}
                        </TouchableOpacity>
                    </Row>
                </View>
            )}
        </View>
    );
};

export default PokemonSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    preview: {
        flex: 1,
        width: "100%",
        height: "100%",
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
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 18,
    },
});
