import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {ShowSet} from "./ShowSet";

export const ShowSettings = ({GP, colors, teams, settingsArr, onRemove}) => {
    const removeSetting = id => {
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
                    data={settingsArr}
                    renderItem={({item}) => {
                        if (item.name === GP.name)
                            return <ShowSet
                                setting={item}
                                teamPic={teams[item.team]}
                                color={colors[item.team]}
                                onRemove={() => removeSetting(item.id)}
                            />
                    }
                    }
                />
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