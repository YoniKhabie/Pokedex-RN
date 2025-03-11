/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
    light: {
        text: "#11181C",
        background: "#fff",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: "#ECEDEE",
        background: "#151718",
        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
    },
};

export const TotalPowerColor = (num: number) => {
    if (num >= 525) {
        return "green";
    } else if (num >= 425) {
        return "orange";
    } else if (num > 320) {
        return "#FFD700"; // Darker yellow (gold)
    } else {
        return "red";
    }
};

export const StatColor = (num: number) => {
    if (num >= 100) {
        return "green";
    } else if (num >= 70) {
        return "orange";
    } else if (num > 54) {
        return "#FFD700"; // Darker yellow (gold)
    } else {
        return "red";
    }
};

const typeColors: Record<string, string> = {
    normal: "rgba(61, 61, 61, 0.3)",
    fire: "rgba(255, 69, 0, 0.3)",
    water: "rgba(30, 144, 255, 0.3)",
    electric: "rgba(255, 215, 0, 0.3)",
    grass: "rgba(34, 139, 34, 0.3)",
    ice: "rgba(173, 216, 230, 0.3)",
    fighting: "rgba(178, 34, 34, 0.3)",
    poison: "rgba(128, 0, 128, 0.3)",
    ground: "rgba(210, 180, 140, 0.3)",
    flying: "rgba(135, 206, 250, 0.3)",
    psychic: "rgba(255, 20, 147, 0.3)",
    bug: "rgba(154, 205, 50, 0.3)",
    rock: "rgba(139, 69, 19, 0.3)",
    ghost: "rgba(72, 61, 139, 0.3)",
    dragon: "rgba(75, 0, 130, 0.3)",
    dark: "rgba(47, 79, 79, 0.3)",
    steel: "rgba(192, 192, 192, 0.3)",
    fairy: "rgba(255, 182, 193, 0.3)",
};

export const GetTypeColor = (type: string): string => {
    return typeColors[type.toLowerCase()] || "rgba(0, 0, 0, 0.3)";
};
