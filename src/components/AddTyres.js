import React, {useCallback, useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {TyreChoice} from "./TyreChoice";
import {TeamChoice} from "./TeamChoice";

export const AddTyres = ({tyres, onSubmit, teamPic, color, onMinTeam, onPlusTeam}) => {
    const [tyre, setTyre] = useState([0, 0, 0, 0]),
        [stintCount, setStintCount] = useState(2),
        [stintArr, setStintArr] = useState([
            {
                id: 0,
                tyre: 0
            },
            {
                id: 1,
                tyre: 0
            }
        ]);
    const minusPressHandler = () => {
            setStintCount(() => {
                let count = stintCount;
                if (count > 2) {
                    setStintArr((prev) => {
                        let arr = [...prev];
                        arr.pop();
                        return arr;
                    });
                    count--;
                }
                return count;
            });
        },
        plusPressHandler = () => {
            setStintCount(() => {
                let count = stintCount;
                if (count < 4) {
                    setStintArr((prev) => [...prev, {
                        id: count,
                        tyre: 0
                    }]);
                    count++;
                }
                return count;
            });
        },
        tyreChoiceLeft = useCallback((id) => {
            if (tyre[id] === 0) {
                setStintArr((prev) => {
                    let arr = [...prev];
                    arr[id] = {id, tyre : tyres.length - 1}
                    return arr;
                });
                setTyre((prev) => {
                    let arr = [...prev];
                    arr[id] = tyres.length - 1;
                    return arr;
                });
            } else {
                setStintArr((prev) => {
                    let arr = [...prev];
                    arr[id] = {id, tyre : tyre[id] - 1}
                    return arr;
                });
                setTyre((prev) => {
                    let arr = [...prev];
                    arr[id] = tyre[id] - 1;
                    return arr;
                });
            }
        }, [tyre, stintArr]),
        tyreChoiceRight = useCallback((id) => {
            if (tyre[id] === tyres.length - 1) {
                setStintArr((prev) => {
                    let arr = [...prev];
                    arr[id] = {id, tyre : 0}
                    return arr;
                });
                setTyre((prev) => {
                    let arr = [...prev];
                    arr[id] = 0;
                    return arr;
                });
            } else {
                setStintArr((prev) => {
                    let arr = [...prev];
                    arr[id] = {id, tyre : tyre[id] + 1}
                    return arr;
                });
                setTyre((prev) => {
                    let arr = [...prev];
                    arr[id] = tyre[id] + 1;
                    return arr;
                });
            }
        }, [tyre, stintArr]);
    return (
        <View style={[styles.main, {
            backgroundColor: color.firstColor
        }]}>
            <View style={{
                width: '80%'
            }}>
                <TeamChoice
                    team={teamPic}
                    onChangeMin={onMinTeam}
                    onChangePlus={onPlusTeam}
                    color={color.firstColor}
                />
            </View>
            <View style={[styles.stint, {
                backgroundColor: color.secondColor
            }]}>
                <Text style={[styles.stintText, {
                    color: color.firstColor
                }]}>Number of stints:</Text>
                <Text style={[styles.stintText, {
                    color: color.firstColor
                }]}
                >{stintCount}</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{width: '12%'}}
                    onPress={plusPressHandler}
                >
                    <View
                        style={[styles.button, {
                            backgroundColor: color.firstColor
                        }]}
                    >
                        <Ionicons
                            name='add'
                            size={24}
                            color={color.secondColor}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{width: '12%'}}
                    onPress={minusPressHandler}
                >
                    <View
                        style={[styles.button, {
                            backgroundColor: color.firstColor
                        }]}
                    >
                        <Ionicons
                            name='remove'
                            size={24}
                            color={color.secondColor}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={styles.tyresChoice}
            >
                <FlatList
                    style={{
                        width: '100%'
                    }
                    }
                    keyExtractor={item => item.id.toString()}
                    data={stintArr}
                    renderItem={({item}) => {
                        return (
                            <TyreChoice
                                id={item.id}
                                tyre={tyre[item.id]}
                                tyres={tyres}
                                onChangeLeft={() => tyreChoiceLeft(item.id)}
                                onChangeRight={() => tyreChoiceRight(item.id)}
                                colors={color}
                            />
                        )
                    }
                    }
                >
                </FlatList>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onSubmit(stintArr)}
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
    stint : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width : '80%',
        padding: 10,
        borderRadius: 10,
        marginTop: 30
    },
    stintText : {
        fontFamily: 'F1Bold',
        fontSize: 20
    },
    button : {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    tyresChoice : {
        width: '80%',
        alignItems: 'center'
    },
    acceptBtn : {
        backgroundColor: '#006F62',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    acceptTxt : {
        fontFamily: 'F1Bold',
        fontSize: 20,
        color: '#00D2BE',
    }
})