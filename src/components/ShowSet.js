import React, {useState} from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export const ShowSet = ({setting, color, teamPic, onRemove}) => {
    const [index, setIndex] = useState(false);
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                onLongPress={onRemove}
                onPress={() => setIndex(!index)}
            >
                <View>
                    {index ? (
                        <View style={[styles.main, {
                            backgroundColor: color.firstColor
                        }]}>
                            <FlatList
                                style={{
                                    width: '80%'
                                }}
                                keyExtractor={item => item.name}
                                data={setting.settings}
                                renderItem={({item}) => (
                                    <View style={[styles.setView, {
                                        backgroundColor: 'transparent'
                                    }]}>
                                        <Text style={[styles.markText, {
                                            color: color.secondColor
                                        }]}>{item.name} :: {item.value}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    ) : (
                        <View style={[styles.main, {
                            backgroundColor: color.firstColor
                        }]}>
                            <Image
                                source={teamPic}
                                style={styles.teamImage}
                            />
                            <Text style={[styles.markText, {
                                color: color.secondColor
                            }]}>Mark: {setting.mark}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
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
    },
    markText : {
        fontFamily: 'F1Regular',
        fontSize: 18,
        fontWeight: 'bold'
    },
    setView : {
        borderRadius: 10,
        width: '100%',
        padding: 10
    }
})