import React, {useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export const TyreChoice = ({id, tyres, tyre, onChangeLeft, onChangeRight, colors}) => {
    return (
        <View style={[styles.main, {
            backgroundColor: colors.secondColor
        }]}>
            <Text
                style={[styles.text, {
                    color: colors.firstColor
                }]}
            >{`Stint ${id + 1} `}</Text>
            <TouchableOpacity
                onPress={onChangeLeft}
            >
                <View style={[styles.button,{
                    backgroundColor: colors.firstColor
                }]}>
                    <Ionicons
                        name='chevron-back'
                        size={24}
                        color={colors.secondColor}
                    />
                </View>
            </TouchableOpacity>
            <View style={{
                marginStart: 30,
                marginEnd: 10
            }}>
                <Image
                    style={{
                        width: 50,
                        height: 50
                    }}
                    source={tyres[tyre]}
                />
            </View>
            <TouchableOpacity
                onPress={onChangeRight}
            >
                <View style={[styles.button,{
                    backgroundColor: colors.firstColor
                }]}>
                    <Ionicons
                        name='chevron-forward'
                        size={24}
                        color={colors.secondColor}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
        paddingRight: 20,
        marginTop: 10,
    },
    text : {
        fontFamily: 'F1Bold',
        fontSize: 20
    },
    button : {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginStart: 10,
        marginEnd: 10
    },
})