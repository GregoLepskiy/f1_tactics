import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {ShowStint} from "./ShowStint";

export const ShowTyres = ({GP, stints, tyres, onRemove, teams, colors}) => {
    const removeStint = id => {
        onRemove(id);
    }
    return (
        <View style={styles.main}>
            <View style={styles.flatView}>
                <FlatList
                    style={{
                        width: '100%'
                    }}
                    keyExtractor={item => item.id.toString()}
                    data={stints}
                    renderItem={({item}) => {
                        if (item.name === GP.name)
                            return <ShowStint
                                stint={item.stints}
                                tyres={tyres}
                                onRemove={() => removeStint(item.id)}
                                team={teams[item.team]}
                                color={colors[item.team].firstColor}
                            />
                    }}
                >

                </FlatList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    name : {
        fontFamily : 'F1Regular',
        fontSize: 16,
        marginTop: 10
    },
    main : {
        alignItems: 'center',
        width: '100%'
    },
    flatView : {
        alignItems: 'center',
        width: '80%'
    }
})

