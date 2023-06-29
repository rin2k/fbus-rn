import { colors } from "@/styles";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const Button = (props) => {
    const {
        title,
        onPress,
        disabled,
        block,
        uppercase,
        size = "medium",
        style,
    } = props;

    const backgroundColor = colors.primary;
    const buttonSizes = {
        small: {
            height: 30,
            paddingHorizontal: 8,
        },
        medium: {
            height: 34,
            paddingHorizontal: 12,
        },
        large: {
            height: 44,
            paddingHorizontal: 16,
        },
    };
    const colorText = colors.secondary;

    const handleOnPress = () => {
        if (!disabled) {
            onPress?.();
        }
    };

    return (
        <View style={[!block && styles.block, style]}>
            <TouchableOpacity
                onPress={handleOnPress}
                style={[styles.container, buttonSizes[size], { backgroundColor }]}
            >
                <Text
                    style={[
                        styles.title,
                        uppercase && { textTransform: "uppercase" },
                        {
                            color: colorText,
                        },
                    ]}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8

    },
    title: {
        textAlign: "center",

    },
});

export default Button;
