import { StatusBar } from 'expo-status-bar';
import React, {useCallback, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import { HeadBar } from './src/components/Headbar';
import { GPBar } from './src/components/GPBar';
import {useFont} from "./src/hookes/fold.load.hook";
import {GPPage} from "./src/components/GPPage";
import {useImage} from "./src/hookes/image.load.hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NavigationContainer} from "@react-navigation/native";

import gpTitles from './src/json/GPTitles.json';

const title = "SUPER TACTICS";

export default function App() {
    const [stintST, setStint] = useState([]);
    const [stintLoad, setStintLoad] = useState(false);
    const [settingsArr, setSettingsArr] = useState([]);
    const [settingsLoad, setSettingsLoad] = useState(false);
    const getItemStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('stint');
            if (value !== null) {
                const jValue = JSON.parse(value);
                setStint(jValue);
            }
            else setStint([]);
        } catch (e) {
            console.log("ERROR WITH GETTING");
            return setStint([]);
        }
    };
    const getSettingsStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('settings');
            if (value !== null) {
                const jValue = JSON.parse(value);
                setSettingsArr(jValue);
            }
            else setStint([]);
        } catch (e) {
            console.log("ERROR WITH GETTING");
            return setSettingsArr([]);
        }
    };
    const { load, tyres, teams, setupTitles, colors } = useImage();
    const [gps, setGps] = useState(gpTitles);
    const [selectGP, setSelectGP] = useState(
        {
            id: '1',
            name: 'AustralianGP',
            select: true
        }
    );
    const setItemStorage = async (key, value) => {
        try {
            console.log(value);
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.log("ERROR WITH SAVING");
        }
    };
    const removeSetting = id => {
        setSettingsArr(prev => {
            let arr = prev.filter(sett => sett.id !== id);
            setItemStorage('settings', arr).then(() =>
                ToastAndroid.show('DELETED', ToastAndroid.SHORT)
            )
            return arr;
        });
    }
    const removeStint = id => {
        setStint(prev => {
            let arr = prev.filter(stint => stint.id !== id);
            setItemStorage('stint', arr).then(() =>
                ToastAndroid.show('DELETED', ToastAndroid.SHORT));
            return arr;
        });
    }
    const setGPS = useCallback((GP) => {
        setGps(prev => {
                let newP = JSON.parse(JSON.stringify(prev));
                for (let i = 0; i < newP.length; i++) {
                    let newState = {
                        id: newP[i].id,
                        name: newP[i].name,
                        select: false
                    }
                    if (newP[i].id === GP.id) {
                        newState.select = true;
                    }
                    newP[i] = newState;
                }
                return newP;
            }
        );
        setSelectGP(GP);
    }, [gps]);
    const {loaded} = useFont(),
        addSelectGP = (GP) => {
            setGPS(GP);
        };
    const acceptHandle = (GP, stints, team) => {
        setStint((prev) => {
                const arr =
                    [...prev,
                        {
                            id: Date.now(),
                            team: team,
                            name: GP.name,
                            stints: stints
                        }
                    ]
                setItemStorage('stint', arr).then(() =>
                    ToastAndroid.show('ADDED', ToastAndroid.SHORT));
                return arr;
            }
        );
    }
    const submitSettings = (clone, team, mark) => {
        setSettingsArr((prev) => {
            const arr =
                [...prev,
                    {
                        settings: clone,
                        team,
                        mark,
                        id: Date.now(),
                        name: selectGP.name
                    }
                ];
            setItemStorage('settings', arr).then(() =>
                ToastAndroid.show('ADDED', ToastAndroid.SHORT)
            );
            return arr;
        });
    }
    if (!stintLoad) {
        getItemStorage().then(() => {
            setStintLoad(true);
        });
    }

    if (!settingsLoad) {
        getSettingsStorage().then(() => {
            setSettingsLoad(true);
        })
    }

    if (!colors) return <View/>

    if (!stintLoad) return <View/>

    if(!settingsLoad) return <View/>

    if (!loaded) return <View/>

    if (!load) return <View/>

    //AsyncStorage.removeItem('settings');
    //AsyncStorage.removeItem('stints');

    return (
        <NavigationContainer>
            <View style={styles.main}>
                <HeadBar title={title}/>
                <GPBar
                    onSubmit={addSelectGP}
                    gps={gps}
                />
                <StatusBar
                    barStyle='light-content'
                    style='light'
                />
            </View>
            <GPPage
                GP={selectGP}
                stintST={stintST}
                tyres={tyres}
                teams={teams}
                onSubmit={(stints, team) => acceptHandle(selectGP, stints, team)}
                onRemove={removeStint}
                colors={colors}
                setupTitles={setupTitles}
                settingsArr={settingsArr}
                onRemoveSetting={removeSetting}
                onSubmitSettings={(clone, team, mark) => submitSettings(clone, team, mark)}
            />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#FFFFFF',

    },
});
