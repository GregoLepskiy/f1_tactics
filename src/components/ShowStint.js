import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";

export const ShowStint = ({stint, tyres, onRemove, team, color}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onLongPress={onRemove}
        >
            <View style={[styles.main, {
                backgroundColor: color
            }]}>
                <Image
                    source={team}
                    style={styles.teamImage}
                />
                <FlatList
                    horizontal={true}
                    keyExtractor={item => item.id.toString()}
                    data={stint}
                    renderItem={({item}) =>
                        <Image
                            style={{
                                width: 50,
                                height: 50
                            }}
                            source={tyres[item.tyre]}
                        />
                    }
                >
                </FlatList>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main : {
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        width: '100%'
    },
    teamImage : {
        resizeMode: 'center',
        width: '100%',
        height: 150,
        margin: 10
    }
})

