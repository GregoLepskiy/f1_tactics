import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const HeadBar = props => {

    return (
        <View style={styles.main}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#006F62',
        height: 85,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },

    text: {
        fontSize: 18,
        color: '#00D2BE',
        fontFamily: 'F1Wide'
    },


});