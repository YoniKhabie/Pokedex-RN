import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import PokemonProvider from "../context/PokemonContext";

const detailsIcon = require("@/assets/icons/pokeball.png");
const movesIcon = require("@/assets/icons/moves.png");
const cameraIcon = require("@/assets/icons/camera.png");

export default function TabLayout() {
    return (
        <PokemonProvider>
            <Tabs
                screenOptions={{
                    tabBarStyle: styles.tabBarStyle,
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Pokemon details",
                        tabBarIcon: () => <Image source={detailsIcon} style={styles.image} />,
                    }}
                />
                <Tabs.Screen
                    name="moves"
                    options={{
                        title: "Pokemon moves",
                        tabBarIcon: () => <Image source={movesIcon} style={styles.image} />,
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Pokemon search",
                        tabBarIcon: () => <Image source={cameraIcon} style={styles.image} />,
                    }}
                />
            </Tabs>
            <Toast />
        </PokemonProvider>
    );
}

const styles = StyleSheet.create({
    image: {
        marginBottom: 10,
        width: 32,
        height: 32,
        marginTop: 10,
    },
    tabBarStyle: {
        height: 80, // Increase tab bar height
        paddingBottom: 20, // Adjust padding
        paddingTop: 10, // Adjust padding
    },
    tabBarLabelStyle: {
        marginTop: 10,
        fontSize: 10, // Increase label font size
    },
});
