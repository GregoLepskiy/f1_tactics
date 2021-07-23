import React from "react";
import {StyleSheet, Text, View} from "react-native";

export const Tactic = tactic => {
    return (
        <View style={styles.todo}>
            <Text>{tactic.title} :: {tactic.id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#e1ad95',
        borderRadius: 5,
        marginBottom: 10
    }
});