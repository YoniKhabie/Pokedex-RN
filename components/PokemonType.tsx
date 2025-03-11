import { GetTypeColor } from "@/constants/Colors";
import TypesIcons from "@/utils/typesIcons";
import React from "react";
import { Image } from "react-native";
import { Row } from "./Table";
import { ThemedText } from "./ThemedText";

interface PokemonTypeProps {
    typeName: string;
}

const PokemonType: React.FC<PokemonTypeProps> = ({ typeName }) => {
    const bgColor = GetTypeColor(typeName);
    return (
        <Row style={{ backgroundColor: bgColor, borderRadius: 20 }}>
            <Image source={TypesIcons[typeName.toLowerCase()]} style={{ width: 22, height: 22, margin: 10 }} />
            <ThemedText style={{ marginRight: 12 }}>{typeName}</ThemedText>
        </Row>
    );
};

export default PokemonType;
