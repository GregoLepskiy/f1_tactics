import React, {useState} from "react";
import {FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {TeamChoice} from "./TeamChoice";
import Slider from "@react-native-community/slider";

export const AddSettings = ({color, teamPic, onMinTeam, onPlusTeam, setupTitles, onSubmit}) => {
    const [index, setIndex] = useState('');
    const [mark, setMark] = useState('0');
    const [settingsArr, setSettingsArr] = useState([
        {
            name: setupTitles[0].settings[0].name,
            value: setupTitles[0].settings[0].min
        },
        {
            name: setupTitles[1].settings[0].name,
            value: setupTitles[1].settings[0].min
        },
        {
            name: setupTitles[1].settings[1].name,
            value: setupTitles[1].settings[1].min
        },
        {
            name: setupTitles[2].settings[0].name,
            value: setupTitles[2].settings[0].min
        },
        {
            name: setupTitles[2].settings[1].name,
            value: setupTitles[2].settings[1].min
        },
        {
            name: setupTitles[3].settings[0].name,
            value: setupTitles[3].settings[0].min
        },
        {
            name: setupTitles[3].settings[1].name,
            value: setupTitles[3].settings[1].min
        },
        {
            name: setupTitles[3].settings[2].name,
            value: setupTitles[3].settings[2].min
        },
        {
            name: setupTitles[3].settings[3].name,
            value: setupTitles[3].settings[3].min
        },
        {
            name: setupTitles[4].settings[0].name,
            value: setupTitles[4].settings[0].min
        },
        {
            name: setupTitles[4].settings[1].name,
            value: setupTitles[4].settings[1].min
        },
        {
            name: setupTitles[4].settings[2].name,
            value: setupTitles[4].settings[2].min
        },
        {
            name: setupTitles[4].settings[3].name,
            value: setupTitles[4].settings[3].min
        },
        {
            name: setupTitles[4].settings[4].name,
            value: setupTitles[4].settings[4].min
        },
        {
            name: setupTitles[4].settings[5].name,
            value: setupTitles[4].settings[5].min
        },
        {
            name: setupTitles[5].settings[0].name,
            value: setupTitles[5].settings[0].min
        },
        {
            name: setupTitles[5].settings[1].name,
            value: setupTitles[5].settings[1].min
        },
        {
            name: setupTitles[6].settings[0].name,
            value: setupTitles[6].settings[0].min
        },
        {
            name: setupTitles[6].settings[1].name,
            value: setupTitles[6].settings[1].min
        },
        {
            name: setupTitles[7].settings[0].name,
            value: setupTitles[7].settings[0].min
        }
    ]);
    const arrSetSet = (name, value) => {
        const clone = [...settingsArr];
        const setting = clone.find(sett => sett.name === name);
        if (setting) {
            setting.value = value;
        }
        setSettingsArr(clone);
    }

    return (
        <View style={[styles.main, {
            backgroundColor: color.firstColor
        }]}>
            <View style={{
                width: '80%'
            }
            }>
                <TeamChoice
                    team={teamPic}
                    onChangeMin={onMinTeam}
                    onChangePlus={onPlusTeam}
                    color={color.firstColor}
                />
            </View>
            <FlatList
                style={{
                    width: '80%'
                }
                }
                keyExtractor={item => item.name}
                data={setupTitles}
                renderItem={({item}) => (
                    <View>
                        {index === item.name ? (
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setIndex(item.name)}
                                >
                                    <View style={[styles.setupBtn, {
                                        backgroundColor: color.secondColor
                                    }]}>
                                        <Text
                                            style={[styles.setupBtnTxt, {
                                                color: color.firstColor
                                            }]}
                                        >{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                {item.settings.map((set) =>
                                    <View key={set.name}>
                                        <Text style={[styles.stintText, {
                                            color: color.secondColor
                                        }]}>{set.name}</Text>
                                        <Text style={[styles.stintText, {
                                            color: color.secondColor
                                        }]}>{settingsArr[set.id].value}</Text>
                                        <Slider
                                            minimumTrackTintColor={color.secondColor}
                                            maximumTrackTintColor={color.secondColor}
                                            minimumValue={set.min}
                                            maximumValue={set.max}
                                            thumbTintColor={{
                                                backgroundColor: color.secondColor
                                            }}
                                            trackStyle={{
                                                backgroundColor: color.secondColor
                                            }}
                                            thumbStyle={{
                                                backgroundColor: color.secondColor
                                            }}
                                            value={settingsArr[set.id].value}
                                            onValueChange={value => arrSetSet(set.name, Math.round(value * 100) / 100)}
                                        />
                                    </View>
                                )}
                            </View>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setIndex(item.name)}
                            >
                                <View style={[styles.setupBtn, {
                                    backgroundColor: color.secondColor
                                }]}>
                                    <Text
                                        style={[styles.setupBtnTxt, {
                                            color: color.firstColor
                                        }]}
                                    >{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                )
                }
            />
            <View style={[styles.inputView, {
                backgroundColor: color.secondColor
            }]}>
                <Text style={[styles.stintText, {
                    color: color.firstColor
                }]}>Mark</Text>
                <TextInput
                    style={styles.inputMark}
                    keyboardType={'numeric'}
                    placeholder={mark}
                    placeholderTextColor={color.firstColor}
                    onChangeText={(value) => setMark(value)}
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onSubmit(settingsArr, mark)}
            >
                <View style={[styles.acceptBtn, {
                    backgroundColor: color.secondColor
                }]}>
                    <Text style={[styles.acceptTxt, {
                        color: color.firstColor
                    }]}>ADD</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    name : {
        fontFamily : 'F1Regular',
        fontSize: 17
    },
    main : {
        paddingTop: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    setupBtn : {
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        alignItems: 'center'
    },
    setupBtnTxt : {
        fontFamily: 'F1Bold',
        fontSize: 20
    },
    acceptTxt : {
        fontFamily: 'F1Bold',
        fontSize: 20,
        color: '#00D2BE',
    },
    acceptBtn : {
        backgroundColor: '#006F62',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    stintText : {
        fontFamily: 'F1Bold',
        fontSize: 20
    },
    inputView : {
        width: '80%',
        flexDirection: 'row',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputMark : {
        padding: 5,
        fontFamily: 'F1Bold',
        fontSize: 20
    }
})