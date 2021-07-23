import React from "react";
import {Image, StyleSheet, View} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

export const TeamChoice = ({team, onChangeMin, onChangePlus, color}) => {
    return (
        <GestureRecognizer
            onSwipeLeft={onChangePlus}
            onSwipeRight={onChangeMin}
        >
            <View style={[styles.main, {
                backgroundColor: color
            }]}>
                <Image
                    style={styles.image}
                    source={team}
                />
            </View>
        </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    main : {
        width : '100%',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    image : {
        resizeMode: 'center',
        width: '100%',
        height: 150
    }
})