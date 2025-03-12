import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { ReactNode } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface CustomModalProps {
    isVisible: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, title, children, onClose }) => {
    const bgColor = useThemeColor({ light: "white", dark: "black" }, "background");
    const notBgColor = useThemeColor({ light: "black", dark: "white" }, "background");
    const titleContainerBgColor = useThemeColor({ light: "#D6DBDF", dark: "#1B2631" }, "background");

    return (
        <ThemedView>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <ThemedView style={[styles.modalContent, { backgroundColor: bgColor }]}>
                    <ThemedView style={[styles.titleContainer, { backgroundColor: titleContainerBgColor }]}>
                        <ThemedText style={[styles.title, { color: notBgColor }]}>{title}</ThemedText>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name="close" color={notBgColor} size={22} />
                        </Pressable>
                    </ThemedView>
                    {children}
                </ThemedView>
            </Modal>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        height: "33%",
        width: "100%",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "16%",
        backgroundColor: "#D3D3D3",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
    },
});
export default CustomModal;
